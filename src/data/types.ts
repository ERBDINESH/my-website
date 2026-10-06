export type SectionId =
  | "hero"
  | "capabilities"
  | "work"
  | "approach"
  | "workspace"
  | "consulting"
  | "about"
  | "journey"
  | "contact";

export interface NavigationItem {
  id: SectionId;
  label: string;
  href: `#${SectionId}`;
}

export interface JourneyStage {
  id: string;
  year: string;
  period: string;
  company: string;
  role: string;
  label: string;
  description: string;
  growth: readonly string[];
}

export interface PersonalProfile {
  fullName: string;
  professionalTitle: string;
  experiencePositioning: string;
  headline: string;
  supportingMessage: string;
  location: string;
  email: string;
  summary: string;
  aboutParagraphs: readonly string[];
  resumeUrl: `/${string}.pdf`;
  profileImagePath?: `/assets/${string}`;
}

export type SocialPlatform = "Email" | "LinkedIn" | "GitHub" | "Resume";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
  external: boolean;
}

export interface CredibilityItem {
  metric: string;
  category: string;
  description: string;
}

export interface EngineeringCapability {
  id: "build" | "architect" | "integrate" | "assure" | "ship" | "lead";
  title: string;
  oneLiner: string;
  items: readonly string[];
}

export interface CaseStudy {
  id: string;
  name: string;
  client?: string;
  category: string;
  domain: string;
  timeframe: string;
  summary: string;
  challengeSentence?: string;
  engineeringApproachSentence?: string;
  whatWasProduct: string;
  engineeringProblem: string;
  contributions: readonly string[];
  capabilitiesDemonstrated: readonly string[];
  technologies: readonly string[];
  appStoreUrl?: string;
  imagePath?: string;
  architectureHighlights: readonly {
    label: string;
    description: string;
  }[];
}

export interface EngineeringPrinciple {
  number: string;
  title: string;
  summary: string;
  detail: string;
  indicators: readonly string[];
}

export interface WorkspaceTopic {
  id: "architecture" | "networking" | "concurrency" | "ui-systems" | "reliability" | "delivery";
  title: string;
  folder: string;
  filename: string;
  summary: string;
  responsibility: string;
  engineeringChoices: readonly string[];
  architecture: {
    pattern: string;
    concurrency: string;
    ownership: string;
  };
  dependencies: readonly string[];
  codeSnippet: string;
  engineeringRationale: string;
  bulletPoints?: readonly string[];
}

export interface ConsultingService {
  title: string;
  description: string;
  deliverables: readonly string[];
}

export interface Experience {
  employer: string;
  client: string | null;
  role: string;
  startDate: string;
  endDate: string;
  location: string | null;
  summary: string;
  contributions: readonly string[];
  technologies: readonly string[];
  employerLogoPath?: `/assets/${string}`;
  clientLogoPath?: `/assets/${string}`;
}

export interface FeaturedProject {
  name: string;
  status: string;
  category: string;
  description: string;
  highlights: readonly string[];
  technologies: readonly string[];
  primaryUrl: string;
  githubUrl: string;
}

export interface SkillGroup {
  name: string;
  skills: readonly string[];
}

export interface Recommendation {
  text: string;
  authorName: string;
  authorRole: string;
  linkedInSource: `https://www.linkedin.com/${string}`;
}

export interface PortfolioData {
  profile: PersonalProfile;
  credibilityItems: readonly CredibilityItem[];
  socialLinks: readonly SocialLink[];
  navigation: readonly NavigationItem[];
  capabilities: readonly EngineeringCapability[];
  caseStudies: readonly CaseStudy[];
  principles: readonly EngineeringPrinciple[];
  workspaceTopics: readonly WorkspaceTopic[];
  consultingServices: readonly ConsultingService[];
  consultingBoundaries: readonly string[];
  experience: readonly Experience[];
  featuredProject?: FeaturedProject;
  skillGroups?: readonly SkillGroup[];
  recommendations?: readonly Recommendation[];
}
