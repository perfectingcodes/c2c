import { Link } from "wouter";
import { ArrowUpRight, Check, Phone, ShieldCheck } from "lucide-react";
import {
  business,
  cleanAndTune,
  countyList,
  estimate,
  locations,
  region,
  serviceBySlug,
  services,
  type Service,
} from "@/content/site";
import { SiteLayout, type HeroTone } from "@/components/layout/site-layout";
import { Icon } from "@/components/icon";
import { AnswerBlock } from "@/components/answer";
import { QuoteForm } from "@/components/quote-form";
import { FaqList } from "@/components/faq-list";
import { Reveal } from "@/components/reveal";
import { GoogleSeal } from "@/components/google-reviews";
import { CtaBand } from "@/components/cta-band";
import { ButtonLink } from "@/components/ui/button";
import { Seo, breadcrumbNode, faqNode, serviceNode } from "@/lib/seo";
import { cn } from "@/lib/utils";
import NotFound from "./not-found";

/**
 * Division page.
 *
 * One clean layout, shared by all three divisions — roofing, general
 * contracting and HVAC. Each division fills it with its own capabilities,
 * licence and FAQs, and the HVAC division adds the published Clean & Tune
 * offer; the others close on a free estimate. The old per-service tree is
 * gone: this is a home base, so each division gets one strong page rather
 * than six thin ones.
 */

/** Colour treatment of the hero, keyed to the division accent. */
const TONE: Record<Service["accent"], HeroTone> = {
  orange: "warm",
  blue: "deep",
  cyan: "cool",
  slate: "steel",
  gold: "offer",
};

const ACCENT_CHIP: Record<Service["accent"], string> = {
  orange: "bg-gradient-to-br from-orange-light to-ember",
  cyan: "bg-gradient-to-br from-cyan to-blue",
  slate: "bg-gradient-to-br from-slateish to-navy",
  blue: "bg-gradient-to-br from-blue-bright to-blue",
  gold: "bg-gradient-to-br from-gold to-orange",
};

