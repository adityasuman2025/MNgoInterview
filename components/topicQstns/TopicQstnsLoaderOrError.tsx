import { ReactNode } from "react";
import SkeletonLoader from "@/components/shared/SkeletonLoader";
import LoaderOrError from "@/components/shared/LoaderOrError";
import QuestionSolutionPanel from "@/components/topicQstns/QuestionSolutionPanel";
import type { TopicQuestionType } from "@/apis/types";

const QUESTIONS_LIST_SKELETON = <SkeletonLoader length={20} className="h-11 w-full rounded-xl border border-ternary" />;

interface TopicQstnsLoaderOrErrorProps {
    isLoading?: boolean;
    isError?: boolean;
    errorMessage?: ReactNode;
    totalCountText?: ReactNode;
    selectedQuestion?: TopicQuestionType | null;
    children?: ReactNode;
}
export default function TopicQstnsLoaderOrError({
    isLoading = false,
    isError = false,
    errorMessage = "Failed to load questions. Please try again.",
    totalCountText,
    selectedQuestion,
    children,
}: TopicQstnsLoaderOrErrorProps) {
    return (
        <section className="flex flex-1 w-full min-h-0 overflow-hidden py-2">
            <section className="flex-1 min-h-0 overflow-y-auto border-r border-ternary bg-secondary/20 p-3 flex flex-col gap-2">
                <div className="items-center justify-between text-2xs text-secondary-content/60 font-medium">
                    {isLoading ? <SkeletonLoader className="h-3 w-28 rounded" /> : <span>{totalCountText}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                    <LoaderOrError
                        isLoading={isLoading}
                        isError={isError}
                        errorMessage={errorMessage}
                        skeletonElement={QUESTIONS_LIST_SKELETON}
                    >
                        {children}
                    </LoaderOrError>
                </div>
            </section>

            <QuestionSolutionPanel
                isLoading={isLoading}
                isError={isError}
                errorMessage={errorMessage}
                selectedQuestion={selectedQuestion}
            />
        </section>
    );
}
