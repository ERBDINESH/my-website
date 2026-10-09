"use client";

import { useRef, useState } from "react";
import {
  ArrowDown,
  Boxes,
  Compass,
  FileCheck2,
  GitMerge,
  Layers,
  Network,
  Users2,
} from "lucide-react";
import { ArchitectureFlow } from "@/components/animations/ArchitectureFlow";
import { Container } from "@/components/ui/container";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { SectionHeading } from "@/components/ui/section-heading";
import { capabilities } from "@/data/portfolio";

interface ConceptualStep {
  label: string;
  subtext?: string;
}

const conceptualPipelines: Record<string, ConceptualStep[]> = {
  build: [
    { label: "User Interaction", subtext: "Gestures, touches & input events" },
    { label: "SwiftUI / UIKit View Layer", subtext: "Declarative layouts & component hierarchy" },
    { label: "Display Engine & State", subtext: "State reflection & dynamic type" },
    { label: "CoreAnimation & GPU", subtext: "Fluid 60/120fps hardware rendering" },
  ],
  architect: [
    { label: "View", subtext: "SwiftUI / UIViewController presentation" },
    { label: "State / ViewModel", subtext: "Observable state & user intents" },
    { label: "Use Case / Feature Logic", subtext: "Domain business rules & coordination" },
    { label: "Service / Repository", subtext: "Data access contracts & caching" },
    { label: "API / Persistence", subtext: "Network endpoints & Core Data / SQLite" },
  ],
  integrate: [
    { label: "Feature Request", subtext: "Authenticated data operation" },
    { label: "Auth Token Interceptor", subtext: "Serialized token validation & injection" },
    { label: "URLSession Transport", subtext: "Decoupled async HTTP client" },
    { label: "Codable Mapping", subtext: "Strict schema decoding & error isolation" },
    { label: "Local Cache / Sync", subtext: "Offline state persistence" },
  ],
  assure: [
    { label: "Strict Concurrency", subtext: "Actor isolation & compiler data-race safety" },
    { label: "Static Analysis", subtext: "SwiftLint & strict compiler checks" },
    { label: "XCTest Suite", subtext: "Isolated unit, UI & mock tests" },
    { label: "Memory & Performance", subtext: "Instruments leak detection & trace checks" },
  ],
  ship: [
    { label: "Feature Branch & PR", subtext: "Peer review & architecture conformance" },
    { label: "CI/CD Pipeline", subtext: "Automated test runs & artifact signing" },
    { label: "TestFlight Staging", subtext: "Internal validation & beta distribution" },
    { label: "Phased App Store Release", subtext: "Monitored rollouts & telemetry tracking" },
  ],
  lead: [
    { label: "Product Requirements", subtext: "Problem framing & technical feasibility" },
    { label: "Architecture RFC", subtext: "Trade-offs, boundary design & API contract" },
    { label: "Cross-Functional Sync", subtext: "Backend, design & QA coordination" },
    { label: "Delivery & Mentorship", subtext: "Code reviews, pairing & documentation" },
  ],
};

