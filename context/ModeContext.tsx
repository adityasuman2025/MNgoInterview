"use client";

import { createContext, ReactNode, useCallback, useContext, useMemo } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

const MODE_STORAGE_KEY = "mode";

export const MODES = {
    QUIZ: "QUIZ",
    LEARN: "LEARN"
} as const;
export type ModeTypes = keyof typeof MODES;

interface ModeContextType {
    mode: ModeTypes,
    toggleMode: () => void
}
const ModeContext = createContext<ModeContextType | null>(null);

export default function ModeProvider({ children }: { children: ReactNode }) {
    const [mode, setMode] = useLocalStorage<ModeTypes>(MODE_STORAGE_KEY, MODES.LEARN);

    const toggleMode = useCallback(() => {
        setMode(prev => prev === MODES.QUIZ ? MODES.LEARN : MODES.QUIZ);
    }, []);

    const contextValue = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode]);
    return (
        <ModeContext.Provider value={contextValue}>
            {children}
        </ModeContext.Provider>
    )
}

export function useMode() {
    const ctx = useContext(ModeContext);
    if (!ctx) throw new Error("useMode must be used within a ModeProvider");

    return ctx;
}