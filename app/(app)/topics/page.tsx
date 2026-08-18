import { type Metadata } from "next";
import { BROWSER_TAB_TITLE } from "@/constants/browserTabTitle";
import TopicsPage from "@/components/topics/TopicsPage";

export const metadata: Metadata = {
    title: BROWSER_TAB_TITLE.TOPICS,
    robots: { index: true, follow: true },
};

export default function Topics() {
    return <TopicsPage />
}
