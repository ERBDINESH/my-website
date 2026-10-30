"use client";

import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Clock,
  Globe,
  Layers,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { SectionHeading } from "@/components/ui/section-heading";
import { independentProjects } from "@/data/portfolio";

const READINESS_CHECKS = [
  { label: "SSL / TLS Handshake", status: "VERIFIED", type: "Security" },
  { label: "Canonical URL & Robots", status: "VERIFIED", type: "SEO" },
  { label: "OpenGraph & Twitter Tags", status: "VERIFIED", type: "Metadata" },
  { label: "Mobile Viewport Scaling", status: "VERIFIED", type: "Layout" },
  { label: "404 Error Fallback Route", status: "VERIFIED", type: "UX" },
  { label: "Core Web Vitals Budget", status: "MONITORED", type: "Performance" },
] as const;

const AGENT_WORKFLOW_STEPS = [
  { step: "01", label: "Task Specification", detail: "Parse requirements & test contracts", status: "PASSED" },
  { step: "02", label: "Scaffold & Types", detail: "Generate TypeScript types & schemas", status: "AUTOMATED" },
  { step: "03", label: "Human Verification Gate", detail: "Senior engineer review & approval", status: "REQUIRED" },
  { step: "04", label: "Test Harness Execution", detail: "Automated regression validation", status: "VALIDATING" },
] as const;

