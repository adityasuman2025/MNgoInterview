"use client";

import { memo, useCallback, ChangeEvent, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/context/ToastContext";
import useTopicDataFromUrl from "@/hooks/useTopicDataFromUrl";
import SkeletonLoader from "@/components/shared/SkeletonLoader";
import LoaderOrError from "@/components/shared/LoaderOrError";
import { getAnswerOfAQuestionForAUserApi, saveAnswerOfAQuestionForAUserApi } from "@/apis/topic";
import type { TopicQuestionType } from "@/apis/types";
import { TOPIC_QUESTION_ANSWER_QUERY_KEY } from "@/constants/reactQueryKeys";

function debounce(func: Function, delay: number) {
    let timer: ReturnType<typeof setTimeout> | null = null;

    return function (...args: unknown[]) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

interface WriteAnswerProps {
    question?: TopicQuestionType | null;
}
function WriteAnswer({ question }: WriteAnswerProps) {
    const toast = useToast();

    const questionId = question?._id || "";
    const { topicId } = useTopicDataFromUrl();
    const queryClient = useQueryClient();

    const { data, isLoading, isError, error } = useQuery<{ data?: { answer?: string } }>({
        queryKey: [TOPIC_QUESTION_ANSWER_QUERY_KEY, topicId, questionId],
        queryFn: () => getAnswerOfAQuestionForAUserApi({ topicId, questionId }),
        enabled: Boolean(topicId && questionId),
    });

    const saveMutation = useMutation({
        mutationFn: (answer: string) => saveAnswerOfAQuestionForAUserApi({ topicId, questionId, answer }),
        onSuccess: (_resp, savedAnswer) => {
            queryClient.setQueryData<{ data?: { answer?: string } }>(
                [TOPIC_QUESTION_ANSWER_QUERY_KEY, topicId, questionId],
                { data: { answer: savedAnswer } }
            );
        },
        onError: (err) => toast.error(err.message || "Failed to save answer"),
    });

    const handleSave = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        const newAnswer = (e.target.value);

        if (!topicId || !questionId) return;
        saveMutation.mutate(newAnswer);
    }, [topicId, questionId, saveMutation]);

    const debouncedHandleChange = useMemo(() => debounce(handleSave, 800), [handleSave]);

    return (
        <LoaderOrError
            isLoading={isLoading}
            isError={isError}
            errorMessage={error?.message}
            skeletonElement={<SkeletonLoader length={1} className="h-64 w-full rounded-2xl" />}
        >
            <div className="flex flex-col gap-3">
                <textarea
                    autoFocus
                    key={questionId}
                    defaultValue={data?.data?.answer || ""}
                    onChange={debouncedHandleChange}
                    placeholder="Write your explanation or code here..."
                    rows={12}
                    className="w-full p-4 rounded-xl border border-ternary bg-secondary/40 text-secondary-content text-sm hover:outline-1 hover:outline-primary"
                />
            </div>
        </LoaderOrError>
    );
}

export default memo(WriteAnswer);
