"use client";

import Link from "next/link";
import Image from "next/image";
import { Sun, Moon, User, LogOut } from "lucide-react";
import { useTheme, THEMES } from "@/context/ThemeContext";
import { useLogin } from "@/context/LoginContext";
import { ROUTES } from "@/constants/routes";
import { APP_NAME } from "@/constants/browserTabTitle";
import Button, { BUTTON_VARIANTS } from "@/components/shared/Button";
import Dropdown from "@/components/shared/Dropdown";

export default function Navbar() {
    const { toogleTheme, theme, mounted } = useTheme();
    const { user, isLogged, toogleModal, logoutUser } = useLogin();

    return (
        <header className="sticky top-0 z-5 w-full  bg-secondary/30 text-secondary-content backdrop-blur-lg transition-colors">
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
                    <span className="text-base font-semibold">{APP_NAME}</span>
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

                    {isLogged ? (
                        <Dropdown
                            triggerElement={
                                <Button
                                    type="button"
                                    variant={BUTTON_VARIANTS.SECONDARY}
                                    aria-label="User account menu"
                                    className="!p-2 min-w-8 min-h-8"
                                >
                                    <User className="w-4 h-4 text-secondary-content" />
                                </Button>
                            }
                        >
                            {(close) => (
                                <div className="w-48 border border-ternary bg-secondary text-secondary-content p-2">
                                    <div className="px-3 py-2 border-b border-ternary text-sm font-semibold truncate">
                                        {user?.name || "User name"}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            close();
                                            logoutUser();
                                        }}
                                        className="w-full flex items-center gap-2 px-3 py-2 mt-1 rounded-lg text-xs font-semibold text-rose-500 hover:bg-ternary transition-colors cursor-pointer"
                                    >
                                        <LogOut className="w-3.5 h-3.5" />
                                        <span>Log out</span>
                                    </button>
                                </div>
                            )}
                        </Dropdown>
                    ) : (
                        <Button
                            type="button"
                            onClick={toogleModal}
                            className="text-xs font-semibold"
                        >
                            Login
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
}
