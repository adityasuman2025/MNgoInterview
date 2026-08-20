"use client";

import { memo } from "react";
import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";
import Button, { BUTTON_VARIANTS } from "@/components/shared/Button";
import SolutionRenderer from "@/components/topicQstns/SolutionRenderer";
import type { TopicQuestionType } from "@/apis/types";

interface SolutionModalProps {
    question: TopicQuestionType | null;
    isOpen: boolean;
    onClose: () => void;
}
function SolutionModal({ question, isOpen, onClose }: SolutionModalProps) {
    if (!question) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className="md:hidden !p-0"
        >
            <Modal.Header className="flex items-center justify-between border-b border-ternary p-4">
                <div className="flex flex-col gap-1 pr-2">
                    <span className="text-2xs font-bold tracking-wider text-primary uppercase">
                        Question Solution
                    </span>
                    <h2 className="text-sm font-bold text-ternary-content leading-snug line-clamp-2">
                        {question?.title}
                    </h2>
                </div>
                <Button
                    type="button"
                    variant={BUTTON_VARIANTS.PRIMARY}
                    onClick={onClose}
                    aria-label="Close solution"
                    className="!p-1.5 shrink-0 rounded-full"
                >
                    <X className="w-4 h-4" />
                </Button>
            </Modal.Header>

            <Modal.Body className="p-4">
                <SolutionRenderer solution={question?.solution} />
            </Modal.Body>
        </Modal>
    );
}

export default memo(SolutionModal);
