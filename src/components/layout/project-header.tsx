"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download, Sparkles } from "lucide-react";
import { ActionLink } from "@/components/ui/action-link";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { profile } from "@/data/portfolio";

interface ProjectHeaderProps {
  projectName: string;
  category: string;
}

export function ProjectHeader({ projectName, category }: ProjectHeaderProps) {
  return (
    <header className="sticky top-3 inset-x-0 z-50 px-2.5 sm:px-4 lg:px-6 pointer-events-none">
      <div className="mx-auto w-full max-w-[1440px] pointer-events-auto">
        <LiquidGlass
          variant="strong"
          className="flex h-14 items-center justify-between gap-3 rounded-2xl border-border-strong px-3 sm:px-4 lg:px-5 shadow-xl transition-all"
        >
          {/* Left: Back Link + Identity */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-2.5 py-1.5 text-xs font-mono-code font-semibold text-foreground-muted hover:text-foreground hover:border-border-strong transition-all cursor-pointer shadow-xs"
              aria-label="Back to portfolio projects"
            >
              <ArrowLeft className="size-3.5" />
              <span className="hidden sm:inline">Portfolio</span>
            </Link>

            <div className="h-4 w-px bg-border-strong hidden sm:block" />

            <Link
              href="/"
              className="group flex items-center gap-2 text-xs font-semibold tracking-tight text-foreground hover:text-accent transition-colors"
            >
              <Image
                src="/assets/profile/DE_logo.png"
                alt="DE — Dineshbabu Elumalai"
                width={36}
                height={22}
                priority
                className="h-[20px] sm:h-[24px] w-auto object-contain shrink-0 transition-transform duration-200 group-hover:scale-105"
                style={{ width: "auto" }}
              />
              <span className="text-xs sm:text-sm font-semibold truncate hidden md:inline">
                {profile.fullName}
              </span>
            </Link>
          </div>

          {/* Center: Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="hidden lg:flex items-center gap-2 font-mono-code text-xs text-foreground-subtle"
          >
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/#projects" className="hover:text-foreground transition-colors">
              Projects
            </Link>
            <span>/</span>
            <span className="font-semibold text-foreground">{projectName}</span>
            <span className="text-foreground-subtle/60 hidden xl:inline">({category})</span>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <ThemeToggle size="sm" />

            {profile.resumeUrl && (
              <div className="hidden sm:block">
                <ActionLink
                  href={profile.resumeUrl}
                  variant="secondary"
                  download="Dineshbabu-Elumalai-Resume.pdf"
                  className="text-xs py-1.5 px-2.5 rounded-xl whitespace-nowrap"
                >
                  <Download className="mr-1.5 size-3 text-accent" />
                  <span>Resume</span>
                </ActionLink>
              </div>
            )}

            <ActionLink
              href="/#contact"
              variant="primary"
              className="text-xs py-1.5 px-3 rounded-xl font-semibold shadow-xs whitespace-nowrap"
            >
              <Sparkles className="mr-1.5 size-3" />
              <span>Contact</span>
            </ActionLink>
          </div>
        </LiquidGlass>
      </div>
    </header>
  );
}
