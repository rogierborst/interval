import { useIntervalsStore } from '~/useIntervalsStore.js';

export const useWorkoutController = () => {
    const intervalsStore = useIntervalsStore();
    const timer = useTimer();

    const intervals = computed(() =>
        intervalsStore.intervals.map((interval, index) => ({
            ...interval,
            isActive: index === intervalsStore.activeIntervalIndex,
            isFinished: index < intervalsStore.activeIntervalIndex,
            timeRemaining: index === intervalsStore.activeIntervalIndex
                ? timer.remaining.value
                : interval.length * 1000
        }))
    );

    const activeInterval = computed(() => intervals.value[intervalsStore.activeIntervalIndex]);

    /**
     * Activate the next interval and set the timer to that interval's length.
     */
    const selectNext = () => {
        intervalsStore.activateNextInterval();
        timer.setTime(activeInterval.value?.length ?? 0);
    }

    /**
     * Activate the next interval and start its timer.
     */
    const startNext = () => {
        selectNext();
        if (!activeInterval.value) return;
        timer.start();
    }

    /**
     * Reset everything; all intervals are set to unfinished and the timer is reset.
     */
    const resetWorkout = () => {
        intervalsStore.resetIntervals();
        timer.reset();
    }

    // Auto-move to next interval when finished
    watch(timer.isFinished, (done) => {
        if (done) startNext();
    });

    return { ...timer, intervals, activeInterval, selectNext, startNext, resetWorkout };
}