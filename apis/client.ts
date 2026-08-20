import Cookies from "js-cookie";
import { logout } from "@/utils";

export const API_METHODS = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    PATCH: "PATCH",
    DELETE: "DELETE",
} as const;
export type ApiMethodTypes = keyof typeof API_METHODS;

interface ApiRequestOptions {
    path: string;
    method?: ApiMethodTypes;
    body?: unknown;
    authRequired?: boolean;
    token?: string,
}
interface ApiClientOptions {
    baseUrl: string;
    tokenKey: string;
}
export default function createApiClient({ baseUrl, tokenKey }: ApiClientOptions) {
    return async function apiCall({
        path,
        method = API_METHODS.GET,
        body,
        authRequired = true,
        token: passedToken
    }: ApiRequestOptions) {
        if (!baseUrl || !tokenKey) throw new Error("missing base url or token key");

        const token = passedToken || (typeof window !== "undefined" ? Cookies.get(tokenKey) : undefined);
        if (!token && authRequired) return logout(tokenKey); // when api route does not require authentication -> then no need of loging out user

        const isFormData = body instanceof FormData;

        const headers: Record<string, string> = {};
        if (token) headers["Authorization"] = `Bearer ${token}`;
        if (body && !isFormData) headers["Content-Type"] = "application/json";

        const resp = await fetch(`${baseUrl}${path}`, {
            method,
            headers,
            body: isFormData ? body : body ? JSON.stringify(body) : undefined,
        });

        const json = await resp.json().catch(() => { });
        if (!resp.ok) {
            if (resp.status === 401 && authRequired) return logout(tokenKey); // when api route does not require authentication -> then no need of loging out user

            const error = new Error(json?.message || `Request failed with status ${resp.status}`) as Error & { status?: number };
            error.status = resp.status;
            throw error;
        }

        return json;
    };
}