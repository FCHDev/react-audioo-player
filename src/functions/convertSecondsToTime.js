export default function convertSecondstoTime(totalSeconds) {
    const dateObj = new Date(totalSeconds * 1000);
    const minutes = dateObj.getUTCMinutes();
    const seconds = dateObj.getSeconds();

    return minutes.toString().padStart(2, '0')
        + ':' + seconds.toString().padStart(2, '0');
}