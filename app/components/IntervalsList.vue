<script setup lang="ts">
defineProps({
    intervals: {
        type: Array,
        required: true,
    }
});
</script>

<template>
<div class="flex flex-wrap gap-1 justify-center">
    <Interval
        v-for="(interval, index) in intervals"
        :key="index"
        :interval
        :class="interval.isFinished ? 'opacity-30' : 'opacity-100'"
    />
</div>
</template>