export default function ServicePage({ slug }: { slug: string }) {
  const service = serviceBySlug(slug);
  if (!service) return <NotFound />;

  const path = `/services/${service.slug}`;
  const answer = `${business.name} provides ${service.name.toLowerCase()} across ${region} — ${locations
    .map((l) => l.city)
    .slice(0, 4)
    .join(", ")} and the rest of ${countyList} counties. ${service.blurb} We hold Florida ${service.licence.label} licence #${service.licence.number}, put a flat price in writing before work begins, and answer 24/7 at ${business.phone}.`;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.short, path },
  ];

  const related = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <Seo
        title={`${service.seoShort ?? service.name} in ${region} | ${business.name}`}
        description={`${service.blurb} Licensed #${service.licence.number}, flat-rate pricing quoted before work begins, 24/7 emergency service. Call ${business.phone}.`}
        path={path}
        nodes={[
          serviceNode({
            name: service.name,
            description: answer,
            path,
            offers: !!service.hasOffer,
          }),
          faqNode(path, service.faqs),
          breadcrumbNode(path, crumbs),
        ]}
      />

      <SiteLayout
        eyebrow={`Licensed · ${service.licence.number}`}
        title={service.name}
        lead={service.blurb}
        crumbs={crumbs}
        tone={TONE[service.accent]}
        mark={<Icon name={service.icon} className="size-4" />}
        aside={<DivisionAside service={service} />}
        hero={
          <>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={business.phoneHref} variant="onDark">
                <Phone className="size-4" aria-hidden="true" />
                {business.phone}
              </ButtonLink>
              <ButtonLink href="#quote">
                {service.hasOffer ? "Book a Clean & Tune" : "Get a free estimate"}
              </ButtonLink>
            </div>
            <HeroTrust service={service} />
          </>
        }
      >
        {/* ------------------------------------------------- answer + intro */}
        <section className="shell max-w-4xl py-14 md:py-18">
          <AnswerBlock>{answer}</AnswerBlock>
          <p className="mt-8 leading-relaxed text-navy/80 md:text-lg">
            {service.intro}
          </p>
        </section>

        {/* -------------------------------------------------- capabilities */}
        <section className="band-navy grain grid-lines relative overflow-hidden py-16 text-white md:py-20">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -left-32 top-1/4 size-[32rem] rounded-full bg-cyan/12 blur-[130px]" />
            <div className="absolute -bottom-40 -right-32 size-[30rem] rounded-full bg-orange/10 blur-[130px]" />
          </div>
          <div className="shell relative">
            <p className="font-display text-[0.62rem] font-extrabold uppercase tracking-[0.24em] text-cyan">
              What we do
            </p>
            <h2 className="poster mt-4 text-[clamp(1.75rem,3.4vw,2.5rem)] text-white">
              {service.capHeading}
            </h2>
            <div className="thermal-rule mt-5 w-24" aria-hidden="true" />
            <p className="mt-5 max-w-2xl leading-relaxed text-white/72 md:text-lg">
              {service.capLead}
            </p>

            <ol className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
              {service.capabilities.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.03}>
                  <li className="group relative pt-5">
                    <span
                      className="absolute inset-x-0 top-0 h-px bg-white/15"
                      aria-hidden="true"
                    />
                    <span
                      className={cn(
                        "absolute left-0 top-0 h-px w-10 transition-all duration-500 group-hover:w-20",
                        ACCENT_CHIP[service.accent],
                      )}
                      aria-hidden="true"
                    />
                    <span className="font-mono text-[0.7rem] tabular-nums text-cyan">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-display text-lg font-extrabold leading-tight text-white">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/72">
                      {c.body}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------- the offer / estimate */}
        {service.hasOffer ? <CleanAndTune /> : <EstimateBlock />}

        {/* ------------------------------------------------ included + faqs */}
        <section className="bg-foam py-14 md:py-18">
          <div className="shell grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div>
              <h2 className="poster text-[clamp(1.5rem,3vw,2rem)]">
                What you get
              </h2>
              <ul className="mt-6">
                {service.bullets.map((b, i) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 border-t border-navy/10 py-3.5 first:border-t-0"
                  >
                    <span className="mt-0.5 font-mono text-[0.7rem] font-semibold tabular-nums text-ember">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.95rem] leading-relaxed text-navy/80">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
              <h2 className="poster mt-12 text-[clamp(1.5rem,3vw,2rem)]">
                Common questions
              </h2>
              <FaqList faqs={service.faqs} />
            </div>

            <div id="quote" className="scroll-mt-28">
              <QuoteForm defaultService={service.name} />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------- the other trades */}
        <section className="shell py-14 md:py-18">
          <h2 className="poster text-[clamp(1.5rem,3vw,2rem)]">
            One company, every trade
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-navy/65">
            The same licensed company handles the other two sides of the job —
            useful when a project crosses more than one of them.
          </p>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {related.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="card card-hover flex items-start gap-4 p-6"
              >
                <span
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-xl text-white ring-1 ring-inset ring-white/25",
                    ACCENT_CHIP[s.accent],
                  )}
                >
                  <Icon name={s.icon} className="size-5" />
                </span>
                <span>
                  <span className="flex items-center gap-1.5 font-display font-extrabold text-navy">
                    {s.name}
                    <ArrowUpRight className="size-4 text-blue" aria-hidden="true" />
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-navy/65">
                    {s.blurb}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <CtaBand
          eyebrow={service.hasOffer ? `${cleanAndTune.price} · 10-point service` : "Free estimate"}
          title={`Need ${service.short.toLowerCase()} handled? Let's talk.`}
          cta={service.hasOffer ? "Book a Clean & Tune" : "Get a free estimate"}
        />
      </SiteLayout>
    </>
  );
}

/* ----------------------------------------------------------- hero aside */

/** Panel beside the hero copy — the licence, then what the division covers.
 *  Commercial draws on all three trades, so it shows the full licence stack. */
