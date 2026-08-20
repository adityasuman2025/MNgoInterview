import createApiClient from "@/apis/client";
import { COOKIES } from "@/constants";
import type { getTopicsApiResp, getTopicQuestionsApiResp } from "@/apis/types";

const interviewApiClient = createApiClient({
    baseUrl: process.env.NEXT_PUBLIC_INTERVIEW_API_BASE_URL || "",
    tokenKey: COOKIES.USER_TOKEN,
});

export function getTopicsApi({ token }: { token?: string } = {}): Promise<getTopicsApiResp> {
    return interviewApiClient({
        path: "/topics",
        authRequired: false,
        token,
    });
}

export function getTopicQuestionsApi({ topicId, token }: { topicId: string, token?: string }): Promise<getTopicQuestionsApiResp> {
    return interviewApiClient({
        path: `/topics/${topicId}/questions`,
        authRequired: false,
        token,
    });
}