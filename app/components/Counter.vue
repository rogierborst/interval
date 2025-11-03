<script setup>
const emit = defineEmits(['toggle', 'reset']);

defineProps({
    time: { type: String, default: 'o jee' },
    color: { type: String, default: 'text-white' },
});

let clickCount = 0;
let clickTimer;

/**
 * Manually handle single and double clicks.
 * 'toggle' will be emitted immediately after the first click.
 * If a second click occurs within 250 ms, 'reset' will be emitted afterward.
 * This allows single clicks to remain snappy.
 */
const handleClick = () => {
    clickCount++;

    if (clickCount === 1) {
        emit('toggle');

        clickTimer = setTimeout(() => {
            clickCount = 0;
        }, 250);
    } else {
        // If dbl click is detected, reset the timer
        clearTimeout(clickTimer);
        emit('reset');
        clickCount = 0;
    }
}
</script>

<template>
    <div class="counter-window" @click="handleClick">
        <div class="counter-text" :class="color" v-text="time" />
    </div>
</template>

<style scoped>
.counter-window {
    @apply bg-stone-900 border border-stone-950;
    @apply rounded-md;
    @apply px-3 py-6 text-center;
    @apply cursor-pointer;
}

.counter-text {
    @apply text-6xl font-bold font-time;
    text-shadow: 0 0 20px rgba(255 255 255 / 0.8);
}
</style>
