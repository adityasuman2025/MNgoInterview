import type { QueryClient, InfiniteData } from "@tanstack/react-query";
import { TOPIC_QUESTIONS_QUERY_KEY, TOPICS_QUERY_KEY } from "@/constants/reactQueryKeys";
import type { getTopicQuestionsApiResp, getTopicsApiResp, TopicQuestionType, TopicType } from "@/apis/types";

export function updateQuestionInCache({
    queryClient,
    topicId,
    questionId,
    updater,
}: {
    queryClient: QueryClient;
    topicId: string;
    questionId: string;
    updater: Partial<TopicQuestionType> | ((prev: TopicQuestionType) => TopicQuestionType);
}) {
    queryClient.setQueryData<InfiniteData<getTopicQuestionsApiResp>>(
        [TOPIC_QUESTIONS_QUERY_KEY, topicId],
        (oldData) => {
            if (!oldData?.pages) return oldData;

            return {
                ...oldData,
                pages: oldData.pages.map((page) => {
                    if (!page?.data?.questions) return page;

                    return {
                        ...page,
                        data: {
                            ...page.data,
                            questions: page.data.questions.map((q) => {
                                if (q._id !== questionId) return q;
                                return typeof updater === "function"
                                    ? updater(q)
                                    : { ...q, ...updater };
                            }),
                        },
                    };
                }),
            };
        }
    );
}

export function updateTopicInCache({
    queryClient,
    topicId,
    updater,
}: {
    queryClient: QueryClient;
    topicId: string;
    updater: Partial<TopicType> | ((prev: TopicType) => TopicType);
}) {
    queryClient.setQueryData<getTopicsApiResp>([TOPICS_QUERY_KEY], (oldTopics) => {
        if (!oldTopics?.data) return oldTopics;

        return {
            ...oldTopics,
            data: oldTopics.data.map((t) => {
                if (t._id !== topicId) return t;
                return typeof updater === "function"
                    ? updater(t)
                    : { ...t, ...updater };
            }),
        };
    });
}
