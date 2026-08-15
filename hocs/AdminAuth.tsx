"use client";

import { type ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { COOKIES } from "@/constants";
import { ROUTES } from "@/constants/routes";

interface AdminAuthProps {
    children: ReactNode;
    redirectTo?: string;
}
export default function AdminAuth({
    children,
    redirectTo = ROUTES.ADMIN.LOGIN,
}: AdminAuthProps) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

    useEffect(() => {
        const token = Cookies.get(COOKIES.ADMIN_TOKEN);

        if (!token) {
            router.replace(redirectTo);
        } else {
            setIsAuthorized(true);
        }
    }, [router, redirectTo]);

    if (!isAuthorized) {
        return null;
    }

    return <>{children}</>;
}
