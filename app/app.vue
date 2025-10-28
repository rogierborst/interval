<script setup>
import { useIntervalsStore } from '~/useIntervalsStore.js';

const intervalsStore = useIntervalsStore();
const { upcomingIntervals, finishedIntervals } = intervalsStore;

const workout = useWorkoutController();

const { formatted, isRunning } = workout;

onMounted(() => {
    workout.selectNext();
})

const toggleTimer = () => {
    if (isRunning.value) {
        workout.pause();
    } else {
        workout.start();
    }
}

useHead({ title: 'Interval 🏃🏼‍♂️' });
</script>

<template>
    <div class="bg-stone-800 min-h-dvh">
        <NuxtRouteAnnouncer />
        <BaseHeader @click="workout.resetWorkout">Interval</BaseHeader>

        <div class="px-4 py-2">
            <Counter :time="formatted" @toggle="toggleTimer" @reset="workout.reset" />
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
