"use client";

import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { get, set, del } from "idb-keyval";
import { ReactNode, useState } from "react";
import { REACT_QUERY_OFFLINE_CACHE } from "@/constants";

export default function ReactQueryProvider({ children }: { children: ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false, // disables refetch when switching back to the tab
                        staleTime: 60 * 1000, // 1 minute fresh window (prevents duplicate fetch on mount after SSR)
                        gcTime: Infinity, // keep cached data in memory forever
                    },
                },
            })
    );

    const [persister] = useState(() =>
        createAsyncStoragePersister({
            key: REACT_QUERY_OFFLINE_CACHE,
            storage: {
                getItem: (key) => (typeof window !== "undefined" ? get(key) : Promise.resolve(null)),
                setItem: (key, value) => (typeof window !== "undefined" ? set(key, value) : Promise.resolve()),
                removeItem: (key) => (typeof window !== "undefined" ? del(key) : Promise.resolve()),
            },
        })
    );

    return (
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{
                persister,
                maxAge: Infinity,
            }}
        >
            {children}
        </PersistQueryClientProvider>
    );
}
