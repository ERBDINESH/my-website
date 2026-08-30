export type SectionId =
  | "home"
  | "about"
  | "experience"
  | "projects"
  | "work"
  | "skills"
  | "connect";

export type NavigationLabel =
  | "Home"
  | "About"
  | "Experience"
  | "Projects"
  | "Work"
  | "Skills"
  | "Connect";

export interface NavigationItem {
  id: SectionId;
  label: NavigationLabel;
  href: `#${SectionId}`;
}

export interface PersonalProfile {
  fullName: string;
  professionalTitle: string;
  experiencePositioning: string;
  location: string;
  email: string;
  summary: string;
  resumeUrl?: `/${string}.pdf`;
  profileImagePath?: `/assets/${string}`;
}

export type SocialPlatform = "Email" | "LinkedIn" | "GitHub" | "Resume";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
  external: boolean;
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

export interface SelectedApplication {
  name: string;
  domain: string;
  description: string;
  contribution: string | null;
  technologies: readonly string[];
  appStoreUrl: `https://apps.apple.com/${string}`;
  imagePath: `/assets/${string}` | null;
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

export type SkillGroupName =
  | "Primary iOS"
  | "Architecture"
  | "APIs and integrations"
  | "Tools and delivery"
  | "Additional exposure";

export interface SkillGroup {
  name: SkillGroupName;
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
  socialLinks: readonly SocialLink[];
  navigation: readonly NavigationItem[];
  experience: readonly Experience[];
  featuredProject: FeaturedProject;
  selectedApplications: readonly SelectedApplication[];
  skillGroups: readonly SkillGroup[];
  recommendations: readonly Recommendation[];
}
