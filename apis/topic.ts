import createApiClient from "@/apis/client";
import { COOKIES } from "@/constants";
import type { getTopicsApiResp } from "@/apis/types";

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
