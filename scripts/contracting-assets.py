#!/usr/bin/env python3
"""
Contracting brand assets.

Takes the two opaque-white masters the client supplied —

    brand/logo-contracting.png     the sunset badge lockup
    brand/mascot-contracting.png   the text-free husky, full body

— and writes the web assets the site references into public/brand/. The white
background is removed with a border flood-fill (not a colour key), so the white
*inside* the artwork — the wordmark letters, the husky's fur — survives.

The mascot is supplied as one full-body pose; the site needs a bust and a head
avatar too, so those are cropped from it (the body is cropped off when a smaller
pose is wanted).

    python3 scripts/contracting-assets.py
"""
from PIL import Image, ImageDraw, ImageFilter, ImageFont
import numpy as np
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "brand"
OUT = ROOT / "public"
BRAND_OUT = OUT / "brand"

NAVY = (13, 42, 78)
DEEP = (6, 21, 40)
FONT_BLACK = "/System/Library/Fonts/Supplemental/Arial Black.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
PHONE = "(239) 518-5928"


def vertical_gradient(size, top, bottom):
    img = Image.new("RGB", size)
    draw = ImageDraw.Draw(img)
    w, h = size
    for y in range(h):
        t = y / max(h - 1, 1)
        draw.line([(0, y), (w, y)],
                  fill=tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3)))
    return img


def knockout(path, thresh=36):
    """Flood-fill the outer white background to transparent, then trim."""
    rgb = Image.open(path).convert("RGB")
    w, h = rgb.size
    work = rgb.copy()
    sentinel = (255, 0, 255)
    seeds = [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1),
             (w // 2, 0), (w // 2, h - 1), (0, h // 2), (w - 1, h // 2)]
    for seed in seeds:
        if work.getpixel(seed) != sentinel:
            ImageDraw.floodfill(work, seed, sentinel, thresh=thresh)

    arr = np.array(work)
    bg = (arr[:, :, 0] == 255) & (arr[:, :, 1] == 0) & (arr[:, :, 2] == 255)
    mask = Image.fromarray(np.where(bg, 255, 0).astype("uint8"))
    mask = mask.filter(ImageFilter.MaxFilter(3))       # eat the 1px white fringe
    mask = mask.filter(ImageFilter.GaussianBlur(0.6))  # feather the cut

    alpha = Image.fromarray(255 - np.array(mask))
    out = rgb.convert("RGBA")
    out.putalpha(alpha)
    return out.crop(alpha.getbbox())


def emit(img, stem, width, png=True):
    """Write a WebP at the given width, plus an optional truecolour PNG."""
    height = round(img.height * width / img.width)
    resized = img.resize((width, height), Image.LANCZOS)
    resized.save(BRAND_OUT / f"{stem}.webp", quality=90, method=6)
    note = ""
    if png:
        resized.save(BRAND_OUT / f"{stem}.png", optimize=True)
        note = f"  + png {(BRAND_OUT / f'{stem}.png').stat().st_size // 1024}KB"
    size = (BRAND_OUT / f"{stem}.webp").stat().st_size // 1024
    print(f"  {stem:<20} {width}x{height}  webp {size}KB{note}")


def trim(img):
    bb = img.getbbox()
    return img.crop(bb) if bb else img


def top_band(img, frac):
    """The top `frac` of the artwork, re-trimmed to its own content."""
    return trim(img.crop((0, 0, img.width, round(img.height * frac))))


def square_head(img):
    """A square crop centred on the head band, for the small avatar."""
    band = top_band(img, 0.34)
    w, h = band.size
    if w > h:                      # centre a square horizontally on the content
        cx = w // 2
        half = h // 2
        band = band.crop((max(0, cx - half), 0, min(w, cx + half), h))
    return band


def build_og(logo):
    """1200x630 social card: the badge on the brand navy, over a sunset glow."""
    w, h = 1200, 630
    card = vertical_gradient((w, h), NAVY, DEEP).convert("RGBA")
    glow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    ImageDraw.Draw(glow).ellipse([360, -170, 840, 470], fill=(255, 150, 40, 95))
    card = Image.alpha_composite(card, glow.filter(ImageFilter.GaussianBlur(120)))

    art = logo.copy()
    art.thumbnail((560, 430), Image.LANCZOS)
    card.alpha_composite(art, ((w - art.width) // 2, 48))

    draw = ImageDraw.Draw(card)
    sub = "ROOFING · HVAC · CONSTRUCTION · COMMERCIAL"
    fsub = ImageFont.truetype(FONT_BOLD, 30)
    draw.text(((w - draw.textlength(sub, font=fsub)) / 2, 506), sub,
              font=fsub, fill=(184, 212, 236))
    fph = ImageFont.truetype(FONT_BLACK, 34)
    draw.text(((w - draw.textlength(PHONE, font=fph)) / 2, 552), PHONE,
              font=fph, fill="white")

    card.convert("RGB").save(OUT / "og.jpg", quality=88, optimize=True)
    print("  og.jpg               1200x630")


def main():
    BRAND_OUT.mkdir(parents=True, exist_ok=True)

    print("logo...")
    logo = knockout(SRC / "logo-contracting.png")
    emit(logo, "logo-contracting", 1024, png=True)
    build_og(logo)

    print("mascot...")
    m = knockout(SRC / "mascot-contracting.png")
    # full body — the service map and any full pose
    emit(m, "mascot", 900)
    emit(m, "mascot-sm", 360, png=False)
    # a leaning/working pose reuses the full figure
    emit(m, "mascot-service", 900)
    emit(m, "mascot-service-sm", 450, png=False)
    # bust — head, shoulders and the thumbs-up, for the cards he leans into
    bust = top_band(m, 0.56)
    emit(bust, "mascot-bust", 800)
    emit(bust, "mascot-bust-sm", 400, png=False)
    # head avatar — the small round mark on the phone CTA and support launcher
    emit(square_head(m), "avatar-husky", 256)

    print("\ndone.")


if __name__ == "__main__":
    main()
