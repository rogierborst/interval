export function formatTime(ms, withMilliseconds = false) {
    const totalSeconds = Math.floor(ms / 1000);
    const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');

    let formattedTime = `${mins}:${secs}`;

    if (withMilliseconds) {
        const millis = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
        formattedTime += `.${millis}`;
    }

    return formattedTime;
}

export function parseTime(timeString) {
    const [mins, secs] = timeString.split(':').map(Number);
    return (mins * 60) + secs;
}
