import Link from "next/link";
import { TopicType } from "@/apis/types";
import { ROUTES } from "@/constants/routes";
import CircularProgress from "@/components/shared/CircularProgress";
import Button, { BUTTON_VARIANTS } from "@/components/shared/Button";
import { memo } from "react";

interface ContinueLearningCardProps {
    topic: TopicType;
}
function ContinueLearningCard({ topic }: ContinueLearningCardProps) {
    const total = Number(topic.totalQuestions) || 0;
    const completed = Number(topic.completedQuestions) || 0;
    const percentage = total > 0 ? (completed / total) * 100 : 0;

    return (
        <Link
            href={ROUTES.TOPIC(topic)}
            className="group border border-ternary rounded-xl p-4 flex items-center justify-between gap-4 bg-secondary/60 hover:border-primary/50 text-secondary-content transition-all duration-200"
        >
            <div className="flex items-center gap-3.5 min-w-0">
                <CircularProgress percentage={percentage} size={52} strokeWidth={4} />

                <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-secondary-content truncate">
                            {topic.topicName}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-2xs text-secondary-content/60">
                        <span>
                            <strong className="text-secondary-content font-medium">{completed}</strong>
                            <span> / {total} questions</span>
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
                <Button
                    type="button"
                    variant={BUTTON_VARIANTS.TERNARY}
                    className="!text-xs !py-1 !px-3.5 !rounded-full pointer-events-none group-hover:brightness-110"
                >
                    Resume
                </Button>
            </div>
        </Link>
    );
}

export default memo(ContinueLearningCard);