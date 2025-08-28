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
<div class="flex gap-1 bg-slate-300">
    <div>{{ formatTime(length * 1000)}}</div>
    <div v-text="type" />
</div>
</template>
