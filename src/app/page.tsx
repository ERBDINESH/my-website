import { AboutSection } from "@/components/sections/about-section";
import { AIEngineeringSection } from "@/components/sections/ai-engineering-section";
import { ApproachSection } from "@/components/sections/approach-section";
import { CapabilitiesSection } from "@/components/sections/capabilities-section";
import { ConsultingSection } from "@/components/sections/consulting-section";
import { ContactSection } from "@/components/sections/contact-section";
import { DebuggingSection } from "@/components/sections/debugging-section";
import { EngineeringStorySection } from "@/components/sections/engineering-story-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ModernizationSection } from "@/components/sections/modernization-section";
import { ServiceIntegrationSection } from "@/components/sections/service-integration-section";
import { SnapshotSection } from "@/components/sections/snapshot-section";
import { TechStackSection } from "@/components/sections/tech-stack-section";
import { WorkSection } from "@/components/sections/work-section";
import { WorkspaceSection } from "@/components/sections/workspace-section";
import { ProfileJsonLd } from "@/components/seo/profile-json-ld";

export default function Home() {
  return (
    <>
      <ProfileJsonLd />
      <HeroSection />
      <SnapshotSection />
      <EngineeringStorySection />
      <CapabilitiesSection />
      <ModernizationSection />
      <ServiceIntegrationSection />
      <WorkSection />
      <DebuggingSection />
      <AIEngineeringSection />
      <TechStackSection />
      <ApproachSection />
      <WorkspaceSection />
      <ConsultingSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
