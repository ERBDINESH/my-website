import type {
  CaseStudy,
  ConsultingService,
  CredibilityItem,
  EngineeringCapability,
  EngineeringPrinciple,
  Experience,
  FeaturedProject,
  JourneyStage,
  NavigationItem,
  PersonalProfile,
  PortfolioData,
  Recommendation,
  SkillGroup,
  SocialLink,
  WorkspaceTopic,
} from "./types";

export const profile: PersonalProfile = {
  fullName: "Dineshbabu Elumalai",
  professionalTitle: "Software Engineer – iOS",
  experiencePositioning: "7+ years building production native iOS applications",
  headline: "Building reliable native iOS products across banking, commerce and connected devices.",
  supportingMessage:
    "7+ years delivering production features, reusable UI systems, API-driven workflows and maintainable mobile architecture with Swift, SwiftUI, UIKit and Objective-C.",
  location: "Chennai, India",
  email: "dineshbabucse1@gmail.com",
  resumeUrl: "/Dineshbabu-Elumalai-Resume.pdf",
  profileImagePath: "/assets/profile/dineshbabu-elumalai.png",
  summary:
    "Native iOS software engineer with 7+ years of experience delivering production mobile applications across banking, commerce, and connected-device products. Experienced in MVVM-C architecture, modular feature design, asynchronous data pipelines, and production release reliability.",
  aboutParagraphs: [
    "I’m a native iOS engineer with 7+ years of experience building production mobile applications across banking, commerce and connected devices.",
    "I enjoy turning complex product requirements into maintainable mobile flows, improving existing codebases and building reusable foundations that make future development easier.",
    "Currently working across production banking features while continuing to deepen architecture, testing, performance and modern Swift engineering practices.",
  ],
};

export const credibilityItems: readonly CredibilityItem[] = [
  {
    metric: "7+ Years",
    category: "Native iOS Engineering",
    description: "Production experience shipping Apple-platform applications using modern Swift, SwiftUI, UIKit, and Objective-C.",
  },
  {
    metric: "Banking",
    category: "Production financial-service applications",
    description: "High-integrity insurance servicing, OTP validation, policy cancellations, and regulated workflows for BNL / BNP Paribas.",
  },
  {
    metric: "Commerce",
    category: "Ordering, account and delivery experiences",
    description: "End-to-end customer purchasing, cart calculation, delivery tracking, and Firebase workflows for Insomnia Cookies.",
  },
  {
    metric: "Connected Devices",
    category: "Media, Bluetooth and offline workflows",
    description: "CoreBluetooth peripheral handshakes, AVFoundation streaming, and offline data sync for Mighty Audio hardware.",
  },
];

