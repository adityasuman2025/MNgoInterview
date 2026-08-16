import { NextResponse, type NextRequest } from "next/server";
import { COOKIES } from "@/constants";
import { ADMIN_ROUTE_BASE, ROUTES } from "@/constants/routes";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const adminToken = req.cookies.get(COOKIES.ADMIN_TOKEN)?.value;

    if (pathname.startsWith(ADMIN_ROUTE_BASE)) {
        if (pathname !== ROUTES.ADMIN.LOGIN && !adminToken) {
            // if admin token is not there (means admin is not looged) and user is not on admin login page then redirecting him to admin login page
            return NextResponse.redirect(new URL(ROUTES.ADMIN.LOGIN, req.url))
        } else if (pathname === ROUTES.ADMIN.LOGIN && adminToken) {
            // if admin token is there (means admin is looged) and user is on admin login page then redirecting him to admin dashboard page
            return NextResponse.redirect(new URL(ROUTES.ADMIN.DASHBOARD, req.url))
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/admin"]
};