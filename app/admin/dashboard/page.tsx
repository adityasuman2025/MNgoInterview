import { type Metadata } from "next";
import AdminUploadDataForm from "@/components/admin/AdminUploadDataForm";
import AdminClearCacheButton from "@/components/admin/AdminClearCacheButton";
import { BROWSER_TAB_TITLE } from "@/constants/browserTabTitle";

export const metadata: Metadata = {
    title: BROWSER_TAB_TITLE.ADMIN.DASHBOARD,
    robots: { index: false, follow: false },
};

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-4">
            <AdminUploadDataForm />
            <AdminClearCacheButton />
        </main>
    );
}
