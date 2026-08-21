"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLogin } from "@/context/LoginContext";
import ContinueLearningCard from "@/components/topics/ContinueLearningCard";
import TopicItem from "@/components/topics/TopicItem";
import TopicsLoaderOrError from "@/components/topics/TopicsLoaderOrError";
import { getTopicsApi } from "@/apis/topic";
import { TOPICS_QUERY_KEY } from "@/constants/reactQueryKeys";

export default function TopicsPage() {
    const { isLogged } = useLogin();

    const { isLoading, isError, error, data } = useQuery({ queryFn: () => getTopicsApi(), queryKey: [TOPICS_QUERY_KEY] });
    const topics = data?.data || [];

    const continueLearningTopics = useMemo(() => {
        if (!isLogged) return [];
        return [...topics].sort((a, b) => (b.completedQuestions ?? 0) - (a.completedQuestions ?? 0)).slice(0, 2);
    }, [isLogged, topics]);

    return (
        <TopicsLoaderOrError
            isLoading={isLoading}
            isLogged={isLogged}
            isError={isError}
            errorMessage={error?.message}
            continueLearningContent={continueLearningTopics.map((topic) => (
                <ContinueLearningCard key={topic._id} topic={topic} />
            ))}
        >
            {topics.map((topic) => (
                <TopicItem key={topic._id} topic={topic} />
            ))}
        </TopicsLoaderOrError>
    );
}