"use client";

import { useToast } from "@/context/Toast";

export default function Page() {
    const toast = useToast();

    return (
        <main className="">
            admin
            <br />
            <button className="px-4 py-2 bg-red-100" onClick={() => toast.success("hey man " + Date.now())}>toogle</button>
        </main>
    )
}