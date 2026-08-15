"use client";

import { type ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { COOKIES } from "@/constants";
import { ROUTES } from "@/constants/routes";

interface AdminNotAuthProps {
    children: ReactNode;
    redirectTo?: string;
}

export default function AdminNotAuth({
    children,
    redirectTo = ROUTES.ADMIN.DASHBOARD,
}: AdminNotAuthProps) {
    const router = useRouter();
    const [isUnauthenticated, setIsUnauthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = Cookies.get(COOKIES.ADMIN_TOKEN);

        if (token) {
            router.replace(redirectTo);
        } else {
            setIsUnauthenticated(true);
        }
    }, [router, redirectTo]);

    if (!isUnauthenticated) {
        return null;
    }

    return <>{children}</>;
}
