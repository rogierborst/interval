import { defineStore } from 'pinia';
import defaultIntervals from '~/config/defaultIntervals';

export const useIntervalsStore = defineStore('intervals', () => {
    const activeIntervalIndex = ref(-1);
    const intervals = ref(defaultIntervals);

    const activateNextInterval = () => activeIntervalIndex.value++;
    const resetIntervals = () => activeIntervalIndex.value = 0;

    return {
        activateNextInterval,
        intervals,
        activeIntervalIndex,
        resetIntervals,
    };
});
