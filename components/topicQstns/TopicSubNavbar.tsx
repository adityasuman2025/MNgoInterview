"use client";

import { Timer, BookOpen, Brain, RotateCcw } from "lucide-react";
import { useMode, MODES } from "@/context/ModeContext";
import useTimer from "@/hooks/useTimer";
import Button, { BUTTON_VARIANTS } from "@/components/shared/Button";

function TimerControls() {
    const { seconds, isTimerRunning, formattedTime, toggleTimer, resetTimer } = useTimer();

    return (
        <div className="flex items-center gap-2">
            <Button
                type="button"
                variant={BUTTON_VARIANTS.SECONDARY}
                onClick={toggleTimer}
                className="!py-1 !px-2.5 !text-2xs font-medium flex items-center gap-1.5"
            >
                <Timer className="w-2.5 h-2.5" />
                <span>{isTimerRunning ? "Pause Timer" : seconds > 0 ? "Resume Timer" : "Start Timer"}</span>
                {isTimerRunning || seconds > 0 ? (
                    <span className="font-mono text-primary font-semibold ml-0.5">{formattedTime}</span>
                ) : null}
            </Button>

            {isTimerRunning || seconds > 0 ? (
                <Button
                    type="button"
                    variant={BUTTON_VARIANTS.SECONDARY}
                    onClick={resetTimer}
                    aria-label="Reset Timer"
                    className="!p-1"
                >
                    <RotateCcw className="w-2.5 h-2.5" />
                </Button>
            ) : null}
        </div>
    );
}

function ModeSwitchButton() {
    const { mode, toggleMode } = useMode();

    return (
        <Button
            type="button"
            variant={BUTTON_VARIANTS.SECONDARY}
            onClick={toggleMode}
            className="!py-1 !px-2.5 !text-2xs font-medium flex items-center gap-1.5"
        >
            {mode === MODES.QUIZ ? (
                <>
                    <Brain className="w-2.5 h-2.5 text-primary" />
                    <span>Quiz Mode</span>
                </>
            ) : (
                <>
                    <BookOpen className="w-2.5 h-2.5 text-primary" />
                    <span>Learn Mode</span>
                </>
            )}
        </Button>
    );
}

export default function TopicSubNavbar() {
    return (
        <div className="border-y border-ternary bg-ternary/80 backdrop-blur-md px-4 md:px-8 py-0.5 flex items-center justify-between text-xs transition-colors shadow-xs rounded-b-3xl">
            <ModeSwitchButton />
            <TimerControls />
        </div>
    );
}
