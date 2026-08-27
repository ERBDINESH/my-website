import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { skillGroups } from "@/data/portfolio";

export function SkillsSection() {
  const populatedGroups = skillGroups.filter((group) => group.skills.length > 0);

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="bg-surface py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <SectionHeading
          id="skills-heading"
          eyebrow="04 — Skills"
          title="Technical capabilities"
          description="Native iOS technologies and engineering practices supported by the verified professional record."
        />

        {populatedGroups.length > 0 ? (
            <div className="mt-12 grid gap-x-12 gap-y-12 sm:mt-16 md:grid-cols-2">
            {populatedGroups.map((group) => {
              const isPrimary = group.name === "Primary iOS";
              const isAdditional = group.name === "Additional exposure";
              const headingId = `skill-group-${group.name
                .toLowerCase()
                .replaceAll(" ", "-")}`;

              return (
                <section
                  key={group.name}
                  aria-labelledby={headingId}
                  className={`border-t pt-6 ${
                    isPrimary
                      ? "border-primary md:col-span-2"
                      : "border-border"
                  }`}
                >
                  <h3
                    id={headingId}
                    className={`text-lg font-bold sm:text-xl ${
                      isAdditional ? "text-muted" : "text-foreground"
                    }`}
                  >
                    {group.name}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        className={`rounded-full border px-3 py-2 text-sm font-medium ${
                          isPrimary
                            ? "border-primary/20 bg-background text-foreground"
                            : isAdditional
                              ? "border-border bg-surface-strong text-muted"
                              : "border-border bg-background text-foreground"
                        }`}
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
