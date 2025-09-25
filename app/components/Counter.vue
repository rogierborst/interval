<script setup>
import { useIntervalsStore } from '~/useIntervalsStore';
const intervalsStore = useIntervalsStore();
const { activeInterval } = storeToRefs(intervalsStore);

const {
    formattedTime, startTimer, pauseTimer, resetTimer, setTime, isRunning, isFinished,
} = useTimer();
const emit = defineEmits(['finished']);


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
})
watch(() => isFinished.value, (finished) => {
    if (!finished) return;

    emit('finished');
});
</script>

<template>
    <div class="flex gap-2 items-center pb-4">
        <div class="text-3xl font-bold">{{ formattedTime }}</div>
        <BaseButton @click="toggleTimer">{{ isRunning ? 'Pauze' : 'Start' }}</BaseButton>
        <BaseButton @click="resetTimer">Reset</BaseButton>
    </div>
</template>
