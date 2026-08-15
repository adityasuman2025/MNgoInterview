"use client";

import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";
import { ReactNode } from "react";

export default function ThemeContextProvider({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <NextThemesProvider
            attribute="data-theme"
            defaultTheme="dark"
            enableSystem
        >
            {children}
        </NextThemesProvider>
    );
}

export function useTheme() {
    const { theme, setTheme } = useNextTheme();

    function toogleTheme() {
        setTheme(theme === "dark" ? "light" : "dark");
    }

    return { theme, toogleTheme };
}