import { cookies } from "next/headers";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Navbar from "@/components/shared/Navbar";
import LoginContextProvider from "@/context/LoginContext";
import { COOKIES } from "@/constants";
import { getUserDetailsApi } from "@/apis/user";
import { USER_QUERY_KEY } from "@/constants/reactQueryKeys";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient();

    const cookiesStore = await cookies()
    const token = cookiesStore.get(COOKIES.USER_TOKEN)?.value;
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
