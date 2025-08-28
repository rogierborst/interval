import { formatTime } from '~/utils/time.js';

export const useTimer = () => {
    const remainingTime = ref(0);
    const initialTime = ref(0);
    const isRunning = ref(false);

    // Track timing for precision
    let startTimestamp = null;
    let pausedDuration = 0;
    let animationFrameId = null;

    const isPaused = computed(() => !isRunning.value && remainingTime.value > 0);
    const isFinished = computed(() => remainingTime.value <= 0);
    const currentSeconds = computed(() => Math.ceil(remainingTime.value / 1000));
    const formattedTime = computed(() => formatTime(currentSeconds.value));

    // High precision timer update function
    const updateTimer = (currentTimestamp) => {
        if (!isRunning.value) return;

        const elapsed = currentTimestamp - startTimestamp - pausedDuration;
        const newRemainingTime = initialTime.value - elapsed;

        if (newRemainingTime <= 0) {
            setTime(0);
            stopTimer();
            return;
        }

        remainingTime.value = newRemainingTime;
        animationFrameId = requestAnimationFrame(updateTimer);
    }

    const setTime = (seconds) => {
        // @todo: maybe we want to be able to set the time without stopping the timer.
        // If so, remove the next if clause.
        if (isRunning.value) {
            stopTimer();
        }

        const durationInMs = seconds * 1000;
        remainingTime.value = durationInMs;
        initialTime.value = durationInMs;
    }

    const startTimer = (durationInSeconds = null) => {
        if (durationInSeconds !== null) {
            console.log('starting timer with new duration', durationInSeconds);
            const durationInMs = durationInSeconds * 1000;
            setTime(durationInSeconds);
            initialTime.value = durationInMs;
            pausedDuration = 0;
        }

        if (isRunning.value || remainingTime.value <= 0) return;

        isRunning.value = true;
        startTimestamp = performance.now();
        animationFrameId = requestAnimationFrame(updateTimer);
    };

    const pauseTimer = () => {
        if (!isRunning.value) return;

        isRunning.value = false;

        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }

    const resumeTimer = () => {
        if (isRunning.value || remainingTime.value <= 0) return;

        isRunning.value = true;

        const pauseStartTime = startTimestamp + pausedDuration;
        const now = performance.now();
        pausedDuration += (now - pauseStartTime) - (initialTime.value - remainingTime.value);
        startTimestamp = now - (initialTime.value - remainingTime.value);

        animationFrameId = requestAnimationFrame(updateTimer);
    }

    const stopTimer = () => {
        isRunning.value = false;
        pausedDuration = 0;

        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }

    const resetTimer = () => {
        stopTimer();
        remainingTime.value = initialTime.value;
    }

    // Get precise remaining time in seconds (with decimals)
    const getPreciseRemainingSeconds = () => remainingTime.value / 1000;

    onUnmounted(() => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    });

    return {
        currentSeconds: readonly(currentSeconds),
        remainingTimeMs: readonly(remainingTime),
        initialTime: readonly(computed(() => initialTime.value / 1000)),
        isRunning: readonly(isRunning),
        isPaused: readonly(isPaused),
        isFinished: isFinished,
        formattedTime,

        startTimer,
        pauseTimer,
        resumeTimer,
        stopTimer,
        resetTimer,
        setTime,
        getPreciseRemainingSeconds,
    };
}