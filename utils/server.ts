import { QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { COOKIES } from "@/constants";

export function createServerQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                retry: false, // never retry on the server to prevent hanging requests
                staleTime: 60 * 1000,
            },
        },
    });
}

export async function getTokenFromServerCookies(cookieName: string = COOKIES.USER_TOKEN): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get(cookieName)?.value;
}
