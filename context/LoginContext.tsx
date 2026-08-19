"use client";

import { createContext, ReactNode, useContext, useMemo, useCallback, useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import LoginModal from "@/components/auth/LoginModal";
import { logout } from "@/utils";
import { getUserDetailsApi } from "@/apis/user";
import type { UserType, AuthResponse } from "@/apis/types";
import { COOKIES } from "@/constants";
import { USER_QUERY_KEY } from "@/constants/reactQueryKeys";

interface LoginContextType {
    toogleModal: () => void;
    isLogged: boolean;
    user: UserType | undefined;
    logoutUser: () => void;
}
const LoginContext = createContext<LoginContextType | null>(null);

interface LoginContextProviderProps {
    children: ReactNode;
}
export default function LoginContextProvider({ children }: LoginContextProviderProps) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const { data } = useQuery<AuthResponse | null>({
        queryKey: [USER_QUERY_KEY],
        queryFn: () => getUserDetailsApi(),
        enabled: Boolean(Cookies.get(COOKIES.USER_TOKEN)),
        retry: false,
        staleTime: Infinity,
    });
    const user = data?.data?.user;
    const isLogged = Boolean(user?._id);
    console.log("logged user details:", user)

    const toogleModal = useCallback(() => {
        setIsModalOpen((prev) => !prev);
    }, []);

    const loginUser = useCallback(async (token: string, userData: UserType) => {
        if (!token) return;

        Cookies.set(COOKIES.USER_TOKEN, token);
        await queryClient.resetQueries(); // clearing react-query cache

        if (userData) queryClient.setQueryData([USER_QUERY_KEY], { data: { user: userData } }); // caching the user details using react-query
    }, [queryClient]);

    const logoutUser = useCallback(() => {
        logout(COOKIES.USER_TOKEN, queryClient);
    }, [queryClient]);

    const contextValue = useMemo(() => ({ toogleModal, isLogged, user, logoutUser }), [toogleModal, isLogged, user, logoutUser]);

    return (
        <LoginContext.Provider value={contextValue}>
            {children}

            <LoginModal isOpen={isModalOpen} onClose={toogleModal} onLoginSuccess={loginUser} />
        </LoginContext.Provider>
    );
}

export function useLogin() {
    const ctx = useContext(LoginContext);
    if (!ctx) throw new Error("useLogin must be used inside LoginContextProvider context");

    return ctx;
}