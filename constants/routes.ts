export const ADMIN_ROUTE_BASE = "/admin";

export const ROUTES = {
    HOME: "/",
    DASHBOARD: "/dashboard",
    ADMIN: {
        LOGIN: ADMIN_ROUTE_BASE,
        DASHBOARD: `${ADMIN_ROUTE_BASE}/dashboard`,
    }
} as const;

export type Routes = typeof ROUTES;

