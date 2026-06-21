import React, { memo, useState, useEffect, useMemo, useCallback } from "react";
import getLogoImg from "mngo-project-tools/getLogoImg";
import FullScreenLoader from "mngo-project-tools/comps/FullScreenLoader";
import { PROJECT_NAME, MACHINE_CODING_FILE_LOCATION } from '../constants';
import { QuizListItem } from '../comps';
import { getInterviewData } from '../utils';

function Home() {
    const [topicList, setTopicList] = useState<{ [key: string]: any } | null>(null);

    useEffect(() => {
        getInterviewData().then(setTopicList);
    }, []);

    // Stable list of topic keys — only recomputed when topicList changes
    const topics = useMemo(() => Object.keys(topicList || {}), [topicList]);

    // Stable navigate handler factory — memoized per key via the closure over topics
    const makeNavigateHandler = useCallback((key: string) => () => {
        window.location.href = `/quiz/${key}`;
    }, []);

    const handleMachineCodingClick = useCallback(() => {
        window.open(MACHINE_CODING_FILE_LOCATION, "_blank");
    }, []);

    if (topicList === null) {
        return (
            <FullScreenLoader styles={{ loaderClassName: "mngo-loader" }}>
                <h2 className="mngo-mt-4">MNgo Interview</h2>
            </FullScreenLoader>
        );
    }

    return (
        <main className='mngo-min-h-screen mngo-overflow-auto mngo-flex mngo-flex-col mngo-justify-between mngo-py-16 mngo-px-6 mngo-text-center'>
            <div className="mngo-max-w-3xl mngo-mx-auto mngo-w-full mngo-flex-1 mngo-flex mngo-flex-col mngo-justify-center mngo-items-center">
                <header className="mngo-flex mngo-flex-col mngo-items-center">
                    <div className="mngo-inline-flex mngo-items-center mngo-justify-center mngo-p-4 mngo-rounded-3xl mngo-bg-white/5 mngo-border mngo-border-white/10 mngo-shadow-2xl mngo-mb-6 mngo-backdrop-blur-md">
                        <img src={getLogoImg()} alt="MNgo Interview logo" width={72} height={72} className="mngo-object-contain" />
                    </div>
                    <h1 className="mngo-text-3xl md:mngo-text-5xl mngo-font-extrabold mngo-tracking-tight mngo-text-transparent mngo-bg-clip-text mngo-bg-gradient-to-r mngo-from-indigo-400 mngo-via-purple-400 mngo-to-pink-500 mngo-mb-3">
                        {PROJECT_NAME}
                    </h1>
                    <p className="mngo-text-slate-400 mngo-max-w-md mngo-mx-auto mngo-text-sm md:mngo-text-base mngo-leading-relaxed mngo-mb-10">
                        Practice curated interview questions covering JavaScript, React, System Design, DSA, and Web Security to ace your next software engineering role.
                    </p>
                </header>

                <nav aria-label="Interview topics" className="mngo-w-full mngo-max-w-lg">
                    <ul
                        className="mngo-list-none"
                        aria-label={`${topics.length + 1} topics available`}
                    >
                        {topics.map((key: string, idx) => (
                            <QuizListItem
                                key={key + "_" + idx}
                                quizTitle={key}
                                onClick={makeNavigateHandler(key)}
                            />
                        ))}
                        <QuizListItem
                            quizTitle="Machine Coding"
                            onClick={handleMachineCodingClick}
                        />
                    </ul>
                </nav>
            </div>

            <footer className="mngo-text-xs mngo-text-slate-500 mngo-mt-16 mngo-pt-6 mngo-border-t mngo-border-white/5">
                <small>© 2026 {PROJECT_NAME}. All rights reserved.</small>
                <p className="mngo-mt-1.5">
                    Developed by <a className="mngo-footer-developer" href="https://adityas.site" target="_blank" rel="noopener noreferrer">Aditya Suman</a>
                </p>
            </footer>
        </main>
    )
}

export default memo(Home);