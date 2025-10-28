export const useCountdownAudio = (timer) => {
    const remainingSeconds = computed(() => Math.floor(timer.remaining.value / 1000));
    let lastSecond = -1;

    watch(remainingSeconds, (seconds) => {
        if (!timer.isRunning.value) return;

        if (seconds !== lastSecond && seconds >= 0 && seconds <= 5) {
            const audio = new Audio(`/audio/Laura/${seconds}.wav`);
            audio.play().catch(err => console.warn('Could not play audio:', err));
            lastSecond = seconds;
        }
    });

    watch(timer.isRunning, (running) => {
        if (running) lastSecond = -1;
    });
}