import { defineStore } from 'pinia';

export const useIntervalsStore = defineStore('intervals', () => {
    const intervals = ref([
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
    ]);

    const activeInterval = ref(null);

    const finishedIntervals = ref([]);

    const hasActiveInterval = computed(() => {
        return activeInterval.value !== null;
    });

    const nextInterval = () => {
        if (activeInterval.value) {
            finishedIntervals.value.push(activeInterval.value);
        }

        activeInterval.value = intervals.value.shift();
    }

    return { intervals, activeInterval, finishedIntervals, nextInterval, hasActiveInterval };
});
