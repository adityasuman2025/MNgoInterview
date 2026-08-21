"use client";

import { memo } from "react";
import Modal from "@/components/shared/Modal";
import QuestionSolutionPanel from "@/components/topicQstns/QuestionSolutionPanel";
import type { TopicQuestionType } from "@/apis/types";

interface SolutionModalProps {
    selectedQuestion: TopicQuestionType | null;
    isOpen: boolean;
    onClose: () => void;
}
function SolutionModal({ selectedQuestion, isOpen, onClose }: SolutionModalProps) {
    if (!selectedQuestion?._id) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className="md:hidden !p-0"
        >
            <QuestionSolutionPanel
                selectedQuestion={selectedQuestion}
                className="flex flex-col min-h-0 overflow-y-auto flex-1"
                onClose={onClose}
            />
        </Modal>
    );
}

export default memo(SolutionModal);
