"use client";

import { useState, useEffect, useCallback } from "react";
import { formatTime } from "@/utils";

export default function useTimer(initialSeconds: number = 0) {
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isTimerRunning) {
            interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning]);

    const startTimer = useCallback(() => setIsTimerRunning(true), []);
    const pauseTimer = useCallback(() => setIsTimerRunning(false), []);
    const toggleTimer = useCallback(() => setIsTimerRunning((prev) => !prev), []);
    const resetTimer = useCallback(() => {
        setIsTimerRunning(false);
        setSeconds(initialSeconds);
    }, [initialSeconds]);

    return {
        seconds,
        isTimerRunning,
        formattedTime: formatTime(seconds),
        startTimer,
        pauseTimer,
        toggleTimer,
        resetTimer,
    };
}
