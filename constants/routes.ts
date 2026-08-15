export const ROUTES = {
    HOME: "/",
    ADMIN: {
        LOGIN: "/admin",
        DASHBOARD: "/admin/dashboard",
    }
} as const;

export type Routes = typeof ROUTES;
