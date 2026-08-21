"use client";

import { memo, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "@/components/shared/Button";
import { useToast } from "@/context/ToastContext";
import useTopicDataFromUrl from "@/hooks/useTopicDataFromUrl";
import { markQuestionDoneApi } from "@/apis/topic";
import { updateQuestionInCache, updateTopicInCache } from "@/utils/queryCache";
import type { TopicQuestionType } from "@/apis/types";

interface MarkDoneButtonProps {
    question?: TopicQuestionType | null;
}
function MarkDoneButton({ question }: MarkDoneButtonProps) {
    const toast = useToast();
    const { topicId } = useTopicDataFromUrl();
    const queryClient = useQueryClient();

    const markDoneMutation = useMutation({
        mutationFn: markQuestionDoneApi,
        onSuccess: (_data, variables) => {
            toast.success("marked as done");

            updateQuestionInCache({
                queryClient,
                topicId: variables.topicId,
                questionId: variables.questionId,
                updater: { isMarkedComplete: true },
            });

            updateTopicInCache({
                queryClient,
                topicId: variables.topicId,
                updater: (prev) => ({
                    ...prev,
                    completedQuestions: (prev.completedQuestions ?? 0) + 1,
                }),
            });
        },
        onError: (err) => toast.error(err.message || "failed to mark done"),
    });

    const handleMarkAsDoneClick = useCallback(() => {
        if (!question?._id || !topicId) return;
        markDoneMutation.mutate({ questionId: question._id, topicId });
    }, [question?._id, topicId, markDoneMutation]);

    return (
        <Button
            type="button"
            className="text-xs !py-1"
            loaderClassName="!w-3 !h-3"
            onClick={handleMarkAsDoneClick}
            disabled={Boolean(question?.isMarkedComplete)}
            loading={markDoneMutation.isPending}
        >
            Mark Done
        </Button>
    );
}

export default memo(MarkDoneButton);
