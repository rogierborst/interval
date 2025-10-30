import { defineStore } from 'pinia';
import defaultIntervals from '~/config/defaultIntervals';

export const useIntervalsStore = defineStore('intervals', () => {
    const activeIntervalIndex = ref(-1);
    const intervals = ref(defaultIntervals);

    const intervalsWithState = computed(() =>
        intervals.value.map((interval, index) => ({
            ...interval,
            isActive: index === activeIntervalIndex.value,
            isFinished: index < activeIntervalIndex.value,
        }))
    );

    const activeInterval = computed(() => intervals.value[activeIntervalIndex.value]);

    const activateNextInterval = () => {
        activeIntervalIndex.value++;
    }

    const resetIntervals = () => {
        activeIntervalIndex.value = 0;
    }

    return {
        activeInterval,
        activateNextInterval,
        intervals: intervalsWithState,
        resetIntervals,
    };
});
