import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Code2,
  ExternalLink,
  Globe,
  Layers,
  Lock,
  Search,
  Server,
  ShieldAlert,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { ProjectHeader } from "@/components/layout/project-header";
import { Container } from "@/components/ui/container";
import { LiquidGlass } from "@/components/ui/liquid-glass";

export const metadata: Metadata = {
  title: "LaunchProof Case Study | Website Launch Readiness Platform | Dineshbabu Elumalai",
  description:
    "Technical case study on LaunchProof: an independent web product verifying website release readiness, security headers, canonical metadata, and viewport scaling with automated checks and deterministic scoring.",
  alternates: {
    canonical: "https://erbdinesh.com/projects/launchproof",
  },
};

const READINESS_CHECK_CATEGORIES = [
  {
    category: "Availability",
    icon: Server,
    description: "Confirms domain reachability, HTTP 200 response codes, and latency budgets under 1,000ms.",
    checks: [
      { key: "availability.reachable", name: "Host Reachability", points: 15 },
      { key: "availability.http_status", name: "HTTP 200 OK Status", points: 15 },
      { key: "availability.response_time", name: "Response Latency Budget", points: 10 },
    ],
  },
  {
    category: "Security",
    icon: Lock,
    description: "Audits HTTPS transport enforcement and critical HTTP security defense headers.",
    checks: [
      { key: "security.https", name: "HTTPS Transport Enforcement", points: 15 },
      { key: "security.headers", name: "Security Headers (HSTS, CSP, X-Frame-Options)", points: 15 },
    ],
  },
  {
    category: "Page Layout & SEO",
    icon: Layers,
    description: "Evaluates document metadata required for indexing, link previews, and responsive viewports.",
    checks: [
      { key: "page.title", name: "Document Title Presence & Length", points: 10 },
      { key: "page.meta_description", name: "Search Meta Description Tag", points: 10 },
      { key: "page.viewport", name: "Mobile Viewport Scaling Configuration", points: 10 },
    ],
  },
  {
    category: "Discoverability",
    icon: Search,
    description: "Verifies crawler directive access rules and XML sitemap discoverability.",
    checks: [
      { key: "discoverability.robots", name: "robots.txt Accessibility", points: 5 },
      { key: "discoverability.sitemap", name: "XML Sitemap Presence", points: 5 },
    ],
  },
] as const;

const ARCHITECTURE_LAYERS = [
  {
    step: "01",
    name: "Client UI Layer",
    tech: "Next.js 16 (App Router) + React 19 + Tailwind CSS",
    detail:
      "Captures target URL, validates syntax client-side, and renders real-time scan progress, category status accordions, and Launch Score gauges.",
  },
  {
    step: "02",
    name: "API & Security Boundary",
    tech: "Route Handlers + HMAC IP Hashing + SSRF Filter",
    detail:
      "Enforces anonymous rate-limiting via HMAC-SHA256 fingerprinting (zero raw IP persistence). Blocks internal intranet IPs (127.0.0.1, 10.0.0.0/8, 169.254.169.254).",
  },
  {
    step: "03",
    name: "Inspection & Crawl Engine",
    tech: "lib/scans/crawler.ts + http-client.ts",
    detail:
      "Dispatches resilient HTTP client requests with strict timeouts (10s), tracks redirect hops, parses raw HTML DOM headers, and runs 17 structured checks.",
  },
  {
    step: "04",
    name: "Launch Score & Verdict Policy",
    tech: "lib/launch-score/calculate-launch-score.ts + v0-verdict.ts",
    detail:
      "Computes a 0–100 score by summing earned points over scorable max points with duplicate check precedence (fail > warning > pass). Returns READY / NOT READY verdict.",
  },
  {
    step: "05",
    name: "Persistence & Share Layer",
    tech: "Supabase PostgreSQL + Row Level Security (RLS)",
    detail:
      "Stores scans, check evidence, and public report share tokens. Employs server-only SUPABASE_SECRET_KEY for privileged report management.",
  },
] as const;

