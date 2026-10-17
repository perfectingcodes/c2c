import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import {
  business,
  countyList,
  estimate,
  generalFaqs,
  googleReviews,
  locations,
  process,
  services,
  testimonials,
  whyUs,
  type Service,
} from "@/content/site";
import { Icon } from "@/components/icon";
import { Wave } from "@/components/wave";
import { Reveal } from "@/components/reveal";
import { PaymentTeaser } from "@/components/payment-teaser";
import { GoogleBadge, GoogleSeal } from "@/components/google-reviews";
import {
  ArrowLink,
  Pill,
  SectionEyebrow,
  TrustStrip,
} from "@/components/brand";
import { ServiceMap } from "@/components/service-map";
import { CtaBand } from "@/components/cta-band";
import { OfferPopup } from "@/components/offer-popup";
import { FaqList } from "@/components/faq-list";
import { ButtonLink } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Seo, breadcrumbNode, faqNode } from "@/lib/seo";
import { cn } from "@/lib/utils";

/** Matching flat colours, for marks that cannot carry a gradient. */
const ACCENT_TEXT: Record<Service["accent"], string> = {
  orange: "text-ember",
  cyan: "text-cyan",
  slate: "text-slateish",
  blue: "text-blue",
  gold: "text-gold",
};

const accents: Record<Service["accent"], string> = {
  orange: "bg-gradient-to-br from-orange-light to-ember",
  cyan: "bg-gradient-to-br from-cyan to-blue",
  slate: "bg-gradient-to-br from-slateish to-navy",
  blue: "bg-gradient-to-br from-blue-bright to-blue",
  gold: "bg-gradient-to-br from-gold to-orange",
};

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Seo
        title={`Roofing, Contracting & HVAC in Southwest Florida | ${business.name}`}
        description={`One licensed company for roofing, general contracting and HVAC across ${business.city}, Naples, Cape Coral and all of Southwest Florida. Free estimates, flat-rate pricing, 24/7 emergency. Call ${business.phone}.`}
        path="/"
        nodes={[
          faqNode("/", generalFaqs),
          breadcrumbNode("/", [{ name: "Home", path: "/" }]),
        ]}
      />
      <Navbar />

      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <DivisionsSection />
        <EstimateSection />
        <FinancingSection />
        <WhyUsSection />
        <TestimonialsSection />
        <ServiceMap />
        <FaqSection />
        <HowItWorks />
        <CtaBand mascot />

        {/* Homepage only. Waits for dwell, scroll depth or exit intent —
            never fires on load. See components/offer-popup.tsx. */}
        <OfferPopup />
      </main>

      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------------- hero */

/**
 * Hero proof points. Every line is a promise the rest of the site already
 * makes — a free estimate, three licensed trades — so the strip reads as the
 * start of the job, not as a list of statistics.
 */
const HERO_PROOF = [
  { v: "Free", k: "Estimates" },
  { v: `${services.length}`, k: "Divisions" },
] as const;

