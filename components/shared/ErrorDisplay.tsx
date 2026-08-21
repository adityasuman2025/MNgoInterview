import { memo, type ReactNode } from "react";
import { AlertCircle } from "lucide-react";

interface ErrorDisplayProps {
    errorMessage?: ReactNode;
    className?: string;
}

function ErrorDisplay({
    errorMessage = "Failed to load data. Please try again.",
    className = "",
}: ErrorDisplayProps) {
    return (
        <div className={`col-span-full flex items-center justify-center gap-2 p-6 rounded-xl border border-secondary bg-secondary text-xs sm:text-sm text-ternary-content opacity-80 ${className}`}>
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{errorMessage}</span>
        </div>
    );
}

export default memo(ErrorDisplay);
