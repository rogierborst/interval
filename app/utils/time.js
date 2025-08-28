export function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function parseTime(timeString) {
    const [mins, secs] = timeString.split(':').map(Number);
    return (mins * 60) + secs;
}