function Hero() {
  return (
    <section className="grain grid-lines relative isolate overflow-hidden text-white">
      {/* Sunset-into-night ground, taken off the new badge: a navy sky falling
          to teal water, with the sun's warmth as a glow behind the logo rather
          than a wash over the band. Deliberately unlike the Air site's bright
          teal hero. */}
      <div
        className="absolute inset-0 -z-20"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(176deg,#061634 0%,#0a2352 38%,#0c5676 74%,#0b7ba4 100%)",
        }}
      />
      {/* The sun on the horizon, behind the badge. */}
      <div
        className="pointer-events-none absolute left-[72%] top-[42%] -z-10 h-72 w-[40rem] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(55% 55% at 50% 50%, rgb(255 176 32 / 0.5), rgb(255 106 19 / 0.22) 45%, transparent 72%)",
        }}
      />
      {/* Deeper scrim under the copy so white type holds AA on the brighter
          lower band. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(100deg, rgb(5 16 40 / 0.8) 0%, rgb(7 26 61 / 0.5) 42%, transparent 68%)",
        }}
      />

      <div className="shell relative grid grid-cols-1 items-center gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.98fr)] lg:items-center lg:gap-8 lg:pb-10 lg:pt-20">
        <span
          className="pointer-events-none absolute inset-y-24 left-[calc(50%-0.75rem)] hidden w-px bg-gradient-to-b from-transparent via-white/18 to-transparent lg:block"
          aria-hidden="true"
        />
        <div className="max-w-xl">
          <p className="font-display text-[0.68rem] font-extrabold uppercase tracking-[0.24em] text-white">
            Southwest Florida Contractor
            <span className="mx-3 hidden h-3 w-px align-middle sm:inline-block sm:bg-orange/70" aria-hidden="true" />
            <span className="mt-1 block text-orange-light sm:mt-0 sm:inline">
              Roofing · HVAC · Construction · Commercial
            </span>
          </p>
          <div className="thermal-rule mt-5 w-20" aria-hidden="true" />

          <h1 className="poster mt-5 text-[clamp(2.6rem,5vw,4.1rem)] leading-[0.9] text-white drop-shadow-[0_4px_18px_rgb(3_18_48/0.45)]">
            One company.
            <span className="mt-1 block">
              <span className="text-pop">Every trade.</span>
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-white/90">
            Roofing, construction, HVAC and commercial service across{" "}
            {countyList} counties — one licensed company, with a{" "}
            <span className="font-semibold text-white">
              flat price in writing before we start
            </span>{" "}
            and a real person answering, day or night.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <ButtonLink href="/contact" variant="primary" size="lg">
              Get a Free Estimate
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>

            <a href={business.phoneHref} className="group flex items-center gap-2.5">
              <span className="relative">
                <img
                  src="/brand/avatar-husky.webp"
                  alt=""
                  width={256}
                  height={289}
                  className="size-11 object-contain transition-transform duration-300 group-hover:-translate-y-0.5"
                />
                <span
                  className="absolute -right-0.5 bottom-0.5 size-2.5 rounded-full bg-cyan ring-2 ring-white/80"
                  aria-hidden="true"
                />
              </span>
              <span className="leading-tight">
                <span className="block font-display text-[0.58rem] font-extrabold uppercase tracking-[0.18em] text-orange-light">
                  A person answers · 24/7
                </span>
                <span className="block font-display text-lg font-extrabold text-white transition-colors group-hover:text-orange-light">
                  {business.phone}
                </span>
              </span>
            </a>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-4 border-t border-white/25 pt-5 sm:gap-x-6">
            <img
              src="/brand/badge-locally-owned.webp"
              alt="Locally owned and operated"
              width={640}
              height={632}
              className="size-14 shrink-0 drop-shadow-[0_8px_18px_rgb(3_18_48/0.5)] sm:size-[4.25rem]"
            />
            <dl className="grid min-w-0 flex-1 grid-cols-[max-content_1fr] items-baseline gap-x-3 gap-y-2 sm:flex sm:flex-none sm:flex-wrap sm:items-center sm:gap-x-5">
              {HERO_PROOF.map((p, i) => (
                <div key={p.k} className="contents sm:flex sm:items-center sm:gap-5">
                  {i > 0 && (
                    <span className="hidden h-8 w-px bg-white/30 sm:block" aria-hidden="true" />
                  )}
                  <div className="contents sm:block">
                    <dt className="poster text-[1.15rem] leading-none text-white sm:text-[1.35rem]">
                      {p.v}
                    </dt>
                    <dd className="font-display text-[0.58rem] font-extrabold uppercase tracking-[0.16em] text-orange-light sm:mt-1">
                      {p.k}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            <span className="hidden h-9 w-px bg-white/30 xl:block" aria-hidden="true" />
            <GoogleSeal className="basis-full sm:basis-auto" />
          </div>
        </div>

        <div className="relative">
          {/* The badge is the hero's art now, not the husky map — a sunset
              medallion ringed in its own glow. */}
          <div className="rays-burst relative mx-auto max-w-md">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[24rem] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange/40 blur-[70px]"
              aria-hidden="true"
            />
            <img
              src="/brand/logo-contracting.webp"
              alt={`${business.name} — roofing, HVAC, construction and commercial`}
              width={1024}
              height={906}
              fetchPriority="high"
              className="relative mx-auto w-full max-w-[20rem] drop-shadow-[0_30px_64px_rgb(3_14_34/0.72)] sm:max-w-sm"
            />
          </div>

          {/* One company, three licences — a compact instrument under the mark. */}
          <div className="glass edge-lit relative z-10 mx-auto mt-4 max-w-sm p-4 sm:p-5 lg:-mt-2">
            <p className="flex items-center gap-2 font-display text-[0.6rem] font-extrabold uppercase tracking-[0.2em] text-white/60">
              <ShieldCheck className="size-3.5 text-cyan" aria-hidden="true" />
              One company · three licences
            </p>
            <ul className="mt-3.5 grid gap-2.5 border-t border-white/12 pt-3.5 sm:grid-cols-3">
              {business.licenses.map((l) => (
                <li key={l.number} className="min-w-0">
                  <span className="block font-display text-[0.7rem] font-extrabold text-white">
                    {l.division}
                  </span>
                  <span className="mt-0.5 block font-mono text-[0.68rem] text-cyan">
                    {l.number}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* The four divisions, as the footing of the hero — where the Air site
          ran a city marquee. */}
      <div className="relative border-t border-white/15 bg-white/[0.035]">
        <ul className="shell grid grid-cols-2 gap-x-6 gap-y-4 py-5 sm:grid-cols-4 sm:gap-x-4">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="group flex items-center gap-3"
              >
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-lg text-white ring-1 ring-inset ring-white/25",
                    accents[s.accent],
                  )}
                >
                  <Icon name={s.icon} className="size-4" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[0.82rem] font-extrabold text-white transition-colors group-hover:text-cyan">
                    {s.short}
                  </span>
                  <span className="mt-0.5 block truncate text-[0.66rem] text-white/55">
                    {s.menuLine}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- divisions */

