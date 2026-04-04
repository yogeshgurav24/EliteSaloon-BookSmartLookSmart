// "10:30" → minutes
const toMinutes = (time) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
};

// minutes → "HH:MM"
const toTime = (mins) => {
    const h = String(Math.floor(mins / 60)).padStart(2, "0");
    const m = String(mins % 60).padStart(2, "0");
    return `${h}:${m}`;
};

// generate slots based on duration
const generateSlots = (start, end, duration) => {
    let slots = [];

    let startMins = toMinutes(start);
    let endMins = toMinutes(end);

    while (startMins + duration <= endMins) {
        let slotStart = toTime(startMins);
        let slotEnd = toTime(startMins + duration);

        slots.push({ startTime: slotStart, endTime: slotEnd });

        startMins += duration;; // 15 min gap sliding window
    }

    return slots;
};

module.exports = {
    generateSlots,
    toMinutes,
    toTime
};