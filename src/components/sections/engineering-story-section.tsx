import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { EngineeringStoryFlow } from "@/components/animations/EngineeringStoryFlow";

export function EngineeringStorySection() {
  return (
    <section
      id="engineering-story"
      aria-labelledby="engineering-story-heading"
      className="relative py-14 sm:py-20"
    >
      <Container size="wide">
        <SectionHeading
          id="engineering-story-heading"
          eyebrow="02 — Production Lifecycle"
          title="How I Build Production iOS Software"
          description="A disciplined engineering workflow transforming complex business specifications into resilient, crash-free mobile applications."
        />

        <div className="mt-10 sm:mt-12">
          <EngineeringStoryFlow />
        </div>
      </Container>
    </section>
  );
}
