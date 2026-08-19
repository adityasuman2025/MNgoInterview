import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { TopicType } from "@/apis/types";
import { ROUTES } from "@/constants/routes";
import { getTopicIcon } from "@/utils/topics";
import ProgressBar from "../shared/ProgressBar";
import { memo } from "react";

interface TopicItemProps {
    topic: TopicType
}
function TopicItem({ topic }: TopicItemProps) {
    return (
        <Link
            href={ROUTES.TOPIC(topic._id)}
            className="group border border-ternary rounded-lg text-secondary-content p-4 flex items-center gap-5 hover:border-primary/50 transition-colors"
        >
            <div className="w-10 h-10 bg-base-3 border border-ternary rounded-md flex items-center justify-center">
                {getTopicIcon(topic.topicName)}
            </div>
            <div className="text-sm flex-1 flex flex-col gap-3">
                {topic.topicName}
                <ProgressBar value={Number(topic.completedQuestions)} total={Number(topic.totalQuestions)} />
            </div>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
    );
}

export default memo(TopicItem);