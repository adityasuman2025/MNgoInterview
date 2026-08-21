import { TopicType } from "@/apis/types";

export const ADMIN_ROUTE_BASE = "/admin";

export const ROUTES = {
    HOME: "/",
    TOPICS: "/topics",
    TOPIC: (topic: TopicType) => `/topics/${encodeURIComponent(`${topic.slug}-${topic._id}`)}`,
    ADMIN: {
        LOGIN: ADMIN_ROUTE_BASE,
        DASHBOARD: `${ADMIN_ROUTE_BASE}/dashboard`,
    }
} as const;

export type Routes = typeof ROUTES;

