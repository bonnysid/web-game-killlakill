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

function getZero(num) {
    return num < 10 ? `0${num}` : num;
}

export default function timer(startDate, person, animation, timer) {
    const timeInterval = setInterval(update, 1000);
    const minutesBlock = timer.querySelector('.timer__minutes');
    const secondsBlock = timer.querySelector('.timer__seconds');
    let oldSeconds;
    let oldMinutes;
    let fixedSeconds = 0;
    let fixedMinutes = 0;
    update();

    function update() {
        if (person.isDead) {
            timer.style.display = 'none';
            clearInterval(timeInterval);
        }
        if (animation.isPause) {
            minutesBlock.innerHTML = getZero(oldMinutes);
            secondsBlock.innerHTML = getZero(oldSeconds);
            fixedMinutes = oldMinutes;
            fixedSeconds = oldSeconds;
            startDate = new Date();
        } else {
            minutesBlock.innerHTML = getZero(getTime(startDate).minutes + fixedMinutes);
            secondsBlock.innerHTML = getZero(getTime(startDate).seconds + fixedSeconds);

            oldSeconds = +secondsBlock.innerText;
            oldMinutes = +minutesBlock.innerText;
            person.timeAlive = `${minutesBlock.innerText}:${secondsBlock.innerText}`;
        }

    }
}