import { ReactNode } from "react";
import SkeletonLoader from "@/components/shared/SkeletonLoader";
import LoaderOrError from "@/components/shared/LoaderOrError";

interface TopicQstnsLoaderOrErrorProps {
    isLoading?: boolean;
    isError?: boolean;
    errorMessage?: ReactNode;
    totalCountText?: ReactNode;
    selectedTitle?: string;
    solutionContent?: ReactNode;
    children?: ReactNode;
}
export default function TopicQstnsLoaderOrError({
    isLoading = false,
    isError = false,
    errorMessage = "Failed to load questions. Please try again.",
    totalCountText,
    selectedTitle,
    solutionContent,
    children,
}: TopicQstnsLoaderOrErrorProps) {
    return (
        <section className="flex flex-1 w-full min-h-0">
            <section className="flex-1 min-h-0 overflow-y-auto border-r border-ternary bg-secondary/20 p-3 sm:p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between px-1 pb-1 text-2xs text-secondary-content/60 font-medium">
                    {isLoading ? <SkeletonLoader className="h-3 w-28 rounded bg-secondary/50 animate-pulse" /> : <span>{totalCountText}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                    <LoaderOrError
                        isLoading={isLoading}
                        isError={isError}
                        errorMessage={errorMessage}
                        skeletonElement={
                            <SkeletonLoader
                                length={10}
                                className="h-11 w-full rounded-xl border border-ternary bg-secondary/40 animate-pulse"
                            />
                        }
                    >
                        {children}
                    </LoaderOrError>
                </div>
            </section>

            <section className="hidden md:flex md:flex-3 min-h-0 overflow-y-auto bg-ternary/20 p-6 sm:p-8 flex-col gap-5">
                <div className="flex flex-col gap-4 max-w-3xl w-full mx-auto">
                    <div className="border-b border-ternary pb-4">
                        <span className="text-2xs font-bold tracking-wider text-primary uppercase">
                            Question Solution
                        </span>

                        {isLoading ? (
                            <SkeletonLoader className="h-7 w-3/4 rounded-lg bg-secondary/40 animate-pulse mt-1" />
                        ) : selectedTitle ? (
                            <h1 className="text-xl sm:text-2xl font-extrabold text-ternary-content mt-1 leading-snug">
                                {selectedTitle}
                            </h1>
                        ) : null}
                    </div>

                    <LoaderOrError
                        isLoading={isLoading}
                        isError={isError}
                        errorMessage={errorMessage}
                        skeletonElement={
                            <SkeletonLoader
                                length={1}
                                className="h-72 w-full rounded-2xl border border-ternary bg-secondary/40 animate-pulse"
                            />
                        }
                    >
                        {solutionContent}
                    </LoaderOrError>
                </div>
            </section>
        </section>
    );
}
