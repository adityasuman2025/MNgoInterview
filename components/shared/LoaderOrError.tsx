import { ReactNode } from "react";
import { AlertCircle } from "lucide-react";

interface LoaderOrErrorProps {
    isLoading: boolean;
    isError?: boolean;
    errorMessage?: ReactNode;
    skeletonElement?: ReactNode;
    children: ReactNode;
}

export default function LoaderOrError({
    isLoading,
    isError = false,
    errorMessage = "Failed to load data. Please try again.",
    skeletonElement,
    children,
}: LoaderOrErrorProps) {
    if (isLoading) return skeletonElement ? <>{skeletonElement}</> : null;

    if (isError) {
        return (
            <div className="col-span-full flex items-center justify-center gap-2 p-6 rounded-xl border border-secondary bg-secondary text-xs sm:text-sm text-ternary-content opacity-80">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{errorMessage}</span>
            </div>
        );
    }

    return <>{children}</>;
}
