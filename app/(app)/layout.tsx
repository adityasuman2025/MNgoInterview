import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Navbar from "@/components/shared/Navbar";
import LoginContextProvider from "@/context/LoginContext";
import { getUserDetailsApi } from "@/apis/user";
import { USER_QUERY_KEY } from "@/constants/reactQueryKeys";
import { getTokenFromServerCookies, createServerQueryClient } from "@/utils/server";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const queryClient = createServerQueryClient();
    const token = await getTokenFromServerCookies();

    if (token) {
        await queryClient.prefetchQuery({ queryKey: [USER_QUERY_KEY], queryFn: () => getUserDetailsApi({ token }) }); // logged user details will be fetched on server so the client (frontend) always has the logged user details
    }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <LoginContextProvider>
                <main className="min-h-screen flex flex-col">
                    <Navbar />
                    {children}
                </main>
            </LoginContextProvider>
        </HydrationBoundary>
    );
}
