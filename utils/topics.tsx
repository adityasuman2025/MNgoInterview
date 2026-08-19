import { TOPIC_ICON_CONFIG, ICON_BASE_CLASSNAME } from "@/constants/topics";

export function getTopicIcon(topicName: string) {
    const name = topicName.toLowerCase();
    const matched = TOPIC_ICON_CONFIG.find(({ keys }) => keys.some((k) => name.includes(k)));

    if (matched) {
        const { Icon, color } = matched;
        return <Icon className={`${ICON_BASE_CLASSNAME} ${color}`} />;
    }

    const fallback = TOPIC_ICON_CONFIG[TOPIC_ICON_CONFIG.length - 1];
    const FallbackIcon = fallback.Icon;
    return <FallbackIcon className={`${ICON_BASE_CLASSNAME} ${fallback.color}`} />;
}
