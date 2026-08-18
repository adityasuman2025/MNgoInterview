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
    BookOpen,
    ArrowRight,
    CheckCircle2,
    Sparkles,
} from "lucide-react";
import Link from "next/link";
import { TopicType } from "@/apis/types";
import { ROUTES } from "@/constants/routes";

function getTopicIcon(topicName: string) {
    const name = topicName.toLowerCase();
    if (name.includes("react")) return <Boxes className="w-5 h-5 text-sky-400" />;
    if (name.includes("typescript")) return <FileCode2 className="w-5 h-5 text-blue-400" />;
    if (name.includes("next")) return <Zap className="w-5 h-5 text-white" />;
    if (name.includes("css") || name.includes("html")) return <Palette className="w-5 h-5 text-pink-400" />;
    if (name.includes("system")) return <Cpu className="w-5 h-5 text-emerald-400" />;
    if (name.includes("network") || name.includes("security")) return <Shield className="w-5 h-5 text-amber-400" />;
    if (name.includes("cloud")) return <Cloud className="w-5 h-5 text-cyan-400" />;
    if (name.includes("node")) return <Server className="w-5 h-5 text-green-400" />;
    if (name.includes("dsa") || name.includes("algorithm")) return <Layers className="w-5 h-5 text-purple-400" />;
    return <Code2 className="w-5 h-5 text-primary" />;
}

interface TopicItemProps {
    topic: TopicType
}
export default function TopicItem({ topic }: TopicItemProps) {
    return (
        <Link
            href={ROUTES.TOPIC(topic._id)}
        >
            {topic.slug}
        </Link>
    );
}