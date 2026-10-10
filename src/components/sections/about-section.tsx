import { MapPin, Sparkles, Terminal } from "lucide-react";
import { Container } from "@/components/ui/container";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { SectionHeading } from "@/components/ui/section-heading";
import { journeyStages, profile } from "@/data/portfolio";

export function AboutSection() {
  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="relative py-16 sm:py-24"
    >
      {/* Anchor for backward compatibility with existing links */}
      <span id="about" className="sr-only" aria-hidden="true" />

      <Container size="wide">
        {/* Section Heading with Concise Supporting Statement */}
        <div className="flex flex-col items-start gap-4">
          <SectionHeading
            id="journey-heading"
            eyebrow="06 — Progression"
            title="Engineering Journey"
            description="From client applications to commerce, connected devices and production banking systems."
          />

          {/* Product-like Progression Status Bar */}
          <div className="mt-2 flex flex-wrap items-center gap-2.5">
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-border bg-surface-raised/80 px-4 py-1.5 backdrop-blur-md shadow-xs">
              <span className="font-mono-code text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
                Path
              </span>
              <span className="text-border-strong" aria-hidden="true">
                •
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-foreground">
                <span className="size-1.5 rounded-full bg-accent" />
                Native iOS
              </span>
              <span className="text-xs text-foreground-subtle" aria-hidden="true">
                →
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-foreground">
                <span className="size-1.5 rounded-full bg-accent" />
                Product Engineering
              </span>
              <span className="text-xs text-foreground-subtle" aria-hidden="true">
                →
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-accent">
                <span className="size-1.5 rounded-full bg-accent animate-pulse" />
                Senior Production Delivery
              </span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-raised/40 px-3.5 py-1.5 font-mono-code text-xs sm:text-[13px] text-foreground-subtle">
              <Sparkles className="size-3 text-accent" />
              <span>7+ Years Progression</span>
            </div>
          </div>
        </div>

        {/* Large Premium Surface */}
        <div className="mt-10 rounded-3xl border border-border bg-surface-raised/60 p-6 sm:p-8 lg:p-10 shadow-xl backdrop-blur-sm">
          {/* Top Bar: Concise Engineering Statement & Environment Badges */}
          <div className="grid gap-6 border-b border-border pb-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">
                Seven years of engineering progression across evolving iOS domains.
              </h3>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-foreground-muted">
                From foundational Swift, Objective-C and UIKit client architectures to consumer commerce at scale, hardware Bluetooth protocols, and mission-critical European banking journeys with SwiftUI, UIKit and MVVM-C.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 font-mono-code text-xs sm:text-[13px] text-foreground-subtle lg:justify-end">
              <div className="flex items-center gap-1.5 rounded-xl border border-border bg-surface/60 px-3 py-1.5">
                <MapPin className="size-3.5 text-accent" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-xl border border-border bg-surface/60 px-3 py-1.5">
                <Terminal className="size-3.5 text-accent" />
                <span>Native Swift &amp; UIKit</span>
              </div>
            </div>
          </div>

          {/* Desktop: Connected 3-Stage Horizontal Milestone Progression (Parent-Level Rail) */}
          <div className="hidden lg:block relative mt-12">
            {/* Milestone Header / Markers Row with Parent-Level Timeline Rail */}
            <div className="relative mb-6">
              {/* Continuous Parent-Level Horizontal Rail: from center of Col 1 to center of Col 3 */}
              <div
                className="absolute top-[11px] left-[calc(100%/6-8px)] right-[calc(100%/6-8px)] h-[2px] bg-gradient-to-r from-accent/30 via-accent/60 to-accent/80 rounded-full z-0"
                aria-hidden="true"
              />

              {/* 3 Milestone Marker Nodes above the rail */}
              <div className="grid grid-cols-3 gap-6 relative z-10">
                {journeyStages.map((stage, idx) => {
                  const isCurrent = idx === journeyStages.length - 1;
                  return (
                    <div key={stage.id} className="flex flex-col items-center">
                      {/* Milestone Node sitting directly on the rail */}
                      <div
                        className={`relative z-20 flex size-6 items-center justify-center rounded-full border border-accent/60 bg-surface shadow-xs transition-transform hover:scale-110 ${
                          isCurrent ? "ring-4 ring-accent/15 border-accent" : ""
                        }`}
                      >
                        <span
                          className={`size-2 rounded-full ${
                            isCurrent ? "bg-accent animate-pulse" : "bg-accent/80"
                          }`}
                        />
                      </div>

                      {/* Year Label */}
                      <span className="mt-2 font-mono-code text-xs sm:text-sm font-bold text-accent">
                        {stage.year}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Milestone Cards Row (Beneath markers, no line cutting through) */}
            <div className="grid grid-cols-3 gap-6 relative z-10">
              {journeyStages.map((stage, idx) => {
                const isCurrent = idx === journeyStages.length - 1;
                return (
                  <div
                    key={stage.id}
                    className={`group relative flex flex-col rounded-2xl border border-border bg-surface/70 p-6 transition-all duration-300 hover:border-accent/40 hover:bg-surface-raised/90 hover:shadow-lg focus-within:border-accent/50 focus-within:ring-1 focus-within:ring-accent ${
                      isCurrent ? "border-accent/30 bg-surface-raised/60" : ""
                    }`}
                    tabIndex={0}
                    aria-label={`Stage ${idx + 1}: ${stage.company} (${stage.period})`}
                  >
                    {/* Top Row inside card: Stage label on left, Date range on right */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="font-mono-code text-xs font-semibold uppercase tracking-wider text-accent/90">
                        {stage.label}
                      </span>

                      {/* Date-range pill top-right inside card */}
                      <LiquidGlass
                        variant="subtle"
                        className="px-2.5 py-0.5 rounded-full text-xs font-mono-code font-medium text-foreground-subtle border border-border shrink-0"
                      >
                        {stage.period}
                      </LiquidGlass>
                    </div>

                    {/* Company & Role */}
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-foreground group-hover:text-accent transition-colors leading-tight">
                        {stage.company}
                      </h4>
                      <p className="text-xs sm:text-[13px] text-foreground-subtle">
                        {stage.role}
                      </p>
                    </div>

                    {/* Factual Description */}
                    <p className="mt-4 text-xs sm:text-[13.5px] leading-relaxed text-foreground-muted grow">
                      {stage.description}
                    </p>

                    {/* Engineering Growth Tags */}
                    <div className="mt-6 pt-4 border-t border-border/80">
                      <div className="text-[11px] sm:text-xs font-mono-code uppercase tracking-wider text-foreground-subtle mb-2">
                        Engineering Growth
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {stage.growth.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-border bg-surface-raised/80 px-2 py-0.5 font-mono-code text-[11px] sm:text-xs text-foreground-muted group-hover:border-accent/30 group-hover:text-foreground transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile & Tablet: Connected Vertical Timeline (One Parent-Level Rail) */}
          <div className="lg:hidden relative mt-8">
            <div className="space-y-8">
              {journeyStages.map((stage, idx) => {
                const isCurrent = idx === journeyStages.length - 1;
                const isLast = idx === journeyStages.length - 1;

                return (
                  <div key={stage.id} className="relative">
                    {/* Continuous Vertical Rail Segment down to next milestone dot */}
                    {!isLast && (
                      <div
                        className="absolute left-[11px] top-[12px] bottom-[-32px] w-[2px] bg-gradient-to-b from-accent/50 to-accent/80 z-0"
                        aria-hidden="true"
                      />
                    )}

                    {/* Milestone Header Row: Dot sits on the rail at x=12px, Year beside it */}
                    <div className="flex items-center gap-3.5 mb-3">
                      {/* Milestone Node sitting directly on the rail */}
                      <div
                        className={`relative z-10 flex size-6 items-center justify-center rounded-full border border-accent/60 bg-surface shadow-xs shrink-0 ${
                          isCurrent ? "ring-4 ring-accent/15 border-accent" : ""
                        }`}
                      >
                        <span
                          className={`size-2 rounded-full ${
                            isCurrent ? "bg-accent animate-pulse" : "bg-accent/80"
                          }`}
                        />
                      </div>

                      {/* Year */}
                      <span className="font-mono-code text-xs sm:text-sm font-bold text-accent">
                        {stage.year}
                      </span>
                    </div>

                    {/* Milestone Content Card: Placed to the right of the vertical rail */}
                    <div className="ml-9 rounded-2xl border border-border bg-surface/70 p-4 sm:p-5 transition-all duration-300">
                      {/* Card Top: Stage label on left, Date range on right */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="font-mono-code text-xs font-semibold uppercase tracking-wider text-accent/90">
                          {stage.label}
                        </span>

                        <LiquidGlass
                          variant="subtle"
                          className="px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-mono-code text-foreground-subtle border border-border shrink-0"
                        >
                          {stage.period}
                        </LiquidGlass>
                      </div>

                      {/* Company & Role */}
                      <h4 className="text-base font-bold text-foreground">
                        {stage.company}
                      </h4>
                      <p className="text-xs sm:text-[13px] text-foreground-subtle mt-0.5">
                        {stage.role}
                      </p>

                      {/* Description */}
                      <p className="mt-3 text-xs sm:text-[13.5px] leading-relaxed text-foreground-muted">
                        {stage.description}
                      </p>

                      {/* Engineering Growth Tags */}
                      <div className="mt-4 pt-3 border-t border-border/80">
                        <div className="text-[11px] sm:text-xs font-mono-code uppercase tracking-wider text-foreground-subtle mb-1.5">
                          Engineering Growth
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {stage.growth.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md border border-border bg-surface-raised/80 px-2 py-0.5 font-mono-code text-[11px] sm:text-xs text-foreground-muted"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
