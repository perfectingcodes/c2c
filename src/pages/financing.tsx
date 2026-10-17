import { ArrowRight, Check, Phone } from "lucide-react";
import { business, estimate, financing, region } from "@/content/site";
import { SiteLayout } from "@/components/layout/site-layout";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";
import { ButtonLink } from "@/components/ui/button";
import { PaymentCalculator } from "@/components/payment-calculator";
import { Seo, breadcrumbNode } from "@/lib/seo";

export default function Financing() {
  return (
    <>
      <Seo
        title={`Financing in ${region} | ${business.name}`}
        description={`Financing options on approved credit for roofing, remodels and system replacement across ${region}. Same-day decisions in most cases — call ${business.phone}.`}
        path="/financing"
        nodes={[
          breadcrumbNode("/financing", [
            { name: "Home", path: "/" },
            { name: "Financing", path: "/financing" },
          ]),
        ]}
      />

      <SiteLayout
        eyebrow="Financing"
        title="A big project shouldn't mean an impossible week"
        lead={financing.intro}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Financing", path: "/financing" },
        ]}
      >
        <section className="shell py-14 md:py-16">
          <PaymentCalculator />
        </section>

        <Section>
          <ul className="grid gap-6 md:grid-cols-3">
            {financing.points.map((p, i) => (
              <li key={p.title}>
                <Reveal delay={i * 0.06} className="h-full">
                  <div className="card h-full p-7">
                    <span className="grid size-11 place-items-center rounded-full bg-blue text-white">
                      <Check className="size-5" aria-hidden="true" />
                    </span>
                    <h2 className="mt-5 text-xl">{p.title}</h2>
                    <p className="mt-3 leading-relaxed text-navy/70">{p.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>

        <Section className="bg-foam">
          <div className="card overflow-hidden lg:grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-8 md:p-10">
              <p className="eyebrow">Before you finance anything</p>
              <h2 className="mt-3 text-2xl md:text-3xl">
                Make sure you actually need the big job
              </h2>
              <div className="mt-5 space-y-4 leading-relaxed text-navy/75">
                <p>
                  Plenty of what we are called out to replace does not need
                  replacing. A roof leak that is a repair, not a tear-off; a
                  system that needs a capacitor, not a condenser. Each can look
                  like the expensive job and cost a fraction of one to fix.
                </p>
                <p>
                  We inspect the actual problem first and put the price in
                  writing. If the bigger job genuinely is the better math — and
                  on an aging roof or a 10–15 year old system it often is — then
                  we talk about financing, not before.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact">
                  Get a free estimate
                  <ArrowRight className="size-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href={business.phoneHref} variant="ghost">
                  <Phone className="size-4" aria-hidden="true" />
                  {business.phone}
                </ButtonLink>
              </div>
            </div>

            <div className="band-navy flex flex-col justify-center p-8 text-white md:p-10">
              <p className="font-display text-[0.7rem] font-bold uppercase tracking-[0.22em] text-cyan">
                Start here instead
              </p>
              <p className="poster text-bullion mt-4 text-5xl">Free</p>
              <h2 className="mt-3 text-2xl text-white">{estimate.name}</h2>
              <p className="mt-4 leading-relaxed text-white/70">
                An inspection and a written scope that tell you what the project
                actually needs — before anyone talks about financing it.
              </p>
              <div className="mt-7">
                <ButtonLink href="/contact">Request an estimate</ButtonLink>
              </div>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-navy/55">
            Financing is offered through third-party lenders on approved credit.
            Terms, rates and availability vary by lender and are confirmed before
            any work is scheduled.
          </p>
        </Section>

        <CtaBand
          eyebrow="Not sure where to start?"
          title="Let's find out what your project actually needs."
          cta="Get a free estimate"
        />
      </SiteLayout>
    </>
  );
}