export function IndependentProjectsSection() {
  const launchProof = independentProjects?.[0];
  const personalAgent = independentProjects?.[1];

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative py-14 sm:py-20"
    >
      <Container size="wide">
        <SectionHeading
          id="projects-heading"
          eyebrow="03 — Independent Engineering"
          title="Independent Engineering Projects"
          description="Web products, developer automation tools, and applied engineering experiments built outside client enterprise codebases."
        />

        {/* Bento Grid */}
        <div className="mt-10 grid gap-6 lg:grid-cols-12 sm:mt-12">
          {/* Card 1: LaunchProof (Web Product) - Spans 7 columns on desktop */}
          {launchProof && (
            <article className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-border/80 bg-surface/50 backdrop-blur-xs p-6 sm:p-8 shadow-xl transition-all hover:border-border-strong hover:bg-surface-raised/40">
              <div>
                {/* Header Strip */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-4">
                  <div className="flex items-center gap-2">
                    <LiquidGlass
                      variant="control"
                      className="rounded-full px-2.5 py-0.5 font-mono-code text-xs font-semibold uppercase tracking-wider text-accent"
                    >
                      {launchProof.category}
                    </LiquidGlass>
                    <span className="text-foreground-subtle/40">•</span>
                    <span className="font-mono-code text-xs text-foreground-subtle">
                      Independent Web Architecture
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono-code text-[11px] font-semibold text-emerald-400">
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                    {launchProof.status}
                  </span>
                </div>

                {/* Identity & Description */}
                <div className="mt-5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 border border-accent/25 text-accent">
                      <Globe className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        {launchProof.name}
                      </h3>
                      <p className="font-mono-code text-xs text-foreground-subtle">
                        launchproof.erbdinesh.com
                      </p>
                    </div>
                  </div>

                  <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-foreground-muted">
                    {launchProof.description}
                  </p>
                </div>

                {/* Capabilities Demonstrated */}
                <div className="mt-5">
                  <h4 className="font-mono-code text-xs font-semibold uppercase tracking-wider text-accent flex items-center gap-1.5">
                    <Layers className="size-3.5" />
                    Demonstrates
                  </h4>
                  <ul className="mt-2.5 grid gap-2 text-xs sm:text-sm text-foreground-muted sm:grid-cols-2">
                    {launchProof.demonstrates.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="size-3.5 mt-0.5 text-accent shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Verification Pipeline Simulator */}
                <div className="mt-6 rounded-2xl border border-border/80 bg-surface-raised/60 p-4">
                  <div className="flex items-center justify-between border-b border-border/50 pb-2.5 text-xs">
                    <span className="font-mono-code uppercase font-semibold text-foreground flex items-center gap-1.5">
                      <ShieldCheck className="size-3.5 text-accent" />
                      Sample Launch Verification Pipeline
                    </span>
                    <span className="font-mono-code text-emerald-400">
                      17 Automated Checks
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] sm:text-xs">
                    {READINESS_CHECKS.map((chk) => (
                      <div
                        key={chk.label}
                        className="flex items-center justify-between rounded-lg border border-border/60 bg-surface/50 px-2.5 py-1.5"
                      >
                        <span className="truncate text-foreground-muted">{chk.label}</span>
                        <span className="ml-1.5 shrink-0 font-mono-code text-[10px] text-accent">
                          {chk.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technologies & CTA Footer */}
              <div className="mt-6 border-t border-border/70 pt-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {launchProof.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-border bg-surface px-2 py-0.5 font-mono-code text-[11px] text-foreground-subtle"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {launchProof.websiteUrl && (
                  <a
                    href={launchProof.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-glass-emerald inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs sm:text-[13px] font-semibold text-[var(--emerald-action-text)] shadow-xs transition-all hover:brightness-105 active:scale-95"
                  >
                    <span>Visit LaunchProof</span>
                    <ArrowUpRight className="size-3.5" />
                  </a>
                )}
              </div>
            </article>
          )}

          {/* Card 2: Personal AI Agent (AI Experiment) - Spans 5 columns on desktop */}
          {personalAgent && (
            <article className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-blue-500/20 bg-surface/50 backdrop-blur-xs p-6 sm:p-8 shadow-xl transition-all hover:border-blue-500/40 hover:bg-surface-raised/40">
              <div>
                {/* Header Strip */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-4">
                  <div className="flex items-center gap-2">
                    <LiquidGlass
                      variant="control"
                      className="rounded-full px-2.5 py-0.5 font-mono-code text-xs font-semibold uppercase tracking-wider text-[var(--blue-accent)]"
                    >
                      {personalAgent.category}
                    </LiquidGlass>
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 font-mono-code text-[11px] font-semibold text-blue-400">
                    <Clock className="size-3" />
                    {personalAgent.status}
                  </span>
                </div>

                {/* Identity & Description */}
                <div className="mt-5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-400">
                      <Bot className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        {personalAgent.name}
                      </h3>
                      <p className="font-mono-code text-xs text-blue-400/80">
                        Developer Automation Experiment
                      </p>
                    </div>
                  </div>

                  <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-foreground-muted">
                    {personalAgent.description}
                  </p>
                </div>

                {/* Structured Engineering Capabilities */}
                <div className="mt-5">
                  <h4 className="font-mono-code text-xs font-semibold uppercase tracking-wider text-[var(--blue-accent)] flex items-center gap-1.5">
                    <Terminal className="size-3.5" />
                    Demonstrates
                  </h4>
                  <ul className="mt-2.5 space-y-2 text-xs sm:text-sm text-foreground-muted">
                    {personalAgent.demonstrates.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="size-3.5 mt-0.5 text-blue-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Defensible Boundary Notice */}
                <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-950/20 p-3.5 text-xs text-blue-200/80 leading-relaxed">
                  <p className="flex items-start gap-2">
                    <Sparkles className="size-3.5 mt-0.5 text-blue-400 shrink-0" />
                    <span>
                      <strong className="text-blue-200">Active Prototype:</strong> Focuses on developer workflow automation, human validation gates, and deterministic test harness execution. Not offered as production-ready software.
                    </span>
                  </p>
                </div>

                {/* Simulated Workflow Trace */}
                <div className="mt-4 rounded-xl border border-border/70 bg-[#070d14] p-3 text-[11px] font-mono-code">
                  <div className="text-foreground-subtle pb-1 border-b border-border/40 flex justify-between">
                    <span>AGENTIC TEST WORKFLOW</span>
                    <span className="text-blue-400">LOCAL CLI</span>
                  </div>
                  <div className="mt-2 space-y-1.5">
                    {AGENT_WORKFLOW_STEPS.map((step) => (
                      <div key={step.step} className="flex items-center justify-between">
                        <span className="text-neutral-400">
                          {step.step}. {step.label}
                        </span>
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded ${
                            step.status === "PASSED"
                              ? "bg-emerald-500/15 text-emerald-400"
                              : step.status === "REQUIRED"
                              ? "bg-amber-500/15 text-amber-400"
                              : "bg-blue-500/15 text-blue-400"
                          }`}
                        >
                          {step.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technologies Footer */}
              <div className="mt-6 border-t border-border/70 pt-5">
                <div className="flex flex-wrap gap-1.5">
                  {personalAgent.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-border bg-surface px-2 py-0.5 font-mono-code text-[11px] text-foreground-subtle"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          )}
        </div>
      </Container>
    </section>
  );
}
