"use client";

import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";
import { ReactNode, useState, useEffect } from "react";

export const THEMES = {
    DARK: "dark",
    LIGHT: "light",
}

export default function ThemeContextProvider({ children }: { children: ReactNode }) {
    return (
        <NextThemesProvider
            attribute="data-theme"
            defaultTheme={THEMES.DARK}
            enableSystem
        >
            {children}
        </NextThemesProvider>
    );
}

export function useTheme() {
    const { theme, setTheme } = useNextTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    function toogleTheme() {
        setTheme(theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK);
    }

    return { theme, toogleTheme, mounted };
}