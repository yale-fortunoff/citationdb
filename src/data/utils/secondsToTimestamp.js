export default function secondsToTimestamp(seconds){
    // return `SECONDS: ${seconds}`

    const h = Math.floor(seconds / (60 * 60));

    let remaining = seconds - (h * 60 * 60);

    const m = Math.floor(remaining / 60);

    remaining = remaining - (60 * m)

    const s = Math.floor(remaining)

    const seg = x => String(x).padStart(2, '0')

    return `${seg(h)}:${seg(m)}:${seg(s)}`

}