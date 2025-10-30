<script setup lang="ts">
import { formatTime } from '~/utils/time.js';

const props = defineProps({
    interval: {
        type: Object,
        required: true,
    }
});

const classes = computed(() => [
    { 'bg-lime-800 text-lime-200' : props.interval.type === 'walk' },
    { 'bg-rose-800 text-rose-200' : props.interval.type === 'run' },
    { 'ring-4 ring-white' : props.interval.isActive }
]);
</script>

<template>
    <div
        class="text-3xl font-time px-3 py-2 rounded"
        :class="classes"
        v-text="formatTime(interval.length * 1000)"
    />
</template>
