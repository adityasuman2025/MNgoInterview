"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { getTopicDetailsFromUrlParams } from "@/utils/topics";
import { TOPICS_QUERY_KEY } from "@/constants/reactQueryKeys";
import type { getTopicsApiResp } from "@/apis/types";

export default function useTopicDataFromUrl() {
    const queryClient = useQueryClient();

    const params = useParams();
    const topicData = params?.topicData as string | undefined;

    return useMemo(() => {
        if (!topicData) return { topicSlug: "", topicName: "", topicId: "" };

        const fallbackDetails = getTopicDetailsFromUrlParams(topicData);
        const { topicId } = fallbackDetails;

        if (topicId) {
            // Check if topics list exists in React Query cache
            const cachedTopics = queryClient.getQueryData<getTopicsApiResp>([TOPICS_QUERY_KEY]);
            const matchedTopic = cachedTopics?.data?.find((t) => t._id === topicId);

            if (matchedTopic) return { topicId: matchedTopic._id, topicSlug: matchedTopic.slug, ...matchedTopic };
        }

        return fallbackDetails;
    }, [topicData, queryClient]);
}

