export const useCountdownAudio = (timer) => {
    if (process.server) return;

    const audioFiles = {};

    for (let i = 0; i <= 5; i++) {
        audioFiles[i] = new Audio(`/audio/Laura/${i}.wav`);
        audioFiles[i].preload = 'auto';
    }

    const remainingSeconds = computed(() => Math.floor(timer.remaining.value / 1000));
    let lastSecond = -1;

    watch(remainingSeconds, (seconds) => {
        if (!timer.isRunning.value) return;

        if (seconds !== lastSecond && seconds >= 0 && seconds <= 5) {
            // Reset audio to start in case it's still playing from before
            audioFiles[seconds].currentTime = 0;
            audioFiles[seconds].play().catch(err => console.warn('Could not play audio:', err));
            lastSecond = seconds;
        }
    });

    watch(timer.isRunning, (running) => {
        if (running) lastSecond = -1;
    });
}
