import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import ModeProvider, { MODES, type ModeTypes } from "@/context/ModeContext";
import TopicSubNavbar from "@/components/topicQstns/TopicSubNavbar";
import TopicQstnsPage from "@/components/topicQstns/TopicQstnsPage";
import { getTopicQuestionsApi } from "@/apis/topic";
import { getTopicDetailsFromUrlParams } from "@/utils/topics";
import { BROWSER_TAB_TITLE } from "@/constants/browserTabTitle";
import { TOPIC_QUESTIONS_QUERY_KEY } from "@/constants/reactQueryKeys";
import { getTokenFromServerCookies, createServerQueryClient, getServerCookie } from "@/utils/server";
import { Suspense } from "react";
import TopicQstnsSkeleton from "@/components/topicQstns/TopicQstnsSkeleton";
import { NAVBAR_HEIGHT, COOKIES } from "@/constants";

interface TopicProps {
    params: Promise<{ topicData: string }>;
}
async function TopicData({ params }: { params: Promise<{ topicData: string }> }) {
    const { topicData } = await params;
    const { topicName, topicId } = getTopicDetailsFromUrlParams(topicData);
    if (!topicId) return notFound();

    const token = await getTokenFromServerCookies();
    const initialMode = await getServerCookie<ModeTypes>(COOKIES.MODE, MODES.LEARN);

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
        <ModeProvider initialMode={initialMode}>
            <title>{BROWSER_TAB_TITLE.TOPIC_QUESTIONS(topicName)}</title>
            <meta name="robots" content="index, follow" />

            <div className="flex flex-col flex-1 w-full min-h-0">
                <TopicSubNavbar />
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <TopicQstnsPage topicId={topicId} />
                </HydrationBoundary>
            </div>
        </ModeProvider>
    );
}

export default function Topic({ params }: TopicProps) {
    return (
        <div
            className="flex flex-col w-full overflow-hidden"
            style={{ height: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}
        >
            <Suspense fallback={<TopicQstnsSkeleton />}>
                <TopicData params={params} />
            </Suspense>
        </div>
    );
}
