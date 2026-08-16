"use client";

import { ReactNode, useState, useRef, useEffect, useCallback, memo } from "react";

interface DropdownProps {
    triggerElement: ReactNode;
    children: (close: () => void) => ReactNode;
    className?: string;
    align?: "left" | "right";
}
function Dropdown({
    triggerElement,
    children,
    className = "",
    align = "right",
}: DropdownProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        if (isOpen) document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const close = useCallback(() => setIsOpen(false), []);
    const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
    const alignmentClasses = align === "right" ? "right-0" : "left-0";

    return (
        <div className="relative" ref={containerRef}>
            <div onClick={toggle}>
                {triggerElement}
            </div>

            {isOpen && (
                <div className={`absolute ${alignmentClasses} overflow-hidden rounded-xl mt-4 z-9 shadow-2xl animate-in fade-in slide-in-from-top-1 duration-150 ${className}`}>
                    {children(close)}
                </div>
            )}
        </div>
    );
}

export default memo(Dropdown);