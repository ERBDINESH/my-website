import { ArrowDown, Download, MessageSquare, Terminal } from "lucide-react";
import { ActionLink } from "@/components/ui/action-link";
import { ConsultantBadge } from "@/components/ui/consultant-badge";
import { Container } from "@/components/ui/container";
import { EngineeringHero } from "@/components/animations/EngineeringHero";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { profile } from "@/data/portfolio";

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-20"
    >
      {/* Subtle emerald ambient lighting behind the hero content */}
      <div
        className="pointer-events-none absolute left-1/4 top-16 -z-10 h-[520px] w-[520px] rounded-full bg-emerald-500/[0.05] blur-[140px]"
        aria-hidden="true"
      />

      <Container size="wide">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(460px,1.25fr)] xl:grid-cols-[minmax(0,0.9fr)_minmax(560px,1.35fr)] lg:gap-10 xl:gap-14">
          {/* Main Hero Copy */}
          <div className="flex flex-col items-start text-left">
            {/* 1. Engineer Identity Primary */}
            <div className="space-y-1">
              <h1
                id="hero-heading"
                className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-[clamp(3rem,5vw,5.5rem)] lg:leading-[1.08]"
              >
                {profile.fullName}
              </h1>
              <p className="font-mono-code text-lg font-semibold text-accent sm:text-xl">
                {profile.professionalTitle}
              </p>
            </div>

            {/* 2. Core & Supporting Value Proposition */}
            <h2 className="mt-6 max-w-2xl text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl sm:leading-snug">
              &ldquo;{profile.headline}&rdquo;
            </h2>

            <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg sm:leading-relaxed">
              {profile.supportingMessage}
            </p>

            {/* 3. Supporting Identity & Availability Strip */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <ConsultantBadge />

              <LiquidGlass
                variant="control"
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 shadow-xs border-border"
              >
                <span className="relative flex size-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                <span className="text-xs font-medium text-foreground-muted">
                  Available for Senior Native iOS Roles &amp; Advisory
                </span>
              </LiquidGlass>
            </div>

            {/* Call to Actions: 2 Prominent Actions + 1 Subtle Text Link */}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <ActionLink href="#work" variant="primary">
                View Engineering Work
                <ArrowDown className="ml-2 size-4" aria-hidden="true" />
              </ActionLink>

              {profile.resumeUrl ? (
                <ActionLink
                  href={profile.resumeUrl}
                  variant="secondary"
                  download="Dineshbabu-Elumalai-Resume.pdf"
                >
                  <Download className="mr-2 size-4 text-accent" aria-hidden="true" />
                  Download Resume
                </ActionLink>
              ) : null}

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-2 py-2 text-sm font-medium text-foreground-muted hover:text-accent transition-colors"
              >
                <MessageSquare className="size-3.5 text-accent" aria-hidden="true" />
                <span>Discuss an iOS Project</span>
              </a>
            </div>

            {/* Technical Verification Pill Strip (Solid Content) */}
            <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-6 text-xs text-foreground-subtle">
              <span className="flex items-center gap-1.5 font-mono-code text-foreground-muted">
                <Terminal className="size-3 text-accent" aria-hidden="true" />
                Swift • SwiftUI • UIKit • Objective-C
              </span>
              <span className="hidden text-foreground-subtle/40 sm:inline">•</span>
              <span>Chennai, India (Remote &amp; Onsite)</span>
            </div>
          </div>

          {/* Interactive iPhone Hardware Visualization & Transformation Pipeline */}
          <div className="flex w-full items-center justify-center lg:justify-end">
            <EngineeringHero />
          </div>
        </div>
      </Container>
    </section>
  );
}
