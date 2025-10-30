import { useIntervalsStore } from '~/useIntervalsStore.js';

export const useWorkoutController = () => {
    const intervals = useIntervalsStore();
    const timer = useTimer();

    /**
     * Activate the next interval and set the timer to that interval's length.
     */
    const selectNext = () => {
        intervals.activateNextInterval();
        timer.setTime(intervals.activeInterval?.length ?? 0);
    }

    /**
     * Activate the next interval and start its timer.
     */
    const startNext = () => {
        selectNext();
        if (!intervals.activeInterval) return;
        timer.start();
    }

    /**
     * Reset everything; all intervals are set to unfinished and the timer is reset.
     */
    const resetWorkout = () => {
        intervals.resetIntervals();
        timer.reset();
    }

    // Auto-move to next interval when finished
    watch(timer.isFinished, (done) => {
        if (done) startNext();
    });

    return {
        ...timer, ...intervals, selectNext, startNext, resetWorkout,
    };
}