import type {
  Experience,
  FeaturedProject,
  NavigationItem,
  PersonalProfile,
  PortfolioData,
  Recommendation,
  SelectedApplication,
  SkillGroup,
  SocialLink,
} from "./types";

export const profile = {
  fullName: "Dineshbabu Elumalai",
  professionalTitle: "Senior iOS Developer",
  experiencePositioning: "7+ years of experience",
  location: "Chennai, India",
  email: "dineshbabucse1@gmail.com",
  resumeUrl: "/Dineshbabu-Elumalai-Resume.pdf",
  profileImagePath: "/assets/profile/dineshbabu-elumalai.png",
  summary:
    "Senior iOS Developer with 7+ years of experience building and maintaining reliable native applications across banking, fintech, healthcare, e-commerce, and connected-device domains. Experienced with Swift, SwiftUI, UIKit, Objective-C, REST API integration, and maintainable mobile architecture.",
} as const satisfies PersonalProfile;

export const socialLinks = [
  {
    platform: "Email",
    label: "Email",
    href: "mailto:dineshbabucse1@gmail.com",
    external: false,
  },
  {
    platform: "LinkedIn",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/erbdinesh",
    external: true,
  },
  {
    platform: "GitHub",
    label: "GitHub",
    href: "https://github.com/ERBDINESH",
    external: true,
  },
] as const satisfies readonly SocialLink[];

export const navigation = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "work", label: "Work", href: "#work" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "connect", label: "Connect", href: "#connect" },
] as const satisfies readonly NavigationItem[];

export const experience = [
  {
    employer: "Russell Tobin",
    client: "BNP Paribas / BNL",
    role: "Senior iOS Developer - Contract",
    startDate: "Oct 2025",
    endDate: "Present",
    location: "Chennai, India",
    summary:
      "Contributes to production native iOS features for the BNL mobile banking application across banking and insurance journeys.",
    contributions: [
      "Develops and maintains native iOS features in a Swift and UIKit codebase using MVVM/MVVM-C architecture.",
      "Takes features from requirement analysis and technical design through implementation, integration, validation, and release readiness.",
      "Builds reusable flow and session models for reliable asynchronous application workflows.",
      "Implements dynamic interfaces, navigation coordination, application-state handling, validation, error recovery, and production issue resolution.",
    ],
    technologies: [
      "Swift",
      "UIKit",
      "Foundation",
      "Combine",
      "MVVM",
      "MVVM-C",
      "Dependency Injection",
      "REST APIs",
      "Codable",
    ],
    employerLogoPath: "/assets/employers/russell-tobin.jpg",
    clientLogoPath: "/assets/clients/bnl-bnp-paribas.png",
  },
  {
    employer: "Hubino Technologies Pvt. Ltd.",
    client: null,
    role: "Software Developer (iOS)",
    startDate: "Jul 2021",
    endDate: "Jul 2025",
    location: "Chennai, India",
    summary:
      "Built and maintained native iOS applications across e-commerce, healthcare, finance, and digital-product domains.",
    contributions: [
      "Worked across modern Swift implementations and existing Objective-C codebases using MVVM/MVVM-C architecture.",
      "Integrated REST APIs and Firebase services for customer-facing workflows, analytics, messaging, crash reporting, and application configuration.",
      "Investigated crashes, API failures, UI and navigation defects, and performance issues while improving maintainability through refactoring and reusable components.",
      "Contributed to code reviews, production releases, CI/CD workflows, and technical guidance for junior developers.",
    ],
    technologies: [
      "Swift",
      "SwiftUI",
      "UIKit",
      "Objective-C",
      "Foundation",
      "Combine",
      "Core Data",
      "MVVM",
      "MVVM-C",
      "REST APIs",
      "Firebase",
      "Git",
      "Azure DevOps",
      "CI/CD",
    ],
    employerLogoPath: "/assets/employers/hubino-technologies.jpg",
  },
  {
    employer: "Unizen Technologies Pvt. Ltd.",
    client: null,
    role: "iOS Developer",
    startDate: "Jun 2019",
    endDate: "May 2021",
    location: "Bangalore, India",
    summary:
      "Developed native iOS applications across finance, healthcare, and connected-device domains.",
    contributions: [
      "Implemented native interfaces, backend integrations, authentication, secure data handling, offline functionality, and application workflows.",
      "Developed and supported Bluetooth-connected device functionality with CoreBluetooth and media playback with AVFoundation.",
      "Diagnosed application, API, Bluetooth, and device-integration issues in collaboration with backend, QA, and cross-functional teams.",
    ],
    technologies: [
      "Swift",
      "Objective-C",
      "UIKit",
      "Foundation",
      "CoreBluetooth",
      "AVFoundation",
      "REST APIs",
    ],
    employerLogoPath: "/assets/employers/unizen-technologies.jpg",
  },
] as const satisfies readonly Experience[];

