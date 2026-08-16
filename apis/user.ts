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

export function userLoginApi(data: { email: string, password: string }) {
    return authApiClient({
        path: "/auth/login",
        authRequired: false,
        method: API_METHODS.POST,
        body: data
    })
}