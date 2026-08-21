import SkeletonLoader from "@/components/shared/SkeletonLoader";
import { ReactNode } from "react";
import LoaderOrError from "@/components/shared/LoaderOrError";

interface TopicsLoaderProps {
    isLoading?: boolean
    isLogged?: boolean
    isError?: boolean;
    errorMessage?: ReactNode;
    continueLearningContent?: ReactNode;
    children?: ReactNode
}
export default function TopicsLoaderOrError({
    isLoading = false,
    isLogged = false,
    isError = false,
    errorMessage = "Failed to load data. Please try again.",
    continueLearningContent,
    children,
}: TopicsLoaderProps) {
    return (
        <>
            {isLogged && (
                <section className="flex flex-col gap-2.5 mt-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xs uppercase font-bold tracking-wider text-secondary-content/60">
                            Continue Learning
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <LoaderOrError
                            isLoading={isLoading}
                            isError={isError}
                            errorMessage={errorMessage}
                            skeletonElement={<SkeletonLoader length={2} />}
                        >
                            {continueLearningContent}
                        </LoaderOrError>
                    </div>
                </section>
            )}

            <section className="flex flex-col gap-2.5 mt-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xs uppercase font-bold tracking-wider text-secondary-content/60">
                        All Topics
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    <LoaderOrError
                        isLoading={isLoading}
                        isError={isError}
                        errorMessage={errorMessage}
                        skeletonElement={<SkeletonLoader length={9} />}
                    >
                        {children}
                    </LoaderOrError>
                </div>
            </section>
        </>
    );
}