export const navigation: readonly NavigationItem[] = [
  { id: "capabilities", label: "Capabilities", href: "#capabilities" },
  { id: "work", label: "Work", href: "#work" },
  { id: "approach", label: "Approach", href: "#approach" },
  { id: "workspace", label: "Workspace", href: "#workspace" },
  { id: "consulting", label: "Consulting", href: "#consulting" },
  { id: "journey", label: "Journey", href: "#journey" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export const socialLinks: readonly SocialLink[] = [
  {
    platform: "Email",
    label: "dineshbabucse1@gmail.com",
    href: "mailto:dineshbabucse1@gmail.com",
    external: false,
  },
  {
    platform: "LinkedIn",
    label: "linkedin.com/in/erbdinesh",
    href: "https://www.linkedin.com/in/erbdinesh",
    external: true,
  },
  {
    platform: "GitHub",
    label: "github.com/ERBDINESH",
    href: "https://github.com/ERBDINESH",
    external: true,
  },
  {
    platform: "Resume",
    label: "Download Resume",
    href: "/Dineshbabu-Elumalai-Resume.pdf",
    external: false,
  },
];

export const capabilities: readonly EngineeringCapability[] = [
  {
    id: "build",
    title: "BUILD",
    oneLiner: "Native Apple-platform interfaces and product flows using modern and legacy iOS technologies.",
    items: ["Swift", "SwiftUI", "UIKit", "Objective-C"],
  },
  {
    id: "architect",
    title: "ARCHITECT",
    oneLiner: "Structure features around clear ownership, reusable components and maintainable state/data flow.",
    items: ["MVVM-C", "Modularization", "Dependency Injection", "State Management", "Design Systems"],
  },
  {
    id: "integrate",
    title: "INTEGRATE",
    oneLiner: "Connect applications safely and reliably with APIs, authentication, persistence and offline workflows.",
    items: ["REST APIs", "Codable", "Authentication", "Persistence", "Offline Workflows", "WebSockets"],
  },
  {
    id: "assure",
    title: "ASSURE",
    oneLiner: "Design for correctness, concurrency safety, memory efficiency, accessibility and production reliability.",
    items: ["Testing", "Swift Concurrency", "Memory Management", "Performance", "Accessibility", "Observability"],
  },
  {
    id: "ship",
    title: "SHIP",
    oneLiner: "Take features through review, integration, release and production support.",
    items: ["Git", "Swift Package Manager", "CI/CD", "Code Review", "Release Engineering", "Production Support"],
  },
  {
    id: "lead",
    title: "LEAD",
    oneLiner: "Turn product requirements into technical decisions while collaborating with backend, QA and product teams.",
    items: [
      "Requirements Analysis",
      "Technical Decisions",
      "Engineering Trade-offs",
      "Mentoring",
      "Documentation",
      "Cross-functional Delivery",
    ],
  },
];

export const caseStudies: readonly CaseStudy[] = [
  {
    id: "bnl-bnp-paribas",
    name: "BNL / BNP Paribas",
    client: "BNL Gruppo BNP Paribas",
    category: "Banking / Insurance",
    domain: "Financial Services & Wealth Management",
    timeframe: "Oct 2025 – Present",
    summary:
      "Enterprise mobile banking and insurance servicing flows serving Italian retail and wealth management customers.",
    challengeSentence:
      "Financial servicing journeys require deterministic, multi-step asynchronous validation and strict cryptographic OTP handling across volatile mobile networks.",
    engineeringApproachSentence:
      "Architected flow coordination with MVVM-C to isolate navigation logic and enforce exhaustive validation state machines across banking modules.",
    whatWasProduct:
      "A flagship enterprise iOS mobile banking platform allowing retail and commercial banking customers to service policies, manage daily transactions, and execute secure financial operations.",
    engineeringProblem:
      "Financial journeys require deterministic, multi-step asynchronous state handling, strict cryptographic OTP validations, immutable audit logs, and bulletproof fallback states across unpredictable network environments without regressing client performance.",
    contributions: [
      "Engineered end-to-end insurance servicing journeys including policy cancellations, withdrawals, and debit-account changes.",
      "Decoupled screen routing with MVVM-C flow coordinators for deep-linkable, testable navigation.",
      "Implemented structured validation states with clear loading, success, failure, and recovery flows for OTP verification.",
      "Built reusable multi-brand UI components conforming to strict enterprise accessibility and banking design systems.",
    ],
    capabilitiesDemonstrated: [
      "MVVM-C flow coordination",
      "Asynchronous state validation & recovery",
      "Multi-brand reusable UI design system",
      "Secure document retrieval & OTP confirmation",
    ],
    technologies: ["Swift", "SwiftUI", "UIKit", "MVVM-C", "REST APIs", "Codable", "Azure DevOps"],
    appStoreUrl: "https://apps.apple.com/app/id578969149",
    imagePath: "/assets/apps/bnl-mobile-banking.webp",
    architectureHighlights: [
      {
        label: "Flow Coordinator",
        description: "Decouples presentation controllers from flow transitions, allowing parameterized reentry and deep-linking.",
      },
      {
        label: "Exhaustive State Modelling",
        description: "Enforces distinct Loading, Validated, Error, and Retry states at the ViewModel boundary.",
      },
      {
        label: "Enterprise Security",
        description: "Token-bound session verification, encrypted payloads, and secure document handling.",
      },
    ],
  },
  {
    id: "insomnia-cookies",
    name: "Insomnia Cookies",
    category: "Commerce / Delivery",
    domain: "On-demand Bakery Ordering & Delivery",
    timeframe: "Jul 2021 – Jul 2025",
    summary:
      "Consumer ordering and fulfillment application serving millions of delivery orders and pickup customers across the US.",
    challengeSentence:
      "High-volume bakery ordering requires zero-friction checkout calculations, real-time store availability, and resilient offline cart persistence.",
    engineeringApproachSentence:
      "Implemented transactional Core Data caching with isolated repository boundaries and real-time APNs status streaming for live delivery tracking.",
    whatWasProduct:
      "High-volume consumer mobile application handling real-time custom bakery configuration, scheduled delivery tracking, loyalty rewards, and seamless mobile checkout.",
    engineeringProblem:
      "Ordering workflows require zero-friction checkout calculations, real-time store availability checks, resilient offline cart persistence, and instant synchronisation with backend dispatch streams without race conditions.",
    contributions: [
      "Developed high-traffic ordering, menu customization, and checkout experiences using Swift and UIKit/SwiftUI.",
      "Implemented Core Data offline caching layers to ensure uninterrupted cart state across intermittent connectivity.",
      "Integrated Firebase services, remote configuration, and real-time push pipelines for live delivery tracking.",
      "Diagnosed and resolved critical production edge cases including checkout race conditions and memory leaks.",
    ],
    capabilitiesDemonstrated: [
      "Cart state synchronization & persistence",
      "High-throughput REST API integration",
      "Firebase services & push notification pipelines",
      "Production bug triage & crash rate reduction",
    ],
    technologies: ["Swift", "UIKit", "SwiftUI", "MVVM", "REST APIs", "Firebase", "Core Data"],
    appStoreUrl: "https://apps.apple.com/app/id891379973",
    imagePath: "/assets/apps/insomnia-cookies.webp",
    architectureHighlights: [
      {
        label: "Cart Persistence Engine",
        description: "Transactional Core Data layer that guarantees cart integrity across background termination.",
      },
      {
        label: "Hybrid View System",
        description: "Interoperable SwiftUI cards mounted within existing UIKit navigation controllers.",
      },
      {
        label: "Real-time Order State",
        description: "Polling with exponential backoff combined with APNs pushes for live courier tracking.",
      },
    ],
  },
  {
    id: "mighty-audio",
    name: "Mighty Audio",
    category: "Connected Device / Media",
    domain: "Hardware Companion & Media Streaming",
    timeframe: "Jun 2019 – May 2021",
    summary:
      "Hardware companion application enabling phone-free music and podcast playback on screenless portable audio devices.",
    challengeSentence:
      "Synchronizing large streaming media catalogs to a screenless hardware accessory over unstable Bluetooth Low Energy (BLE) channels.",
    engineeringApproachSentence:
      "Designed a finite-state machine governing BLE packet chunking, MTU negotiation, and seamless Objective-C/Swift bridging with local Core Data caching.",
    whatWasProduct:
      "An iOS companion application communicating with compact Bluetooth-connected hardware to synchronize offline playlists from Spotify and Amazon Music without requiring an internet connection during playback.",
    engineeringProblem:
      "Managing unstable Bluetooth Low Energy (BLE) channels, packet fragmentation, hardware firmware state machines, large playlist metadata transfers, and complex audio session management across both Swift and legacy Objective-C code.",
    contributions: [
      "Engineered CoreBluetooth peripheral workflows for discovery, pairing handshakes, and packetized data transfers.",
      "Managed audio queue session configurations and background media streaming with AVFoundation.",
      "Maintained and modernized a hybrid Objective-C and Swift codebase, eliminating memory retention cycles.",
      "Built device troubleshooting diagnostics tools for real-time connection telemetry and firmware upgrade flows.",
    ],
    capabilitiesDemonstrated: [
      "CoreBluetooth peripheral state handling",
      "AVFoundation media pipeline management",
      "Objective-C and Swift interoperability",
      "Hardware edge-case debugging & diagnostic tooling",
    ],
    technologies: ["Swift", "Objective-C", "UIKit", "AVFoundation", "CoreBluetooth", "Core Data"],
    appStoreUrl: "https://apps.apple.com/app/id1164822276",
    imagePath: "/assets/apps/mighty-audio.webp",
    architectureHighlights: [
      {
        label: "BLE State Coordinator",
        description: "Finite-state machine governing scanning, MTU negotiation, packet chunking, and auto-reconnect.",
      },
      {
        label: "Audio Session Routing",
        description: "AVAudioSession category switching and interruption recovery during peripheral sync.",
      },
      {
        label: "Interoperable Bridge",
        description: "Safe bidirectional bridging between legacy C/Objective-C device SDKs and modern Swift models.",
      },
    ],
  },
];

export const principles: readonly EngineeringPrinciple[] = [
  {
    number: "01",
    title: "Architecture",
    summary: "Separate UI, state, networking and feature responsibilities so the system remains understandable as it grows.",
    detail:
      "A sustainable iOS codebase prevents massive view controllers by establishing crisp boundaries. Views only render; ViewModels own presentation logic and user intent; Coordinators own navigation; and Services own network and persistence pipelines.",
    indicators: [
      "Unidirectional data flow",
      "Testable business logic isolated from UIKit/SwiftUI",
      "Coordinator-directed flow transitions",
      "Explicit protocol-backed dependencies",
    ],
  },
  {
    number: "02",
    title: "Reliability",
    summary: "Treat loading, validation, success, failure and retry states as part of the feature design rather than afterthoughts.",
    detail:
      "Mobile networks are inherently unreliable. Every feature must explicitly model its empty, loading, transient error, and validation failure states. Recoverability should be designed into the UI contract from day one.",
    indicators: [
      "Exhaustive state enums over boolean flags",
      "Graceful offline handling and local caching",
      "Exponential retry mechanisms with jitter",
      "Actionable error feedback for users",
    ],
  },
  {
    number: "03",
    title: "Reuse",
    summary: "Build reusable UI and shared foundations where they genuinely reduce duplication and inconsistency.",
    detail:
      "Reusable components should exist to unify design systems and accelerate delivery, not create rigid abstractions. We build composable primitives with configurable tokens that adapt naturally across multiple brands and screen sizes.",
    indicators: [
      "Composable design-system tokens",
      "Strict separation of styling and layout",
      "Dynamic Type and accessibility compliance",
      "Multi-brand theming support",
    ],
  },
  {
    number: "04",
    title: "Evolution",
    summary: "Prefer incremental modernization and pragmatic engineering trade-offs over unnecessary rewrites.",
    detail:
      "High-value production systems cannot halt delivery for theoretical complete rewrites. I incrementally modernize legacy Objective-C and UIKit modules toward modern Swift and SwiftUI through well-defined interface adapters and targeted refactors.",
    indicators: [
      "Strangler fig migration pattern",
      "SwiftUI integration inside UIKit hierarchies",
      "Safe Objective-C bridging with nullability specifiers",
      "Pragmatic delivery aligned with business objectives",
    ],
  },
];

export const workspaceTopics: readonly WorkspaceTopic[] = [
  {
    id: "architecture",
    title: "Architecture",
    folder: "Architecture",
    filename: "InsuranceCoordinator.swift",
    summary: "MVVM-C navigation isolation and dependency injection across multi-screen flows.",
    responsibility:
      "Coordinates navigation and feature transitions while keeping routing logic out of presentation views.",
    engineeringChoices: [
      "Coordinator owns navigation flow",
      "ViewModel owns presentation state",
      "Dependencies are supplied externally",
      "Feature boundaries remain explicit",
    ],
    architecture: {
      pattern: "MVVM-C",
      concurrency: "MainActor-isolated UI",
      ownership: "Weak references to child coordinators",
    },
    dependencies: ["UIKit", "Foundation"],
    bulletPoints: [
      "Coordinator owns navigation flow",
      "ViewModel owns presentation state",
      "Dependencies are supplied externally",
      "Feature boundaries remain explicit",
    ],
    codeSnippet: `// MARK: - MVVM-C Feature Coordination
import UIKit

@MainActor
protocol InsuranceServicingCoordinating: AnyObject {
    func didCompleteServicing(with confirmation: ServicingConfirmation)
    func didRequestCancellation(for policyId: String)
}

final class InsuranceServicingCoordinator: Coordinator {
    var childCoordinators: [Coordinator] = []
    let navigationController: UINavigationController
    private let dependencies: AppServiceContainer
    
    init(navigationController: UINavigationController, dependencies: AppServiceContainer) {
        self.navigationController = navigationController
        self.dependencies = dependencies
    }
    
    func start() {
        let viewModel = InsurancePolicyViewModel(
            service: dependencies.insuranceService,
            coordinator: self
        )
        let viewController = InsurancePolicyViewController(viewModel: viewModel)
        navigationController.pushViewController(viewController, animated: true)
    }
}`,
    engineeringRationale:
      "By isolating navigation flow into dedicated Coordinators, ViewControllers remain pure renderers that are trivial to test, refactor, or swap out for SwiftUI implementations without touching routing code.",
  },
  {
    id: "networking",
    title: "Networking",
    folder: "Networking",
    filename: "APIClient.swift",
    summary: "Codable transport pipeline with serialized authentication interceptor and retry.",
    responsibility:
      "Encapsulates authenticated network transport, token refresh serialization, and type-safe response decoding.",
    engineeringChoices: [
      "Actor isolation serializes concurrent token refreshes",
      "Single replay cycle prevents infinite retry loops",
      "Decoupled from specific UI presentation flows",
      "Explicit error representations for domain mapping",
    ],
    architecture: {
      pattern: "Actor Transport Client",
      concurrency: "Actor-isolated state",
      ownership: "Protocol-abstracted dependencies",
    },
    dependencies: ["Foundation"],
    bulletPoints: [
      "Actor isolation serializes concurrent token refreshes",
      "Single replay cycle prevents infinite retry loops",
      "Decoupled from specific UI presentation flows",
      "Explicit error representations for domain mapping",
    ],
    codeSnippet: `// MARK: - Safe Network Transport Pipeline
import Foundation

actor NetworkClient: HTTPClientProtocol {
    private let session: URLSession
    private let authenticator: AuthenticationManaging
    
    init(session: URLSession = .shared, authenticator: AuthenticationManaging) {
        self.session = session
        self.authenticator = authenticator
    }
    
    func execute<T: Decodable>(_ endpoint: Endpoint) async throws -> T {
        let token = try await authenticator.validAccessToken()
        var request = endpoint.urlRequest
        request.setValue("Bearer \\(token)", forHTTPHeaderField: "Authorization")
        
        let (data, response) = try await session.data(for: request)
        guard let httpResponse = response as? HTTPURLResponse else {
            throw NetworkError.invalidResponse
        }
        
        switch httpResponse.statusCode {
        case 200...299:
            return try JSONDecoder.defaultDecoder.decode(T.self, from: data)
        case 401:
            try await authenticator.invalidateToken()
            return try await execute(endpoint) // Single replay after refresh
        default:
            throw NetworkError.http(statusCode: httpResponse.statusCode, data: data)
        }
    }
}`,
    engineeringRationale:
      "Using Swift actors for the network client serializes critical auth token refresh cycles, eliminating 401 race conditions when multiple concurrent requests trigger simultaneously on screen launch.",
  },
  {
    id: "concurrency",
    title: "Concurrency",
    folder: "Concurrency",
    filename: "AccountSyncActor.swift",
    summary: "Modern Swift concurrency with actors, task cancellation, and MainActor safety.",
    responsibility:
      "Safely manages in-memory account cache and coalesces concurrent synchronization tasks without data races.",
    engineeringChoices: [
      "Actor isolation eliminates data races on cache state",
      "In-flight task coalescing deduplicates redundant network queries",
      "Cooperative task lifecycle prevents stale background work",
      "Returns immutable snapshots to calling views",
    ],
    architecture: {
      pattern: "Actor Cache Store",
      concurrency: "Swift Structured Concurrency",
      ownership: "Private mutable state encapsulation",
    },
    dependencies: ["Foundation"],
    bulletPoints: [
      "Actor isolation eliminates data races on cache state",
      "In-flight task coalescing deduplicates redundant network queries",
      "Cooperative task lifecycle prevents stale background work",
      "Returns immutable snapshots to calling views",
    ],
    codeSnippet: `// MARK: - Concurrency-Safe State Synchronization
import Foundation

actor AccountDataStore {
    private var cachedAccounts: [String: UserAccount] = [:]
    private var activeSyncTask: Task<[UserAccount], Error>?
    
    func fetchAccounts(forceRefresh: Bool = false) async throws -> [UserAccount] {
        if !forceRefresh && !cachedAccounts.isEmpty {
            return Array(cachedAccounts.values)
        }
        
        // Coalesce duplicate in-flight refresh requests
        if let existingTask = activeSyncTask {
            return try await existingTask.value
        }
        
        let task = Task { () -> [UserAccount] in
            defer { self.activeSyncTask = nil }
            let fresh = try await APIClient.shared.fetchUserAccounts()
            self.cachedAccounts = Dictionary(uniqueKeysWithValues: fresh.map { ($0.id, $0) })
            return fresh
        }
        
        self.activeSyncTask = task
        return try await task.value
    }
}`,
    engineeringRationale:
      "Task coalescing inside actor boundaries completely avoids redundant API hits when multiple view widgets query the customer account list at the same time upon app foregrounding.",
  },
  {
    id: "ui-systems",
    title: "UI Systems",
    folder: "UI Systems",
    filename: "DesignSystem.swift",
    summary: "SwiftUI and UIKit interoperability with tokenized styles and Dynamic Type.",
    responsibility:
      "Provides tokenized, accessible UI primitives that adapt across light and dark appearances.",
    engineeringChoices: [
      "Single source of truth for design tokens",
      "Semantic color bindings adapt across themes",
      "Dynamic Type scaling with standard touch targets",
      "Decoupled from specific domain feature logic",
    ],
    architecture: {
      pattern: "Composable UI Primitives",
      concurrency: "MainActor rendering",
      ownership: "Stateless component styling",
    },
    dependencies: ["SwiftUI"],
    bulletPoints: [
      "Single source of truth for design tokens",
      "Semantic color bindings adapt across themes",
      "Dynamic Type scaling with standard touch targets",
      "Decoupled from specific domain feature logic",
    ],
    codeSnippet: `// MARK: - Native Accessible UI Primitive
import SwiftUI

public struct StatusBanner: View {
    public enum Variant {
        case pending, verified, alert(reason: String)
    }
    
    let variant: Variant
    let title: String
    let timestamp: Date
    
    public var body: some View {
        HStack(alignment: .top, spacing: 12) {
            Image(systemName: variant.systemIcon)
                .foregroundStyle(variant.accentColor)
                .font(.system(size: 18, weight: .semibold))
                .accessibilityHidden(true)
            
            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .font(.subheadline.weight(.semibold))
                    .foregroundStyle(Color.primary)
                Text(timestamp, style: .relative)
                    .font(.caption)
                    .foregroundStyle(Color.secondary)
            }
            Spacer()
        }
        .padding(14)
        .background(Color(uiColor: .secondarySystemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
        .accessibilityElement(children: .combine)
    }
}`,
    engineeringRationale:
      "Shared UI components combine accessible layout semantics, Dynamic Type support, and system semantic colors so they seamlessly adapt to dark mode, high contrast, and localized text length variations.",
  },
  {
    id: "reliability",
    title: "Reliability",
    folder: "Reliability",
    filename: "ErrorState.swift",
    summary: "ARC verification, memory leak prevention, and deterministic error handling.",
    responsibility:
      "Models deterministic view states with explicit loading, success, failure, and recovery flows.",
    engineeringChoices: [
      "ViewState enum prevents invalid simultaneous UI states",
      "Optional cached data retained during background loading",
      "Actionable recovery closures attached to failures",
      "Decoupled from network and rendering frameworks",
    ],
    architecture: {
      pattern: "Deterministic ViewState",
      concurrency: "Value semantics",
      ownership: "Zero reference retention cycles",
    },
    dependencies: ["Foundation"],
    bulletPoints: [
      "ViewState enum prevents invalid simultaneous UI states",
      "Optional cached data retained during background loading",
      "Actionable recovery closures attached to failures",
      "Decoupled from network and rendering frameworks",
    ],
    codeSnippet: `// MARK: - Deterministic Error & State Model
import Foundation

public enum ViewState<Value, Failure: Error> {
    case idle
    case loading(previous: Value?)
    case success(Value)
    case failure(Failure, retryAction: (() -> Void)?)
}

extension ViewState {
    public var isLoading: Bool {
        if case .loading = self { return true }
        return false
    }
    
    public var currentData: Value? {
        switch self {
        case .idle: return nil
        case .loading(let prev): return prev
        case .success(let val): return val
        case .failure: return nil
        }
    }
}`,
    engineeringRationale:
      "A deterministic ViewState generic enum prevents invalid UI combinations (such as showing both an error banner and a full-screen spinner simultaneously), creating predictable screen behaviour.",
  },
  {
    id: "delivery",
    title: "Delivery",
    folder: "Delivery",
    filename: "Package.swift",
    summary: "Swift Package Manager modularization, Azure DevOps CI, and release management.",
    responsibility:
      "Enforces clean module boundaries, explicit dependency graphs, and isolated test targets.",
    engineeringChoices: [
      "SPM separates feature modules from shared core libraries",
      "Target boundaries prevent accidental circular imports",
      "Isolated test targets enable fast incremental CI verification",
      "Explicit platform and library export declarations",
    ],
    architecture: {
      pattern: "Swift Package Modularization",
      concurrency: "Compile-time boundary isolation",
      ownership: "Strict target dependency graphs",
    },
    dependencies: ["PackageDescription"],
    bulletPoints: [
      "SPM separates feature modules from shared core libraries",
      "Target boundaries prevent accidental circular imports",
      "Isolated test targets enable fast incremental CI verification",
      "Explicit platform and library export declarations",
    ],
    codeSnippet: `// MARK: - Swift Package Manager Manifest
import PackageDescription

let package = Package(
    name: "AppCore",
    platforms: [.iOS(.v16)],
    products: [
        .library(name: "AppCore", targets: ["AppCore"]),
        .library(name: "AppUI", targets: ["AppUI"]),
        .library(name: "AppNetworking", targets: ["AppNetworking"]),
    ],
    targets: [
        .target(name: "AppNetworking", dependencies: []),
        .target(name: "AppCore", dependencies: ["AppNetworking"]),
        .target(name: "AppUI", dependencies: ["AppCore"]),
        .testTarget(name: "AppCoreTests", dependencies: ["AppCore"]),
    ]
)`,
    engineeringRationale:
      "Modularizing into Swift packages drastically cuts incremental build times, enforces explicit dependency graphs between teams, and prevents accidental circular imports across large multi-developer repos.",
  },
];

export const consultingServices: readonly ConsultingService[] = [
  {
    title: "Architecture & Codebase Review",
    description:
      "Evaluate existing iOS codebases to identify architectural bottlenecks, tight coupling, and maintainability risks.",
    deliverables: [
      "Layering and dependency graph analysis",
      "ViewModel and Coordinator decoupling assessment",
      "State management & concurrency health review",
      "Clear, actionable technical recommendations",
    ],
  },
  {
    title: "UIKit to SwiftUI & Modern Swift Adoption",
    description:
      "Guide engineering teams through safe, incremental modernization from legacy UIKit and Objective-C without risky rewrites.",
    deliverables: [
      "Hybrid UIKit/SwiftUI interoperability plan",
      "Async/await adoption roadmap",
      "Migration strategies for legacy models and APIs",
      "Team patterns and reference implementations",
    ],
  },
  {
    title: "Feature Architecture & Design System Setup",
    description:
      "Design reliable, maintainable mobile architectures for new major features or reusable design system libraries.",
    deliverables: [
      "Technical RFC and feature flow documentation",
      "Modular design-token component foundations",
      "API contract & Codable error model design",
      "Accessibility & Dynamic Type compliance patterns",
    ],
  },
  {
    title: "Release Engineering & Quality Observations",
    description:
      "Identify opportunities to strengthen CI/CD workflows, build efficiency, and release readiness.",
    deliverables: [
      "Swift Package Manager modularization guidance",
      "CI build time & automated test triage recommendations",
      "Crash triage & diagnostic workflow setup",
      "Pre-release quality checklists",
    ],
  },
];

export const consultingBoundaries: readonly string[] = [
  "Consulting and architecture recommendations are grounded in demonstrated native iOS engineering practices.",
  "No penetration testing, security certification, or penetration compliance audits are performed.",
  "No claims of guaranteed bug-free software or guaranteed performance metrics without environment testing.",
  "Runtime performance profiling, deep memory diagnostics, and CI triage require suitable codebase and environment access.",
];

export const experience: readonly Experience[] = [
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
];

export const featuredProject: FeaturedProject = {
  name: "LaunchProof",
  status: "Live Beta",
  category: "Release Readiness Platform",
  description:
    "A production-focused platform that helps web teams verify launch readiness.",
  highlights: [
    "17 release-readiness checks",
    "READY / NOT READY verdict",
    "Release blockers and warnings",
  ],
  technologies: ["Next.js", "TypeScript", "Supabase", "Cloudflare"],
  primaryUrl: "https://launchproof.erbdinesh.com",
  githubUrl: "https://github.com/ERBDINESH/launchproof",
};

export const skillGroups: readonly SkillGroup[] = [
  {
    name: "Primary iOS",
    skills: ["Swift", "UIKit", "SwiftUI", "Objective-C", "Combine"],
  },
  {
    name: "Architecture",
    skills: ["MVVM", "MVVM-C", "Modularization", "Dependency Injection"],
  },
];

export const recommendations: readonly Recommendation[] = [];

export const journeyStages: readonly JourneyStage[] = [
  {
    id: "unizen",
    year: "2019",
    period: "2019–2021",
    company: "UNIZEN TECHNOLOGIES",
    role: "iOS Developer",
    label: "Foundation",
    description:
      "Built native iOS features using Swift, Objective-C, UIKit, REST APIs and Core Data across client applications.",
    growth: ["Native iOS", "API Integration", "Persistence", "Debugging"],
  },
  {
    id: "hubino",
    year: "2021",
    period: "2021–2025",
    company: "HUBINO TECHNOLOGIES",
    role: "Software Developer (iOS)",
    label: "Product Engineering",
    description:
      "Delivered production applications across commerce and connected-device products, working with reusable UI, offline workflows and production troubleshooting.",
    growth: [
      "MVVM",
      "Commerce",
      "Connected Devices",
      "Offline Workflows",
      "Production Support",
    ],
  },
  {
    id: "bnl",
    year: "2025",
    period: "2025–Present",
    company: "RUSSELL TOBIN / BNP PARIBAS / BNL",
    role: "Senior iOS Developer",
    label: "Senior Product Delivery",
    description:
      "Building production banking and insurance-servicing journeys with SwiftUI, UIKit, MVVM-C, REST APIs and multi-brand design-system components.",
    growth: [
      "MVVM-C",
      "SwiftUI",
      "Banking",
      "Design Systems",
      "Feature Ownership",
    ],
  },
];

export const portfolio: PortfolioData = {
  profile,
  credibilityItems,
  socialLinks,
  navigation,
  capabilities,
  caseStudies,
  principles,
  workspaceTopics,
  consultingServices,
  consultingBoundaries,
  experience,
  featuredProject,
  skillGroups,
  recommendations,
};
