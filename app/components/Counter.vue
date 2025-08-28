<script setup lang="ts">
const props = defineProps({
    seconds: {
        type: Number,
        required: true
    }
});
const {
    formattedTime, startTimer, pauseTimer, resumeTimer, resetTimer, setTime, isRunning
} = useTimer();

const toggleTimer = () => {
    if (isRunning.value) {
        pauseTimer();
    } else {
        console.log('start timing');
        startTimer();
    }
}

onMounted(() => setTime(props.seconds));
</script>

<template>
    <div class="flex gap-2 items-center">
        <div class="text-3xl font-bold">{{ formattedTime }}</div>
        <BaseButton @click="toggleTimer">{{ isRunning ? 'Pauze' : 'Start' }}</BaseButton>
    </div>
</template>
