<script setup lang="ts">
import { formatTime } from '~/utils/time.js';

const props = defineProps({
    length: {
        type: Number,
        default: 60
    },
    type: {
        type: String,
        default: 'walk'
    }
});

const background = computed(() => {
    return props.type === 'walk' ? 'bg-green-500/20' : 'bg-amber-500/20';
})
</script>

<template>
    <div class="text-3xl font-time" :class="background" v-text="formatTime(length * 1000)" />
</template>
