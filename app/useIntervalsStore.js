import { defineStore } from 'pinia';

const intervals = [
    {
        type: 'walk',
        length: 3,
    },
    {
        type: 'run',
        length: 6,
    },
    {
        type: 'walk',
        length: 3,
    },
    {
        type: 'run',
        length: 6,
    },
];

export const useIntervalsStore = defineStore('intervals', () => {
    const activeInterval = ref(null);

    const upcomingIntervals = ref(intervals.map(interval => ({ ...interval })));
    const finishedIntervals = ref([]);

    const hasActiveInterval = computed(() => {
        return activeInterval.value !== null;
    });

    const nextInterval = () => {
        if (activeInterval.value) {
            finishedIntervals.value.push(activeInterval.value);
        }

        activeInterval.value = upcomingIntervals.value.shift();
    }

    const resetIntervals = () => {
        upcomingIntervals.value = intervals.map(interval => ({ ...interval }));
        finishedIntervals.value = [];
        activeInterval.value = null;
        nextInterval();
    }

    return {
        activeInterval,
        upcomingIntervals,
        finishedIntervals,
        nextInterval,
        resetIntervals,
        hasActiveInterval
    };
});
