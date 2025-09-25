<script setup>

import { useIntervalsStore } from '~/useIntervalsStore.js';

const intervalsStore = useIntervalsStore();
const {
    intervals,
    finishedIntervals,
    hasActiveInterval
} = storeToRefs(intervalsStore);

const { activateInterval } = useIntervalsStore();

useHead({ title: 'Interval 🏃🏼‍♂️' });
</script>

<template>
    <div>
        <NuxtRouteAnnouncer />
        <BaseHeader>Interval</BaseHeader>

        <h2 class="font-bold text-xl">To Do</h2>
        <Interval
            v-for="(interval, index) in intervals"
            :key="index"
            :type="interval.type"
            :length="interval.length"
            class="px-4"
        />

        <div class="px-4 py-2">
            <Counter v-if="hasActiveInterval" @finished="activateInterval" />
            <BaseButton v-else @click="activateInterval">Volgende</BaseButton>
        </div>

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
