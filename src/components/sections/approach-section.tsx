"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, ChevronUp, FileCode2, Terminal } from "lucide-react";
import { Container } from "@/components/ui/container";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { SectionHeading } from "@/components/ui/section-heading";
import { principles } from "@/data/portfolio";

export function ApproachSection() {
  const [expandedMobilePractices, setExpandedMobilePractices] = useState<Record<string, boolean>>({});

  const toggleMobilePractices = (num: string) => {
    setExpandedMobilePractices((prev) => ({
      ...prev,
      [num]: !prev[num],
    }));
  };

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

        {/* EDITORIAL TECHNICAL CHARTER (Replaces nested cards with open editorial layout) */}
        <div className="mt-10 sm:mt-14">
          {/* Document Header Bar with Liquid Glass chrome badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-5 text-xs text-foreground-subtle">
            <div className="flex items-center gap-2.5">
              <LiquidGlass
                variant="control"
                className="flex size-7 items-center justify-center rounded-lg text-accent"
              >
                <FileCode2 className="size-4" />
              </LiquidGlass>
              <span className="font-mono-code uppercase tracking-wider text-foreground font-semibold">
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

          {/* 4 Principles in Open Editorial Grid */}
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:gap-12">
            {principles.map((principle) => {
              const isMobileExpanded = !!expandedMobilePractices[principle.number];

              return (
                <article
                  key={principle.title}
                  className="border-t border-border/70 pt-6 sm:pt-8 transition-colors hover:border-accent/40"
                >
                  {/* Principle Number & Section Title */}
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono-code text-xs font-bold text-accent tracking-widest uppercase">
                      § 0{principle.number}
                    </span>
                    <span className="rounded-full px-2.5 py-0.5 font-mono-code text-[10px] text-foreground-subtle border border-border/60">
                      CORE TENET
                    </span>
                  </div>

                  <h3 className="mt-3 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                    {principle.title}
                  </h3>

                  {/* Core Rule Pull-quote */}
                  <p className="mt-3 font-medium text-foreground text-base sm:text-[17px] leading-relaxed border-l-2 border-accent/40 pl-3.5 italic">
                    &ldquo;{principle.summary}&rdquo;
                  </p>

                  {/* Engineering Rationale */}
                  <p className="mt-3.5 text-sm sm:text-[15px] leading-relaxed text-foreground-muted">
                    {principle.detail}
                  </p>

                  {/* Mobile Progressive Disclosure Toggle for Verifiable Practices */}
                  <div className="mt-4 sm:hidden">
                    <button
                      type="button"
                      onClick={() => toggleMobilePractices(principle.number)}
                      aria-expanded={isMobileExpanded}
                      className="flex items-center gap-1.5 font-mono-code text-xs text-accent hover:underline cursor-pointer"
                    >
                      {isMobileExpanded ? (
                        <>
                          <ChevronUp className="size-3.5" />
                          <span>Hide practices</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="size-3.5" />
                          <span>View verifiable practices ({principle.indicators.length})</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Concrete Verifiable Practices */}
                  <div
                    className={`mt-4 pt-3 ${
                      isMobileExpanded ? "block" : "hidden sm:block"
                    }`}
                  >
                    <div className="font-mono-code text-[11px] uppercase tracking-wider text-foreground-subtle font-semibold">
                      Verifiable Practices:
                    </div>
                    <ul className="mt-2 space-y-1.5 text-xs sm:text-[13px] text-foreground-muted">
                      {principle.indicators.map((ind) => (
                        <li key={ind} className="flex items-start gap-2">
                          <CheckCircle2 className="size-3.5 text-accent shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{ind}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Document Footer Callout in Liquid Glass */}
          <LiquidGlass
            variant="subtle"
            className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl px-5 py-3 text-xs text-foreground-subtle border border-border/60"
          >
            <div className="flex items-center gap-2 font-mono-code text-foreground">
              <Terminal className="size-3.5 text-accent" />
              <span>Objective: Enforce deterministic application state across long-term iOS codebases.</span>
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
