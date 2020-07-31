function getTime(startDate, oldMS = 0) {
    const ms = Date.parse(new Date()) - Date.parse(startDate) + oldMS,
        seconds = Math.floor((ms / 1000) % 60),
        minutes = Math.floor((ms / (1000 * 60)) % 60),
        hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
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
    let fixedMS = 0;
    update();

    function update() {
        let time = getTime(startDate, fixedMS);
        if (person.isDead) {
            timer.style.display = 'none';
            clearInterval(timeInterval);
        }
        if (animation.isPause) {
            minutesBlock.innerHTML = getZero(oldMinutes);
            secondsBlock.innerHTML = getZero(oldSeconds);
            fixedMinutes = oldMinutes;
            fixedSeconds = oldSeconds;
            fixedMS = ((fixedMinutes === 0 ? 0 : fixedMinutes * 60) + (fixedSeconds === 0 ? 0 : fixedSeconds)) * 1000;
            startDate = new Date();
            time = getTime(startDate, fixedMS);
        } else {
            minutesBlock.innerHTML = getZero(time.minutes);
            secondsBlock.innerHTML = getZero(time.seconds);

            oldSeconds = +secondsBlock.innerText;
            oldMinutes = +minutesBlock.innerText;
            person.timeAlive = `${minutesBlock.innerText}:${secondsBlock.innerText}`;
        }

    }
}