export const featuredProject = {
  name: "LaunchProof",
  status: "Live Beta",
  category: "Release Readiness Platform",
  description:
    "A production-focused platform that helps web teams answer one question: “Is this website ready to launch?”",
  highlights: [
    "17 release-readiness checks",
    "READY / NOT READY / SCAN FAILED verdict",
    "Release blockers and warnings",
    "Launch Score",
    "Shareable immutable reports",
    "Secure authenticated projects",
  ],
  technologies: ["Next.js", "TypeScript", "Supabase", "Railway", "Cloudflare"],
  primaryUrl: "https://launchproof.erbdinesh.com",
  githubUrl: "https://github.com/ERBDINESH/launchproof",
} as const satisfies FeaturedProject;

export const selectedApplications = [
  {
    name: "BNL Mobile Banking",
    domain: "Banking",
    description:
      "Mobile banking application for managing accounts, cards, and everyday transactions.",
    contribution:
      "Contributes to native mobile banking and insurance features, reusable application flows, asynchronous service integration, validation, and error recovery.",
    technologies: [
      "Swift",
      "UIKit",
      "Foundation",
      "Combine",
      "MVVM",
      "MVVM-C",
      "Dependency Injection",
      "REST APIs",
      "Codable",
    ],
    appStoreUrl: "https://apps.apple.com/app/id578969149",
    imagePath: "/assets/apps/bnl-mobile-banking.webp",
  },
  {
    name: "Insomnia Cookies",
    domain: "E-commerce",
    description:
      "Consumer ordering application for pickup and delivery from Insomnia Cookies.",
    contribution:
      "Contributed to customer-facing ordering and delivery features, REST API integrations, and supporting Firebase services.",
    technologies: [
      "Swift",
      "SwiftUI",
      "UIKit",
      "Combine",
      "MVVM",
      "MVVM-C",
      "REST APIs",
      "Firebase",
      "Core Data",
    ],
    appStoreUrl: "https://apps.apple.com/app/id891379973",
    imagePath: "/assets/apps/insomnia-cookies.webp",
  },
  {
    name: "Mighty Audio",
    domain: "Connected devices",
    description:
      "Companion application for setting up a Mighty player and taking supported playlists on the go.",
    contribution:
      "Contributed to native iOS functionality connecting the application with portable audio hardware, including Bluetooth communication, media playback, offline functionality, backend integration, and debugging.",
    technologies: [
      "Swift",
      "Objective-C",
      "UIKit",
      "Foundation",
      "CoreBluetooth",
      "AVFoundation",
      "REST APIs",
    ],
    appStoreUrl: "https://apps.apple.com/app/id1164822276",
    imagePath: "/assets/apps/mighty-audio.webp",
  },
] as const satisfies readonly SelectedApplication[];

export const skillGroups = [
  {
    name: "Primary iOS",
    skills: [
      "Swift",
      "Objective-C",
      "UIKit",
      "SwiftUI",
      "Foundation",
      "Combine",
      "Core Data",
    ],
  },
  {
    name: "Architecture",
    skills: [
      "MVVM",
      "MVVM-C",
      "Modular Architecture",
      "Dependency Injection",
      "SOLID",
      "Reusable Components",
    ],
  },
  {
    name: "APIs and integrations",
    skills: [
      "REST APIs",
      "Codable",
      "Authentication and Authorisation",
      "Firebase",
      "Offline Workflows",
    ],
  },
  {
    name: "Tools and delivery",
    skills: [
      "Git",
      "Azure DevOps",
      "CI/CD",
      "Code Reviews",
      "Production Debugging",
      "Root Cause Analysis",
      "Performance Troubleshooting",
      "Agile / Scrum",
    ],
  },
  {
    name: "Additional exposure",
    skills: [
      "CoreBluetooth",
      "AVFoundation",
      "GCD",
      "Swift Concurrency / async-await",
      "Asynchronous Workflows",
      "State Management",
    ],
  },
] as const satisfies readonly SkillGroup[];

export const recommendations = [] as const satisfies readonly Recommendation[];

export const portfolio = {
  profile,
  socialLinks,
  navigation,
  experience,
  featuredProject,
  selectedApplications,
  skillGroups,
  recommendations,
} as const satisfies PortfolioData;
