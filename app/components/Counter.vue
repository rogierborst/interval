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

const color = computed(() => {
    return activeInterval.value.type === 'walk' ? 'text-green-600' : 'text-amber-600';
})
</script>

<template>
    <div class="bg-stone-900 border border-stone-950 rounded-md p-3">
        <div class="text-6xl font-bold mb-4 font-time" :class="color" v-text="formattedTime" />

        <div class="flex justify-between">
            <BaseButton @click="toggleTimer">{{ isRunning ? 'Pauze' : 'Start' }}</BaseButton>
            <BaseButton @click="resetTimer">Reset</BaseButton>
        </div>
    </div>
</template>
