import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceIntegrationFlow } from "@/components/animations/ServiceIntegrationFlow";

export function ServiceIntegrationSection() {
  return (
    <section
      id="service-integration"
      aria-labelledby="service-integration-heading"
      className="relative py-14 sm:py-20"
    >
      <Container size="wide">
        <SectionHeading
          id="service-integration-heading"
          eyebrow="04 — Data & Systems"
          title="API & Service Integration Architecture"
          description="Connecting mobile applications reliably to backend microservices, authentication providers, and offline persistence layers with strict concurrency."
        />

        <div className="mt-10 sm:mt-12">
          <ServiceIntegrationFlow />
        </div>
      </Container>
    </section>
  );
}
