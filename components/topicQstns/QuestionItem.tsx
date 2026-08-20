import { CheckCircle2, Circle } from "lucide-react";
import { memo } from "react";
import type { TopicQuestionType } from "@/apis/types";

interface QuestionItemProps {
    question: TopicQuestionType;
    index: number;
    isLogged?: boolean;
    isSelected?: boolean;
    onSelect: (index: number) => void;
}
function QuestionItem({
    question,
    index,
    isLogged = false,
    isSelected = false,
    onSelect,
}: QuestionItemProps) {
    return (
        <button
            type="button"
            onClick={() => onSelect(index)}
            className={`w-full text-left px-3.5 py-3 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-2.5 ${isSelected
                ? "bg-secondary border-primary/40 text-primary font-medium shadow-xs"
                : "bg-secondary/40 hover:bg-secondary/80 border-ternary hover:border-ternary-content/20 text-secondary-content/85 hover:text-secondary-content"
                }`}
            title={question?.title}
        >
            <div className="flex items-center gap-1.5 pt-0.5 shrink-0">
                {isLogged && (
                    question?.isMarkedComplete ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                        <Circle className="w-3.5 h-3.5 text-secondary-content/25" />
                    )
                )}
                <span className="text-2xs font-mono text-secondary-content/40">
                    #{index + 1}
                </span>
            </div>

            <span className="text-xs line-clamp-2 flex-1">
                {question?.title}
            </span>
        </button>
    );
}

export default memo(QuestionItem)