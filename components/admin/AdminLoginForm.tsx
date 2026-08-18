"use client";

import { useCallback, type SubmitEvent } from "react";
import validator from "validator";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useToast } from "@/context/ToastContext";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import { adminLoginApi, adminGoogleAuthApi } from "@/apis/admin";
import { COOKIES } from "@/constants";
import { ROUTES } from "@/constants/routes";
import GoogleButton from "@/components/shared/GoogleButton";

export default function AdminLoginForm() {
    const router = useRouter();
    const toast = useToast();

    const loginMutation = useMutation({
        mutationFn: adminLoginApi,
        onSuccess: (resp) => {
            const token = resp?.data?.token;
            if (token) handleLoginSuccess(token)
            else toast.error("token is missing");
        },
        onError: (err) => toast.error(err.message)
    });

    const handleLoginSuccess = useCallback((token: string) => {
        Cookies.set(COOKIES.ADMIN_TOKEN, token);
        router.replace(ROUTES.ADMIN.DASHBOARD);
    }, [router])

    async function handleFormSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);

        const email = (formData.get("email") as string)?.trim();
        const password = (formData.get("password") as string)?.trim();
        if (!email || !password) return toast.error("please enter email and password");

        if (!validator.isEmail(email)) return toast.error("enter a valid email");

        loginMutation.mutate({ email, password });
    }

    return (
        <form className="flex flex-col items-center justify-center gap-5 w-74 md:w-100" onSubmit={handleFormSubmit}>
            <Input
                name="email"
                autoFocus
                type="text"
                placeholder="email"
            />
            <Input
                name="password"
                type="password"
                placeholder="password"
            />
            <Button className="w-full" loading={loginMutation.isPending}>
                login
            </Button>

            <GoogleButton mutationFunction={adminGoogleAuthApi} onSuccess={handleLoginSuccess} />
        </form>
    );
}