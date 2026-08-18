"use client";

import { useQuery } from "@tanstack/react-query";
import { Sparkles } from "lucide-react";
import LoaderOrError from "@/components/shared/LoaderOrError";
import { getTopicsApi } from "@/apis/user";
import { TOPICS_QUERY_KEY } from "@/constants/reactQueryKeys";
import { useLogin } from "@/context/LoginContext";
import TopicItem from "./TopicItem";

export default function TopicsPage() {
    const { user } = useLogin();

    const { data, isLoading, isError, error } = useQuery({
        queryFn: getTopicsApi,
        queryKey: [TOPICS_QUERY_KEY, user?._id],
    });
    const topics = data?.data || [];

    return (
        <>
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

            <LoaderOrError
                isLoading={isLoading && topics.length === 0}
                isError={isError}
                errorMessage={error?.message}
                skeletonElement={Array.from({ length: 9 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-28 rounded-xl border border-secondary bg-secondary/30 animate-pulse"
                    />
                ))}
            >
                {topics.map((topic) => {
                    const total = topic.totalQuestions ?? 0;
                    const completed = topic.completedQuestions ?? 0;
                    const isCompleted = completed > 0 && completed === total;

                    return (
                        <TopicItem key={topic._id} topic={topic} />
                    )
                })}
            </LoaderOrError>
        </>
    );
}