import {
    getResources,
    postData
} from './serverCommand.js';

export function headerShow() {
    const header = document.createElement('header');

    header.classList.add('header');

    header.innerHTML = `            
    <div class="container">
        <div class="header__block">
            <div class="header__btn--play">Play</div>
            <a href="index.html" class="header__btn--exit">Exit</a>
            <input class="header__input" type="text" placeholder="Nickname">
        </div>
        <div class="header__logo"><a href="index.html"><img src="img/logo/logo.png" alt="logo"></a></div>
        <div class="header__block">
            <div class="header__btn"><a href="controls.html">Controls</a></div>
            <div class="header__btn"><a href="rating.html">Leaderboards</a></div>
        </div>
    </div>
    `;

    document.querySelector('.wrapper').prepend(header);
}

window.addEventListener('DOMContentLoaded', () => {
    headerShow();

    const btnPlay = document.querySelector('.header__btn--play');
    const headerBtnExit = document.querySelector('.header__btn--exit');
    const nickname = document.querySelector('.header__input');
    const firstCheck = document.querySelector('.controls');
    const secondCheck = document.querySelector('.rating');
    const btnBack = document.createElement('a');

    btnBack.href = 'index.html';
    btnBack.classList.add('header__btn--play');
    btnBack.innerText = 'back';

    function disableInput() {
        nickname.classList.add('header__input--disabled');
        nickname.disabled = true;
    }

    function enableInput() {
        nickname.classList.remove('header__input--disabled');
        nickname.disabled = false;
    }

    function exit() {
        postData('http://localhost:3000/loginnedPlayer', JSON.stringify(new Object));
        enableInput();
        event.target.style.display = 'none';
    }

    function check() {
        return firstCheck || secondCheck;
    }

    if (check()) {
        btnPlay.parentElement.prepend(btnBack);
        btnPlay.style.display = 'none';
    }

    getResources('http://localhost:3000/loginnedPlayer')
        .then(data => {
            if (Object.entries(data).length) {
                if (nickname.value.slice(0, 6) != 'Hello,') {
                    nickname.value = `Hello, ${data.nickname}`;
                } else {
                    nickname.value = data.nickname;
                }
                headerBtnExit.style.display = 'flex';
                disableInput();
            } else {
                if (check() && !nickname.value) {
                    btnPlay.innerText = 'back';
                    nickname.placeholder = '';
                    disableInput();
                }
            }
        });

    headerBtnExit.addEventListener('click', exit);


});