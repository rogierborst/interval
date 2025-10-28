<script setup>

import { useIntervalsStore } from '~/useIntervalsStore.js';

const intervalsStore = useIntervalsStore();
const {
    upcomingIntervals,
    finishedIntervals,
    hasActiveInterval
} = storeToRefs(intervalsStore);
const { nextInterval, resetIntervals } = intervalsStore;

onMounted(async () => nextInterval());

useHead({ title: 'Interval 🏃🏼‍♂️' });
</script>

<template>
    <div class="bg-stone-800 min-h-dvh">
        <NuxtRouteAnnouncer />
        <BaseHeader @click="resetIntervals">Interval</BaseHeader>

        <div class="px-4 py-2">
            <Counter v-if="hasActiveInterval" @finished="nextInterval" />
        </div>

        <h2 v-if="upcomingIntervals.length" class="p-3 font-bold text-xl">To Do</h2>
        <div class="grid grid-cols-2 gap-2">
            <Interval
                v-for="(interval, index) in upcomingIntervals"
                :key="index"
                :type="interval.type"
                :length="interval.length"
                class="px-4"
            />
        </div>

        <h2 v-if="finishedIntervals.length" class="p-3 font-bold text-xl">Done</h2>
        <div class="grid grid-cols-2 gap-2">
            <Interval
                v-for="(interval, index) in finishedIntervals"
                :key="index"
                :type="interval.type"
                :length="interval.length"
                class="px-4 opacity-70"
            />
        </div>
    </div>
</template>
