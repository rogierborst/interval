import { formatTime } from '~/utils/time.js';

export const useTimer = () => {
    const remaining = ref(0);
    const initial = ref(0);
    const isRunning = ref(false);
    let startTime = null;
    let frameId = null;

    const isFinished = computed(() => remaining.value <= 0);
    const formatted = computed(() => formatTime(remaining.value));

    const setTime = (seconds) => {
        const ms = seconds * 1000;
        remaining.value = ms;
        initial.value = ms;
        startTime = null;
    };

    const update = (now) => {
        if (!isRunning.value) return;
        const elapsed = now - startTime;
        remaining.value = Math.max(initial.value - elapsed, 0);
        if (remaining.value > 0) frameId = requestAnimationFrame(update);
    };

    const start = () => {
        if (remaining.value <= 0) return;
        isRunning.value = true;
        startTime = performance.now() - (initial.value - remaining.value);
        frameId = requestAnimationFrame(update);
    };

    const pause = () => {
        isRunning.value = false;
        cancelAnimationFrame(frameId);
    };

    const reset = () => {
        pause();
        remaining.value = initial.value;
    };

    onUnmounted(() => cancelAnimationFrame(frameId));

    return { isRunning, isFinished, formatted, remaining, setTime, start, pause, reset };
};
