import { CheckCircle2, FileCode2, Terminal } from "lucide-react";
import { Container } from "@/components/ui/container";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { SectionHeading } from "@/components/ui/section-heading";
import { principles } from "@/data/portfolio";

export function ApproachSection() {
  return (
    <section
      id="approach"
      aria-labelledby="approach-heading"
      className="relative py-14 sm:py-20"
    >
      <Container size="wide">
        <SectionHeading
          id="approach-heading"
          eyebrow="03 — Engineering Philosophy"
          title="Engineering Approach"
          description="Architectural guidelines and engineering standards honed through long-term maintenance of production iOS codebases."
        />

        {/* SOLID ARCHITECTURAL RFC FRAME (Content-focused) */}
        <div className="solid-content-card mt-10 rounded-3xl p-6 shadow-lg sm:mt-12 sm:p-8 lg:p-10 border border-border">
          {/* Document Header Bar with Liquid Glass chrome badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5 text-xs text-foreground-subtle">
            <div className="flex items-center gap-2.5">
              <LiquidGlass
                variant="control"
                className="flex size-7 items-center justify-center rounded-lg text-accent"
              >
                <FileCode2 className="size-4" />
              </LiquidGlass>
              <span className="font-mono-code uppercase tracking-wider text-foreground">
                SPEC // ARCHITECTURAL-FOUNDATIONS.MD
              </span>
            </div>
            <div className="flex items-center gap-3 font-mono-code">
              <span className="liquid-glass-emerald rounded-full px-2.5 py-0.5 text-[var(--emerald-action-text)] text-[11px] font-semibold">
                STATUS: ENFORCED
              </span>
              <span className="hidden sm:inline text-foreground-subtle/30">|</span>
              <span className="hidden sm:inline text-foreground-muted">SWIFT 5.9+ / CONCURRENCY</span>
            </div>
          </div>

          {/* 4 Principles in Structured Format */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="rounded-2xl border border-border bg-surface-raised p-6 transition-all duration-200 hover:border-border-strong hover:bg-surface-elevated"
              >
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <h3 className="text-xl font-bold text-foreground">
                    {principle.title}
                  </h3>
                  <LiquidGlass
                    variant="control"
                    className="rounded-md px-2 py-0.5 font-mono-code text-xs font-semibold text-accent"
                  >
                    § {principle.number}
                  </LiquidGlass>
                </div>

                {/* Core Rule */}
                <p className="mt-4 font-semibold text-foreground text-base sm:text-[17px] leading-relaxed">
                  &ldquo;{principle.summary}&rdquo;
                </p>

                {/* Engineering Rationale */}
                <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-foreground-muted">
                  {principle.detail}
                </p>

                {/* Concrete Indicators */}
                <div className="mt-5 border-t border-border pt-4">
                  <div className="font-mono-code text-xs uppercase tracking-wider text-foreground-subtle font-semibold">
                    Verifiable Practices:
                  </div>
                  <ul className="mt-2.5 space-y-2 text-xs sm:text-sm text-foreground-muted">
                    {principle.indicators.map((ind) => (
                      <li key={ind} className="flex items-start gap-2">
                        <CheckCircle2 className="size-3.5 text-accent shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{ind}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Document Footer Callout in Liquid Glass */}
          <LiquidGlass
            variant="subtle"
            className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl px-5 py-3 text-xs text-foreground-subtle"
          >
            <div className="flex items-center gap-2 font-mono-code text-foreground">
              <Terminal className="size-3.5 text-accent" />
              <span>Objective: Minimize cognitive load &amp; enforce deterministic application state.</span>
            </div>
            <span className="font-mono-code text-accent font-semibold">
              Validated across Banking, Commerce &amp; BLE Hardware
            </span>
          </LiquidGlass>
        </div>
      </Container>
    </section>
  );
}
