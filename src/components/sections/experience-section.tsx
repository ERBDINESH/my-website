import Image from "next/image";
import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { experience } from "@/data/portfolio";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="bg-surface py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <SectionHeading
          id="experience-heading"
          eyebrow="02 — Experience"
          title="Professional experience"
          description="Roles and contributions drawn from the verified professional record."
        />

        {experience.length > 0 ? (
          <ol className="mt-12 border-l border-border sm:mt-16">
            {experience.map((role, index) => (
              <li
                key={`${role.employer}-${role.startDate}`}
                className={`relative ml-0 pl-7 sm:pl-10 ${
                  index < experience.length - 1 ? "pb-14 sm:pb-16" : ""
                }`}
              >
                <span
                  className="absolute -left-2 top-2 size-3.5 rounded-full border-4 border-surface bg-primary"
                  aria-hidden="true"
                />

                <article className="max-w-5xl">
                  <header className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-8">
                    <div className="flex gap-4">
                      {role.employerLogoPath ? (
                        <Image src={role.employerLogoPath} alt={`${role.employer} logo`} width={56} height={56} className="size-14 shrink-0 rounded-lg border border-border bg-white object-contain p-1" />
                      ) : null}
                      <div>
                        <h3 className="text-xl font-bold text-foreground sm:text-2xl">{role.employer}</h3>
                        <p className="mt-1 font-semibold text-primary">{role.role}</p>
                      </div>
                    </div>

                    <div className="text-sm leading-6 text-muted sm:text-right">
                      <p className="font-semibold text-foreground">
                        {role.startDate} - {role.endDate}
                      </p>
                      {role.location ? (
                        <p className="mt-1 inline-flex items-center gap-1.5 sm:justify-end">
                          <MapPin
                            className="size-3.5 text-accent"
                            aria-hidden="true"
                          />
                          {role.location}
                        </p>
                      ) : null}
                    </div>
                  </header>

                  {role.client ? (
                    <div className="mt-5 flex items-center gap-3 text-sm text-muted">
                      {role.clientLogoPath ? (
                        <Image src={role.clientLogoPath} alt={`${role.client} logo`} width={36} height={36} className="size-9 rounded-md border border-border bg-white object-contain p-1" />
                      ) : null}
                      <span><span className="font-semibold text-foreground">Client</span> {role.client}</span>
                    </div>
                  ) : null}

                  <p className="mt-5 max-w-4xl leading-7 text-muted">
                    {role.summary}
                  </p>

                  {role.contributions.length > 0 ? (
                    <ul className="mt-5 grid gap-3 text-sm leading-6 text-foreground sm:grid-cols-2 sm:gap-x-8">
                      {role.contributions.map((contribution) => (
                        <li key={contribution} className="relative pl-5">
                          <span
                            className="absolute left-0 top-[0.65rem] size-1.5 rounded-full bg-accent"
                            aria-hidden="true"
                          />
                          {contribution}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {role.technologies.length > 0 ? (
                    <ul
                      className="mt-6 flex flex-wrap gap-2"
                      aria-label={`Technologies used at ${role.employer}`}
                    >
                      {role.technologies.map((technology) => (
                        <li
                          key={technology}
                          className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted"
                        >
                          {technology}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              </li>
            ))}
          </ol>
        ) : null}
      </Container>
    </section>
  );
}
