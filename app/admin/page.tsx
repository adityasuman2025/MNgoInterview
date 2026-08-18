import { type Metadata } from "next";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { BROWSER_TAB_TITLE } from "@/constants/browserTabTitle";

export const metadata: Metadata = {
    title: BROWSER_TAB_TITLE.ADMIN.LOGIN,
    robots: { index: false, follow: false },
};
export default function Page() {
    return (
        <main className="flex min-h-screen items-center justify-center">
            <AdminLoginForm />
        </main>
    );
}