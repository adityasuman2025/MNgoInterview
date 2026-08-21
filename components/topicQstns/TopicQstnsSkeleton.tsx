import SkeletonLoader from "@/components/shared/SkeletonLoader";

export default function TopicQstnsSkeleton() {
    return (
        <div className="flex flex-col flex-1 w-full min-h-0">
            {/* Exact Match: TopicSubNavbar */}
            <div className="border-y border-ternary bg-ternary/80 backdrop-blur-md px-4 md:px-8 py-0.5 flex items-center justify-between text-xs transition-colors shadow-xs rounded-b-3xl">
                {/* Mode Switch Button Skeleton */}
                <div className="rounded-lg !py-1 !px-2.5 !text-2xs font-medium flex items-center gap-1.5">
                    <SkeletonLoader className="h-3 w-28 rounded" />
                </div>

                {/* Timer Controls Skeleton */}
                <div className="flex items-center gap-2">
                    <div className="rounded-lg !py-1 !px-2.5 !text-2xs font-medium flex items-center gap-1.5">
                        <SkeletonLoader className="h-3 w-20 rounded" />
                    </div>
                </div>
            </div>

            {/* Exact Match: Two-Column Questions & Solution Layout */}
            <section className="flex flex-1 w-full min-h-0 py-2">
                {/* Left Column: Questions List */}
                <section className="flex-1 min-h-0 overflow-y-auto border-r border-ternary bg-secondary/20 p-3 flex flex-col gap-2">
                    <div className="items-center justify-between text-2xs text-secondary-content/60 font-medium">
                        <SkeletonLoader className="h-3 w-28 rounded" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <SkeletonLoader length={20} className="h-11 w-full rounded-xl border border-ternary" />
                    </div>
                </section>

                {/* Right Column: Question Solution Panel */}
                <section className="hidden md:flex md:flex-3 min-h-0 overflow-y-auto bg-ternary/20 flex-col">
                    <div className="border-b border-ternary sticky top-0 backdrop-blur-md p-3 flex items-start justify-between gap-2 z-1">
                        <div className="flex flex-col gap-1 flex-1">
                            <span className="text-2xs font-bold tracking-wider text-primary uppercase">Question Solution</span>
                            <SkeletonLoader className="h-7 w-3/4 rounded-lg mt-1" />
                        </div>
                    </div>

                    <div className="w-full mx-auto p-4">
                        <SkeletonLoader length={1} className="h-72 w-full rounded-2xl" />
                    </div>
                </section>
            </section>
        </div>
    );
}