function DivisionsSection() {
  return (
    <section
      className="grid-lines-light relative overflow-hidden bg-white py-16 md:py-24"
      id="services"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-40 -top-40 size-[34rem] rounded-full bg-cyan/12 blur-[130px]" />
        <div className="absolute -bottom-48 -left-40 size-[32rem] rounded-full bg-orange/10 blur-[130px]" />
      </div>

      <div className="shell relative">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <SectionEyebrow index={1}>What we do</SectionEyebrow>
            <h2 className="poster mt-4 text-[clamp(1.75rem,3.4vw,2.5rem)]">
              Four divisions,
              <span className="block text-ember">one licensed company.</span>
            </h2>
            <div className="thermal-rule mt-5 w-24" aria-hidden="true" />
          </div>
          <p className="leading-relaxed text-navy/65 md:text-lg">
            Roofing, construction, HVAC and commercial service under one roof,
            with a{" "}
            <span className="font-semibold text-navy">
              flat price in writing
            </span>{" "}
            before any work begins. When a job crosses more than one trade,
            there is still only one company accountable for it.
          </p>
        </div>

        {/* Bento: one tall promise panel, then the four divisions. */}
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <Reveal className="lg:row-span-2">
            <div className="band-navy grain edge-lit relative flex h-full flex-col overflow-hidden rounded-card p-8">
              <Pill icon={<Zap className="size-3.5 text-gold" />} className="relative">
                The promise
              </Pill>
              <h3 className="mt-6 text-3xl leading-[1.05] text-white">
                Flat price
                <span className="block text-chill">before we start.</span>
              </h3>
              <p className="mt-4 leading-relaxed text-white/70">
                A licensed contractor inspects the work and puts the number in
                writing before anything begins. It does not move because the job
                ran long.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  "Free, no-obligation estimates",
                  "No change orders without sign-off",
                  "Permits pulled on every project",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-cyan" aria-hidden="true" />
                    <span className="text-sm text-white/80">{t}</span>
                  </li>
                ))}
              </ul>
              <div className="relative z-10 mt-8 overflow-hidden rounded-xl ring-1 ring-white/15">
                <img
                  src="/brand/photo-home.webp"
                  srcSet="/brand/photo-home-700.webp 700w, /brand/photo-home.webp 1100w"
                  sizes="(min-width: 1280px) 340px, 90vw"
                  alt="A Southwest Florida home served by Coast to Coast"
                  width={1100}
                  height={1375}
                  loading="lazy"
                  className="h-28 w-full object-cover object-[50%_62%] xl:h-32"
                />
              </div>

              <div className="relative z-10 mt-6">
                <ButtonLink href={business.phoneHref} variant="onDark">
                  <Phone className="size-4" aria-hidden="true" />
                  {business.phone}
                </ButtonLink>
              </div>

              <img
                src="/brand/mascot-bust.webp"
                srcSet="/brand/mascot-bust-sm.webp 400w, /brand/mascot-bust.webp 800w"
                sizes="200px"
                alt=""
                width={800}
                height={849}
                loading="lazy"
                className="pointer-events-none absolute -bottom-8 -right-2 hidden w-40 opacity-95 drop-shadow-[0_18px_36px_rgb(3_18_48/0.6)] sm:block lg:hidden xl:block xl:w-[9.5rem]"
              />
            </div>
          </Reveal>

          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.04} className="h-full">
              <Link
                href={`/services/${s.slug}`}
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-card border border-navy/10 bg-white p-6 pt-7",
                  "transition-[background-color,border-color,transform,box-shadow] duration-300",
                  "hover:-translate-y-1 hover:border-navy hover:bg-navy hover:shadow-[var(--shadow-lift)]",
                )}
              >
                <span
                  className={cn(
                    "absolute inset-x-0 top-0 h-[3px] origin-left scale-x-[0.35] transition-transform duration-500 group-hover:scale-x-100",
                    accents[s.accent],
                  )}
                  aria-hidden="true"
                />

                <span
                  className="numeral-ghost pointer-events-none absolute right-4 top-3 select-none text-[4.25rem] transition-colors duration-300 group-hover:text-white/15 sm:text-[5rem]"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="relative w-fit">
                  <span
                    className={cn(
                      "absolute inset-1 -z-10 rounded-xl opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-70",
                      accents[s.accent],
                    )}
                    aria-hidden="true"
                  />
                  <span
                    className={cn(
                      "grid size-12 place-items-center rounded-xl text-white shadow-[0_10px_20px_-10px_rgb(10_35_82/0.8)] ring-1 ring-inset ring-white/25 transition-transform duration-300 group-hover:scale-105",
                      accents[s.accent],
                    )}
                  >
                    <Icon name={s.icon} className="size-6" />
                  </span>
                </span>

                <h3 className="poster mt-6 text-xl leading-[1.05] text-navy transition-colors duration-300 group-hover:text-white">
                  {s.name}
                </h3>

                <p className="mt-3.5 flex-1 text-sm leading-relaxed text-navy/60 transition-colors duration-300 group-hover:text-white/70">
                  {s.blurb}
                </p>

                <p className="mt-4 flex items-start gap-2.5 border-t border-navy/8 pt-4 transition-colors duration-300 group-hover:border-white/15">
                  <Check
                    className={cn(
                      "mt-0.5 size-4 shrink-0 transition-colors duration-300 group-hover:text-cyan",
                      ACCENT_TEXT[s.accent],
                    )}
                    aria-hidden="true"
                  />
                  <span className="text-[0.8rem] leading-snug text-navy/55 transition-colors duration-300 group-hover:text-white/60">
                    {s.bullets[0]}
                  </span>
                </p>

                <span className="link-arrow mt-5 text-blue transition-colors duration-300 group-hover:text-cyan">
                  Explore {s.short}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* The cross-trade pitch, and a route to all four divisions. */}
        <div className="mt-8 flex flex-col items-start gap-4 border-t border-navy/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2.5 text-sm leading-relaxed text-navy/65 sm:items-center">
            <Sparkles className="mt-0.5 size-4 shrink-0 text-ember sm:mt-0" aria-hidden="true" />
            Storm damage across the roof, the interior and the AC? Handle it
            with one accountable company, not three.
          </p>
          <Link href="/services" className="link-arrow shrink-0">
            See all four divisions
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- estimate */

