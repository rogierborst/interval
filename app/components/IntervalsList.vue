<script setup lang="ts">
defineProps({
    intervals: {
        type: Array,
        required: true,
    }
});
</script>

<template>
<div class="grid grid-cols-8">
    <Interval
        v-for="(interval, index) in intervals"
        :key="index"
        :type="interval.type"
        :length="interval.length"
    />
</div>
</template>
