<script setup lang="ts">
import { formatTime } from '~/utils/time.js';

const props = defineProps({
    interval: {
        type: Object,
        required: true,
    }
});

const background = computed(() => [
    { 'bg-lime-800' : props.interval.type === 'walk' },
    { 'bg-rose-800' : props.interval.type === 'run' },
    { 'ring-4 ring-white' : props.interval.isActive },
])

const text = computed(() => [
    { 'text-lime-200' : props.interval.type === 'walk' },
    { 'text-rose-200' : props.interval.type === 'run' },
]);

const nowIndicator = computed(() => {
    if (!props.interval.isActive) return '';
    const remainingInSeconds = props.interval.timeRemaining / 1000;
    const percentDone = (1 - remainingInSeconds / props.interval.length) * 100;

    return `left: ${percentDone}%`;
})
</script>

<template>
    <div class="relative rounded" :class="background">
        <div
            v-if="interval.isActive"
            class="indicator"
            :style="nowIndicator"
        />
        <div
            class="time"
            :class="text"
            v-text="formatTime(interval.timeRemaining)"
        />
    </div>

</template>

<style scoped>
.indicator {
    @apply absolute top-0 h-full w-1;
    @apply bg-white/40;
}

.time {
    @apply relative z-10;
    @apply px-3 py-2;
    @apply text-3xl font-time;
    @apply rounded;
    text-shadow: 0 2px 0 black;
}
</style>
