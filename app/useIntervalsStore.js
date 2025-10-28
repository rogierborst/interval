import { defineStore } from 'pinia';
import defaultIntervals from '~/config/defaultIntervals';

export const useIntervalsStore = defineStore('intervals', () => {
    const activeInterval = ref(null);
    const upcomingIntervals = ref(defaultIntervals.map(interval => ({ ...interval })));
    const finishedIntervals = ref([]);

    const activateNextInterval = () => {
        if (activeInterval.value) {
            finishedIntervals.value.push(activeInterval.value);
        }

        activeInterval.value = upcomingIntervals.value.shift() ?? null;
    }

    const resetIntervals = () => {
        upcomingIntervals.value = defaultIntervals.map(interval => ({ ...interval }));
        finishedIntervals.value = [];
        activeInterval.value = null;
        activateNextInterval();
    }

    return {
        activeInterval,
        upcomingIntervals,
        finishedIntervals,
        activateNextInterval,
        resetIntervals,
    };
});
