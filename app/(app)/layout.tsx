import { cookies } from "next/headers";
import Navbar from "@/components/shared/Navbar";
import LoginContextProvider from "@/context/LoginContext";
import { COOKIES } from "@/constants";
import { getUserDetailsApi } from "@/apis/user";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const cookiesStore = await cookies()
    const token = cookiesStore.get(COOKIES.USER_TOKEN)?.value;
    const user = token ? await getUserDetailsApi({ token }).catch(() => null) : null; // logged user details will be fetched on server so the client (frontend) always has the logged user details

    return (
        <LoginContextProvider loggedUserData={user}>
            <main className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col gap-2">
                    {children}
                </div>
            </main>
        </LoginContextProvider>
    );
}
