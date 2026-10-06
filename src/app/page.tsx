import { AboutSection } from "@/components/sections/about-section";
import { ApproachSection } from "@/components/sections/approach-section";
import { CapabilitiesSection } from "@/components/sections/capabilities-section";
import { ConsultingSection } from "@/components/sections/consulting-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { SnapshotSection } from "@/components/sections/snapshot-section";
import { WorkSection } from "@/components/sections/work-section";
import { WorkspaceSection } from "@/components/sections/workspace-section";
import { ProfileJsonLd } from "@/components/seo/profile-json-ld";

export default function Home() {
  return (
    <>
      <ProfileJsonLd />
      <HeroSection />
      <SnapshotSection />
      <CapabilitiesSection />
      <WorkSection />
      <ApproachSection />
      <WorkspaceSection />
      <ConsultingSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
