<script setup lang="ts">
defineProps({
    intervals: {
        type: Array,
        required: true,
    }
});
</script>

<template>
<div class="flex flex-wrap justify-center">
    <Interval
        v-for="(interval, index) in intervals"
        :key="index"
        :type="interval.type"
        :length="interval.length"
        :class="interval.finished ? 'opacity-30' : 'opacity-100'"
    />
</div>
</template>
