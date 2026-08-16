import createApiClient, { API_METHODS } from "./client";
import { COOKIES } from "@/constants";

const authApiClient = createApiClient({
    baseUrl: process.env.NEXT_PUBLIC_AUTH_API_BASE_URL || "",
    tokenKey: COOKIES.USER_TOKEN,
});

const interviewApiClient = createApiClient({
    baseUrl: process.env.NEXT_PUBLIC_INTERVIEW_API_BASE_URL || "",
    tokenKey: COOKIES.USER_TOKEN,
});

export interface TopicType {
    "_id": string,
    "slug": string,
    "topicName": string,
    "totalQuestions": number,
    "completedQuestions": number,
}
export interface getTopicsApiResp {
    data: TopicType[]
}
export function getTopicsApi(): Promise<getTopicsApiResp> {
    return interviewApiClient({
        path: "/topics",
        authRequired: false,
    });
}

export interface UserType {
    _id: string;
    name: string;
    email: string;
    authMethod: string;
}
export interface AuthResponse {
    data: {
        token: string;
        user: UserType;
    };
    message?: string;
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