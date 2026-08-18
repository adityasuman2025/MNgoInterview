export const ADMIN_ROUTE_BASE = "/admin";

export const ROUTES = {
    HOME: "/",
    TOPICS: "/topics",
    TOPIC: (topicId: string) => `/topics/${topicId}`,
    ADMIN: {
        LOGIN: ADMIN_ROUTE_BASE,
        DASHBOARD: `${ADMIN_ROUTE_BASE}/dashboard`,
    }
} as const;

export type Routes = typeof ROUTES;

