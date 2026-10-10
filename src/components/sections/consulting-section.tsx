"use client";

import { useState } from "react";
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
import { SectionHeading } from "@/components/ui/section-heading";
import { consultingBoundaries, consultingServices } from "@/data/portfolio";

export function ConsultingSection() {
  const [showEngagementStages, setShowEngagementStages] = useState(false);
  const serviceIcons = [
    <FileSearch key="arch" className="size-4.5 text-accent" />,
    <Layers key="modern" className="size-4.5 text-emerald-500" />,
    <Milestone key="feature" className="size-4.5 text-teal-400" />,
    <Wrench key="release" className="size-4.5 text-accent" />,
  ];

  const workflowSteps = [
    {
      step: "01",
      badge: "DISCOVERY",
      title: "The Problem",
      description: "Identification of architectural debt, performance bottlenecks, retain cycles, or legacy Objective-C blockers hindering team velocity.",
    },
    {
      step: "02",
      badge: "AUDIT",
      title: "Technical Review",
      description: "In-depth codebase inspection, Xcode Instruments profiling, and concurrency analysis to isolate root causes without bias.",
    },
    {
      step: "03",
      badge: "STRATEGY",
      title: "Recommendation",
      description: "Actionable Technical RFC document detailing migration blueprints, protocol boundaries, and estimated engineering milestones.",
    },
    {
      step: "04",
      badge: "DELIVERY",
      title: "Implementation",
      description: "Hands-on paired refactoring with your iOS team, modernizing foundation modules with Swift 6 and ensuring zero production regressions.",
    },
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

        {/* 4 CORE SERVICES (Open, high-contrast capability matrix) */}
        <div className="mt-10 grid gap-6 sm:mt-12 md:grid-cols-2">
          {consultingServices.map((service, index) => (
            <div
              key={service.title}
              className="rounded-3xl border border-border/80 bg-surface/50 backdrop-blur-xs p-6 sm:p-8 flex flex-col justify-between transition-all hover:border-border-strong hover:bg-surface-raised/40"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-accent/10 border border-accent/20">
                    {serviceIcons[index % serviceIcons.length]}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">
                    {service.title}
                  </h3>
                </div>

                <p className="mt-3.5 text-sm sm:text-[15px] leading-relaxed text-foreground-muted">
                  {service.description}
                </p>

                <div className="mt-5 border-t border-border/60 pt-4">
                  <span className="font-mono-code text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
                    Advisory Deliverables:
                  </span>
                  <ul className="mt-2.5 space-y-2 text-xs sm:text-[13.5px] leading-relaxed text-foreground-muted">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="size-3.5 text-accent shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4 text-xs sm:text-[13px] font-mono-code">
                <span className="text-foreground-subtle">
                  Format: Technical RFC &amp; Paired Review
                </span>
                <span className="text-accent font-semibold">
                  Senior Advisory
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 4-STAGE CONTINUOUS ADVISORY TIMELINE (Replaces 4 extra box cards) */}
        <div className="mt-12 rounded-3xl border border-border/80 bg-surface/40 backdrop-blur-xs p-6 sm:p-8 lg:p-10 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-5">
            <div>
              <span className="font-mono-code text-xs font-bold uppercase tracking-wider text-accent">
                Engagement Model
              </span>
              <h4 className="text-xl font-bold text-foreground mt-1">
                How Technical Advisory Works
              </h4>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline font-mono-code text-xs sm:text-[13px] text-foreground-subtle">
                Deterministic, Phased Engagements
              </span>
              <button
                type="button"
                onClick={() => setShowEngagementStages(!showEngagementStages)}
                aria-expanded={showEngagementStages}
                className="lg:hidden rounded-lg border border-border bg-surface px-3 py-1 font-mono-code text-xs font-semibold text-accent hover:border-accent/40 transition-all cursor-pointer"
              >
                {showEngagementStages ? "▲ Hide Stages" : "▼ View Stages"}
              </button>
            </div>
          </div>

          {/* Discrete Connected Flow (Segments only between adjacent steps) */}
          <div className="mt-8 relative">
            <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-4 ${showEngagementStages ? "block space-y-6 sm:space-y-0" : "hidden sm:grid"}`}>
              {workflowSteps.map((ws, index) => {
                const isLast = index === workflowSteps.length - 1;
                return (
                  <div key={ws.step} className="space-y-2">
                    {/* Step marker, label pill, and discrete connector segment */}
                    <div className="relative flex items-center">
                      <div className="relative z-10 flex shrink-0 items-center gap-2">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent/15 font-mono-code text-xs font-bold text-accent border border-accent/30 shadow-xs">
                          {ws.step}
                        </span>
                        <span className="rounded-full bg-accent/10 px-2 py-0.5 font-mono-code text-[11px] sm:text-xs text-accent font-semibold border border-accent/20">
                          {ws.badge}
                        </span>
                      </div>

                      {/* Connector only between Step 1→2, 2→3, 3→4; vertically centered to circular marker; hidden on mobile */}
                      {!isLast && (
                        <div
                          aria-hidden="true"
                          className="hidden lg:block z-0 flex-1 h-[2px] ml-3 mr-[-1rem] bg-gradient-to-r from-accent/30 via-border-strong to-accent/25 rounded-full"
                        />
                      )}
                    </div>

                    <h5 className="font-bold text-foreground text-base sm:text-[17px] pt-1">
                      {ws.title}
                    </h5>

                    <p className="text-xs sm:text-[13.5px] leading-relaxed text-foreground-muted">
                      {ws.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Claim Boundaries Box */}
        <div className="mt-8 rounded-2xl border border-border/70 bg-surface/30 p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <ShieldCheck className="size-5 shrink-0 text-accent mt-0.5" />
            <div>
              <h4 className="font-mono-code text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-foreground">
                Advisory Standards &amp; Verified Scope
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-foreground-muted">
                Engagements are structured around demonstrable engineering capabilities. Clear operational boundaries ensure expectations remain accurate and achievable:
              </p>

              <ul className="mt-4 grid gap-2.5 text-xs sm:text-[13.5px] leading-relaxed text-foreground-muted sm:grid-cols-2">
                {consultingBoundaries.map((boundary, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{boundary}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Specialized Areas Strip */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-[13px] text-foreground-subtle font-mono-code">
          <span className="text-foreground-muted">Advisory Specialties:</span>
          <span className="rounded-md border border-border bg-surface px-2.5 py-1">Swift &amp; SwiftUI</span>
          <span className="rounded-md border border-border bg-surface px-2.5 py-1">UIKit Interop</span>
          <span className="rounded-md border border-border bg-surface px-2.5 py-1">Legacy Modernization</span>
          <span className="rounded-md border border-border bg-surface px-2.5 py-1">Instruments Performance</span>
          <span className="rounded-md border border-border bg-surface px-2.5 py-1">MVVM-C Architecture</span>
        </div>

        {/* Consulting CTA */}
        <div className="mt-8 flex justify-center">
          <ActionLink href="#contact" variant="primary">
            <span>Get an iOS Technical Review / Consultation</span>
            <ArrowRight className="ml-2 size-4" />
          </ActionLink>
        </div>
      </Container>
    </section>
  );
}
