"use client";

import { memo, ReactNode, useCallback, useState } from "react";
import { X } from "lucide-react";
import { useLogin } from "@/context/LoginContext";
import { useMode } from "@/context/ModeContext";
import SkeletonLoader from "@/components/shared/SkeletonLoader";
import LoaderOrError from "@/components/shared/LoaderOrError";
import Button, { BUTTON_VARIANTS } from "@/components/shared/Button";
import SolutionRenderer from "@/components/topicQstns/SolutionRenderer";
import MarkDoneButton from "@/components/topicQstns/MarkDoneButton";
import WriteAnswer from "@/components/topicQstns/WriteAnswer";
import type { TopicQuestionType } from "@/apis/types";

const SOLUTION_BODY_SKELETON = <SkeletonLoader length={1} className="h-72 w-full rounded-2xl" />;

interface QuestionSolutionPanelProps {
    isLoading?: boolean;
    isError?: boolean;
    errorMessage?: ReactNode;
    selectedQuestion?: TopicQuestionType | null;
    className?: string;
    onClose?: () => void;
}
function QuestionSolutionPanel({
    isLoading = false,
    isError = false,
    errorMessage,
    selectedQuestion,
    className = "hidden md:flex md:flex-3 min-h-0 overflow-y-auto bg-ternary/20 flex-col",
    onClose,
}: QuestionSolutionPanelProps) {
    const { isLogged } = useLogin();
    const { isQuizMode } = useMode();

    const [viewingSolutionQstnId, setViewingSolutionQstnId] = useState<string | null>(null);
    const solutionVis = !isQuizMode ? true : (Boolean(selectedQuestion?._id) && viewingSolutionQstnId === selectedQuestion?._id); // solution is always visible if not in quiz mode

    const toggleSolutionVis = useCallback(() => {
        setViewingSolutionQstnId(prev => (prev === selectedQuestion?._id ? null : (selectedQuestion?._id ?? null)));
    }, [selectedQuestion?._id]);

    return (
        <section className={className}>
            <div className="border-b border-ternary sticky top-0 backdrop-blur-md p-3 flex items-start justify-between gap-2 z-1">
                <div className="flex flex-col gap-1 flex-1">
                    <span className="text-2xs font-bold tracking-wider text-primary uppercase">Question Solution</span>

                    {isLoading ? <SkeletonLoader className="h-7 w-3/4 rounded-lg mt-1" /> : selectedQuestion?.title ? (
                        <>
                            <h1 className="text-xl sm:text-2xl font-extrabold text-ternary-content my-1 leading-snug">{selectedQuestion?.title}</h1>

                            {isLogged && isQuizMode ? (
                                <div className="flex gap-3 mt-2">
                                    <Button
                                        type="button"
                                        onClick={toggleSolutionVis}
                                        className="text-xs !py-1"
                                        variant={BUTTON_VARIANTS.TERNARY}
                                    >
                                        {solutionVis ? "Write Answer" : "View Solution"}
                                    </Button>

                                    <MarkDoneButton question={selectedQuestion} />
                                </div>
                            ) : null}
                        </>
                    ) : null}
                </div>

                {onClose ? (
                    <Button
                        type="button"
                        variant={BUTTON_VARIANTS.PRIMARY}
                        onClick={onClose}
                        aria-label="Close solution"
                        className="!p-1.5 shrink-0 rounded-full"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                ) : null}
            </div>

            <div className="w-full mx-auto p-4">
                <LoaderOrError
                    isLoading={isLoading}
                    isError={isError}
                    errorMessage={errorMessage}
                    skeletonElement={SOLUTION_BODY_SKELETON}
                >
                    {solutionVis ? <SolutionRenderer solution={selectedQuestion?.solution} /> : isLogged && isQuizMode ? <WriteAnswer question={selectedQuestion} /> : null}
                </LoaderOrError>
            </div>
        </section>
    );
}

export default memo(QuestionSolutionPanel)