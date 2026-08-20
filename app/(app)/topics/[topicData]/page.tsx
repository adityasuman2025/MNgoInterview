import { Metadata } from "next";
import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import ModeProvider from "@/context/ModeContext";
import TopicSubNavbar from "@/components/topicQstns/TopicSubNavbar";
import TopicQstnsPage from "@/components/topicQstns/TopicQstnsPage";
import { getTopicQuestionsApi } from "@/apis/topic";
import { getTopicDetailsFromUrlParams } from "@/utils/topics";
import { BROWSER_TAB_TITLE } from "@/constants/browserTabTitle";
import { TOPIC_QUESTIONS_QUERY_KEY } from "@/constants/reactQueryKeys";
import { getTokenFromServerCookies, createServerQueryClient } from "@/utils/server";
import { Suspense } from "react";
import TopicQstnsLoaderOrError from "@/components/topicQstns/TopicQstnsLoaderOrError";
import { NAVBAR_HEIGHT } from "@/constants";

interface TopicProps {
    params: Promise<{ topicData: string }>;
}

export async function generateMetadata({ params }: TopicProps): Promise<Metadata> {
    const { topicData } = await params;
    const { topicName } = getTopicDetailsFromUrlParams(topicData);

    return {
        title: BROWSER_TAB_TITLE.TOPIC_QUESTIONS(topicName),
        robots: { index: true, follow: true },
    };
}

async function TopicData({ topicId }: { topicId: string }) {
    const token = await getTokenFromServerCookies();

    const queryClient = createServerQueryClient();
    try {
        await queryClient.fetchInfiniteQuery({
            queryFn: ({ pageParam = 1 }) => getTopicQuestionsApi({ topicId, page: pageParam as number, token }),
            queryKey: [TOPIC_QUESTIONS_QUERY_KEY, topicId],
            initialPageParam: 1,
        });
    } catch (err: unknown) {
        const error = err as { status?: number; message?: string };
        if (error?.status === 404) return notFound();
    }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <TopicQstnsPage topicId={topicId} />
        </HydrationBoundary>
    );
}

export default async function Topic({ params }: TopicProps) {
    const { topicData } = await params;
    const { topicId } = getTopicDetailsFromUrlParams(topicData);
    if (!topicId) return notFound();

    return (
        <ModeProvider>
            <div className="flex flex-col flex-1 w-full" style={{ height: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}>
                <TopicSubNavbar />
                <Suspense fallback={<TopicQstnsLoaderOrError isLoading={true} />}>
                    <TopicData topicId={topicId} />
                </Suspense>
            </div>
        </ModeProvider>
    );
}