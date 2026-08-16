"use client";

import Link from "next/link";
import Image from "next/image";
import { Sun, Moon } from "lucide-react";
import { useTheme, THEMES } from "@/context/Theme";
import { ROUTES } from "@/constants/routes";
import { APP_NAME } from "@/constants/browserTabTitle";
import Button, { BUTTON_VARIANTS } from "@/components/shared/Button";

interface NavbarProps {
    onLoginClick?: () => void;
}
export default function Navbar({ onLoginClick }: NavbarProps) {
    const { toogleTheme, theme, mounted } = useTheme();

    return (
        <header className="sticky top-0 z-20 w-full border-b border-base-3 bg-secondary text-secondary-content backdrop-blur-lg transition-colors">
            <div className="max-w-7xl mx-auto flex h-14 items-center justify-between px-4 md:px-8">
                <Link href={ROUTES.HOME} className="flex items-center gap-2.5">
                    <Image
                        src="/xxxs.png"
                        alt={APP_NAME}
                        width={28}
                        height={28}
                        className="object-contain"
                        priority
                    />
                    <span className="text-base font-semibold">
                        {APP_NAME}
                    </span>
                </Link>

                <div className="flex items-center gap-2">
                    <Button
                        type="button"
                        variant={BUTTON_VARIANTS.SECONDARY}
                        onClick={toogleTheme}
                        aria-label="Toggle theme"
                        className="!p-2 min-w-8 min-h-8"
                    >
                        {!mounted ? (
                            <span className="w-4 h-4 block" />
                        ) : theme === THEMES.DARK ? (
                            <Sun className="h-4 w-4 text-amber-300" />
                        ) : (
                            <Moon className="h-4 w-4 text-zinc-600" />
                        )}
                    </Button>

                    <Button
                        type="button"
                        onClick={onLoginClick}
                        className="text-xs font-semibold"
                    >
                        Log in
                    </Button>
                </div>
            </div>
        </header>
    );
}
