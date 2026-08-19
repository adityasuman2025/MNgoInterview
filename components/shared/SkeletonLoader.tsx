export default function SkeletonLoader({ length = 1 }: { length: number }) {
    return (
        <>
            {
                Array.from({ length }, (_, i) => (
                    <div
                        key={i}
                        className="h-20 border border-ternary rounded-xl bg-secondary/60 animate-pulse"
                    />
                ))
            }
        </>
    )
}