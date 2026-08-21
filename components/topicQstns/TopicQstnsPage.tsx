"use client";

import { useState, useCallback, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import QuestionItem from "@/components/topicQstns/QuestionItem";
import SolutionModal from "@/components/topicQstns/SolutionModal";
import TopicQstnsLoaderOrError from "@/components/topicQstns/TopicQstnsLoaderOrError";
import InfiniteScroll from "@/components/shared/InfiniteScroll";
import SkeletonLoader from "@/components/shared/SkeletonLoader";
import { getTopicQuestionsApi } from "@/apis/topic";
import { TOPIC_QUESTIONS_QUERY_KEY } from "@/constants/reactQueryKeys";

const BOTTOM_SKELETON_LOADER = (
    <div className="flex flex-col gap-1.5 pt-1.5">
        <SkeletonLoader
            length={3}
            className="h-11 w-full rounded-xl border border-ternary"
        />
    </div>
);

export default function TopicQstnsPage({ topicId }: { topicId: string }) {
    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryFn: ({ pageParam = 1 }) => getTopicQuestionsApi({ topicId, page: pageParam }),
        queryKey: [TOPIC_QUESTIONS_QUERY_KEY, topicId],
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const pagination = lastPage?.data?.pagination;
            if (pagination?.hasMore) return pagination.page + 1;
            return undefined;
        },
        select: (data) => ({
            questions: data.pages.flatMap((page) => page?.data?.questions || []),
            latestPagination: data.pages[data.pages.length - 1]?.data?.pagination,
        }),
    });

    const questions = data?.questions || [];
    const totalItems = data?.latestPagination?.totalItems || questions.length;

    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number | null>(0);
    const [isMobileModalOpen, setIsMobileModalOpen] = useState<boolean>(false);

    const selectedQuestion = questions && selectedQuestionIndex !== null ? questions?.[selectedQuestionIndex] : null;

    const handleSelectQuestion = useCallback((index: number) => {
        setSelectedQuestionIndex(index);
        // open modal on small screens (window width < 768px)
        if (typeof window !== "undefined" && window.innerWidth < 768) setIsMobileModalOpen(true);
    }, []);

    const handleCloseMobileModal = useCallback(() => {
        setSelectedQuestionIndex(null);
        setIsMobileModalOpen(false);
    }, []);

    const questionListContent = useMemo(() => (
        <InfiniteScroll
            hasMore={Boolean(hasNextPage)}
            isLoadingMore={isFetchingNextPage}
            onLoadMore={fetchNextPage}
            className="flex flex-col gap-1.5"
            loader={BOTTOM_SKELETON_LOADER}
        >
            {questions.map((question, idx) => (
                <QuestionItem
                    key={question._id}
                    question={question}
                    index={idx}
                    isSelected={selectedQuestionIndex === idx}
                    onSelect={handleSelectQuestion}
                />
            ))}
        </InfiniteScroll>
    ), [hasNextPage, isFetchingNextPage, fetchNextPage, questions, selectedQuestionIndex, handleSelectQuestion]);

    return (
        <>
            <TopicQstnsLoaderOrError
                isLoading={isLoading}
                isError={isError}
                errorMessage={error instanceof Error ? error.message : "Failed to load questions."}
                totalCountText={`QUESTIONS (${questions.length} / ${totalItems})`}
                selectedQuestion={selectedQuestion}
            >
                {questionListContent}
            </TopicQstnsLoaderOrError>

            <SolutionModal isOpen={isMobileModalOpen} selectedQuestion={selectedQuestion} onClose={handleCloseMobileModal} />
        </>
    );
}