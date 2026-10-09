import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { AIEngineeringFlow } from "@/components/animations/AIEngineeringFlow";

export function AIEngineeringSection() {
  return (
    <section
      id="ai-engineering"
      aria-labelledby="ai-engineering-heading"
      className="relative py-14 sm:py-20"
    >
      <Container size="wide">
        <SectionHeading
          id="ai-engineering-heading"
          eyebrow="05 — Engineering Discipline"
          title="Controlled AI-Assisted Engineering"
          description="AI accelerates boilerplate and hypothesis testing, but production stability and architecture require deep engineering ownership."
        />

        <div className="mt-10 sm:mt-12">
          <AIEngineeringFlow />
        </div>
      </Container>
    </section>
  );
}
