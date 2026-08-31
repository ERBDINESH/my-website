import { ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import { ActionLink } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { featuredProject } from "@/data/portfolio";

export function FeaturedProjectSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="bg-surface py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <SectionHeading
          id="projects-heading"
          eyebrow="03 — Featured project"
          title="Built and launched"
          description="A product I designed and built to bring release confidence to web teams before launch-day surprises."
        />

        <div className="mt-12 w-full rounded-[1.75rem] border border-border bg-white p-5 shadow-sm sm:p-8 lg:max-w-[98%] lg:p-10">
          <div className="flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
                {featuredProject.category}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <h3 className="text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl">
                  {featuredProject.name}
                </h3>
                <span className="rounded-full border border-accent/20 bg-accent/5 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-accent">
                  {featuredProject.status}
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-surface-strong px-3 py-2 text-sm font-semibold text-primary">
              <ShieldCheck className="size-4" aria-hidden="true" />
              Release coverage
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)] lg:items-stretch">
            <div className="flex flex-col justify-between">
              <p className="max-w-2xl text-lg leading-8 text-muted sm:text-xl">
                {featuredProject.description}
              </p>

              <ul className="mt-7 grid gap-3 sm:grid-cols-2" aria-label="LaunchProof highlights">
                {featuredProject.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-3 rounded-xl border border-border bg-surface p-3 text-sm font-medium text-foreground"
                  >
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Check className="size-3.5" aria-hidden="true" />
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex h-full flex-col justify-between rounded-[1.25rem] border border-primary/15 bg-surface-strong p-5">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.15em] text-primary">
                  Built with
                </p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="LaunchProof technologies">
                  {featuredProject.technologies.map((technology) => (
                    <li
                      key={technology}
                      className="rounded-md bg-white px-2.5 py-1.5 text-xs font-semibold text-muted ring-1 ring-border"
                    >
                      {technology}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 rounded-xl border border-border bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-subtle">
                  Current status
                </p>
                <div className="mt-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-3xl font-bold tracking-[-0.04em] text-foreground">
                      91
                    </p>
                    <p className="text-xs uppercase tracking-[0.12em] text-muted">
                      Launch score
                    </p>
                  </div>
                  <span className="inline-flex rounded-full bg-accent/10 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-accent">
                    Ready
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ActionLink
              href={featuredProject.primaryUrl}
              className="px-5 py-3 shadow-sm hover:shadow-md"
            >
              Try LaunchProof
              <ArrowUpRight className="ml-2 size-4" aria-hidden="true" />
            </ActionLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
