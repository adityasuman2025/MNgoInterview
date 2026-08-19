import { memo } from "react";

interface ProgressBarProps {
    value: number;
    total?: number;
    className?: string;
    progressClassName?: string;
}
function ProgressBar({
    value = 0,
    total = 0,
    className = "",
    progressClassName = "",
}: ProgressBarProps) {
    const percentage = (total > 0 ? Math.min(100, Math.max(0, (value / total) * 100)) : Math.min(100, Math.max(0, value))) || 0;

    return (
        <div className="flex items-center gap-2">
            <div className={`flex-1 h-1.5 bg-ternary rounded-full overflow-hidden ${className}`}>
                <div
                    className={`w-full h-full bg-primary transition-transform duration-300 ease-out ${progressClassName}`}
                    style={{ transform: `translateX(-${100 - percentage}%)` }}
                />
            </div>
            <div className="min-w-fit text-2xs text-primary-content/40">{`${value} / ${total}`}</div>
        </div>
    );
}

export default memo(ProgressBar);