export default function LaunchProofCaseStudyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/20 selection:text-accent pb-20">
      {/* Top Sticky Header */}
      <ProjectHeader projectName="LaunchProof" category="Independent Web Product" />

      <main className="mt-8 sm:mt-12">
        <Container size="wide" className="space-y-14 sm:space-y-20">
          {/* Hero Section */}
          <section className="relative rounded-3xl border border-border/80 bg-surface/50 backdrop-blur-xs p-6 sm:p-10 lg:p-12 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-5">
              <div className="flex items-center gap-2.5">
                <LiquidGlass
                  variant="control"
                  className="rounded-full px-3 py-1 font-mono-code text-xs font-semibold uppercase tracking-wider text-accent"
                >
                  Production Case Study
                </LiquidGlass>
                <span className="text-foreground-subtle/40">•</span>
                <span className="font-mono-code text-xs text-foreground-subtle">
                  Independent Web Architecture
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400 px-3 py-1 font-mono-code text-xs font-semibold">
                  <span className="size-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
                  Live Web Product
                </span>
              </div>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-12 items-start">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent/15 border border-accent/30 text-accent">
                    <Globe className="size-6" />
                  </div>
                  <div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                      LaunchProof
                    </h1>
                    <p className="font-mono-code text-sm text-foreground-subtle">
                      Automated Website Launch Readiness & Verification Platform
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-base sm:text-lg leading-relaxed text-foreground-muted">
                  LaunchProof is a production-focused web platform that solves the release readiness
                  dilemma for web teams. It runs 17 automated checks across availability, security headers,
                  indexing metadata, and mobile viewports, synthesizing a definitive <strong>READY / NOT READY</strong> launch
                  verdict and numerical Launch Score.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="https://launchproof.erbdinesh.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-glass-emerald inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-[var(--emerald-action-text)] shadow-xs transition-all hover:brightness-105 active:scale-95"
                  >
                    <span>Visit Live Application</span>
                    <ArrowUpRight className="size-4" />
                  </a>

                  <a
                    href="https://github.com/ERBDINESH/launchproof"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-xs sm:text-sm font-semibold text-foreground-muted hover:text-foreground hover:border-border-strong transition-all shadow-xs"
                  >
                    <Code2 className="size-4" />
                    <span>View GitHub Repository</span>
                    <ExternalLink className="size-3 text-foreground-subtle" />
                  </a>
                </div>
              </div>

              {/* Quick Specs Sidebar */}
              <div className="lg:col-span-4 rounded-2xl border border-border/80 bg-surface-raised/60 p-5 space-y-4">
                <h2 className="font-mono-code text-xs font-semibold uppercase tracking-wider text-accent border-b border-border/50 pb-2">
                  Project Snapshot
                </h2>
                <div className="space-y-2.5 text-xs font-mono-code">
                  <div className="flex justify-between">
                    <span className="text-foreground-subtle">Role:</span>
                    <span className="text-foreground font-semibold">Architect & Solo Engineer</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-subtle">Architecture:</span>
                    <span className="text-foreground font-semibold">Next.js 16 App Router</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-subtle">Database:</span>
                    <span className="text-foreground font-semibold">Supabase PostgreSQL + RLS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-subtle">Deployment:</span>
                    <span className="text-foreground font-semibold">Cloudflare Pages / Vercel</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-subtle">Automated Checks:</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-semibold">17 Scored Rules</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-subtle">Test Engine:</span>
                    <span className="text-foreground font-semibold">Node --test + TypeScript</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 1: The Problem Being Solved */}
          <section className="space-y-6">
            <div className="border-l-2 border-accent pl-4">
              <span className="font-mono-code text-xs font-semibold uppercase tracking-wider text-accent">
                01. Problem Analysis
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
                The Silent Launch Defect Dilemma
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-border bg-surface/60 p-5 space-y-2.5">
                <div className="flex size-9 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                  <ShieldAlert className="size-4" />
                </div>
                <h3 className="font-semibold text-foreground text-sm sm:text-base">
                  Security Header Omissions
                </h3>
                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                  Web apps frequently ship with HTTPS enabled but omit HTTP Strict Transport Security
                  (HSTS), Content-Security-Policy (CSP), and X-Frame-Options, exposing users to clickjacking
                  and SSL downgrade attacks.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface/60 p-5 space-y-2.5">
                <div className="flex size-9 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Search className="size-4" />
                </div>
                <h3 className="font-semibold text-foreground text-sm sm:text-base">
                  Broken SEO & Social Previews
                </h3>
                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                  Missing canonical tags create duplicate content penalties in search engine indexes.
                  Unconfigured OpenGraph tags cause broken preview cards on LinkedIn, Twitter, and Slack,
                  degrading launch credibility.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface/60 p-5 space-y-2.5">
                <div className="flex size-9 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <Clock className="size-4" />
                </div>
                <h3 className="font-semibold text-foreground text-sm sm:text-base">
                  Subjective Manual Checklists
                </h3>
                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                  Engineering teams rely on manual QA spreadsheets that are inconsistently followed before
                  deployments. LaunchProof replaces checklists with an automated, reproducible scan returning
                  an authoritative Launch Score.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Actual Implementation Status */}
          <section className="space-y-6">
            <div className="border-l-2 border-accent pl-4">
              <span className="font-mono-code text-xs font-semibold uppercase tracking-wider text-accent">
                02. Delivery Status
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
                Implementation State & Project Boundaries
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Implemented */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 text-slate-800 dark:border-emerald-500/30 dark:bg-emerald-950/20 dark:text-foreground p-5 space-y-3">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-mono-code text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 className="size-4" />
                  Implemented & Live
                </div>
                <ul className="space-y-2 text-xs text-foreground-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400">•</span>
                    <span>17 automated readiness checks across 4 operational categories</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400">•</span>
                    <span>Weighted Launch Score algorithm (0–100) with duplicate precedence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400">•</span>
                    <span>Verdict generator classifying release blockers vs warnings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400">•</span>
                    <span>Public report share URLs with server-only privileged Supabase tokens</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400">•</span>
                    <span>HMAC-SHA256 anonymous IP rate limiting (zero plain IP storage)</span>
                  </li>
                </ul>
              </div>

              {/* Experimental */}
              <div className="rounded-2xl border border-blue-200 bg-blue-50/70 text-slate-800 dark:border-blue-500/30 dark:bg-blue-950/20 dark:text-foreground p-5 space-y-3">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-mono-code text-xs font-bold uppercase tracking-wider">
                  <Clock className="size-4" />
                  Active Experiment
                </div>
                <ul className="space-y-2 text-xs text-foreground-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">•</span>
                    <span>Multi-page recursive crawler with depth limiting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">•</span>
                    <span>Historical scan comparison diffs across release iterations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">•</span>
                    <span>Dynamic redirect chain latency tracing</span>
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
                    <span>GitHub Actions CI/CD bot for pull request merge blocking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground-subtle">•</span>
                    <span>Core Web Vitals synthetic field budget audit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground-subtle">•</span>
                    <span>Automated weekly regression cron monitoring</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3: Technical Architecture */}
          <section className="space-y-6">
            <div className="border-l-2 border-accent pl-4">
              <span className="font-mono-code text-xs font-semibold uppercase tracking-wider text-accent">
                03. Technical Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
                End-to-End Scan Pipeline & Data Flow
              </h2>
            </div>

            <div className="rounded-3xl border border-border/80 bg-surface/50 p-6 sm:p-8 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {ARCHITECTURE_LAYERS.map((layer) => (
                  <div
                    key={layer.step}
                    className="rounded-2xl border border-border/80 bg-surface-raised/60 p-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between border-b border-border/50 pb-2">
                        <span className="font-mono-code text-xs font-bold text-accent">
                          {layer.step}
                        </span>
                        <span className="font-mono-code text-[10px] text-foreground-subtle">
                          PIPELINE
                        </span>
                      </div>
                      <h3 className="mt-2.5 font-bold text-foreground text-sm">
                        {layer.name}
                      </h3>
                      <p className="mt-1 font-mono-code text-[11px] text-accent/80">
                        {layer.tech}
                      </p>
                      <p className="mt-2 text-xs text-foreground-muted leading-relaxed">
                        {layer.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Scored Check Categories Breakdown */}
              <div className="mt-8 border-t border-border/60 pt-6">
                <h3 className="font-mono-code text-xs font-semibold uppercase tracking-wider text-accent mb-4">
                  Evaluated Check Matrix (17 Rules)
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {READINESS_CHECK_CATEGORIES.map((cat) => {
                    const CatIcon = cat.icon;
                    return (
                      <div
                        key={cat.category}
                        className="rounded-2xl border border-border bg-surface/80 p-4 space-y-3"
                      >
                        <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
                          <CatIcon className="size-4 text-accent" />
                          <span>{cat.category}</span>
                        </div>
                        <p className="text-xs text-foreground-subtle leading-snug">
                          {cat.description}
                        </p>
                        <div className="space-y-1.5 border-t border-border/50 pt-2 text-[11px] font-mono-code text-foreground-muted">
                          {cat.checks.map((chk) => (
                            <div key={chk.key} className="flex justify-between">
                              <span className="truncate pr-1">{chk.name}</span>
                              <span className="text-accent shrink-0">+{chk.points}pts</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Key Engineering Decisions */}
          <section className="space-y-6">
            <div className="border-l-2 border-accent pl-4">
              <span className="font-mono-code text-xs font-semibold uppercase tracking-wider text-accent">
                04. Architectural Decisions
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
                Design Trade-Offs & Security Boundaries
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface/60 p-6 space-y-3">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Lock className="size-4 text-accent" />
                  Server-Only Privileged Security Boundaries
                </h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  The Supabase Service Role Key (<code className="font-mono-code text-xs text-accent">SUPABASE_SECRET_KEY</code>)
                  is strictly quarantined within server-only route handlers and Server Actions. Browser bundles
                  interact exclusively through unprivileged client clients governed by PostgreSQL Row-Level
                  Security (RLS), preventing unauthorized write access to public report shares.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface/60 p-6 space-y-3">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <ShieldCheck className="size-4 text-accent" />
                  Privacy-First HMAC Rate Limiting
                </h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  To prevent denial-of-service abuse while upholding user privacy, anonymous scan quotas are
                  enforced using an HMAC-SHA256 hash of the client IP and User-Agent salted with
                  <code className="font-mono-code text-xs text-accent"> ANONYMOUS_SCAN_HASH_SECRET</code>. Raw IP addresses
                  are never written to database tables or logs.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface/60 p-6 space-y-3">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Server className="size-4 text-accent" />
                  SSRF Defense & URL Policy Enforcement
                </h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  Before any outgoing HTTP scan request is dispatched, the URL is resolved against a strict
                  policy engine (<code className="font-mono-code text-xs text-accent">url-policy.ts</code>). Requests to
                  private IP spaces (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, loopbacks, and cloud metadata endpoints)
                  are immediately rejected to prevent Server-Side Request Forgery.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface/60 p-6 space-y-3">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Code2 className="size-4 text-accent" />
                  Policy-Driven Deterministic Scoring
                </h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  Rather than arbitrary heuristic scores, LaunchProof calculates scores through explicit
                  point contracts (<code className="font-mono-code text-xs text-accent">calculate-launch-score.ts</code>).
                  Duplicate checks follow strict precedence (<code className="font-mono-code text-xs">fail &gt; warning &gt; pass &gt; skipped</code>),
                  guaranteeing identical scan inputs always produce mathematically identical scores.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Engineering Evidence */}
          <section className="space-y-6">
            <div className="border-l-2 border-accent pl-4">
              <span className="font-mono-code text-xs font-semibold uppercase tracking-wider text-accent">
                05. Engineering Evidence
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
                Verified Test Scenarios & Repository Artifacts
              </h2>
            </div>

            <div className="rounded-3xl border border-border/80 bg-surface/50 p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
                <div className="font-mono-code text-xs text-foreground-subtle">
                  Test Execution Command:
                  <span className="ml-2 rounded-md bg-surface px-2 py-0.5 text-accent border border-border">
                    tsc --project tsconfig.test.json && node --test &quot;.next/tests/lib/**/*.test.js&quot;
                  </span>
                </div>
                <span className="font-mono-code text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="size-3.5" />
                  Automated Unit & Integration Suites
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-border bg-surface-raised/40 p-4 space-y-2">
                  <span className="font-mono-code text-xs font-bold text-foreground flex items-center gap-1.5">
                    <Terminal className="size-3.5 text-accent" />
                    lib/launch-score/calculate-launch-score.test.ts
                  </span>
                  <p className="text-xs text-foreground-muted leading-relaxed">
                    Verifies weighted point summation, exclusion of skipped checks from scorable maximums,
                    and status precedence resolution when multiple scans report conflicting results.
                  </p>
                  <pre className="rounded-xl border border-neutral-800 bg-[#070d14] p-3 text-[11px] font-mono-code text-neutral-300 overflow-x-auto">
{`test("calculates score with duplicate key precedence", () => {
  const results = [
    { key: "security.https", status: "pass" },
    { key: "security.https", status: "fail" } // Should take precedence
  ];
  const score = calculateLaunchScore(results);
  assert.equal(score.earnedPoints, 0);
});`}
                  </pre>
                </div>

                <div className="rounded-2xl border border-border bg-surface-raised/40 p-4 space-y-2">
                  <span className="font-mono-code text-xs font-bold text-foreground flex items-center gap-1.5">
                    <Terminal className="size-3.5 text-accent" />
                    lib/scans/url-policy.test.ts
                  </span>
                  <p className="text-xs text-foreground-muted leading-relaxed">
                    Validates protocol sanitization, normalization of target hostnames, and rejection
                    of malicious loopback, private intranet, or IPv6-mapped localhost URLs.
                  </p>
                  <pre className="rounded-xl border border-neutral-800 bg-[#070d14] p-3 text-[11px] font-mono-code text-neutral-300 overflow-x-auto">
{`test("rejects private intranet addresses to prevent SSRF", () => {
  assert.throws(() => validateScanUrl("http://169.254.169.254/latest/meta-data"));
  assert.throws(() => validateScanUrl("http://127.0.0.1:8080/admin"));
  assert.ok(validateScanUrl("https://erbdinesh.com").isValid);
});`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Trade-offs & Limitations */}
          <section className="space-y-6">
            <div className="border-l-2 border-accent pl-4">
              <span className="font-mono-code text-xs font-semibold uppercase tracking-wider text-accent">
                06. Limitations & Trade-Offs
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
                Explicit Engineering Boundaries
              </h2>
            </div>

            <div className="rounded-2xl border border-amber-500/20 bg-surface/50 p-6 space-y-4 text-xs sm:text-sm text-foreground-muted leading-relaxed">
              <p>
                <strong>1. Target Scope Boundary:</strong> LaunchProof v0.4 focuses on single target URLs (typically
                the landing page or marketing entry point) rather than full-domain crawls. This keeps execution times
                under standard 10-second serverless HTTP execution budgets and prevents unbounded crawler resource consumption.
              </p>
              <p>
                <strong>2. Static HTML vs Heavy Client SPA:</strong> Checks evaluate the raw HTTP response and initial DOM.
                Websites that render critical SEO meta tags exclusively via client-side JavaScript hydration (without SSR or
                static export) may require headless browser execution, which is planned for a future worker tier.
              </p>
              <p>
                <strong>3. No Fabricated Performance Claims:</strong> We publish zero unverified customer adoption metrics,
                simulated speedup claims, or fictitious enterprise logos. All capabilities documented here reflect actual
                source code residing in the LaunchProof repository.
              </p>
            </div>
          </section>

          {/* Bottom Navigation CTA */}
          <section className="rounded-3xl border border-border bg-surface-raised/40 p-8 text-center space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Explore More Engineering Work
            </h2>
            <p className="text-sm text-foreground-muted max-w-xl mx-auto">
              Return to the main portfolio to review verified production iOS case studies (BNL, Insomnia Cookies,
              Mighty Audio) or explore the Interactive AI Engineering Lab.
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
                href="/projects/personal-ai-agent"
                className="inline-flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:border-blue-300 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20 px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all shadow-xs"
              >
                <span>Read Personal AI Agent Case Study</span>
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </section>
        </Container>
      </main>
    </div>
  );
}
