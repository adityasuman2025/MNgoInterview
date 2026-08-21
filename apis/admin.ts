import { COOKIES } from "@/constants";
import createApiClient, { API_METHODS } from "@/apis/client";
import type { AuthResponse } from "@/apis/types";

const authApiClient = createApiClient({
    baseUrl: process.env.NEXT_PUBLIC_AUTH_API_BASE_URL || "",
    tokenKey: COOKIES.ADMIN_TOKEN,
});

const interviewApiClient = createApiClient({
    baseUrl: process.env.NEXT_PUBLIC_INTERVIEW_API_BASE_URL || "",
    tokenKey: COOKIES.ADMIN_TOKEN,
});

export function adminLoginApi(data: { email: string; password: string }): Promise<AuthResponse> {
    return authApiClient({
        path: "/auth/admin/login",
        method: API_METHODS.POST,
        body: data,
        authRequired: false,
    });
}

export function uploadHTMLFileApi(formData: FormData) {
    return interviewApiClient({
        path: "/admin/upload",
        method: API_METHODS.POST,
        body: formData
    });
}

export function adminGoogleAuthApi(data: { idToken: string }): Promise<AuthResponse> {
    return authApiClient({
        path: "/auth/admin/login/google",
        method: API_METHODS.POST,
        body: data,
        authRequired: false,
    });
}

export function clearRedisCacheApi(params?: { key?: string; pattern?: string }) {
    const query = new URLSearchParams();
    if (params?.key) query.append("key", params.key);
    if (params?.pattern) query.append("pattern", params.pattern);
    const queryString = query.toString() ? `?${query.toString()}` : "";

    return interviewApiClient({
        path: `/admin/clear-redis-cache${queryString}`,
        method: API_METHODS.DELETE,
    });
}