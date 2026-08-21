import AdminUploadDataForm from "@/components/admin/AdminUploadDataForm";
import AdminClearCacheButton from "@/components/admin/AdminClearCacheButton";
import { BROWSER_TAB_TITLE } from "@/constants/browserTabTitle";

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-4">
            <title>{BROWSER_TAB_TITLE.ADMIN.DASHBOARD}</title>
            <meta name="robots" content="noindex, nofollow" />
            <AdminUploadDataForm />
            <AdminClearCacheButton />
        </main>
    );
}
