<script setup>
import { useIntervalsStore } from '~/useIntervalsStore';
const intervalsStore = useIntervalsStore();
const { activeInterval } = storeToRefs(intervalsStore);

const {
    formattedTime, startTimer, pauseTimer, resetTimer, setTime, isRunning, isFinished,
} = useTimer();
const emit = defineEmits(['finished']);

const clickCounter = ref(0);
let clickTimer;

const toggleTimer = () => {
    if (isRunning.value) {
        pauseTimer();
    } else {
        startTimer();
    }
}

onMounted(() => {
    setTime(activeInterval.value.length ?? 0);
});

watch(() => activeInterval.value, (newInterval) => {
    setTime(newInterval.length ?? 0);
    startTimer();
});
watch(() => isFinished.value, (finished) => {
    if (!finished) return;

    emit('finished');
});

const color = computed(() => {
    return activeInterval.value.type === 'walk' ? 'text-green-600' : 'text-amber-600';
});

const handleClick = () => {
    clickCounter.value++;

    if (clickCounter.value === 1) {
        // Toggle timer after first click
        toggleTimer();

        clickTimer = setTimeout(() => {
            clickCounter.value = 0;
        }, 250);
    } else {
        // If dbl click is detected, reset the timer
        clearTimeout(clickTimer);
        clickCounter.value = 0;
        resetTimer();
    }
}
</script>

<template>
    <div
        class="bg-stone-900 border border-stone-950 rounded-md p-3 text-center"
        @click="handleClick"
    >
        <div class="text-6xl font-bold font-time" :class="color" v-text="formattedTime" />
    </div>
</template>
