<script setup>
const workout = useWorkoutController();
useCountdownAudio(workout);

const { formatted, isRunning, intervals, activeInterval } = workout;

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

useHead({
    title: 'Interval 🏃🏼‍♂️',
    link: [
        {rel: 'manifest', href: '/manifest.webmanifest' }
    ]
});
</script>

<template>
    <div class="bg-stone-800 min-h-dvh">
        <NuxtRouteAnnouncer />
        <BaseHeader @click="workout.resetWorkout">Interval</BaseHeader>

        <div class="p-4">
            <Counter
                :time="formatted"
                :color="activeInterval?.type === 'walk' ? 'text-lime-300' : 'text-rose-300'"
                @toggle="toggleTimer"
                @reset="workout.reset"
            />
        </div>

        <IntervalsList :intervals class="p-4" />
    </div>
</template>
