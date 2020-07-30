function getTime(startDate) {
    const ms = Date.parse(new Date()) - Date.parse(startDate),
        seconds = Math.floor(ms / 1000),
        minutes = Math.floor(ms / (1000 * 60)),
        hours = Math.floor(ms / (1000 * 60 * 60));
    return {
        'ms': ms,
        'seconds': seconds,
        'minutes': minutes,
        'hours': hours
    };
}

export default function timer(startDate, person, animation) {
    const timeInterval = setInterval(update, 1000);

    update();

    function update() {
        const sec = getTime(startDate).seconds;
        if (person.isDead || animation.isPause) {
            clearInterval(timeInterval);
        }
        person.timeAlive = sec;
    }
}