import { ReactNode } from "react";
import {
    Boxes,
    Cpu,
    ShieldCheck,
    Terminal,
    Zap,
    Timer,
    CheckCircle2,
    BookOpen,
    Layers,
} from "lucide-react";

export interface MarketingFeature {
    icon: ReactNode;
    title: string;
    description: string;
}

export interface MarketingStat {
    value: string;
    label: string;
}

export const MARKETING_FEATURES: MarketingFeature[] = [
    {
        icon: <Terminal className="w-5 h-5 text-indigo-400" />,
        title: "Real Coding Challenges",
        description:
            "Curated hands-on coding and algorithmic questions frequently asked in technical rounds by top tech companies.",
    },
    {
        icon: <Boxes className="w-5 h-5 text-sky-400" />,
        title: "Frontend Mastery",
        description:
            "Deep dives into React internals, JavaScript event loops, DOM performance, CSS architectures, and TypeScript.",
    },
    {
        icon: <Cpu className="w-5 h-5 text-emerald-400" />,
        title: "System Design & Architecture",
        description:
            "Practical frontend and fullstack system design questions with high-level architecture diagrams and trade-off breakdowns.",
    },
    {
        icon: <Timer className="w-5 h-5 text-cyan-400" />,
        title: "Practice & Timed Quiz Modes",
        description:
            "Switch between self-paced Practice mode with instant solutions, or simulated Timed Quiz mode to build interview speed and confidence.",
    },
    {
        icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
        title: "Web Security & Networking",
        description:
            "Master CORS, CSRF/XSS mitigations, HTTP/2 & HTTP/3, caching strategies, WebSockets, and browser rendering pipelines.",
    },
    {
        icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
        title: "Progress & Completion Tracking",
        description:
            "Track solved questions, monitor completed topics, and identify weak spots to optimize your preparation roadmap.",
    },
    {
        icon: <BookOpen className="w-5 h-5 text-pink-400" />,
        title: "In-Depth Explanations",
        description:
            "Detailed solutions with code snippets, time & space complexities, edge cases, and interviewer follow-up questions.",
    },
    {
        icon: <Layers className="w-5 h-5 text-orange-400" />,
        title: "DSA & Core Fundamentals",
        description:
            "Key data structures, algorithms, recursion, dynamic programming, and patterns tailored specifically for interview success.",
    },
    {
        icon: <Zap className="w-5 h-5 text-purple-400" />,
        title: "100% Free & Open Access",
        description:
            "No paywalls, subscriptions, or gated solutions. Quality interview preparation accessible to all developers worldwide.",
    },
];

export const MARKETING_STATS: MarketingStat[] = [
    { value: "500+", label: "Curated Questions" },
    { value: "11+", label: "Core Topics" },
    { value: "2", label: "Quiz & Practice Modes" },
    { value: "100%", label: "Free Forever" },
];
