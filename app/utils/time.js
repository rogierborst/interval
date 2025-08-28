export function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000)
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    const millis = Math.floor((ms % 1000) / 10) // hundredths of a second

    return `${mins.toString().padStart(2, '0')}:` +
        `${secs.toString().padStart(2, '0')}.` +
        `${millis.toString().padStart(2, '0')}`
}

export function parseTime(timeString) {
    const [mins, secs] = timeString.split(':').map(Number);
    return (mins * 60) + secs;
}
