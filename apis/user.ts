import createApiClient, { API_METHODS } from "./client";
import { COOKIES } from "@/constants";
import type { getTopicsApiResp, AuthResponse } from "./types";

const authApiClient = createApiClient({
    baseUrl: process.env.NEXT_PUBLIC_AUTH_API_BASE_URL || "",
    tokenKey: COOKIES.USER_TOKEN,
});

const interviewApiClient = createApiClient({
    baseUrl: process.env.NEXT_PUBLIC_INTERVIEW_API_BASE_URL || "",
    tokenKey: COOKIES.USER_TOKEN,
});

export function getTopicsApi(): Promise<getTopicsApiResp> {
    return interviewApiClient({
        path: "/topics",
        authRequired: false,
    });
}

export function userLoginApi(data: { email: string; password: string }): Promise<AuthResponse> {
    return authApiClient({
        path: "/auth/login",
        authRequired: false,
        method: API_METHODS.POST,
        body: data,
    });
}

export function userSignupApi(data: { name: string; email: string; password: string }): Promise<AuthResponse> {
    return authApiClient({
        path: "/auth/signup",
        authRequired: false,
        method: API_METHODS.POST,
        body: data,
    });
}

export function getUserDetailsApi(): Promise<AuthResponse> {
    return authApiClient({ path: "/auth/me" });
}

export function googleAuthApi(data: { idToken: string }): Promise<AuthResponse> {
    return authApiClient({
        path: "/auth/login/google",
        authRequired: false,
        method: API_METHODS.POST,
        body: data,
    });
}