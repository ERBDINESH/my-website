import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Bot,
  Brain,
  CheckCircle2,
  Clock,
  Code2,
  Lock,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { CpiObservationDemo } from "@/components/demos/cpi-observation-demo";
import { ProjectHeader } from "@/components/layout/project-header";
import { Container } from "@/components/ui/container";
import { LiquidGlass } from "@/components/ui/liquid-glass";

export const metadata: Metadata = {
  title: "Personal AI Agent Case Study | Developer Automation & Financial Analysis | Dineshbabu Elumalai",
  description:
    "Technical case study on an independent engineering project exploring developer automation, local LLM integration via Ollama, deterministic CPI inflation observation, and test-oriented workflows.",
  alternates: {
    canonical: "https://erbdinesh.com/projects/personal-ai-agent",
  },
};

const PIPELINE_COMPONENTS = [
  {
    step: "01",
    name: "CLI Stream & Router",
    tech: "src/router.js + readline",
    detail:
      "Inspects incoming messages with regex patterns to route commands: /forex queries, persistent memory updates, workspace note searches, or general conversation.",
  },
  {
    step: "02",
    name: "Deterministic Data Engine",
    tech: "forex/providers/bls.js + cpi-changes.js",
    detail:
      "Fetches and normalizes official Bureau of Labor Statistics CPI data points. Computes exact MoM and YoY percent changes with calendar-year rollover handling.",
  },
  {
    step: "03",
    name: "Mathematical Classification",
    tech: "forex/inflation-observation.js",
    detail:
      "Classifies trends into accelerating, cooling, unchanged, or mixed. Uses strict epsilon floating-point tolerance (|Δ| ≤ 1e-9) to guarantee zero arithmetic errors.",
  },
  {
    step: "04",
    name: "Local Profile Memory",
    tech: "src/memory.js + memory/profile.json",
    detail:
      "Maintains persistent user attributes (profession, preferences, workspace notes) and injects contextual grounding into LLM prompts without cloud leaks.",
  },
  {
    step: "05",
    name: "Offline Model Inference",
    tech: "src/model.js + Ollama (qwen2.5:3b)",
    detail:
      "Dispatches conversational queries to a local Ollama daemon (localhost:11434). Operates 100% offline with zero external API tokens or telemetry.",
  },
] as const;

export default function PersonalAIAgentCaseStudyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-blue-500/20 selection:text-blue-800 dark:selection:text-blue-400 pb-20">
      {/* Top Sticky Header */}
      <ProjectHeader projectName="Personal AI Agent" category="AI Experiment" />

      <main className="mt-8 sm:mt-12">
        <Container size="wide" className="space-y-14 sm:space-y-20">
          {/* Hero Section */}
          <section className="relative rounded-3xl border border-blue-200 dark:border-blue-500/30 bg-surface/50 backdrop-blur-xs p-6 sm:p-10 lg:p-12 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-5">
              <div className="flex items-center gap-2.5">
                <LiquidGlass
                  variant="control"
                  className="rounded-full px-3 py-1 font-mono-code text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-[var(--blue-accent)]"
                >
                  Technical Case Study & Live Demo
                </LiquidGlass>
                <span className="text-foreground-subtle/40">•</span>
                <span className="font-mono-code text-xs text-foreground-subtle">
                  Applied Engineering Experiment
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-400 px-3 py-1 font-mono-code text-xs font-semibold">
                  <Clock className="size-3.5" />
                  In Progress (Active Experiment)
                </span>
              </div>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-12 items-start">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 dark:bg-blue-500/15 dark:border-blue-500/30 dark:text-blue-400">
                    <Bot className="size-6" />
                  </div>
                  <div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                      Personal AI Agent
                    </h1>
                    <p className="font-mono-code text-sm text-blue-700 dark:text-blue-400/80">
                      Developer Automation, Local LLM Tooling & Deterministic Data Pipelines
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-base sm:text-lg leading-relaxed text-foreground-muted">
                  An ongoing software engineering exploration bridging the gap between probabilistic
                  language models and deterministic software systems. Built to evaluate local offline LLMs,
                  structured command routing, test harnesses, and strict mathematical data classification
                  free of AI hallucinations.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="#interactive-demo"
                    className="liquid-glass-blue inline-flex items-center gap-2 rounded-xl border border-blue-300 dark:border-[var(--blue-glass-border)] px-4 py-2.5 text-xs sm:text-sm font-semibold text-blue-800 dark:text-[var(--blue-action-text)] shadow-xs transition-all hover:bg-blue-100/90 dark:hover:brightness-110 active:scale-95 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer"
                  >
                    <Terminal className="size-4" />
                    <span>Try Interactive Demo Below</span>
                  </a>

                  <Link
                    href="/#projects"
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-xs sm:text-sm font-semibold text-foreground-muted hover:text-foreground hover:border-border-strong transition-all shadow-xs"
                  >
                    <ArrowLeft className="size-4" />
                    <span>Return to Portfolio</span>
                  </Link>
                </div>
              </div>

              {/* Quick Specs Sidebar */}
              <div className="lg:col-span-4 rounded-2xl border border-blue-200 dark:border-blue-500/20 bg-surface-raised/60 p-5 space-y-4">
                <h2 className="font-mono-code text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-[var(--blue-accent)] border-b border-border/50 pb-2">
                  Experiment Metadata
                </h2>
                <div className="space-y-2.5 text-xs font-mono-code">
                  <div className="flex justify-between">
                    <span className="text-foreground-subtle">Status:</span>
                    <span className="text-blue-700 dark:text-blue-400 font-semibold">Active In-House Prototype</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-subtle">Local Model:</span>
                    <span className="text-foreground font-semibold">Qwen 2.5 3B (via Ollama)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-subtle">Router Engine:</span>
                    <span className="text-foreground font-semibold">Command Regex + Intent</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-subtle">Unit Test Suite:</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-semibold">61 Tests (node --test)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-subtle">Deterministic Core:</span>
                    <span className="text-foreground font-semibold">forex/inflation-observation.js</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-subtle">Cloud Dependency:</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Zero (100% Offline)</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 1: Why the Project Exists */}
          <section className="space-y-6">
            <div className="border-l-2 border-blue-600 dark:border-[var(--blue-accent)] pl-4">
              <span className="font-mono-code text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-[var(--blue-accent)]">
                01. Motivation & Philosophy
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
                Why Build a Personal Engineering Agent?
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-border bg-surface/60 p-5 space-y-2.5">
                <div className="flex size-9 items-center justify-center rounded-xl bg-blue-50 border border-blue-200 text-blue-600 dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-400">
                  <Brain className="size-4" />
                </div>
                <h3 className="font-semibold text-foreground text-sm sm:text-base">
                  Separating Probabilistic from Deterministic
                </h3>
                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                  Language models are excellent at summarizing, drafting, and conversational parsing,
                  but notoriously unreliable at arithmetic and strict state transitions. This project strictly
                  enforces that calculations are executed by verified JavaScript pure functions.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface/60 p-5 space-y-2.5">
                <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400">
                  <Lock className="size-4" />
                </div>
                <h3 className="font-semibold text-foreground text-sm sm:text-base">
                  Privacy & Zero Telemetry Leaks
                </h3>
                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                  Engineering notes, profile details, and experimental code snippets remain completely
                  on local disk. By running smaller quantized models through Ollama, no private source code
                  or proprietary context is ever transmitted over the public internet.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface/60 p-5 space-y-2.5">
                <div className="flex size-9 items-center justify-center rounded-xl bg-amber-50 border border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400">
                  <ShieldCheck className="size-4" />
                </div>
                <h3 className="font-semibold text-foreground text-sm sm:text-base">
                  Test-Harness-Driven Automation
                </h3>
                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                  Rather than treating AI as an oracle, the agent operates inside automated test harnesses.
                  Every pipeline transformation—from BLS data normalization to January rollover math—is backed
                  by deterministic assertions.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Actual Implementation Status */}
          <section className="space-y-6">
            <div className="border-l-2 border-blue-600 dark:border-[var(--blue-accent)] pl-4">
              <span className="font-mono-code text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-[var(--blue-accent)]">
                02. Implementation Boundaries
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
                What Works Today vs What Remains Experimental
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Implemented */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 text-slate-800 dark:border-emerald-500/30 dark:bg-emerald-950/20 dark:text-foreground p-5 space-y-3">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-mono-code text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 className="size-4" />
                  Implemented & Tested (61 Tests)
                </div>
                <ul className="space-y-2 text-xs text-foreground-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400">•</span>
                    <span>Command router handling /forex, note saving, and memory</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400">•</span>
                    <span>Deterministic BLS CPI parser and monthly series normalizer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400">•</span>
                    <span>MoM/YoY change calculator with calendar year rollover math</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400">•</span>
                    <span>Epsilon-tolerant trend classifier (accelerating / cooling / unchanged)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400">•</span>
                    <span>Local Ollama chat integration with memory context injection</span>
                  </li>
                </ul>
              </div>

              {/* Experimental */}
              <div className="rounded-2xl border border-blue-200 bg-blue-50/70 text-slate-800 dark:border-blue-500/30 dark:bg-blue-950/20 dark:text-foreground p-5 space-y-3">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-mono-code text-xs font-bold uppercase tracking-wider">
                  <Clock className="size-4" />
                  Experimental In-Progress
                </div>
                <ul className="space-y-2 text-xs text-foreground-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">•</span>
                    <span>Dynamic multi-step tool chaining without explicit /commands</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">•</span>
                    <span>Conversational memory compaction and profile synthesis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">•</span>
                    <span>Automated sentiment factor weighting for news headlines</span>
                  </li>
                </ul>
              </div>

              {/* Planned */}
              <div className="rounded-2xl border border-border bg-surface/40 p-5 space-y-3">
                <div className="flex items-center gap-2 text-foreground-subtle font-mono-code text-xs font-bold uppercase tracking-wider">
                  <Terminal className="size-4" />
                  Planned Roadmap
                </div>
                <ul className="space-y-2 text-xs text-foreground-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-foreground-subtle">•</span>
                    <span>Local semantic code search across personal iOS repositories</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground-subtle">•</span>
                    <span>Automated Git commit message and PR description generator</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground-subtle">•</span>
                    <span>Multi-provider economic data triangulation (FRED & Eurostat)</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3: Technical Architecture */}
          <section className="space-y-6">
            <div className="border-l-2 border-blue-600 dark:border-[var(--blue-accent)] pl-4">
              <span className="font-mono-code text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-[var(--blue-accent)]">
                03. Pipeline Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
                Router, Tools & Deterministic Execution
              </h2>
            </div>

            <div className="rounded-3xl border border-border/80 bg-surface/50 p-6 sm:p-8 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {PIPELINE_COMPONENTS.map((layer) => (
                  <div
                    key={layer.step}
                    className="rounded-2xl border border-border/80 bg-surface-raised/60 p-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between border-b border-border/50 pb-2">
                        <span className="font-mono-code text-xs font-bold text-blue-700 dark:text-blue-400">
                          {layer.step}
                        </span>
                        <span className="font-mono-code text-[10px] text-foreground-subtle">
                          STAGE
                        </span>
                      </div>
                      <h3 className="mt-2.5 font-bold text-foreground text-sm">
                        {layer.name}
                      </h3>
                      <p className="mt-1 font-mono-code text-[11px] text-blue-700 dark:text-blue-400/80">
                        {layer.tech}
                      </p>
                      <p className="mt-2 text-xs text-foreground-muted leading-relaxed">
                        {layer.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Code Inspection Snippet */}
              <div className="mt-6 border-t border-border/60 pt-6">
                <div className="flex items-center justify-between mb-3 text-xs font-mono-code">
                  <span className="font-bold text-foreground flex items-center gap-2">
                    <Code2 className="size-4 text-blue-600 dark:text-blue-400" />
                    Source Extract: forex/inflation-observation.js
                  </span>
                  <span className="text-foreground-subtle">Pure Function • No Hallucinations</span>
                </div>
                <pre className="rounded-2xl border border-neutral-800 bg-[#070d14] p-4 text-[12px] font-mono-code text-neutral-300 overflow-x-auto leading-relaxed">
{`function classifyTrend(current, previous, epsilon = 1e-9) {
  if (previous === null) return "unknown";
  const difference = current - previous;
  if (Math.abs(difference) <= epsilon) return "unchanged";
  return difference > 0 ? "accelerating" : "cooling";
}

function combineTrends(mom, yoy) {
  if (mom === "unknown" || yoy === "unknown") return "unknown";
  if (mom === yoy) return mom;
  return "mixed";
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* Section 4: Interactive Working Demo */}
          <section className="space-y-6">
            <div className="border-l-2 border-blue-600 dark:border-[var(--blue-accent)] pl-4">
              <span className="font-mono-code text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-[var(--blue-accent)]">
                04. Live Engineering Demonstration
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
                Deterministic Inflation Trend Classification
              </h2>
            </div>

            {/* Embedded Live React Component */}
            <CpiObservationDemo />
          </section>

          {/* Section 5: Engineering Evidence */}
          <section className="space-y-6">
            <div className="border-l-2 border-blue-600 dark:border-[var(--blue-accent)] pl-4">
              <span className="font-mono-code text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-[var(--blue-accent)]">
                05. Test Evidence & Parity
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
                Verified Test Scenarios (Node Test Runner)
              </h2>
            </div>

            <div className="rounded-3xl border border-border/80 bg-surface/50 p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
                <div className="font-mono-code text-xs text-foreground-subtle">
                  Test Execution Command:
                  <span className="ml-2 rounded-md bg-surface px-2 py-0.5 text-blue-700 dark:text-blue-400 border border-border">
                    node --test test/*.test.js
                  </span>
                </div>
                <span className="font-mono-code text-xs text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5" />
                  61/61 Automated Tests Passing
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-border bg-surface-raised/40 p-4 space-y-2">
                  <span className="font-mono-code text-xs font-bold text-foreground flex items-center gap-1.5">
                    <Terminal className="size-3.5 text-blue-600 dark:text-blue-400" />
                    Floating-Point Epsilon Precision Test
                  </span>
                  <p className="text-xs text-foreground-muted leading-relaxed">
                    Verifies that rate differences below epsilon are classified as flat/unchanged,
                    preventing standard double-precision float drift from triggering false alerts.
                  </p>
                  <pre className="rounded-xl border border-neutral-800 bg-[#070d14] p-3 text-[11px] font-mono-code text-neutral-300 overflow-x-auto">
{`test("uses configurable tolerance for floating-point equality", () => {
  const unchanged = createInflationObservation(
    createCpiChanges(0.3000000005, 3),
    createPreviousRates(0.3, 3),
    { epsilon: 1e-9 }
  );
  assert.equal(unchanged.trend.mom, "unchanged");
});`}
                  </pre>
                </div>

                <div className="rounded-2xl border border-border bg-surface-raised/40 p-4 space-y-2">
                  <span className="font-mono-code text-xs font-bold text-foreground flex items-center gap-1.5">
                    <Terminal className="size-3.5 text-blue-600 dark:text-blue-400" />
                    Calendar Rollover Calculation Test
                  </span>
                  <p className="text-xs text-foreground-muted leading-relaxed">
                    Ensures that computing January month-over-month inflation correctly retrieves December
                    from the previous calendar year rather than failing across year boundaries.
                  </p>
                  <pre className="rounded-xl border border-neutral-800 bg-[#070d14] p-3 text-[11px] font-mono-code text-neutral-300 overflow-x-auto">
{`test("calculates previous rates across January rollover", () => {
  const inputs = calculateCpiObservationInputs(rolloverHistory);
  assert.deepEqual(inputs.previousRates.referencePeriod, {
    year: "2025",
    month: 12,
    period: "M12",
    periodName: "December"
  });
});`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Limitations & Disclaimer */}
          <section className="space-y-6">
            <div className="border-l-2 border-blue-600 dark:border-[var(--blue-accent)] pl-4">
              <span className="font-mono-code text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-[var(--blue-accent)]">
                06. Limitations & Disclaimer
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
                Defensible Engineering Constraints
              </h2>
            </div>

            <div className="rounded-2xl border border-amber-500/20 bg-surface/50 p-6 space-y-4 text-xs sm:text-sm text-foreground-muted leading-relaxed">
              <p>
                <strong>1. Prototype Classification:</strong> This project is a personal research and developer automation
                experiment. It is not commercial financial software, does not provide investment or currency trading advice,
                and should never be used for trading decisions.
              </p>
              <p>
                <strong>2. Hardware & Model Limitations:</strong> The local model runner leverages a quantized 3B parameter model
                (Qwen 2.5 3B). While fast and private on consumer hardware, it has constrained reasoning capabilities compared to
                larger frontier models and must be paired with strict deterministic validation gates.
              </p>
              <p>
                <strong>3. No Autonomous Swarms:</strong> We claim zero autonomous agent swarms, vector database RAG hallucination cures,
                or automated multi-agent trading. The system demonstrates disciplined, test-backed tool integration where code
                correctness is proven through test suites.
              </p>
            </div>
          </section>

          {/* Bottom Navigation CTA */}
          <section className="rounded-3xl border border-border bg-surface-raised/40 p-8 text-center space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Continue Exploring the Portfolio
            </h2>
            <p className="text-sm text-foreground-muted max-w-xl mx-auto">
              Review production native iOS case studies (BNL, Insomnia Cookies, Mighty Audio) or explore
              the 6-stage human-in-the-loop AI Engineering Lab.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/#projects"
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-4 py-2.5 text-xs sm:text-sm font-semibold text-foreground hover:border-border-strong transition-all shadow-xs"
              >
                <ArrowLeft className="size-4" />
                <span>Return to Projects</span>
              </Link>
              <Link
                href="/projects/launchproof"
                className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300 dark:border-accent/30 dark:bg-accent/10 dark:text-accent dark:hover:bg-accent/20 px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all shadow-xs"
              >
                <span>Read LaunchProof Case Study</span>
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </section>
        </Container>
      </main>
    </div>
  );
}
