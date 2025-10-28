import { useIntervalsStore } from '~/useIntervalsStore.js';

export const useWorkoutController = () => {
    const intervals = useIntervalsStore();
    const timer = useTimer();

    const selectNext = () => {
        intervals.activateNextInterval();
        timer.setTime(intervals.activeInterval?.length ?? 0);
    }

    const startNext = () => {
        selectNext();
        if (!intervals.activeInterval) return;
        timer.start();
    }

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