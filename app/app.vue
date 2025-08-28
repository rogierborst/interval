<script setup>
const intervals = [
    {
        type: 'walk',
        length:120,
    },
    {
        type: 'run',
        length: 60,
    },
]
</script>

<template>
    <div>
        <NuxtRouteAnnouncer />
        <BaseHeader>Interval</BaseHeader>
        <Counter :seconds="60" />
        <Interval v-for="(interval, index) in intervals" :key="index" :type="interval.type" :length="interval.length" />
    </div>
</template>
