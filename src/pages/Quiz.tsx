import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import { useParams } from 'react-router';
import { getCacheRegular, setCacheRegular } from "mngo-project-tools/cachingUtils";
import { QuizHeader, LearnMode, QuizMode } from "../comps";
import { APP_MODE_KEY, APP_MODES, APP_MODE_LEARN, APP_MODE_QUIZ } from '../constants';
import { getInterviewData } from '../utils';

const APP_MODE_CACHE: any = getCacheRegular(APP_MODE_KEY);
const APP_MODE: APP_MODES = typeof APP_MODE_CACHE === "string" ? APP_MODE_CACHE as APP_MODES : APP_MODES[APP_MODE_LEARN];

function Quiz() {
    const { quizName = "" } = useParams() || {};

    const isMounted = useRef<boolean>(false);
    const [currentQuizData, setCurrentQuizData] = useState<string[]>([]);
    const [appMode, setAppMode] = useState<APP_MODES>(APP_MODE);

    useEffect(() => {
        if (isMounted.current) return;
        isMounted.current = true;

        getInterviewData().then((topicList) => {
            if (topicList?.hasOwnProperty(quizName)) {
                setCurrentQuizData(topicList[quizName]);
            }
        });
    }, [quizName]);

    const handleSwitchMode = useCallback(() => {
        const newAppMode = appMode === APP_MODES[APP_MODE_QUIZ] ? APP_MODES[APP_MODE_LEARN] : APP_MODES[APP_MODE_QUIZ];
        setCacheRegular(APP_MODE_KEY, newAppMode);
        setAppMode(newAppMode);
    }, [appMode]);

    return (
        <section className='mngo-h-screen mngo-overflow-auto mngo-text-center mngo-m-auto'>
            {
                (Object.keys(currentQuizData || {}).length > 0) ? (
                    <>
                        <QuizHeader title={quizName} appMode={appMode} onSwitchMode={handleSwitchMode} />

                        {
                            appMode === APP_MODES[APP_MODE_QUIZ] ? (
                                <QuizMode quizName={quizName} currentQuizData={currentQuizData} />
                            ) : (
                                <LearnMode quizName={quizName} currentQuizData={currentQuizData} />
                            )
                        }
                    </>
                ) : (
                    <p className="mngo-mt-10 mngo-text-2xl">Quiz Not Found</p>
                )
            }
        </section>
    )
}

export default memo(Quiz);