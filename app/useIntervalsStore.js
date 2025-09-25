import { defineStore } from 'pinia';

export const useIntervalsStore = defineStore('intervals', () => {
    const intervals = ref([
        {
            type: 'walk',
            length: 90,
        },
        {
            type: 'run',
            length: 180,
        },
    ]);

    const activeInterval = ref(null);

    const finishedIntervals = ref([]);

    const hasActiveInterval = computed(() => {
        return activeInterval.value !== null;
    });

    const activateInterval = () => {
        if (activeInterval.value) {
            finishedIntervals.value.push(activeInterval.value);
        }
        activeInterval.value = intervals.value.shift();
    }

    return { intervals, activeInterval, finishedIntervals, activateInterval, hasActiveInterval };
});
