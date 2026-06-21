import { memo } from 'react';
import quizIcon from '../imgs/quiz.png';

function QuizListItem({
    quizTitle,
    quizDescription = "",
    onClick = () => { }
}: {
    quizTitle: string,
    quizDescription?: string,
    onClick?: () => void
}) {
    return (
        <li
            role="button"
            tabIndex={0}
            aria-label={`Open ${quizTitle} quiz`}
            className='mngo-transp-bckgrnd mngo-flex mngo-items-center md:mngo-p-5 mngo-p-4 mngo-rounded-xl mngo-mb-4 mngo-cursor-pointer mngo-list-none hover:-mngo-translate-y-1'
            onClick={onClick}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick(); }}
        >
            <div className='mngo-flex mngo-items-center mngo-justify-center mngo-w-12 mngo-h-12 mngo-rounded-xl mngo-bg-indigo-500/10 mngo-border mngo-border-indigo-500/20 mngo-mr-4'>
                <img src={quizIcon} alt="" className='mngo-quiz-icon' width={24} height={24} />
            </div>
            <div className='mngo-flex-1 mngo-text-left'>
                <h4 className='mngo-text-base mngo-font-semibold mngo-text-slate-100 mngo-tracking-wide'>{quizTitle}</h4>
                {quizDescription && <p className='mngo-text-xs mngo-text-slate-400 mngo-mt-1'>{quizDescription}</p>}
            </div>
            <div className='mngo-text-indigo-400 mngo-ml-2'>
                <svg className="mngo-w-5 mngo-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path>
                </svg>
            </div>
        </li>
    )
}

export default memo(QuizListItem);