import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { BROWSER_TAB_TITLE } from "@/constants/browserTabTitle";

export default function Page() {
    return (
        <main className="flex min-h-screen items-center justify-center">
            <title>{BROWSER_TAB_TITLE.ADMIN.LOGIN}</title>
            <meta name="robots" content="noindex, nofollow" />
            <AdminLoginForm />
        </main>
    );
}