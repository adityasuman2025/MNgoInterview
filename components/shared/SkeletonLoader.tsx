export default function SkeletonLoader({
    length = 1,
    className = "h-20 border border-ternary rounded-xl bg-secondary/60 animate-pulse",
}: {
    length?: number;
    className?: string;
}) {
    return (
        <>
            {Array.from({ length }, (_, i) => (
                <div key={i} className={className} />
            ))}
        </>
    );
}