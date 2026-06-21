import { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react';
import { secondsToMMSS } from '../utils';
import TimerIcon from '../imgs/timer.svg';

function Timer() {
    const timerRef = useRef<any>(null);
    const [timer, setTimer] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    useEffect(() => {
        return () => clearInterval(timerRef.current);
    }, []);

    const handleTimerClick = useCallback(() => {
        if (isTimerRunning) {
            clearInterval(timerRef.current); // pause
        } else {
            timerRef.current = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);
        }
        setIsTimerRunning(prev => !prev);
    }, [isTimerRunning]);

    // Memoize formatted time — avoids re-running secondsToMMSS on unrelated renders
    const formattedTime = useMemo(() => secondsToMMSS(timer), [timer]);

    return (
        <div className='mngo-flex mngo-items-center mngo-justify-end mngo-gap-3'>
            <button 
                className='mngo-cursor-pointer mngo-bg-white/5 mngo-border mngo-border-white/10 hover:mngo-bg-white/15 mngo-text-white mngo-px-3.5 mngo-py-1.5 mngo-rounded-full mngo-text-xs mngo-font-semibold mngo-transition mngo-duration-300 mngo-shadow-sm' 
                onClick={handleTimerClick}
            >
                {isTimerRunning ? "Pause" : "Start"}
            </button>

            <div className='mngo-flex mngo-items-center mngo-bg-white/5 mngo-border mngo-border-white/5 mngo-rounded-full mngo-pl-2.5 mngo-pr-4 mngo-py-1 mngo-shadow-inner'>
                <img src={TimerIcon} className='mngo-quiz-icon' alt="timer icon" width={18} height={18} />
                <div className='mngo-ml-2 mngo-text-indigo-200 mngo-text-base mngo-font-mono mngo-font-bold mngo-tracking-wider'>
                    {formattedTime}
                </div>
            </div>
        </div>
    )
}

export default memo(Timer);