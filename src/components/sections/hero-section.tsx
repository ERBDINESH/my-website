import Image from "next/image";
import { ArrowDown, Check, ExternalLink, MapPin } from "lucide-react";
import { ActionLink } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import { profile, socialLinks } from "@/data/portfolio";

export function HeroSection() {
  const linkedIn = socialLinks.find((link) => link.platform === "LinkedIn");
  const heroSkills = ["7+ Years", "Swift", "SwiftUI", "UIKit"];
  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="relative overflow-hidden bg-surface py-16 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,28rem)] lg:gap-20">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
              Hello, I&apos;m
            </p>
            <h1
              id="home-heading"
              className="mt-5 max-w-4xl text-[clamp(3rem,8vw,5.4rem)] font-bold leading-[0.98] tracking-[-0.04em] text-foreground"
            >
              {profile.fullName}
            </h1>
            <p className="mt-7 text-[clamp(2.65rem,6vw,5rem)] font-bold leading-[1.02] tracking-[-0.04em] text-primary">
              {profile.professionalTitle}
            </p>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
              {profile.summary}
            </p>
            <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground">
              <MapPin className="size-4 text-accent" aria-hidden="true" />
              {profile.location}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ActionLink href="#work">
                View My Work
                <ArrowDown className="ml-2 size-4" aria-hidden="true" />
              </ActionLink>
              {profile.resumeUrl ? (
                <ActionLink
                  href={profile.resumeUrl}
                  variant="secondary"
                  download="Dineshbabu-Elumalai-Resume.pdf"
                >
                  Download Resume
                </ActionLink>
              ) : null}
              {linkedIn ? (
                <ActionLink href={linkedIn.href} variant="text">
                  <ExternalLink className="mr-2 size-4" aria-hidden="true" />
                  LinkedIn
                </ActionLink>
              ) : null}
            </div>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Verified experience and technologies">
              {heroSkills.map((skill) => (
                <li key={skill} className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-white px-3 py-1.5 text-xs font-bold text-foreground shadow-sm sm:text-sm">
                  <Check className="size-3.5 text-accent" aria-hidden="true" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -inset-3 rounded-[2rem] border border-primary/20" aria-hidden="true" />
            <div className="absolute -right-4 top-8 size-10 rounded-full border-4 border-accent bg-white" aria-hidden="true" />
            <div className="absolute -bottom-5 -left-5 size-16 rounded-2xl border border-primary/20 bg-primary/10" aria-hidden="true" />
            {profile.profileImagePath ? (
              <Image
                src={profile.profileImagePath}
                alt="Portrait of Dineshbabu Elumalai"
                width={1122}
                height={1402}
                priority
                className="relative aspect-[4/5] w-full rounded-[1.5rem] object-cover object-[center_24%] shadow-soft"
              />
            ) : (
              <div className="flex aspect-[4/5] items-center justify-center rounded-[1.5rem] bg-primary/10 text-5xl font-bold text-primary" role="img" aria-label="Portrait of Dineshbabu Elumalai">DE</div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
