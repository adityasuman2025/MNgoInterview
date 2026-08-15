"use client";

import { useTheme } from "@/context/Theme";

export default function Page() {
    const { toogleTheme } = useTheme();

    return (
        <main className="">
            admin
            <button onClick={toogleTheme}>toogle</button>
        </main>
    )
}