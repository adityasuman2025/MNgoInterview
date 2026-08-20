import { Metadata } from "next";
import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getTopicQuestionsApi } from "@/apis/topic";
import { getTopicDetailsFromUrlParams } from "@/utils/topics";
import { BROWSER_TAB_TITLE } from "@/constants/browserTabTitle";
import { TOPIC_QUESTIONS_QUERY_KEY } from "@/constants/reactQueryKeys";
import { getTokenFromServerCookies, createServerQueryClient } from "@/utils/server";

interface TopicPageProps {
    params: Promise<{ topicData: string }>;
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
    const { topicData } = await params;
    const { topicName } = getTopicDetailsFromUrlParams(topicData);

    return {
        title: BROWSER_TAB_TITLE.TOPIC_QUESTIONS(topicName),
        robots: { index: true, follow: true },
    };
}

export default async function TopicPage({ params }: TopicPageProps) {
    const { topicData } = await params;
    const { topicId } = getTopicDetailsFromUrlParams(topicData);
    const token = await getTokenFromServerCookies();

    const queryClient = createServerQueryClient();

    try {
        await queryClient.fetchQuery({
            queryFn: () => getTopicQuestionsApi({ topicId, token }),
            queryKey: [TOPIC_QUESTIONS_QUERY_KEY, topicId],
        });
    } catch (err: unknown) {
        const error = err as { status?: number; message?: string };
        if (error?.status === 404) notFound();
    }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <section>
                {topicId}
            </section>
        </HydrationBoundary>
    );
}