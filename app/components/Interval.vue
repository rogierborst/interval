<script setup lang="ts">
import { formatTime } from '~/utils/time.js';

const props = defineProps({
    interval: {
        type: Object,
        required: true,
    }
});

const classes = computed(() => {
    return props.interval.type === 'walk'
        ? 'bg-lime-800 text-lime-200'
        : 'bg-rose-800 text-rose-200';
})
</script>

<template>
    <div
        class="text-3xl font-time px-3 py-2 rounded"
        :class="classes"
        v-text="formatTime(interval.length * 1000)"
    />
</template>
