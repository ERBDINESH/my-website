import { Download, Mail } from "lucide-react";
import { ActionLink } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { profile, socialLinks } from "@/data/portfolio";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export function ContactSection() {
  const linkedIn = socialLinks.find((l) => l.platform === "LinkedIn");
  const github = socialLinks.find((l) => l.platform === "GitHub");

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden py-16 sm:py-24"
    >
      {/* Controlled Emerald Ambient Emitter behind the CTA Surface */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.06] blur-[140px]"
        aria-hidden="true"
      />

      <Container>
        {/* PREMIUM FLOATING LIQUID GLASS CALL-TO-ACTION SURFACE */}
        <LiquidGlass
          variant="floating"
          className="relative mx-auto max-w-4xl rounded-[32px] p-8 text-center sm:p-12 lg:p-16 border border-border shadow-2xl"
        >
          {/* Edge highlight rim */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 liquid-glass-control text-xs font-mono-code text-accent">
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            <span>START A CONVERSATION</span>
          </div>

          <h2
            id="contact-heading"
            className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Building an iOS product or improving an existing one?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg">
            Let’s discuss the product, architecture or engineering problem you’re working through.
          </p>

          {/* Core Action Buttons in Liquid Glass Controls */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            <ActionLink
              href={`mailto:${profile.email}`}
              variant="primary"
              className="px-6 py-3 text-sm font-semibold"
            >
              <Mail className="mr-2 size-4" />
              Contact Me
            </ActionLink>

            {linkedIn ? (
              <ActionLink
                href={linkedIn.href}
                variant="secondary"
                className="px-6 py-3 text-sm"
              >
                <LinkedInIcon className="mr-2 size-4 text-accent" />
                LinkedIn
              </ActionLink>
            ) : null}

            {profile.resumeUrl ? (
              <ActionLink
                href={profile.resumeUrl}
                variant="secondary"
                download="Dineshbabu-Elumalai-Resume.pdf"
                className="px-6 py-3 text-sm"
              >
                <Download className="mr-2 size-4 text-accent" />
                Download Resume
              </ActionLink>
            ) : null}
          </div>

          {/* Technical Footnote Inside Glass Surface */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-border pt-6 text-xs text-foreground-subtle">
            <a
              href={`mailto:${profile.email}`}
              className="hover:text-accent font-mono-code transition-colors"
            >
              {profile.email}
            </a>
            <span className="text-foreground-subtle/30">•</span>
            {github ? (
              <a
                href={github.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <GitHubIcon className="size-3.5" />
                <span>GitHub</span>
              </a>
            ) : null}
            <span className="text-foreground-subtle/30">•</span>
            <span>Chennai, India (Remote &amp; Onsite)</span>
          </div>
        </LiquidGlass>
      </Container>
    </section>
  );
}
