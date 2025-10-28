<script setup>

import { useIntervalsStore } from '~/useIntervalsStore.js';

const intervalsStore = useIntervalsStore();
const {
    intervals,
    finishedIntervals,
    hasActiveInterval
} = storeToRefs(intervalsStore);
const { nextInterval } = intervalsStore;

onMounted(async () => nextInterval());

useHead({ title: 'Interval 🏃🏼‍♂️' });
</script>

<template>
    <div class="bg-stone-800 min-h-dvh">
        <NuxtRouteAnnouncer />
        <BaseHeader>Interval</BaseHeader>

        <div class="px-4 py-2">
            <Counter v-if="hasActiveInterval" @finished="nextInterval" />
            <BaseButton v-else @click="nextInterval">Volgende</BaseButton>
        </div>

        <h2 class="font-bold text-xl">To Do</h2>
        <Interval
            v-for="(interval, index) in intervals"
            :key="index"
            :type="interval.type"
            :length="interval.length"
            class="px-4"
        />

        <h2 class="font-bold text-xl">Done</h2>
        <Interval
            v-for="(interval, index) in finishedIntervals"
            :key="index"
            :type="interval.type"
            :length="interval.length"
            class="px-4"
        />
    </div>
</template>
