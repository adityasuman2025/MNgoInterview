import { Suspense } from "react";
import { type Metadata } from "next";
import { cookies } from "next/headers";
import { Sparkles } from "lucide-react";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import TopicsPage from "@/components/topics/TopicsPage";
import TopicsLoaderOrError from "@/components/topics/TopicsLoaderOrError";
import { getTopicsApi } from "@/apis/topic";
import { BROWSER_TAB_TITLE } from "@/constants/browserTabTitle";
import { COOKIES } from "@/constants";
import { TOPICS_QUERY_KEY } from "@/constants/reactQueryKeys";

export const metadata: Metadata = {
    title: BROWSER_TAB_TITLE.TOPICS,
    robots: { index: true, follow: true },
};

/*
    [Server]
    1. prefetchQuery()            --> Fetches API and saves in server cache
    2. dehydrate(queryClient)     --> Converts server cache into JSON
    3. <HydrationBoundary>        --> Renders full HTML & embeds JSON in response

                ======= HTML + JSON Streamed to Browser =======

    [Browser]
    4. <HydrationBoundary>        --> Injects the JSON into the browser's query cache
    5. useQuery([TOPICS_KEY])     --> Reads immediately from cache (0ms, no extra fetch!)
*/

async function TopicData({ token }: { token?: string }) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({ queryFn: () => getTopicsApi({ token }), queryKey: [TOPICS_QUERY_KEY] });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <TopicsPage />
        </HydrationBoundary>
    )
}

// calling get topics api on server so that topics page can be rendered server side (better SEO & light client-side bundle)
export default async function Topics() {
    const Cookies = await cookies();
    const token = Cookies.get(COOKIES.USER_TOKEN)?.value;

    return (
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col gap-2">
            <section className="flex flex-col items-center text-center gap-3 max-w-2xl mx-auto pt-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-secondary bg-secondary text-xs font-medium text-secondary-content">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Free Software Engineering Interview Prep</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-ternary-content leading-tight">
                    Practice Real-World <br className="hidden sm:block" />
                    <span className="text-primary">Interview Questions</span>
                </h1>
                <p className="text-xs sm:text-sm opacity-70 text-ternary-content max-w-md">
                    Curated questions tested by top tech companies. Master frontend, backend, DSA, and system design.
                </p>
            </section>

            <Suspense fallback={<TopicsLoaderOrError isLogged={Boolean(token)} isLoading={true} />}>
                <TopicData token={token} />
            </Suspense>
        </div>
    )
}
