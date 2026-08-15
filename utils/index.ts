import Cookies from "js-cookie";

export function generateId(): string {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();

    const timestamp = Date.now().toString(36);
    const random1 = Math.random().toString(36).substring(2, 11);
    const random2 = Math.random().toString(36).substring(2, 11);
    return `${timestamp}-${random1}-${random2}`;
}

export function logout(tokenKey: string) {
    Cookies.remove(tokenKey);

    if (typeof window !== "undefined") window.location.href = "/";
}
