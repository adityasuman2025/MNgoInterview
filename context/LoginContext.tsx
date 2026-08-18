"use client";

import { createContext, ReactNode, useContext, useMemo, useCallback, useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import LoginModal from "@/components/auth/LoginModal";
import { logout } from "@/utils";
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
    loggedUserData: AuthResponse | null;
    children: ReactNode;
}
export default function LoginContextProvider({ loggedUserData, children }: LoginContextProviderProps) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const { data } = useQuery<AuthResponse | null>({
        queryKey: [USER_QUERY_KEY],
        queryFn: () => Promise.resolve(loggedUserData), // dummy queryFn to satisfy TanStack Query requirement without making any API calls
        initialData: loggedUserData,
        staleTime: Infinity,
    });
    const user = data?.data?.user;
    const isLogged = Boolean(user?._id);
    console.log("logged user details:", user)

    const toogleModal = useCallback(() => {
        setIsModalOpen((prev) => !prev);
    }, []);

    const loginUser = useCallback((token: string, userData: UserType) => {
        if (!token) return;

        Cookies.set(COOKIES.USER_TOKEN, token);
        if (userData) queryClient.setQueryData([USER_QUERY_KEY], { data: { user: userData } }); // caching the user details using react-query
    }, [queryClient]);

    const logoutUser = useCallback(() => {
        logout(COOKIES.USER_TOKEN);
    }, []);

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