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

export function logout(tokenKey: string) {
    if (typeof window !== "undefined") {
        Cookies.remove(tokenKey);

        del(REACT_QUERY_OFFLINE_CACHE).catch((error) => {
            console.error("Failed to clear offline cache:", error);
        });
        window.location.href = "/";
    }
}
