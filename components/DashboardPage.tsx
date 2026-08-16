"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getTopicsApi } from "@/apis/user";
import { TOPICS_QUERY_KEY } from "@/constants/reactQueryKeys";
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

export default function DashboardPage() {
    const { data, isLoading, isFetching } = useQuery({
        queryFn: getTopicsApi,
        queryKey: [TOPICS_QUERY_KEY],
    });

    const topics = data?.data || [];
    console.log("topics", topics, isFetching)

    return (
        <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col gap-10">
            {/* Hero Header */}
            <section className="flex flex-col items-center text-center gap-3 max-w-xl mx-auto pt-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-secondary bg-secondary text-xs font-medium text-secondary-content">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Free Software Engineering Interview Prep</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-ternary-content leading-tight">
                    Practice Real-World <br className="hidden sm:block" />
                    <span className="text-primary">Interview Questions</span>
                </h1>
                <p className="text-xs sm:text-sm opacity-70 text-ternary-content max-w-md">
                    Curated questions tested by top tech companies. Master frontend, backend, DSA, and system design.
                </p>
            </section>

            {/* Topics Section */}
            <section className="flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-secondary pb-3 px-1">
                    <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-primary" />
                        <h2 className="text-base font-bold text-ternary-content tracking-tight">
                            Topics
                        </h2>
                    </div>
                    <span className="text-xs opacity-60 text-ternary-content font-medium">
                        {topics.length} Available
                    </span>
                </div>

                {/* Topics Grid: 3 columns on desktop, 2 on tablet, 1 on mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {isLoading && topics.length === 0 ? (
                        Array.from({ length: 9 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-28 rounded-xl border border-secondary bg-secondary/30 animate-pulse"
                            />
                        ))
                    ) : (
                        topics.map((topic) => {
                            const total = topic.totalQuestions ?? 0;
                            const completed = topic.completedQuestions ?? 0;
                            const isCompleted = completed > 0 && completed === total;

                            return (
                                <Link
                                    key={topic._id}
                                    href={`/topic/${topic.slug}`}
                                    className="group relative flex flex-col justify-between p-4 rounded-xl border border-secondary bg-secondary hover:border-primary/60 hover:bg-secondary/80 transition-all duration-150 active:scale-[0.99] cursor-pointer shadow-sm"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-base-1/50 border border-secondary">
                                                {getTopicIcon(topic.topicName)}
                                            </div>
                                            <h3 className="text-sm font-semibold text-ternary-content group-hover:text-primary transition-colors line-clamp-1">
                                                {topic.topicName}
                                            </h3>
                                        </div>
                                        <ArrowRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                                    </div>

                                    <div className="flex items-center justify-between text-xs opacity-70 text-ternary-content mt-4 pt-2.5 border-t border-secondary">
                                        <span className="font-medium">
                                            {total > 0 ? `${total} Questions` : "Practice"}
                                        </span>
                                        {completed > 0 ? (
                                            <span className={`inline-flex items-center gap-1 font-semibold ${isCompleted ? "text-emerald-400" : "text-amber-400"}`}>
                                                <CheckCircle2 className="w-3 h-3" />
                                                {completed}/{total}
                                            </span>
                                        ) : (
                                            <span className="opacity-50">Not started</span>
                                        )}
                                    </div>
                                </Link>
                            );
                        })
                    )}
                </div>
            </section>
        </div>
    );
}