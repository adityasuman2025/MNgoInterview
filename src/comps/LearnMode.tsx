import React, { useState, useEffect, useCallback, useMemo } from "react";
import LinkDetector from "mngo-project-tools/comps/LinkDetector";
import { OpenLinkInNewTab } from "../comps";
import { MACHINE_CODING_FILE_LOCATION } from '../constants';

function LearnMode({
    quizName,
    currentQuizData = {},
}: {
    quizName: string;
    currentQuizData: { [key: string]: any };
}) {
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);

    // Derive questions list from props — no separate state needed
    const quizQuestions = useMemo(() => Object.keys(currentQuizData || {}), [currentQuizData]);

    // Reset selected question when topic changes
    useEffect(() => {
        setCurrentQuestionIdx(0);
    }, [currentQuizData]);

    // Derive solution directly — no extra state or effect needed
    const questionSolution = useMemo(() => {
        const currentQstn = quizQuestions[currentQuestionIdx];
        return (currentQuizData?.[currentQstn] || []).join("");
    }, [currentQuestionIdx, quizQuestions, currentQuizData]);

    // Stable link renderer shared across all list items
    const linkRenderor = useCallback((_: string, link: string) => (
        <a href={link} target="_blank" rel="noopener noreferrer">Demo</a>
    ), []);

    return (
        <section className='mngo-h-full mngo-flex md:mngo-flex-row mngo-flex-col mngo-text-left'>
            <aside className='mngo-h-full mngo-overflow-hidden md:mngo-w-3/12 mngo-flex md:mngo-border-r mngo-border-white/5 md:mngo-pr-2 md:mngo-pl-4'>
                <ul className='md:mngo-mt-28 mngo-mt-24 mngo-flex-1 mngo-overflow-auto mngo-pb-8 mngo-px-2'>
                    {quizQuestions.map((question, idx) => (
                        <QuestionItem
                            key={`${question}_${idx}`}
                            question={question}
                            idx={idx}
                            isActive={currentQuestionIdx === idx}
                            onSelect={setCurrentQuestionIdx}
                            hasMachineLink={question?.includes(MACHINE_CODING_FILE_LOCATION)}
                            linkRenderor={linkRenderor}
                        />
                    ))}
                </ul>
            </aside>

            <section className='mngo-h-full mngo-overflow-hidden md:mngo-w-9/12 mngo-flex'>
                <div className='md:mngo-mt-28 mngo-mt-4 mngo-mb-8 mngo-mx-6 md:mngo-p-8 mngo-p-4 mngo-rounded-2xl mngo-text-sm md:mngo-text-base mngo-solution-2 mngo-overflow-auto mngo-flex-1 mngo-bg-slate-950/40 mngo-border mngo-border-white/5 mngo-shadow-2xl mngo-leading-relaxed mngo-text-slate-300'>
                    <OpenLinkInNewTab htmlString={questionSolution} />
                </div>
            </section>
        </section>
    )
}

// Extracted so React.memo can bail out per-item on active state changes
const QuestionItem = React.memo(function QuestionItem({
    question,
    idx,
    isActive,
    onSelect,
    hasMachineLink,
    linkRenderor,
}: {
    question: string;
    idx: number;
    isActive: boolean;
    onSelect: (idx: number) => void;
    hasMachineLink: boolean;
    linkRenderor: (w: string, l: string) => React.ReactNode;
}) {
    const handleClick = useCallback(() => onSelect(idx), [idx, onSelect]);

    return (
        <li
            className={`
                mngo-question mngo-cursor-pointer mngo-list-none mngo-rounded-xl mngo-mb-2 md:mngo-p-3.5 mngo-p-2.5
                md:mngo-text-base mngo-text-sm mngo-transition-all mngo-duration-200 mngo-border
                ${isActive 
                    ? 'mngo-bg-indigo-500/10 mngo-border-indigo-500/30 mngo-text-slate-100 mngo-font-semibold mngo-shadow-md' 
                    : 'mngo-bg-transparent mngo-border-transparent hover:mngo-bg-white/5 hover:mngo-border-white/5 mngo-text-slate-400 hover:mngo-text-slate-200'
                }
            `}
            onClick={handleClick}
        >
            <span className="mngo-font-mono mngo-opacity-70 mngo-mr-1">{idx + 1}.</span>
            {hasMachineLink ? (
                <LinkDetector linkRenderor={linkRenderor}>{question}</LinkDetector>
            ) : question}
        </li>
    );
});

export default React.memo(LearnMode);