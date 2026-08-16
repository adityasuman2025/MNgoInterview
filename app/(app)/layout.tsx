import { cookies } from "next/headers";
import Navbar from "@/components/shared/Navbar";
import LoginContextProvider from "@/context/LoginContext";
import { COOKIES } from "@/constants";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const cookiesStore = await cookies()
    const cookie = cookiesStore.get(COOKIES.USER_TOKEN)?.value;

    return (
        <LoginContextProvider initialIsLogged={Boolean(cookie)}>
            <main className="min-h-screen flex flex-col">
                <Navbar />
                {children}
            </main>
        </LoginContextProvider>
    );
}
