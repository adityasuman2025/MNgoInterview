import createApiClient, { API_METHODS } from "@/apis/client";
import { COOKIES } from "@/constants";
import type { getTopicsApiResp, getTopicQuestionsApiResp } from "@/apis/types";
import { METHODS } from "http";

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

export function getTopicQuestionsApi({
    topicId,
    page,
    size = 20,
    token
}: {
    topicId: string;
    page?: number;
    size?: number;
    token?: string;
}): Promise<getTopicQuestionsApiResp> {
    const query = new URLSearchParams();
    if (page) query.append("page", page.toString());
    if (size) query.append("size", size.toString());
    const queryString = query.toString() ? `?${query.toString()}` : "";

    return interviewApiClient({
        path: `/topics/${topicId}/questions${queryString}`,
        authRequired: false,
        token,
    });
}

export function getAnswerOfAQuestionForAUserApi({ topicId, questionId }: { topicId: string, questionId: string }) {
    return interviewApiClient({
        path: `/topics/${topicId}/questions/${questionId}/answer`
    });
}

export function saveAnswerOfAQuestionForAUserApi({ topicId, questionId, answer }: { topicId: string, questionId: string, answer: string }) {
    return interviewApiClient({
        path: `/topics/${topicId}/questions/${questionId}/progress`,
        method: API_METHODS.PATCH,
        body: { answer }
    })
}

export function markQuestionDoneApi({ topicId, questionId }: { topicId: string, questionId: string }) {
    return interviewApiClient({
        path: `/topics/${topicId}/questions/${questionId}/progress`,
        method: API_METHODS.PATCH,
        body: { status: "done" }
    })
}