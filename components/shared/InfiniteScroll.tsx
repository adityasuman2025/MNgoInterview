"use client";

import { useEffect, useRef, ReactNode, memo } from "react";

interface InfiniteScrollProps {
    children: ReactNode;
    hasMore: boolean;
    isLoadingMore: boolean;
    onLoadMore: () => void;
    loader?: ReactNode;
    rootMargin?: string;
    className?: string;
}
function InfiniteScroll({
    children,
    hasMore,
    isLoadingMore,
    onLoadMore,
    loader,
    rootMargin = "200px",
    className = "",
}: InfiniteScrollProps) {
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel || !hasMore || isLoadingMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoadingMore) onLoadMore();
            },
            { rootMargin }
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [hasMore, isLoadingMore, onLoadMore, rootMargin]);

    return (
        <div className={className}>
            {children}
            <div ref={sentinelRef} className="w-full">
                {isLoadingMore && loader ? loader : null}
            </div>
        </div>
    );
}

export default memo(InfiniteScroll)