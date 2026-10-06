import {
  ArrowRight,
  Check,
  FileSearch,
  Layers,
  Milestone,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { ActionLink } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { SectionHeading } from "@/components/ui/section-heading";
import { consultingBoundaries, consultingServices } from "@/data/portfolio";

export function ConsultingSection() {
  const serviceIcons = [
    <FileSearch key="arch" className="size-4 text-accent" />,
    <Layers key="modern" className="size-4 text-emerald-600 dark:text-emerald-300" />,
    <Milestone key="feature" className="size-4 text-teal-600 dark:text-teal-300" />,
    <Wrench key="release" className="size-4 text-accent" />,
  ];

  return (
    <section
      id="consulting"
      aria-labelledby="consulting-heading"
      className="relative py-14 sm:py-20"
    >
      <Container size="wide">
        <SectionHeading
          id="consulting-heading"
          eyebrow="05 — Technical Advisory"
          title="iOS Engineering & Technical Consulting"
          description="Helping engineering teams understand existing iOS codebases, improve architecture, modernize legacy implementations and plan maintainable feature development."
        />

        {/* 4 SOLID SERVICE CARDS (Content-led, high contrast in both themes) */}
        <div className="mt-10 grid gap-6 sm:mt-12 md:grid-cols-2">
          {consultingServices.map((service, index) => (
            <div
              key={service.title}
              className="solid-content-card group flex flex-col justify-between rounded-3xl p-6 sm:p-7 border border-border"
            >
              <div>
                <div className="flex items-center gap-3">
                  {/* Liquid Glass Service Icon */}
                  <LiquidGlass
                    variant="control"
                    className="flex size-9 items-center justify-center rounded-xl"
                  >
                    {serviceIcons[index % serviceIcons.length]}
                  </LiquidGlass>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">
                    {service.title}
                  </h3>
                </div>

                <p className="mt-3.5 text-sm sm:text-[15px] leading-relaxed text-foreground-muted">
                  {service.description}
                </p>

                <div className="mt-5 border-t border-border pt-4">
                  <span className="font-mono-code text-[11px] font-semibold uppercase tracking-wider text-foreground-subtle">
                    Advisory Deliverables:
                  </span>
                  <ul className="mt-2.5 space-y-1.5 text-xs text-foreground-muted">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="size-3 text-accent shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs">
                <span className="font-mono-code text-foreground-subtle">
                  Format: Technical RFC &amp; Paired Review
                </span>
                <span className="font-mono-code text-[11px] text-accent font-semibold">
                  Senior Advisory
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Claim Boundaries & Engineering Standards Box in Liquid Glass */}
        <LiquidGlass
          variant="subtle"
          className="mt-10 rounded-2xl p-6 sm:p-8 border border-border"
        >
          <div className="flex items-start gap-3">
            <ShieldCheck className="size-5 shrink-0 text-accent mt-0.5" />
            <div>
              <h4 className="font-mono-code text-xs font-semibold uppercase tracking-wider text-foreground">
                Advisory Standards &amp; Verified Scope
              </h4>
              <p className="mt-1 text-xs text-foreground-muted">
                Engagements are structured around demonstrable engineering capabilities. Clear operational boundaries ensure expectations remain accurate and achievable:
              </p>

              <ul className="mt-4 grid gap-2 text-xs text-foreground-muted sm:grid-cols-2">
                {consultingBoundaries.map((boundary, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{boundary}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </LiquidGlass>

        {/* Consulting CTA with Liquid Glass Emerald button */}
        <div className="mt-8 flex justify-center">
          <ActionLink href="#contact" variant="primary">
            <span>Discuss an Advisory Engagement</span>
            <ArrowRight className="ml-2 size-4" />
          </ActionLink>
        </div>
      </Container>
    </section>
  );
}
