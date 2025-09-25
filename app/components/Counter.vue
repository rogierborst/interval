<script setup lang="ts">
import { useIntervalsStore } from '~/useIntervalsStore';
const intervalsStore = useIntervalsStore();
const { activeInterval } = storeToRefs(intervalsStore);

const {
    formattedTime, startTimer, pauseTimer, resetTimer, setTime, isRunning
} = useTimer();

const toggleTimer = () => {
    if (isRunning.value) {
        pauseTimer();
    } else {
        startTimer();
    }
}

onMounted(() => {
    console.log('mounted', activeInterval);
    setTime(activeInterval.value.length ?? 0);
});
</script>

<template>
    <div class="flex gap-2 items-center pb-4">
        <div class="text-3xl font-bold">{{ formattedTime }}</div>
        <BaseButton @click="toggleTimer">{{ isRunning ? 'Pauze' : 'Start' }}</BaseButton>
        <BaseButton @click="resetTimer">Reset</BaseButton>
    </div>
</template>
