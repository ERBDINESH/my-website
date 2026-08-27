import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { profile, skillGroups } from "@/data/portfolio";

export function AboutSection() {
  const summaryParts = profile.summary.split(". ");
  const technicalSummary = summaryParts.slice(1).join(". ") || profile.summary;
  const primarySkills =
    skillGroups.find((group) => group.name === "Primary iOS")?.skills.slice(0, 4) ??
    [];
  const architectureSkills =
    skillGroups.find((group) => group.name === "Architecture")?.skills.slice(0, 3) ??
    [];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-background py-20 sm:py-24 lg:py-32"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <SectionHeading
            id="about-heading"
            eyebrow="01 — About"
            title="Professional focus"
            description="Native iOS engineering across reliable, maintainable mobile products."
          />

          <div className="space-y-6 text-base leading-8 text-muted sm:text-lg">
            <p>{technicalSummary}</p>
            {primarySkills.length > 0 || architectureSkills.length > 0 ? (
              <p>
                The primary iOS stack includes {primarySkills.join(", ")}
                {architectureSkills.length > 0
                  ? `, supported by architecture practices including ${architectureSkills.join(", ")}.`
                  : "."}
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
