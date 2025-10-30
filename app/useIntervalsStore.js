import { defineStore } from 'pinia';
import defaultIntervals from '~/config/defaultIntervals';

export const useIntervalsStore = defineStore('intervals', () => {
    const activeIntervalIndex = ref(-1);
    const intervals = ref([]);

    const initIntervals = () => {
        intervals.value = defaultIntervals.map((interval) => {
            return {
                ...interval,
                finished: false,
            };
        });
    };

    initIntervals();

    const activeInterval = computed(() => intervals.value[activeIntervalIndex.value]);
    const upcomingIntervals = computed(() => intervals.value.filter((interval) => !interval.finished));
    const finishedIntervals = computed(() => intervals.value.filter((interval) => interval.finished));

    const activateNextInterval = () => {
        if (activeInterval.value) {
            activeInterval.value.finished = true;
        }

        activeIntervalIndex.value++;
    }

    const resetIntervals = () => {
        initIntervals();
        activeIntervalIndex.value = 0;
    }

    return {
        activeInterval,
        activateNextInterval,
        finishedIntervals,
        intervals,
        resetIntervals,
        upcomingIntervals,
    };
});
