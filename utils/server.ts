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

export async function getServerCookie<T extends string = string>(cookieName: string, defaultValue?: T): Promise<T | undefined> {
    const cookieStore = await cookies();
    const val = cookieStore.get(cookieName)?.value as T | undefined;
    return val ?? defaultValue;
}

export async function getTokenFromServerCookies(cookieName: string = COOKIES.USER_TOKEN): Promise<string | undefined> {
    return getServerCookie(cookieName);
}
