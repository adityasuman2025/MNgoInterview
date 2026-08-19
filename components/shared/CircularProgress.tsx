import { memo } from "react";

interface CircularProgressProps {
    percentage: number;
    size?: number;
    strokeWidth?: number;
    className?: string;
    strokeColor?: string;
    bgColor?: string;
}

function CircularProgress({
    percentage,
    size = 44,
    strokeWidth = 3.5,
    className = "",
    strokeColor = "var(--color-primary)",
    bgColor = "var(--color-primary)",
}: CircularProgressProps) {
    const clamped = Math.min(100, Math.max(0, percentage));
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (clamped / 100) * circumference;

    return (
        <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`} style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke={bgColor}
                    strokeWidth={strokeWidth}
                    strokeOpacity={0.2}
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke={clamped > 0 ? strokeColor : "transparent"}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                />
            </svg>
            <span className="absolute text-xs font-semibold text-secondary-content tracking-tight">
                {Math.round(clamped)}%
            </span>
        </div>
    );
}

export default memo(CircularProgress);
