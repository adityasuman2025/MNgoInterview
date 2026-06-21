import React, { memo } from "react";

function Carousel({
    disableLeft = false,
    disableRight = false,
    onLeftClick,
    onRightClick,
    children,
}: {
    disableLeft?: boolean
    disableRight?: boolean
    onLeftClick?: () => void,
    onRightClick?: () => void,
    children: React.ReactNode
}) {
    return (
        <section
            className='mngo-h-full mngo-flex mngo-items-center mngo-justify-between mngo-w-full mngo-max-w-6xl mngo-m-auto md:mngo-px-6 mngo-px-2'
            aria-label="Question carousel"
        >
            <button
                aria-label="Previous question"
                disabled={disableLeft}
                onClick={onLeftClick}
                className={`mngo-flex mngo-items-center mngo-justify-center md:mngo-w-14 md:mngo-h-14 mngo-w-10 mngo-h-10 mngo-bg-white/5 mngo-border mngo-border-white/10 hover:mngo-border-white/20 mngo-rounded-full mngo-cursor-pointer mngo-transition-all mngo-duration-300 hover:mngo-bg-white/15 hover:-mngo-translate-x-1 focus-visible:mngo-outline focus-visible:mngo-outline-2 focus-visible:mngo-outline-indigo-500 ${disableLeft ? "mngo-opacity-20 mngo-pointer-events-none" : "mngo-shadow-lg"}`}
            >
                <svg className="md:mngo-w-6 md:mngo-h-6 mngo-w-4 mngo-h-4 mngo-text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>

            <div className="mngo-flex-1 mngo-h-full mngo-flex mngo-flex-col mngo-justify-center mngo-px-4">
                {children}
            </div>

            <button
                aria-label="Next question"
                disabled={disableRight}
                onClick={onRightClick}
                className={`mngo-flex mngo-items-center mngo-justify-center md:mngo-w-14 md:mngo-h-14 mngo-w-10 mngo-h-10 mngo-bg-white/5 mngo-border mngo-border-white/10 hover:mngo-border-white/20 mngo-rounded-full mngo-cursor-pointer mngo-transition-all mngo-duration-300 hover:mngo-bg-white/15 hover:mngo-translate-x-1 focus-visible:mngo-outline focus-visible:mngo-outline-2 focus-visible:mngo-outline-indigo-500 ${disableRight ? "mngo-opacity-20 mngo-pointer-events-none" : "mngo-shadow-lg"}`}
            >
                <svg className="md:mngo-w-6 md:mngo-h-6 mngo-w-4 mngo-h-4 mngo-text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
        </section>
    )
}

export default memo(Carousel);