function DivisionAside({ service }: { service: Service }) {
  const commercial = service.slug === "commercial";
  return (
    <div className="relative overflow-hidden rounded-card border border-white/20 bg-[linear-gradient(165deg,rgb(4_30_52/0.5),rgb(4_22_44/0.38))] p-6 pt-7 shadow-[0_24px_50px_-24px_rgb(3_14_34/0.9)] backdrop-blur-md">
      <span
        className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,var(--color-ember),var(--color-orange),var(--color-gold),var(--color-cyan),var(--color-blue))]"
        aria-hidden="true"
      />
      <p className="flex items-center gap-2 font-display text-[0.65rem] font-bold uppercase tracking-[0.2em] text-cyan">
        <ShieldCheck className="size-3.5" aria-hidden="true" />
        {commercial ? "Florida licensed & insured" : `Florida ${service.licence.label}`}
      </p>

      {commercial ? (
        <ul className="mt-4 space-y-2.5">
          {business.licenses.map((l) => (
            <li key={l.number} className="flex items-baseline justify-between gap-3">
              <span className="text-[0.8rem] text-white/70">{l.label}</span>
              <span className="font-mono text-sm font-semibold text-white">
                {l.number}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 font-mono text-2xl font-semibold tracking-tight text-white">
          {service.licence.number}
        </p>
      )}

      <ul className="mt-5 space-y-3 border-t border-white/15 pt-4">
        {service.capabilities.slice(0, 4).map((c) => (
          <li key={c.title} className="flex items-start gap-2.5">
            <Check className="mt-0.5 size-4 shrink-0 text-cyan" aria-hidden="true" />
            <span className="text-[0.85rem] leading-snug text-white/82">
              {c.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Trust row under the hero buttons. */
function HeroTrust({ service }: { service: Service }) {
  const items = [
    `Licensed #${service.licence.number}`,
    "Flat-rate pricing",
    business.emergency,
  ];
  return (
    <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/20 pt-5">
      <GoogleSeal />
      <span className="hidden h-7 w-px bg-white/25 sm:block" aria-hidden="true" />
      <ul className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
        {items.map((t) => (
          <li
            key={t}
            className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-white/60"
          >
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ----------------------------------------------- HVAC: the published offer */

function CleanAndTune() {
  return (
    <section className="shell py-14 md:py-18">
      <div className="card overflow-hidden lg:grid lg:grid-cols-[0.8fr_1.2fr]">
        <div className="band-navy grain relative flex flex-col justify-center p-8 text-white md:p-10">
          <p className="font-display text-[0.7rem] font-bold uppercase tracking-[0.22em] text-cyan">
            Published price
          </p>
          <p className="mt-4 flex items-baseline gap-2">
            <span className="poster text-bullion text-6xl md:text-7xl">
              {cleanAndTune.price}
            </span>
            <span className="text-sm font-semibold text-white/60">
              {cleanAndTune.unit}
            </span>
          </p>
          <h2 className="mt-3 text-2xl text-white md:text-3xl">
            {cleanAndTune.name}
          </h2>
          <p className="mt-4 leading-relaxed text-white/70">
            {cleanAndTune.summary}
          </p>
          <div className="mt-7 flex flex-col gap-3">
            <ButtonLink href="#quote">Book a visit</ButtonLink>
            <ButtonLink href={business.phoneHref} variant="outline">
              <Phone className="size-4" aria-hidden="true" />
              {business.phone}
            </ButtonLink>
          </div>
        </div>

        <div className="p-8 md:p-10">
          <p className="eyebrow">Every visit, all ten points</p>
          <ol className="mt-6 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
            {cleanAndTune.checklist.map((item, i) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-blue/10 font-display text-[0.7rem] font-bold text-blue">
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed text-navy/80">
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------- roofing / contracting: estimate */

function EstimateBlock() {
  return (
    <section className="shell py-14 md:py-18">
      <div className="card overflow-hidden lg:grid lg:grid-cols-[0.9fr_1.1fr]">
        <div className="band-navy grain relative flex flex-col justify-center p-8 text-white md:p-10">
          <p className="font-display text-[0.7rem] font-bold uppercase tracking-[0.22em] text-gold">
            {estimate.eyebrow}
          </p>
          <h2 className="poster mt-4 text-[clamp(2rem,5vw,3rem)] text-white">
            {estimate.name}
          </h2>
          <p className="mt-4 leading-relaxed text-white/70">{estimate.summary}</p>
          <div className="mt-7 flex flex-col gap-3">
            <ButtonLink href="#quote">Get a free estimate</ButtonLink>
            <ButtonLink href={business.phoneHref} variant="outline">
              <Phone className="size-4" aria-hidden="true" />
              {business.phone}
            </ButtonLink>
          </div>
        </div>

        <div className="p-8 md:p-10">
          <p className="eyebrow">What the estimate includes</p>
          <ul className="mt-6 space-y-3.5">
            {estimate.points.map((pt, i) => (
              <li key={pt} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-blue/10 font-display text-[0.7rem] font-bold text-blue">
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed text-navy/80">{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
