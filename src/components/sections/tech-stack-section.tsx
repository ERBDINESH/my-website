import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechStackVisual } from "@/components/animations/TechStackVisual";

export function TechStackSection() {
  return (
    <section
      id="tech-stack"
      aria-labelledby="tech-stack-heading"
      className="relative py-14 sm:py-20"
    >
      <Container size="wide">
        <SectionHeading
          id="tech-stack-heading"
          eyebrow="06 — Technical Stack"
          title="Engineered Across 5 Core Disciplines"
          description="Build, Architect, Integrate, Assure, and Ship: verified native technologies and tooling honed across production iOS codebases."
        />

        <div className="mt-10 sm:mt-12">
          <TechStackVisual />
        </div>
      </Container>
    </section>
  );
}
