<script setup>
import { useIntervalsStore } from '~/useIntervalsStore.js';
import IntervalsList from '~/components/IntervalsList.vue';

const intervalsStore = useIntervalsStore();
const { upcomingIntervals, finishedIntervals } = storeToRefs(intervalsStore);

const workout = useWorkoutController();
useCountdownAudio(workout);

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
        <IntervalsList :intervals="upcomingIntervals" />

        <h2 v-if="finishedIntervals.length" class="p-3 font-bold text-xl">Done</h2>
        <IntervalsList :intervals="finishedIntervals" />
    </div>
</template>
