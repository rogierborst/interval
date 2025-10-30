<script setup>
import { useIntervalsStore } from '~/useIntervalsStore.js';
import IntervalsList from '~/components/IntervalsList.vue';

const intervalsStore = useIntervalsStore();
const { intervals } = storeToRefs(intervalsStore);

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

        <div class="p-4">
            <Counter :time="formatted" @toggle="toggleTimer" @reset="workout.reset" />
        </div>

        <IntervalsList :intervals />
    </div>
</template>
