import { BookOpen, Code2, Music2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { IPhonePreview } from "@/components/ui/iphone-preview";

export function StudioSection() {
  return (
    <section aria-label="Work and life beyond code" className="pb-10 sm:pb-14">
      <Container size="wide">
        <div className="studio-grid">
          <article className="studio-card studio-build">
            <p className="portfolio-eyebrow"><Code2 className="size-4" aria-hidden="true" /> WHAT I BUILD</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Small screens.<br /><span className="text-accent">Real-world complexity.</span></h2>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-foreground-muted">Banking journeys, commerce experiences and connected-device apps. Built with Swift, SwiftUI and UIKit.</p>
            <div className="studio-phone"><IPhonePreview /></div>
          </article>
          <div className="grid gap-5">
            <article className="studio-card studio-life">
              <p className="portfolio-eyebrow"><BookOpen className="size-4" aria-hidden="true" /> BEYOND THE CODE</p>
              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">An engineer.<br />A storyteller, too.</h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-foreground-muted">Tamil poetry, music and imagined worlds. A different space for the same curiosity.</p>
              <div className="life-interests"><span>தமிழ் கவிதைகள்</span><span><Music2 className="size-4" aria-hidden="true" /> Music</span><span>Fantasy &amp; fiction</span></div>
              <span className="life-mark" aria-hidden="true">“</span>
            </article>
            <article className="studio-card studio-lab">
              <p className="portfolio-eyebrow">ON MY WORKBENCH</p>
              <h2 className="mt-4 text-2xl font-bold tracking-tight">Personal AI Agent</h2>
              <p className="mt-3 text-base leading-relaxed text-foreground-muted">A local CLI experiment with Ollama, memory and deterministic tools. Learning by building, one small version at a time.</p>
              <a href="https://github.com/ERBDINESH/personal-ai-agent" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center font-mono-code text-sm font-semibold text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">Explore the repository<span className="sr-only"> (opens in a new tab)</span></a>
              <div className="mt-5 flex flex-wrap gap-2">{["Node.js", "Ollama", "Local-first"].map((item) => <span key={item} className="rounded-lg border border-border px-3 py-1.5 font-mono-code text-sm text-foreground-muted">{item}</span>)}</div>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}
