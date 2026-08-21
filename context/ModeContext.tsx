"use client";

import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { COOKIES } from "@/constants";

export const MODES = {
    QUIZ: "QUIZ",
    LEARN: "LEARN"
} as const;
export type ModeTypes = keyof typeof MODES;

interface ModeContextType {
    isQuizMode: boolean,
    mode: ModeTypes,
    toggleMode: () => void
}
const ModeContext = createContext<ModeContextType | null>(null);

export default function ModeProvider({ initialMode = MODES.LEARN, children }: { initialMode?: ModeTypes; children: ReactNode }) {
    const [mode, setMode] = useState<ModeTypes>(initialMode);

    const toggleMode = useCallback(() => {
        setMode((prev) => {
            const next = prev === MODES.QUIZ ? MODES.LEARN : MODES.QUIZ;
            Cookies.set(COOKIES.MODE, next, { expires: 365 });
            return next;
        });
    }, []);

    const contextValue = useMemo(() => ({ mode, toggleMode, isQuizMode: mode === MODES.QUIZ }), [mode, toggleMode]);
    return <ModeContext.Provider value={contextValue}>{children}</ModeContext.Provider>;
}

export function useMode() {
    const ctx = useContext(ModeContext);
    if (!ctx) throw new Error("useMode must be used within a ModeProvider");

    return ctx;
}