import { QueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { del } from "idb-keyval";
import { REACT_QUERY_OFFLINE_CACHE } from "@/constants";


export function generateId(): string {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();

    const timestamp = Date.now().toString(36);
    const random1 = Math.random().toString(36).substring(2, 11);
    const random2 = Math.random().toString(36).substring(2, 11);
    return `${timestamp}-${random1}-${random2}`;
}

export async function logout(tokenKey: string, queryClient?: QueryClient) {
    if (typeof window !== "undefined") {
        Cookies.remove(tokenKey); // removing login token cookie

        if (queryClient) queryClient.clear(); // clearing react-query cache

        await del(REACT_QUERY_OFFLINE_CACHE).catch(console.error); // clearing cache stored in index db

        window.location.href = "/";
    }
}
