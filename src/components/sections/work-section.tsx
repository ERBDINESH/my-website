import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ActionLink } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { selectedApplications } from "@/data/portfolio";

export function WorkSection() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="bg-background py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <SectionHeading
          id="work-heading"
          eyebrow="04 — Selected work"
          title="Applications contributed to"
          description="Public applications supported through verified native iOS engineering contributions."
        />

        {selectedApplications.length > 0 ? (
          <div className="mt-12 grid gap-5 sm:mt-16 lg:grid-cols-3">
            {selectedApplications.map((application) => (
              <article
                key={application.name}
                className="flex flex-col border border-border bg-surface p-6 shadow-sm transition-shadow hover:shadow-soft sm:p-7"
              >
                <Image src={application.imagePath} alt={`${application.name} application icon`} width={80} height={80} className="size-20 rounded-[1.15rem] object-contain" />

                <div className="min-w-0">
                  <p className="text-sm font-semibold uppercase tracking-[0.1em] text-accent">
                    {application.domain}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
                    {application.name}
                  </h3>
                  <p className="mt-3 max-w-3xl leading-7 text-muted">
                    {application.description}
                  </p>

                  {application.contribution ? (
                    <div className="mt-5 max-w-3xl">
                      <h4 className="text-sm font-semibold text-foreground">
                        Contribution
                      </h4>
                      <p className="mt-1 text-sm leading-6 text-muted">
                        {application.contribution}
                      </p>
                    </div>
                  ) : null}

                  {application.technologies.length > 0 ? (
                    <ul
                      className="mt-5 flex flex-wrap gap-2"
                      aria-label={`Technologies used for ${application.name}`}
                    >
                      {application.technologies.map((technology) => (
                        <li
                          key={technology}
                          className="rounded-md bg-surface-strong px-2.5 py-1 text-xs font-medium text-muted"
                        >
                          {technology}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                <div className="mt-auto pt-6">
                  <ActionLink
                    href={application.appStoreUrl}
                    variant="text"
                    className="whitespace-nowrap"
                  >
                    <span className="sr-only">
                      View {application.name} on the{" "}
                    </span>
                    App Store
                    <ArrowUpRight
                      className="ml-1.5 size-4"
                      aria-hidden="true"
                    />
                  </ActionLink>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
