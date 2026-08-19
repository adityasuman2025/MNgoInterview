import { ReactNode } from "react";
import ErrorDisplay from "@/components/shared/ErrorDisplay";

interface LoaderOrErrorProps {
    isLoading?: boolean;
    isError?: boolean;
    errorMessage?: ReactNode;
    skeletonElement?: ReactNode;
    children: ReactNode;
}
export default function LoaderOrError({
    isLoading = false,
    isError = false,
    errorMessage,
    skeletonElement,
    children,
}: LoaderOrErrorProps) {
    if (isLoading) return skeletonElement ? <>{skeletonElement}</> : null;

    if (isError) return <ErrorDisplay errorMessage={errorMessage} />;

    return <>{children}</>;
}
