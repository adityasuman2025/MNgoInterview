import type { Metadata, Viewport } from "next";
import ThemeContextProvider from "@/context/ThemeContext";
import ToastProvider from "@/context/ToastContext";
import LoginContextProvider from "@/context/LoginContext";
import ReactQueryProvider from "@/context/ReactQueryContext";
import { THEME_COLOR } from "@/constants";
import { APP_NAME, BROWSER_TAB_TITLE } from "@/constants/browserTabTitle";
import "./globals.css";

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: dark)", color: THEME_COLOR.dark },
        { media: "(prefers-color-scheme: light)", color: THEME_COLOR.light },
    ],
    width: "device-width",
    initialScale: 1,
};

export const metadata: Metadata = {
    metadataBase: new URL("https://interview.adityas.site"),
    title: BROWSER_TAB_TITLE.HOME,
    description:
        "Ace your next software engineering interview with MNgo Interview Prep. Practice curated questions on JavaScript, React, CSS, HTML, system design, DSA, web security, and more — completely free.",
    keywords: [
        "software engineering interview questions",
        "frontend interview questions",
        "javascript interview",
        "react interview questions",
        "css interview",
        "html interview",
        "system design interview",
        "DSA interview",
        "data structures",
        "algorithms",
        "web security",
        "interview prep",
        "mngo",
        "adityasuman",
        "aditya suman",
        "coding interview",
        "web development interview",
        "interview practice",
        "backend interview",
        "full stack interview",
    ],
    authors: [{ name: "Aditya Suman", url: "https://adityas.site" }],
    creator: "Aditya Suman",
    applicationName: APP_NAME,
    alternates: {
        canonical: "https://interview.adityas.site",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
        },
    },
    openGraph: {
        type: "website",
        siteName: APP_NAME,
        title: BROWSER_TAB_TITLE.HOME,
        description:
            "Ace your next software engineering interview with MNgo Interview Prep. Practice curated questions on JavaScript, React, CSS, HTML, system design, DSA, web security, and more — completely free.",
        url: "https://interview.adityas.site",
        images: [
            {
                url: "https://interview.adityas.site/og-image.png",
                width: 1200,
                height: 630,
                alt: "MNgo Interview Prep — Software Engineering Interview Practice App",
            },
        ],
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: BROWSER_TAB_TITLE.HOME,
        description:
            "Ace your next software engineering interview with MNgo Interview Prep. Practice curated questions on JavaScript, React, CSS, HTML, system design, DSA, web security, and more — completely free.",
        images: ["https://interview.adityas.site/og-image.png"],
        creator: "@adityasuman2025",
        site: "@adityasuman2025",
    },
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
        title: APP_NAME,
    },
    icons: {
        icon: "/xxxs.png",
        apple: "/xxxs.png",
    },
    verification: {
        google: "tmpTIfxUJCSXkF8NKNgLWkRBtFpKisiSJOipCBQT8DA",
    },
    other: {
        "mobile-web-app-capable": "yes",
        "revisit-after": "7",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: APP_NAME,
    url: "https://interview.adityas.site",
    description:
        "Practice curated software engineering interview questions covering JavaScript, React, CSS, HTML, system design, DSA, web security, and more — completely free.",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    inLanguage: "en",
    isAccessibleForFree: true,
    author: {
        "@type": "Person",
        name: "Aditya Suman",
        url: "https://adityas.site",
    },
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-primary-gradient">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
                <ThemeContextProvider>
                    <ReactQueryProvider>
                        <ToastProvider>
                            <LoginContextProvider>
                                {children}
                            </LoginContextProvider>
                        </ToastProvider>
                    </ReactQueryProvider>
                </ThemeContextProvider>
            </body>
        </html>
    );
}
