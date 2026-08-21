import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>] {
    const [state, setState] = useState<T>(() => {
        if (typeof window === "undefined") return defaultValue;

        try {
            const jsonVal = localStorage.getItem(key);
            return jsonVal !== null ? JSON.parse(jsonVal) : defaultValue;
        } catch {
            return defaultValue;
        }
    });

    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            localStorage.setItem(key, JSON.stringify(state));
        } catch { }
    }, [key, state]);

    return [state, setState];
}