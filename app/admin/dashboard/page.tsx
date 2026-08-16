import { type Metadata } from "next";
import AdminUploadDataForm from "@/components/AdminUploadDataForm";
import { BROWSER_TAB_TITLE } from "@/constants/browserTabTitle";

export const metadata: Metadata = {
    title: BROWSER_TAB_TITLE.ADMIN.DASHBOARD,
    robots: { index: false, follow: false },
};

export default function Page() {
    return (
        <main className="flex min-h-screen items-center justify-center">
            <AdminUploadDataForm />
        </main>
    );
}
