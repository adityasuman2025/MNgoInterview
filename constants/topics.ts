import {
    Code2,
    Boxes,
    Server,
    Shield,
    Cloud,
    Palette,
    Layers,
    Cpu,
    Zap,
    FileCode2,
    Globe,
    Gauge,
    FileCode,
} from "lucide-react";

export const ICON_BASE_CLASSNAME = "w-6 h-6";

export const TOPIC_ICON_CONFIG = [
    { keys: ["react"], Icon: Boxes, color: "text-sky-400" },
    { keys: ["next"], Icon: Zap, color: "text-white" },
    { keys: ["node", "backend", "express"], Icon: Server, color: "text-green-400" },
    { keys: ["typescript"], Icon: FileCode2, color: "text-blue-400" },
    { keys: ["javascript", "js"], Icon: FileCode, color: "text-yellow-400" },
    { keys: ["browser", "web", "dom", "html"], Icon: Globe, color: "text-cyan-400" },
    { keys: ["optim", "perf", "speed"], Icon: Gauge, color: "text-emerald-400" },
    { keys: ["css", "style", "tail"], Icon: Palette, color: "text-pink-400" },
    { keys: ["system", "arch"], Icon: Cpu, color: "text-violet-400" },
    { keys: ["network", "security", "auth"], Icon: Shield, color: "text-amber-400" },
    { keys: ["cloud", "devops"], Icon: Cloud, color: "text-sky-300" },
    { keys: ["dsa", "algo", "struct"], Icon: Layers, color: "text-purple-400" },

    { keys: [], Icon: Code2, color: "text-primary" }, // fallback
] as const;
