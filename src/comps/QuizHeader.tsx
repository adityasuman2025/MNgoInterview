import { memo } from "react";
import getLogoImgXxs from "mngo-project-tools/getLogoImgXxs";
import Timer from "./Timer";
import { PROJECT_NAME, APP_MODES, APP_MODE_LEARN, APP_MODE_QUIZ } from "../constants";

function QuizHeader({
    title = "MNgo",
    appMode = APP_MODES[APP_MODE_LEARN],
    onSwitchMode,
}: {
    title?: string;
    appMode?: APP_MODES;
    onSwitchMode?: () => void;
}) {
    return (
        <header className="mngo-fixed mngo-top-0 mngo-left-0 mngo-w-full mngo-z-50 mngo-bg-slate-950/75 mngo-backdrop-blur-xl mngo-border-b mngo-border-white/5 mngo-px-4 md:mngo-px-6 mngo-py-3">
            <div className="mngo-flex mngo-items-center mngo-justify-between mngo-max-w-7xl mngo-m-auto">
                <div className="mngo-flex mngo-items-center mngo-gap-3">
                    <a href="/" className="mngo-flex mngo-items-center mngo-no-underline mngo-text-white hover:mngo-opacity-80 mngo-transition">
                        <img src={getLogoImgXxs()} alt="mngo logo" width={26} height={26} />
                        <span className="mngo-ml-2 mngo-font-extrabold mngo-text-sm mngo-tracking-wider mngo-hidden sm:mngo-inline">{PROJECT_NAME}</span>
                    </a>
                    <span className="mngo-text-slate-700 mngo-hidden sm:mngo-inline mngo-select-none">/</span>
                    <h1 className="mngo-text-xs sm:mngo-text-sm md:mngo-text-base mngo-font-bold mngo-text-slate-200 mngo-tracking-wide mngo-max-w-[180px] sm:mngo-max-w-[280px] md:mngo-max-w-[400px] mngo-truncate">
                        {title}
                    </h1>
                </div>

                <div className="mngo-flex mngo-items-center mngo-gap-4">
                    <button
                        className="mngo-cursor-pointer mngo-px-4 mngo-py-1.5 mngo-text-xs mngo-font-bold mngo-rounded-full mngo-text-indigo-200 mngo-bg-indigo-500/15 mngo-border mngo-border-indigo-500/20 hover:mngo-bg-indigo-500/30 hover:mngo-text-white hover:mngo-border-indigo-500/40 mngo-transition-all mngo-duration-300"
                        onClick={onSwitchMode}
                    >
                        {appMode === APP_MODE_QUIZ ? "Learn Mode" : "Quiz Mode"}
                    </button>
                    <div className="md:mngo-block mngo-hidden">
                        <Timer />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default memo(QuizHeader);