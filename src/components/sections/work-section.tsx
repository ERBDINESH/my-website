"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  CheckCircle,
  Cpu,
  Layers,
  Sparkles,
  X,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { SectionHeading } from "@/components/ui/section-heading";
import { caseStudies } from "@/data/portfolio";
import type { CaseStudy } from "@/data/types";

export function WorkSection() {
  const [activeInspector, setActiveInspector] = useState<CaseStudy | null>(null);

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative py-14 sm:py-20"
    >
      <Container size="wide">
        <SectionHeading
          id="work-heading"
          eyebrow="02 — Selected Engineering Work"
          title="Production Engineering Case Studies"
          description="Native iOS implementations across banking, high-volume consumer commerce, and Bluetooth hardware products."
        />

        <div className="mt-10 space-y-8 sm:mt-12 sm:space-y-10">
          {caseStudies.map((study) => {
            const challenge = study.challengeSentence || study.engineeringProblem;
            const engineeringApproach = study.engineeringApproachSentence || study.whatWasProduct;

            return (
              <article
                key={study.id}
                className="rounded-3xl border border-border/80 bg-surface/50 backdrop-blur-xs p-6 sm:p-8 lg:p-10 shadow-xl transition-all duration-300 hover:border-border-strong hover:bg-surface-raised/40"
              >
                {/* Header: Identity, Category & CTA */}
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-6">
                  <div className="flex items-center gap-4">
                    {study.imagePath ? (
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-2xl border border-border bg-surface-raised shadow-xs sm:size-16">
                        <Image
                          src={study.imagePath}
                          alt={`${study.name} icon`}
                          width={64}
                          height={64}
                          className="size-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-surface-raised font-mono-code text-sm font-bold text-accent sm:size-16">
                        iOS
                      </div>
                    )}
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Category control pill in Liquid Glass */}
                        <LiquidGlass
                          variant="control"
                          className="rounded-full px-2.5 py-0.5 font-mono-code text-[11px] font-semibold uppercase tracking-wider text-accent"
                        >
                          {study.category}
                        </LiquidGlass>
                        <span className="text-foreground-subtle/40">•</span>
                        <span className="font-mono-code text-xs text-foreground-subtle">
                          {study.timeframe}
                        </span>
                      </div>
                      <h3 className="mt-1.5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        {study.name}
                      </h3>
                    </div>
                  </div>

                  {/* Actions: Primary Explore Engineering CTA + optional App Store link */}
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setActiveInspector(study)}
                      className="liquid-glass-emerald inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-[var(--emerald-action-text)] shadow-xs transition-all hover:brightness-105 active:scale-95 cursor-pointer"
                    >
                      <span>Explore Engineering</span>
                      <ArrowRight className="size-3.5" />
                    </button>

                    {study.appStoreUrl ? (
                      <a
                        href={study.appStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="liquid-glass-control inline-flex items-center gap-1 rounded-xl px-3 py-2.5 text-xs font-medium text-foreground hover:border-border-strong transition-all cursor-pointer"
                        aria-label={`View ${study.name} on the App Store`}
                      >
                        <span className="hidden sm:inline">App Store</span>
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    ) : null}
                  </div>
                </div>

                {/* Structured Engineering Overview: Challenge & Approach (1 concise sentence each) + Contributions (2-4 items) */}
                <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
                  {/* Left Column: Challenge & Engineering Approach */}
                  <div className="space-y-5">
                    <div>
                      <h4 className="flex items-center gap-2 font-mono-code text-xs font-semibold uppercase tracking-wider text-accent">
                        <Cpu className="size-3.5" />
                        Challenge
                      </h4>
                      <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-foreground">
                        {challenge}
                      </p>
                    </div>

                    <div>
                      <h4 className="flex items-center gap-2 font-mono-code text-xs font-semibold uppercase tracking-wider text-accent">
                        <Layers className="size-3.5" />
                        Engineering
                      </h4>
                      <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-foreground-muted">
                        {engineeringApproach}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Contributions (2–4 concise items) */}
                  <div>
                    <h4 className="flex items-center gap-2 font-mono-code text-xs font-semibold uppercase tracking-wider text-accent">
                      <CheckCircle className="size-3.5" />
                      Contribution
                    </h4>
                    <ul className="mt-2.5 space-y-2 text-xs sm:text-sm leading-relaxed text-foreground-muted">
                      {study.contributions.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Architecture Highlights Quick Preview */}
                {study.architectureHighlights && study.architectureHighlights.length > 0 && (
                  <div className="mt-6 rounded-2xl border border-border/80 bg-surface/70 p-4 transition-all">
                    <div className="flex items-center justify-between pb-2.5 border-b border-border/60">
                      <span className="font-mono-code text-[11px] font-semibold uppercase tracking-wider text-accent flex items-center gap-1.5">
                        <Boxes className="size-3.5" />
                        Architecture Highlights
                      </span>
                      <span className="font-mono-code text-[10px] text-foreground-subtle hidden sm:inline">
                        Verified Production Implementation
                      </span>
                    </div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-3">
                      {study.architectureHighlights.map((hl) => (
                        <div
                          key={hl.label}
                          className="rounded-xl border border-border bg-surface-raised/70 p-3 transition-colors hover:border-accent/40"
                        >
                          <div className="font-mono-code text-xs font-bold text-foreground">
                            {hl.label}
                          </div>
                          <p className="mt-1 text-[11px] leading-relaxed text-foreground-muted">
                            {hl.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technology: Understated metadata tags with interactive hover animation */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="mr-1.5 font-mono-code text-xs text-foreground-subtle">
                      Stack:
                    </span>
                    {study.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border bg-surface-raised px-2.5 py-0.5 font-mono-code text-xs text-foreground-muted transition-all duration-200 hover:border-accent/50 hover:text-accent hover:bg-surface-elevated cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <span className="font-mono-code text-[11px] text-foreground-subtle hidden sm:inline">
                    Enterprise confidentiality preserved
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* NATIVE macOS/iPadOS LIQUID GLASS ARCHITECTURE INSPECTOR MODAL SHEET */}
        {activeInspector && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl bg-black/50 animate-fadeIn"
            role="dialog"
            aria-modal="true"
            aria-labelledby="inspector-title"
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveInspector(null);
            }}
          >
            <LiquidGlass
              variant="strong"
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-6 shadow-2xl sm:p-8 border border-border"
            >
              {/* Sheet Grabber for Apple-native feel */}
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-foreground/20 sm:hidden" />

              {/* Sheet Header Chrome */}
              <div className="flex items-start justify-between border-b border-border pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-3.5 text-accent" />
                    <span className="font-mono-code text-xs font-semibold uppercase tracking-wider text-accent">
                      Engineering Architecture Inspector
                    </span>
                  </div>
                  <h3 id="inspector-title" className="text-xl font-bold text-foreground sm:text-2xl mt-1">
                    {activeInspector.name}
                  </h3>
                  <p className="text-xs text-foreground-subtle mt-0.5">
                    {activeInspector.domain} • {activeInspector.timeframe}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveInspector(null)}
                  className="rounded-xl p-2 text-foreground-muted hover:bg-foreground/5 hover:text-foreground cursor-pointer transition-colors"
                  aria-label="Close Inspector"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Inspector Content */}
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="font-mono-code text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
                    Architectural Highlights
                  </h4>
                  <div className="mt-3 space-y-3">
                    {activeInspector.architectureHighlights.map((hl) => (
                      <div
                        key={hl.label}
                        className="rounded-2xl border border-border bg-surface p-4"
                      >
                        <div className="font-mono-code text-xs font-bold text-accent">
                          {hl.label}
                        </div>
                        <p className="mt-1 text-xs sm:text-sm leading-relaxed text-foreground-muted">
                          {hl.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-mono-code text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
                    Production Stack
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {activeInspector.technologies.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border border-border bg-surface px-2.5 py-1 font-mono-code text-xs text-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Inspector Footer */}
              <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
                <span className="font-mono-code text-xs text-foreground-subtle">
                  Verified Production Delivery
                </span>
                <button
                  type="button"
                  onClick={() => setActiveInspector(null)}
                  className="liquid-glass-control rounded-xl px-4 py-2 text-xs font-semibold text-foreground cursor-pointer hover:border-border-strong"
                >
                  Done
                </button>
              </div>
            </LiquidGlass>
          </div>
        )}
      </Container>
    </section>
  );
}
