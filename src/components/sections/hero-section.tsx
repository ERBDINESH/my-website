import Image from "next/image";
import { Download, Code2, MapPin } from "lucide-react";
import { ActionLink } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import { profile } from "@/data/portfolio";

export function HeroSection() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="portfolio-hero pt-24 pb-8 sm:pt-28 sm:pb-12">
      <Container size="wide">
        <div className="hero-banner">
          <div className="hero-copy">
            <p className="portfolio-eyebrow"><span className="hero-status-dot" /> Available for senior iOS roles &amp; advisory</p>
            <p className="mt-8 text-lg text-foreground-muted sm:text-xl">Hello, I’m Dinesh.</p>
            <h1 id="hero-heading" className="hero-name">Dineshbabu<br /><span>Elumalai.</span></h1>
            <p className="mt-4 font-mono-code text-base font-semibold text-foreground sm:text-xl">{profile.professionalTitle}</p>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-foreground-muted">{profile.headline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ActionLink href="#work" variant="primary">Explore my work</ActionLink>
              {profile.resumeUrl ? <ActionLink href={profile.resumeUrl} variant="secondary" download="Dineshbabu-Elumalai-Resume.pdf"><Download className="mr-2 size-4" aria-hidden="true" />Download resume</ActionLink> : null}
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-foreground-muted">
              <span className="inline-flex items-center gap-2"><MapPin className="size-4 text-accent" aria-hidden="true" />{profile.location}</span>
              <a href="https://github.com/ERBDINESH" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-accent"><Code2 className="size-4" aria-hidden="true" />ERBDINESH<span className="sr-only"> (opens in a new tab)</span></a>
            </div>
          </div>
          <div className="hero-portrait-panel">
            <div className="hero-portrait-label font-mono-code" aria-hidden="true">THE ENGINEER BEHIND THE CODE</div>
            <div className="hero-portrait-frame">
              <Image src={profile.profileImagePath!} alt="Dineshbabu Elumalai" width={1122} height={1122} preload sizes="(max-width: 767px) 90vw, 440px" className="hero-portrait" />
            </div>
            <div className="hero-experience"><strong>7<span>+</span></strong><div>years of native iOS<br /><span>Banking · Commerce · Connected devices</span></div></div>
          </div>
        </div>
        <div className="hero-stack" aria-label="Primary technologies">
          <span className="portfolio-eyebrow">MY EVERYDAY TOOLKIT</span>
          <div className="flex flex-wrap gap-x-7 gap-y-3">{["Swift", "SwiftUI", "UIKit", "Objective-C", "MVVM-C"].map((item) => <span key={item} className="font-mono-code text-base font-semibold">{item}</span>)}</div>
        </div>
      </Container>
    </section>
  );
}
