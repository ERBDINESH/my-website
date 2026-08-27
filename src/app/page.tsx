import { AboutSection } from "@/components/sections/about-section";
import { ConnectSection } from "@/components/sections/connect-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import { RecommendationsSection } from "@/components/sections/recommendations-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { WorkSection } from "@/components/sections/work-section";
import { ProfileJsonLd } from "@/components/seo/profile-json-ld";

export default function Home() {
  return (
    <>
      <ProfileJsonLd />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <WorkSection />
      <SkillsSection />
      <RecommendationsSection />
      <ConnectSection />
    </>
  );
}
