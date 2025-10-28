<script setup lang="ts">
import { formatTime } from '~/utils/time.js';

defineProps({
    length: {
        type: Number,
        default: 60,
    },
    type: {
        type: String,
        default: 'walk',
    }
});
</script>

<template>
<div class="flex gap-3 bg-stone-300">
    <div class="text-3xl font-time" v-text="formatTime(length * 1000)" />
    <div v-text="type" />
</div>
</template>
