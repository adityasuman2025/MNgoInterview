"use client";

import { createContext, ReactNode, useContext, useMemo, useCallback, useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import LoginModal from "@/components/LoginModal";
import { logout } from "@/utils";
import { getUserDetailsApi } from "@/apis/user";
import type { UserType } from "@/apis/types";
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
    initialIsLogged?: boolean;
    children: ReactNode;
}
export default function LoginContextProvider({ initialIsLogged = false, children }: LoginContextProviderProps) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isLogged, setIsLogged] = useState<boolean>(initialIsLogged);
    const queryClient = useQueryClient();

    const { data } = useQuery({ queryKey: [USER_QUERY_KEY], queryFn: getUserDetailsApi, enabled: isLogged });
    const user = data?.data?.user;

    const toogleModal = useCallback(() => {
        setIsModalOpen((prev) => !prev);
    }, []);

    const loginUser = useCallback((token: string, userData: UserType) => {
        if (!token) return;

        Cookies.set(COOKIES.USER_TOKEN, token);
        if (userData) queryClient.setQueryData([USER_QUERY_KEY], { data: { user: userData } }); // caching the user details using react-query
        setIsLogged(true);
    }, [queryClient]);

    const logoutUser = useCallback(() => {
        setIsLogged(false);
        queryClient.removeQueries({ queryKey: [USER_QUERY_KEY] });
        logout(COOKIES.USER_TOKEN);
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