export function CapabilitiesSection() {
  const [activePillarId, setActivePillarId] = useState<string>("architect");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const iconMap: Record<string, React.ReactNode> = {
    build: <Layers className="size-4" />,
    architect: <Boxes className="size-4" />,
    integrate: <Network className="size-4" />,
    assure: <FileCheck2 className="size-4" />,
    ship: <GitMerge className="size-4" />,
    lead: <Users2 className="size-4" />,
  };

  const selectedIndex = capabilities.findIndex((c) => c.id === activePillarId);
  const selectedPillar =
    capabilities[selectedIndex >= 0 ? selectedIndex : 0] ?? capabilities[0];

  const pipeline = conceptualPipelines[selectedPillar.id] ?? conceptualPipelines.architect;

  function handleKeyDown(e: React.KeyboardEvent, currentIndex: number) {
    let nextIndex = currentIndex;
    if (e.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % capabilities.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + capabilities.length) % capabilities.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = capabilities.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    const nextPillar = capabilities[nextIndex];
    if (nextPillar) {
      setActivePillarId(nextPillar.id);
      tabRefs.current[nextPillar.id]?.focus();
    }
  }

  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="relative py-14 sm:py-20"
    >
      <Container size="wide">
        <SectionHeading
          id="capabilities-heading"
          eyebrow="01 — Capabilities"
          title="Engineering Capabilities"
          description="Six core engineering disciplines developed across 7+ years of delivering native Apple-platform applications from requirement analysis to production release."
        />

        {/* Liquid Glass Segmented Capability Selector */}
        <div className="mt-8 overflow-x-auto pb-2 sm:pb-0" tabIndex={-1}>
          <LiquidGlass
            variant="control"
            role="tablist"
            aria-label="Engineering Capabilities Navigation"
            className="flex w-max min-w-full sm:w-full items-center justify-between gap-1 rounded-2xl p-1.5 shadow-sm"
          >
            {capabilities.map((pillar, idx) => {
              const isSelected = pillar.id === activePillarId;
              return (
                <button
                  key={pillar.id}
                  ref={(el) => {
                    tabRefs.current[pillar.id] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${pillar.id}`}
                  aria-selected={isSelected}
                  aria-controls={`panel-${pillar.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setActivePillarId(pillar.id)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3.5 py-2.5 font-mono-code text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "liquid-glass-emerald text-[var(--emerald-action-text)] shadow-xs font-bold"
                      : "text-foreground-muted hover:text-foreground hover:bg-foreground/5"
                  }`}
                >
                  <span className={isSelected ? "text-accent" : "text-foreground-subtle"}>
                    {iconMap[pillar.id] ?? <Compass className="size-3.5" />}
                  </span>
                  <span>{pillar.title}</span>
                </button>
              );
            })}
          </LiquidGlass>
        </div>

        {/* Active Capability Primary Expanded Panel (SOLID CONTENT LAYER) */}
        <div
          role="tabpanel"
          id={`panel-${selectedPillar.id}`}
          aria-labelledby={`tab-${selectedPillar.id}`}
          className="mt-6 transition-opacity duration-200"
        >
          <div className="rounded-3xl border border-border/80 bg-surface/50 backdrop-blur-xs p-6 sm:p-8 lg:p-10 shadow-xl">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 items-start">
              {/* Left Column: Capability Details & Stack */}
              <div>
                <div className="flex items-center gap-3 border-b border-border pb-4">
                  <div className="flex size-10 items-center justify-center rounded-xl border border-border bg-surface-raised text-accent">
                    {iconMap[selectedPillar.id] ?? <Compass className="size-5" />}
                  </div>
                  <div>
                    <span className="font-mono-code text-xs font-semibold uppercase tracking-wider text-accent">
                      Discipline 0{selectedIndex + 1}
                    </span>
                    <h3 className="font-mono-code text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                      {selectedPillar.title}
                    </h3>
                  </div>
                </div>

                {/* Primary concise statement */}
                <p className="mt-5 text-base sm:text-lg leading-relaxed text-foreground font-medium">
                  &ldquo;{selectedPillar.oneLiner}&rdquo;
                </p>

                {/* Capabilities Chips */}
                <div className="mt-7">
                  <h4 className="font-mono-code text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
                    Core Capabilities &amp; Frameworks
                  </h4>
                  <ul
                    className="mt-3 flex flex-wrap gap-2"
                    aria-label={`${selectedPillar.title} capabilities`}
                  >
                    {selectedPillar.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-xl border border-border bg-surface-raised px-3.5 py-1.5 font-mono-code text-xs font-medium text-foreground transition-colors hover:border-accent/40"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Production Verification Metadata */}
                <div className="mt-8 flex items-center gap-3 border-t border-border pt-5 text-xs text-foreground-subtle">
                  <span className="flex size-2 rounded-full bg-accent" />
                  <span>Verified across production enterprise &amp; consumer apps</span>
                </div>
              </div>

              {/* Right Column: Understated Architecture / Pipeline Flowchart */}
              <div className="rounded-2xl border border-border bg-surface-raised/70 p-5 sm:p-6">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <span className="font-mono-code text-xs font-semibold uppercase tracking-wider text-accent">
                    Conceptual Architecture Model
                  </span>
                  <span className="font-mono-code text-[11px] text-foreground-subtle">
                    Data &amp; Control Flow
                  </span>
                </div>

                {/* Downward Pipeline */}
                <div className="mt-5 space-y-2.5">
                  {pipeline.map((step, index) => {
                    const isLast = index === pipeline.length - 1;
                    return (
                      <div key={step.label} className="flex flex-col items-center">
                        <div className="w-full rounded-xl border border-border bg-surface p-3 transition-colors hover:border-accent/40">
                          <div className="flex items-center justify-between">
                            <span className="font-mono-code text-xs font-bold text-foreground">
                              {step.label}
                            </span>
                            <span className="font-mono-code text-[10px] text-foreground-subtle">
                              0{index + 1}
                            </span>
                          </div>
                          {step.subtext ? (
                            <p className="mt-1 text-[11px] text-foreground-muted">
                              {step.subtext}
                            </p>
                          ) : null}
                        </div>

                        {!isLast && (
                          <div className="my-1 flex items-center justify-center text-accent/60" aria-hidden="true">
                            <ArrowDown className="size-3.5" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <p className="mt-4 text-[11px] leading-relaxed text-foreground-subtle/80 italic">
                  *Understated conceptual visual. Production architectures adapt to domain complexity and modular constraints.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE ARCHITECTURE THINKING VISUALIZATION */}
        <div className="mt-12 sm:mt-16">
          <ArchitectureFlow />
        </div>
      </Container>
    </section>
  );
}
