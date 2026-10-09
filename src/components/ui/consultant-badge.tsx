"use client";

import Image from "next/image";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { profile } from "@/data/portfolio";

export function ConsultantBadge() {
  return (
    <LiquidGlass
      variant="control"
      className="group relative mb-5 inline-flex items-center gap-3.5 rounded-2xl p-1.5 pr-4 shadow-sm border border-border transition-all duration-300 hover:border-accent/40 hover:shadow-md animate-in fade-in slide-in-from-top-2 duration-500"
    >
      {/* Subtle soft float wrapper around the avatar */}
      <div className="relative size-11 sm:size-12 shrink-0 overflow-hidden rounded-xl border border-border bg-surface-raised shadow-xs transition-transform duration-300 group-hover:scale-105">
        {profile.profileImagePath ? (
          <Image
            src={profile.profileImagePath}
            alt={profile.fullName}
            width={48}
            height={48}
            priority
            className="size-full object-cover object-top"
          />
        ) : (
          <div className="flex size-full items-center justify-center font-mono-code text-xs font-bold text-accent">
            DE
          </div>
        )}

        {/* Online Status pip */}
        <span className="absolute bottom-0.5 right-0.5 flex size-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex size-2.5 rounded-full bg-accent ring-2 ring-surface" />
        </span>
      </div>

      {/* Consultant Identity Info */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-foreground tracking-tight">
            {profile.fullName}
          </span>
          <span className="rounded-full bg-accent/15 px-1.5 py-0.2 font-mono-code text-[9px] font-semibold text-accent border border-accent/25">
            VERIFIED
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-foreground-muted">
          <span className="font-mono-code text-accent">Senior iOS Engineer</span>
          <span className="text-foreground-subtle/50">•</span>
          <span className="font-mono-code text-[10px] text-foreground-subtle">
            7+ Yrs Native
          </span>
        </div>
      </div>
    </LiquidGlass>
  );
}