/**
 * The company-wide offer, drawn as the thing it is: a ticket.
 *
 * The brand is built out of badges and plates, so the offer gets the same
 * treatment — two halves divided by a perforation, notched where the card
 * would tear. Roofing and contracting are quoted rather than priced off a
 * shelf, so the honest promotion is a free estimate, not a coupon.
 */
function EstimateSection() {
  return (
    <section
      id="estimate"
      className="relative isolate z-10 scroll-mt-28 bg-white py-16 md:py-20"
    >
      <div className="shell">
        <div className="band-navy grain relative overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-30px_rgb(5_15_38/0.6)] ring-1 ring-white/12">
          <div
            className="pointer-events-none absolute -left-32 -top-40 size-[34rem] rounded-full bg-gold/20 blur-[120px]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-40 -right-32 size-[30rem] rounded-full bg-cyan/12 blur-[120px]"
            aria-hidden="true"
          />

          <div className="relative grid lg:grid-cols-[minmax(0,0.94fr)_auto_minmax(0,1.06fr)]">
            {/* ---------------------------------------------- the offer */}
            <div className="px-6 pb-10 pt-10 md:px-10 md:pb-12 md:pt-12 lg:py-14">
              <span className="pill pill-dark border-gold/40 bg-gold/12 text-gold">
                <Sparkles className="size-3.5" aria-hidden="true" />
                {estimate.eyebrow}
              </span>

              <div className="mt-6 flex items-end gap-3">
                <span className="poster text-bullion text-[clamp(3.5rem,9vw,5.5rem)] leading-[0.82] drop-shadow-[0_10px_30px_rgb(255_140_20/0.28)]">
                  Free
                </span>
                <span className="pb-3 font-display text-sm font-bold text-white/55">
                  no obligation
                </span>
              </div>

              <h2 className="poster mt-3 text-[clamp(1.75rem,3.4vw,2.5rem)] text-white">
                {estimate.name}
              </h2>
              <div className="thermal-rule mt-5 w-24" aria-hidden="true" />
              <p className="mt-5 max-w-md leading-relaxed text-white/70">
                {estimate.summary}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <ButtonLink href="/contact" size="lg">
                  Request an estimate
                  <ArrowRight className="size-4" aria-hidden="true" />
                </ButtonLink>
                <a
                  href={business.phoneHref}
                  className="flex min-h-11 items-center font-display text-sm font-extrabold text-white/75 underline decoration-white/25 underline-offset-4 transition-colors hover:text-cyan hover:decoration-cyan"
                >
                  or call {business.phone}
                </a>
              </div>

              <p className="mt-8 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/48">
                Roofing · contracting · HVAC · {locations.length} cities
              </p>
            </div>

            <Perforation />

            {/* ------------------------------------------- what you get */}
            <div className="px-6 pb-10 pt-9 md:px-10 md:pb-12 md:pt-10 lg:py-14 lg:pl-12">
              <p className="font-display text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-cyan">
                What the estimate includes
              </p>
              <ol className="mt-6 grid gap-x-8">
                {estimate.points.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-t border-white/10 py-3.5 first:border-t-0"
                  >
                    <span className="mt-px font-mono text-[0.7rem] font-semibold tabular-nums text-cyan/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-relaxed text-white/80">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-6 border-t border-white/10 pt-5 text-sm leading-relaxed text-white/60">
                The HVAC division also offers the published{" "}
                <Link href="/services/hvac" className="font-semibold text-cyan underline decoration-cyan/40 underline-offset-2 hover:decoration-cyan">
                  $89 Clean &amp; Tune
                </Link>{" "}
                — a 10-point service, twice a year.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * The tear line — a dashed rule with a notch bitten out of the card at each
 * end, vertical between the halves on a wide screen and horizontal when they
 * stack. The notches are discs in the page's own white, clipped in half by the
 * card's `overflow-hidden`.
 */
function Perforation() {
  const notch = "absolute size-8 rounded-full bg-white";
  return (
    <div className="relative lg:w-px" aria-hidden="true">
      <span className="absolute inset-x-6 top-0 h-px -translate-y-1/2 bg-[repeating-linear-gradient(90deg,rgb(255_255_255/0.3)_0_6px,transparent_6px_14px)] md:inset-x-10 lg:hidden" />
      <span className={cn(notch, "left-0 top-0 -translate-x-1/2 -translate-y-1/2 lg:hidden")} />
      <span className={cn(notch, "left-full top-0 -translate-x-1/2 -translate-y-1/2 lg:hidden")} />

      <span className="absolute inset-y-12 left-1/2 hidden w-px -translate-x-1/2 bg-[repeating-linear-gradient(180deg,rgb(255_255_255/0.3)_0_6px,transparent_6px_14px)] lg:block" />
      <span className={cn(notch, "left-1/2 top-0 hidden -translate-x-1/2 -translate-y-1/2 lg:block")} />
      <span className={cn(notch, "left-1/2 top-full hidden -translate-x-1/2 -translate-y-1/2 lg:block")} />
    </div>
  );
}

/* ----------------------------------------------------------------- why us */

function WhyUsSection() {
  return (
    <section className="band-navy grain grid-lines relative overflow-hidden">
      <Wave fill="white" swell="#2bd9ff" flip height={56} className="relative -mt-px" />

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -bottom-40 -left-32 size-[34rem] rounded-full bg-orange/12 blur-[130px]" />
        <div className="absolute -right-32 top-0 size-[30rem] rounded-full bg-cyan/12 blur-[130px]" />
      </div>

      <div className="shell relative py-14 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-8">
          <div>
            <SectionEyebrow index={3} className="text-cyan">
              Why Coast to Coast
            </SectionEyebrow>
            <h2 className="poster mt-4 text-[clamp(2rem,4.6vw,3.25rem)] text-white">
              Built on
              <span className="block text-chill">second opinions.</span>
            </h2>
          </div>

          <div className="relative shrink-0">
            <span
              className="absolute inset-4 -z-10 rounded-full bg-cyan/25 blur-2xl"
              aria-hidden="true"
            />
            <img
              src="/brand/badge-locally-owned.webp"
              alt="Locally owned and operated"
              width={640}
              height={632}
              loading="lazy"
              className="w-28 drop-shadow-[0_16px_32px_rgb(3_12_32/0.9)] sm:w-36 lg:w-[9.5rem]"
            />
          </div>
        </div>

        <div className="thermal-rule mt-10 w-full opacity-70" aria-hidden="true" />

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-14">
          <div>
            <p className="font-display text-[0.62rem] font-extrabold uppercase tracking-[0.24em] text-ember">
              How the work starts
            </p>
            <p className="mt-5 font-display text-[clamp(1.4rem,2.6vw,2rem)] font-extrabold leading-[1.22] text-white">
              Most of our work starts as somebody else&rsquo;s quote. We inspect
              it, {" "}
              <span className="text-chill">put a price in writing</span>, and let
              you decide what happens next.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <ArrowLink href="/about" className="text-cyan">
                About the company
              </ArrowLink>
              <a
                href={business.phoneHref}
                className="flex min-h-11 items-center gap-2 font-display text-sm font-extrabold text-white/70 transition-colors hover:text-white"
              >
                <Phone className="size-4 text-ember" aria-hidden="true" />
                {business.phone}
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
            <span
              className="pointer-events-none absolute -left-3 -top-3 size-6 border-l border-t border-ember/50"
              aria-hidden="true"
            />
            <span
              className="pointer-events-none absolute -bottom-3 -right-3 size-6 border-b border-r border-ember/50"
              aria-hidden="true"
            />

            <img
              src="/brand/photo-home.webp"
              srcSet="/brand/photo-home-700.webp 700w, /brand/photo-home.webp 1100w"
              sizes="(min-width: 1024px) 420px, 82vw"
              alt="A Southwest Florida home with a shaded porch and palms"
              width={1100}
              height={1375}
              loading="lazy"
              className="aspect-[5/4] w-full rounded-card object-cover object-[50%_64%] shadow-[0_30px_60px_-20px_rgb(3_12_32/0.9)] ring-1 ring-white/15"
            />

            <img
              src="/brand/photo-street-1100.webp"
              srcSet="/brand/photo-street-760.webp 760w, /brand/photo-street-1100.webp 1100w"
              sizes="(min-width: 1024px) 240px, 46vw"
              alt="A residential street in the Southwest Florida service area"
              width={1100}
              height={728}
              loading="lazy"
              className="absolute -bottom-7 -right-5 aspect-[4/3] w-[46%] rounded-card object-cover object-[50%_58%] shadow-[0_26px_50px_-18px_rgb(3_12_32/0.95)] ring-1 ring-white/20 sm:-right-8"
            />

            {/* The licences, stated on the picture rather than under it. */}
            <div className="absolute bottom-4 left-4 rounded-xl bg-navy-deep/85 px-3.5 py-2 ring-1 ring-white/20 backdrop-blur-sm">
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-white/50">
                FL Licensed
              </p>
              <p className="font-mono text-[0.72rem] font-semibold tracking-[0.08em] text-white">
                {business.licenses.length} trades · insured
              </p>
            </div>
          </div>
        </div>

        <ul className="mt-14 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((w, i) => (
            <li key={w.title} className="group relative pt-5">
              <span
                className="absolute inset-x-0 top-0 h-px bg-white/15"
                aria-hidden="true"
              />
              <span
                className="absolute left-0 top-0 h-px w-10 bg-ember transition-all duration-500 group-hover:w-20"
                aria-hidden="true"
              />

              <div className="flex items-baseline justify-between gap-3">
                <span className="font-mono text-[0.7rem] tabular-nums text-ember">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="whitespace-nowrap font-mono text-[0.6rem] uppercase tracking-[0.12em] text-white/52">
                  {w.tag}
                </span>
              </div>

              <h3 className="mt-3 font-display text-base font-extrabold leading-tight text-white">
                {w.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/72">
                {w.body}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-12 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/58">
          {business.city}, {business.state} · Licensed &amp; insured ·
          Certificates on request
        </p>
      </div>

      <Wave fill="white" height={56} className="relative -mb-px" />
    </section>
  );
}

/* ---------------------------------------------------------------- reviews */

function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className="grid-lines-light relative overflow-hidden bg-foam py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-40 top-0 size-[32rem] rounded-full bg-orange/10 blur-[130px]" />
        <div className="absolute -bottom-40 -right-32 size-[30rem] rounded-full bg-cyan/12 blur-[130px]" />
      </div>

      <div className="shell relative">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <div>
            <SectionEyebrow index={4}>Reviews</SectionEyebrow>
            <h2 className="poster mt-4 text-[clamp(2rem,4.4vw,3.1rem)]">
              Real people.
              <span className="block text-ember">Real results.</span>
            </h2>
          </div>
          <GoogleBadge />
        </div>

        <div className="thermal-rule mt-8 w-full opacity-60" aria-hidden="true" />

        <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.9fr)] lg:items-stretch">
          <figure className="band-ocean grain relative flex flex-col overflow-hidden rounded-[1.75rem] p-8 shadow-[0_34px_70px_-30px_rgb(5_15_38/0.65)] ring-1 ring-white/15 md:p-11">
            <div
              className="pointer-events-none absolute -right-24 -top-28 size-[26rem] rounded-full bg-cyan/14 blur-[110px]"
              aria-hidden="true"
            />

            <span
              className="poster pointer-events-none select-none text-[5.5rem] leading-[0.5] text-orange-light md:text-[7rem]"
              aria-hidden="true"
            >
              &ldquo;
            </span>

            {t.rating && (
              <div
                className="relative mt-2 flex gap-1"
                aria-label={`Rated ${t.rating} out of 5`}
              >
                {Array.from({ length: 5 }, (_, n) => (
                  <Star
                    key={n}
                    className={cn(
                      "size-5",
                      n < t.rating! ? "fill-gold text-gold" : "text-white/25",
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
            )}

            <blockquote
              key={t.name}
              className="relative mt-4 flex-1 font-display text-[clamp(1.25rem,2.3vw,1.75rem)] font-extrabold leading-[1.32] text-white"
            >
              {t.quote}
            </blockquote>

            <figcaption className="relative mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-white/15 pt-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/12 font-display text-sm font-extrabold text-white ring-1 ring-white/25">
                {t.name.charAt(0)}
              </span>
              <span className="leading-tight">
                <span className="block font-display text-base font-extrabold text-white">
                  {t.name}
                </span>
                <span className="block font-mono text-[0.64rem] uppercase tracking-[0.12em] text-white/58">
                  {t.city}
                </span>
              </span>
              <span className="ml-auto font-mono text-[0.64rem] uppercase tracking-[0.14em] text-white/45">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(testimonials.length).padStart(2, "0")}
              </span>
            </figcaption>
          </figure>

          <div className="flex flex-col gap-5">
            <ul className="grid gap-2.5">
              {testimonials.map((r, i) => (
                <li key={r.name}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-pressed={i === active}
                    className={cn(
                      "group flex w-full items-center gap-3.5 rounded-card px-4 py-3.5 text-left transition-[background-color,box-shadow,transform] duration-300",
                      i === active
                        ? "bg-white shadow-[var(--shadow-soft)] ring-1 ring-navy/10"
                        : "bg-white/55 ring-1 ring-navy/8 hover:bg-white hover:shadow-[var(--shadow-soft)]",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-full font-display text-xs font-extrabold transition-colors duration-300",
                        i === active
                          ? "bg-gradient-to-br from-blue-bright to-blue text-white"
                          : "bg-navy/8 text-navy/55 group-hover:bg-navy/12",
                      )}
                    >
                      {r.name.charAt(0)}
                    </span>
                    <span className="min-w-0 flex-1 leading-tight">
                      <span className="block font-display text-sm font-extrabold text-navy">
                        {r.name}
                      </span>
                      <span className="block truncate font-mono text-[0.6rem] uppercase tracking-[0.1em] text-navy/45">
                        {r.city}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "h-[3px] w-6 shrink-0 rounded-full transition-all duration-300",
                        i === active
                          ? "bg-ember"
                          : "bg-navy/12 group-hover:w-9 group-hover:bg-ember/50",
                      )}
                      aria-hidden="true"
                    />
                  </button>
                </li>
              ))}
            </ul>

            <div className="card relative mt-14 flex flex-1 flex-col justify-center px-6 pb-6 pt-[5.25rem] text-center">
              <img
                src="/brand/mascot-bust.webp"
                srcSet="/brand/mascot-bust-sm.webp 400w, /brand/mascot-bust.webp 800w"
                sizes="140px"
                alt=""
                width={800}
                height={849}
                loading="lazy"
                className="pointer-events-none absolute -top-[4.25rem] left-1/2 w-[8.25rem] -translate-x-1/2 drop-shadow-[0_16px_30px_rgb(10_35_82/0.35)]"
              />
              <p className="font-display text-base font-extrabold text-navy">
                Worked with us?
              </p>
              <p className="mx-auto mt-1.5 max-w-[15rem] text-sm leading-relaxed text-navy/62">
                A minute of your time helps your neighbours choose.
              </p>
              <div className="mt-5 grid gap-2.5">
                <ButtonLink href={googleReviews.reviewUrl} size="sm">
                  Leave a review
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href={googleReviews.profileUrl} variant="ghost" size="sm">
                  Read reviews
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- financing */

function FinancingSection() {
  return (
    <section className="bg-foam py-14 md:py-20">
      <div className="shell">
        <PaymentTeaser />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- faq */

function FaqSection() {
  return (
    <section className="grid-lines-light relative overflow-hidden bg-white py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-40 top-10 size-[32rem] rounded-full bg-cyan/12 blur-[130px]" />
        <div className="absolute -bottom-40 -left-32 size-[28rem] rounded-full bg-orange/10 blur-[130px]" />
      </div>

      <div className="shell relative grid gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionEyebrow index={6}>Common questions</SectionEyebrow>
          <h2 className="poster mt-4 text-[clamp(1.9rem,4.2vw,2.9rem)]">
            Answers
            <span className="block text-ember">before you call.</span>
          </h2>
          <div className="thermal-rule mt-6 w-24" aria-hidden="true" />

          <div className="card relative mt-14 p-6 pt-12">
            <img
              src="/brand/avatar-husky.webp"
              alt=""
              width={256}
              height={289}
              loading="lazy"
              className="pointer-events-none absolute -top-9 left-6 size-[4.5rem] object-contain drop-shadow-[0_12px_24px_rgb(10_35_82/0.3)]"
            />
            <p className="font-display text-base font-extrabold text-navy">
              Still have a question?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-navy/65">
              Ask Coast in the corner searches these answers, or talk to
              somebody who actually works here.
            </p>
            <a
              href={business.phoneHref}
              className="mt-4 flex min-h-11 items-center gap-2 font-display text-base font-extrabold text-blue transition-colors hover:text-navy"
            >
              <Phone className="size-4 text-ember" aria-hidden="true" />
              {business.phone}
            </a>
            <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-navy/45">
              {business.emergency}
            </p>
          </div>
        </div>

        <FaqList faqs={generalFaqs} className="mt-0" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ how it works */

const STEP_ACCENT = ["#ff6a13", "#ffb020", "#2bd9ff", "#5cb4ff"] as const;

const RAIL_FADE =
  "linear-gradient(90deg, transparent 0%, black 9%, black 91%, transparent 100%)";

function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <section className="band-navy grain grid-lines relative overflow-hidden py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-32 top-1/3 size-[34rem] rounded-full bg-orange/14 blur-[130px]" />
        <div className="absolute -right-32 top-1/4 size-[34rem] rounded-full bg-cyan/14 blur-[130px]" />
      </div>

      <div className="shell relative">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-5">
          <div className="max-w-xl">
            <SectionEyebrow index={7} className="text-cyan">
              What happens next
            </SectionEyebrow>
            <h2 className="poster mt-4 text-[clamp(1.9rem,4vw,2.9rem)] text-white">
              From your call to
              <span className="block text-chill">done, in four.</span>
            </h2>
          </div>

          <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/55">
            Step {String(active + 1).padStart(2, "0")} / 04 ·{" "}
            <span className="text-white">{process[active].title}</span>
          </p>
        </div>

        <ol
          className="relative mt-12 grid lg:mt-20 lg:grid-cols-4 lg:gap-x-6"
          onMouseLeave={() => setActive(0)}
        >
          <span
            className="pointer-events-none absolute inset-x-[11.5%] top-20 hidden h-[3px] rounded-full bg-white/15 lg:block"
            style={{ maskImage: RAIL_FADE, WebkitMaskImage: RAIL_FADE }}
            aria-hidden="true"
          />
          <span
            className="thermal-rule pointer-events-none absolute left-[11.5%] top-20 hidden origin-left transition-[width] duration-700 ease-out lg:block"
            style={{ width: `calc(77% * ${active / (process.length - 1)})` }}
            aria-hidden="true"
          />

          {process.map((step, i) => {
            const accent = STEP_ACCENT[i];
            const next = STEP_ACCENT[i + 1];
            const on = i <= active;
            return (
              <li
                key={step.title}
                className="group relative flex gap-5 pb-10 last:pb-0 lg:block lg:pb-0 lg:text-center"
              >
                {next && (
                  <span
                    className="pointer-events-none absolute bottom-0 left-12 top-12 w-[3px] -translate-x-1/2 rounded-full lg:hidden"
                    style={{ background: `linear-gradient(180deg, ${accent}, ${next})` }}
                    aria-hidden="true"
                  />
                )}

                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-current={i === active ? "step" : undefined}
                  className="relative z-10 w-24 shrink-0 cursor-pointer rounded-full outline-none ring-offset-4 ring-offset-transparent focus-visible:ring-2 focus-visible:ring-cyan lg:mx-auto lg:block lg:w-40"
                >
                  <span className="sr-only">
                    Step {i + 1}: {step.title}
                  </span>
                  <span
                    className={cn(
                      "absolute inset-[12%] -z-10 rounded-full opacity-80 blur-2xl transition-opacity duration-500",
                      !on && "lg:opacity-[0.28]",
                    )}
                    style={{ background: accent }}
                    aria-hidden="true"
                  />
                  <span
                    className={cn(
                      "absolute rounded-full border opacity-70 transition-all duration-500",
                      i === active
                        ? "inset-[2%] lg:opacity-90"
                        : "inset-[7%] lg:opacity-25",
                    )}
                    style={{ borderColor: accent }}
                    aria-hidden="true"
                  />
                  <img
                    src={`/brand/${step.image}.webp`}
                    alt=""
                    width={480}
                    height={480}
                    loading="lazy"
                    className={cn(
                      "w-full drop-shadow-[0_18px_34px_rgb(3_10_28/0.75)] transition-[transform,filter] duration-500",
                      i === active
                        ? "lg:-translate-y-2"
                        : "lg:opacity-85 lg:saturate-[0.72]",
                    )}
                  />
                </button>

                <div className="min-w-0 pt-1 lg:mt-6 lg:pt-0">
                  <p
                    className={cn(
                      "font-display text-[0.68rem] font-extrabold uppercase tracking-[0.3em] transition-opacity duration-500",
                      !on && "lg:opacity-60",
                    )}
                    style={{ color: accent }}
                  >
                    Step {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-extrabold leading-tight text-white lg:mt-3 lg:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/72 lg:mx-auto lg:mt-3 lg:max-w-[17rem]">
                    {step.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <p
          data-answer=""
          className="mt-14 max-w-3xl border-t border-white/12 pt-7 text-sm leading-relaxed text-white/58"
        >
          {business.name} is a licensed, insured contractor in {business.city},
          Florida, serving {locations.length} cities across {countyList}{" "}
          counties under three Florida licences:{" "}
          {business.licenses.map((l) => l.number).join(", ")}.
        </p>
      </div>
    </section>
  );
}
