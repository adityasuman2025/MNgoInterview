"use client";

import { createContext, ReactNode, useCallback, useContext, useState, memo, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { X } from 'lucide-react';
import { generateId } from "@/utils";

const TOAST_TYPES = {
    SUCCESS: "SUCCESS",
    ERROR: "ERROR",
    INFO: "INFO",
} as const;
type toastType = keyof typeof TOAST_TYPES;

interface ToastType {
    id: string,
    type: toastType,
    text: string,
}

interface ToastProps extends ToastType {
    onClose: (id: string) => void
}
const MemoisedToast = memo(Toast);
function Toast({ id, text, type, onClose }: ToastProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const frame = requestAnimationFrame(() => setIsVisible(true));
        return () => cancelAnimationFrame(frame);
    }, []);

    const triggerClose = useCallback(() => {
        setIsVisible(false);
        setTimeout(() => onClose(id), 300); // 300ms matches Tailwind's duration-300
    }, [id, onClose]);

    useEffect(() => {
        if (isHovered || !isVisible) return;

        const timeout = setTimeout(() => {
            triggerClose();
        }, 3000);

        return () => clearTimeout(timeout);
    }, [isHovered, isVisible, triggerClose]);

    return (
        <div
            className={`flex items-center justify-between gap-3 p-3 rounded text-sm shadow-xl transition-all duration-300 ease-out transform ${isVisible
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-4 scale-95 pointer-events-none"
                } ${type === TOAST_TYPES.ERROR
                    ? "bg-error text-error-content"
                    : "bg-ternary text-ternary-content"
                }`}
            role={type === TOAST_TYPES.ERROR ? "alert" : "status"}
            aria-live={type === TOAST_TYPES.ERROR ? "assertive" : "polite"}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span>{text}</span>

            <button
                onClick={triggerClose}
                className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                aria-label="Close"
            >
                <X size={14} />
            </button>
        </div>
    );
}

interface ToastContextType {
    success: (text: string) => void,
    error: (text: string) => void,
    info: (text: string) => void,
};
const ToastContext = createContext<ToastContextType | undefined>(undefined);

export default function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<ToastType[]>([]);

    const handleToastClose = useCallback((id: string) => {
        setToasts(prev => prev.filter(i => i.id !== id));
    }, []);

    const showToast = useCallback((type: toastType, text: string) => {
        const id = generateId();
        setToasts(prev => ([...prev, { id, type, text }]));
    }, []);

    const success = useCallback((text: string) => showToast(TOAST_TYPES.SUCCESS, text), [showToast]);
    const error = useCallback((text: string) => showToast(TOAST_TYPES.ERROR, text), [showToast]);
    const info = useCallback((text: string) => showToast(TOAST_TYPES.INFO, text), [showToast]);

    const contextValue = useMemo(() => ({ success, error, info }), [success, error, info]);

    return (
        <ToastContext.Provider value={contextValue}>
            {children}

            {typeof document !== "undefined" && toasts.length > 0 &&
                createPortal(
                    <section
                        role="region"
                        aria-label="notifications"
                        className="fixed bottom-3 right-3 max-h-screen overflow-y-auto flex flex-col gap-4 z-10"
                    >
                        {toasts.map(toast => (
                            <MemoisedToast key={toast.id} onClose={handleToastClose} {...toast} />
                        ))}
                    </section>,
                    document.body
                )}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used inside ToastProvider context");

    return ctx;
}
