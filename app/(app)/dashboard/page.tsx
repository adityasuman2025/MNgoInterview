import { type Metadata } from "next";
import { BROWSER_TAB_TITLE } from "@/constants/browserTabTitle";
import DashboardPage from "@/components/DashboardPage";

export const metadata: Metadata = {
    title: BROWSER_TAB_TITLE.DASHBOARD,
    robots: { index: true, follow: true },
};

export default function Dashboard() {
    return (
        <>
            <DashboardPage />
        </>
    );
}
