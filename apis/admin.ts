import { COOKIES } from "@/constants";
import createApiClient, { API_METHODS } from "./client";

const authApiClient = createApiClient({
    baseUrl: process.env.NEXT_PUBLIC_AUTH_API_BASE_URL || "",
    tokenKey: COOKIES.ADMIN_TOKEN,
});

const interviewApiClient = createApiClient({
    baseUrl: process.env.NEXT_PUBLIC_INTERVIEW_API_BASE_URL || "",
    tokenKey: COOKIES.ADMIN_TOKEN,
});

export function adminLoginAPI(data: { email: string; password: string }) {
    return authApiClient({
        path: "/auth/admin/login",
        method: API_METHODS.POST,
        body: data,
        authRequired: false,
    });
}

export function uploadHTMLFileAPI(formData: FormData) {
    return interviewApiClient({
        path: "/admin/upload",
        method: API_METHODS.POST,
        body: formData
    });
}