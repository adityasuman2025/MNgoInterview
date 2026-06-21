import React, { useState, useEffect, useCallback, useMemo } from "react";
import { MNgoImageAnnotate } from "react-image-annotate-mngo";
import BottomModal from "mngo-project-tools/comps/BottomModal";
import LinkDetector from "mngo-project-tools/comps/LinkDetector";
import { getCacheRegular, setCacheRegular } from "mngo-project-tools/cachingUtils";
import { Carousel, OpenLinkInNewTab } from "../comps";
import { MACHINE_CODING_FILE_LOCATION, TYPE_SOLUTION, TYPE_SCRATCHPAD, SCRATCHPAD_DATA_KEY } from '../constants';
import { shuffle, toSentenceCase } from '../utils';
import whiteBg from "../imgs/whiteBg.jpg";

const SCRATHCPAD_DATA = getCacheRegular(SCRATCHPAD_DATA_KEY, "{}");

function QuizMode({
    quizName,
    currentQuizData = {},
}: {
    quizName: string;
    currentQuizData: { [key: string]: any };
}) {
    const [quizQuestions, setQuizQuestions] = useState<string[]>([]);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [modalData, setModalData] = useState<{ [key: string]: any }>({ isOpen: false, type: "", content: "" });
    const [quizScratchpadData, setQuizScratchpadData] = useState<{ [key: string]: any }>(SCRATHCPAD_DATA[quizName] || {});

    useEffect(() => {
        if (currentQuizData) setQuizQuestions(shuffle(Object.keys(currentQuizData || {})));
    }, [currentQuizData]);

    useEffect(() => {
        if (!Object.keys(quizScratchpadData).length) return;
        const timer = setTimeout(() => {
            setCacheRegular(SCRATCHPAD_DATA_KEY, { ...SCRATHCPAD_DATA, [quizName]: quizScratchpadData });
        }, 600);
        return () => clearTimeout(timer); // cleanup on each change, no module-level variable needed
    }, [quizScratchpadData, quizName]);

    // Derive current question FIRST — callbacks below depend on it
    const question = quizQuestions[currentQuestionIdx] ?? "";
    const isMachineCodingQuestion = useMemo(
        () => question.includes(MACHINE_CODING_FILE_LOCATION),
        [question]
    );

    const handleSolutionClick = useCallback(() => {
        const currentQstn = quizQuestions[currentQuestionIdx];
        const currentQstnSolution = (currentQuizData?.[currentQstn] || []).join("");
        if (currentQstnSolution) {
            setModalData({ isOpen: true, type: TYPE_SOLUTION, content: currentQstnSolution });
        }
    }, [quizQuestions, currentQuestionIdx, currentQuizData]);

    const handleScratchpadClick = useCallback(() => {
        setModalData({ isOpen: true, type: TYPE_SCRATCHPAD });
    }, []);

    const handleCloseModal = useCallback(() => {
        setModalData({ isOpen: false, type: "", content: "" });
    }, []);

    const handleLeftClick = useCallback(() => {
        setModalData({ isOpen: false, type: "", content: "" });
        setCurrentQuestionIdx(prev => prev - 1);
    }, []);

    const handleRightClick = useCallback(() => {
        setModalData({ isOpen: false, type: "", content: "" });
        setCurrentQuestionIdx(prev => prev + 1);
    }, []);

    const handleTextareaChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setQuizScratchpadData(prev => ({ ...prev, text: e.target.value || "" }));
    }, []);

    const handleAnnotateChange = useCallback((annots: { [key: string]: any }) => {
        setQuizScratchpadData(prev => ({ ...prev, annotData: annots || {} }));
    }, []);

    // question is now declared above — dep array is safe
    const linkRenderor = useCallback((_word: string, link: string) => (
        <>
            (<a href={link} target="_blank" rel="noopener noreferrer">Demo</a>)
            <iframe src={link} title={`Machine coding demo for ${question}`} width={"100%"} height={"600px"} className="mngo-border-none"></iframe>
        </>
    ), [question]);

    return (
        <>
            <Carousel
                disableLeft={currentQuestionIdx === 0}
                disableRight={currentQuestionIdx === quizQuestions.length - 1}
                onLeftClick={handleLeftClick}
                onRightClick={handleRightClick}
            >
                <div className="mngo-flex-1 mngo-w-full mngo-max-w-3xl mngo-mx-auto mngo-flex mngo-flex-col mngo-justify-center mngo-items-center mngo-py-12">
                    <div className="mngo-w-full mngo-bg-slate-950/40 mngo-backdrop-blur-xl mngo-border mngo-border-white/5 mngo-rounded-2xl md:mngo-p-10 mngo-p-6 mngo-shadow-2xl mngo-flex mngo-flex-col mngo-items-center mngo-justify-between mngo-min-h-[320px]">

                        {/* Progress indicator */}
                        <span
                            aria-live="polite"
                            aria-atomic="true"
                            className="mngo-inline-flex mngo-items-center mngo-px-3.5 mngo-py-1 mngo-rounded-full mngo-bg-white/5 mngo-border mngo-border-white/5 mngo-text-slate-400 mngo-text-xs mngo-font-mono mngo-font-semibold mngo-tracking-wider mngo-mb-6"
                        >
                            {currentQuestionIdx + 1} / {quizQuestions.length}
                        </span>

                        {/* Question text block */}
                        <p className="mngo-text-slate-100 md:mngo-text-2xl mngo-text-lg mngo-font-bold mngo-leading-relaxed mngo-text-center mngo-flex-1 mngo-flex mngo-items-center mngo-justify-center mngo-max-w-2xl">
                            {isMachineCodingQuestion ? (
                                <LinkDetector linkRenderor={linkRenderor}>
                                    {question}
                                </LinkDetector>
                            ) : question}
                        </p>

                        {/* Action Buttons row */}
                        <div className="mngo-w-full mngo-flex mngo-flex-wrap mngo-items-center mngo-justify-center mngo-gap-4 mngo-mt-8">
                            <button
                                aria-label="View solution for this question"
                                className="mngo-cursor-pointer mngo-bg-indigo-600 hover:mngo-bg-indigo-500 mngo-text-white mngo-px-5 mngo-py-2.5 mngo-rounded-xl mngo-text-sm mngo-font-bold mngo-shadow-lg mngo-shadow-indigo-600/20 hover:-mngo-translate-y-0.5 mngo-transition-all mngo-duration-200"
                                onClick={handleSolutionClick}
                            >
                                view solution
                            </button>

                            <button
                                aria-label="Open scratchpad"
                                className="mngo-cursor-pointer mngo-bg-white/5 mngo-border mngo-border-white/10 hover:mngo-bg-white/10 hover:mngo-border-white/20 mngo-text-slate-200 hover:mngo-text-white mngo-px-5 mngo-py-2.5 mngo-rounded-xl mngo-text-sm mngo-font-bold hover:-mngo-translate-y-0.5 mngo-transition-all mngo-duration-200"
                                onClick={handleScratchpadClick}
                            >
                                scratchpad
                            </button>
                        </div>
                    </div>
                </div>
            </Carousel>

            {modalData.isOpen && (
                <BottomModal title={toSentenceCase(modalData.type)} onCloseClick={handleCloseModal}>
                    {modalData.type === TYPE_SOLUTION ? (
                        <div className="mngo-text-sm md:mngo-text-base mngo-leading-relaxed mngo-text-slate-300 mngo-p-6 mngo-solution mngo-max-h-[60vh] mngo-overflow-auto">
                            <OpenLinkInNewTab htmlString={modalData.content} />
                        </div>
                    ) : (
                        <section className="mngo-flex mngo-items-start mngo-flex-1 mngo-w-full mngo-h-[60vh] mngo-p-6">
                            <textarea
                                autoFocus
                                aria-label="Scratchpad text area"
                                className="mngo-text-base mngo-flex-1 mngo-h-full mngo-border mngo-border-white/15 focus:mngo-border-indigo-500/40 mngo-rounded-2xl mngo-p-4 mngo-outline-none mngo-resize-none mngo-bg-slate-950/40 mngo-text-slate-100 mngo-transition-all mngo-duration-200"
                                placeholder="write here..."
                                value={quizScratchpadData?.text || ""}
                                onChange={handleTextareaChange}
                            />
                            <div className="lg:mngo-block mngo-hidden mngo-h-full mngo-overflow-hidden mngo-ml-4 mngo-rounded-xl mngo-border mngo-border-white/5">
                                <MNgoImageAnnotate
                                    compMaxHeight={"100%"}
                                    image={whiteBg}
                                    imgWidth={quizScratchpadData?.annotData?.imgWidth || window.innerWidth / 2 - 50}
                                    annotations={quizScratchpadData?.annotData?.annotations || []}
                                    onChange={handleAnnotateChange}
                                />
                            </div>
                        </section>
                    )}
                </BottomModal>
            )}
        </>
    )
}

export default React.memo(QuizMode);