import {
    headerShow
} from './header.js';
import timer from './timer.js';
import {
    getResources,
    postData
} from './serverCommand.js';
import {
    Hero,
    Waves,
    AnimationGame,
    renderBullets,
    enemies,
    ForeGround,
    bullets,
    HealthBar
} from './classes.js';
import {
    massiveOfBlocks,
    Map
} from './maps.js';
import {
    arenaMatrix,
    sprites,
    background,
    backgroundClose,
    blocks,
    objects,
    avatar
} from './resources.js';
import {
    pressedKeys,
    activateControls
} from './controls.js';

window.addEventListener('DOMContentLoaded', () => {
    // headerShow();
    let loading = 0;
    //Get all need objects
    const canvasBody = document.querySelector('.content');
    const canvas = canvasBody.querySelector('#game__bg');
    const ctx = canvas.getContext('2d');
    const canvasAnim = canvasBody.querySelector('#game__animation');
    const ctxAnim = canvasAnim.getContext('2d');
    const timerBody = canvasBody.querySelector('.timer');
    const minutesBlock = timerBody.querySelector('.timer__minutes');
    const secondsBlock = timerBody.querySelector('.timer__seconds');
    const blockDead = canvasBody.querySelector('.game__dead');
    const blockStat = blockDead.querySelector('.game__stat');
    const blockStart = canvasBody.querySelector('.game__play');
    const blockWaves = canvasBody.querySelector('.game__wave');
    const btnTryAgain = canvasBody.querySelector('#try__again');
    const btnExit = canvasBody.querySelector('#exit');
    const headerBtnExit = document.querySelector('.header__btn--exit');
    const btnPlay = document.querySelector('.header__btn--play');
    const nickname = document.querySelector('.header__input');
    const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
    let foreGround;
    let playerPlace = 1;
    let startDate = new Date();
    const updatedInf = document.createElement('div');
    updatedInf.style.cssText = `
    display: flex;
    flex-direction: column;
    `;

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
            }
        });

    //Setting canvas
    canvas.width = canvasBody.clientWidth;
    canvas.height = canvasBody.clientHeight - (canvasBody.clientHeight % 32);
    canvasAnim.width = canvasBody.clientWidth;
    canvasAnim.height = canvasBody.clientHeight - (canvasBody.clientHeight % 32);
    blockDead.style.display = 'none';
    blockWaves.style.left = `${canvas.width / 2 - window.getComputedStyle(blockWaves).width.slice(0, 3) / 2}px`;

    //Creates new Map
    const arena = new Map(
        arenaMatrix,
        blocks,
        background,
        backgroundClose,
        canvas,
        ctx
    );
    //drawFG New Map
    arena.drawFG();
    const fg = new Image();

    //Creates player and waves
    let mainHero;
    let waves;
    let healthBar;
    sprites.onload = () => {
        mainHero = new Hero(
            4,
            5,
            sprites,
            canvasAnim,
            ctxAnim
        );
        loading++;
        objects.push(mainHero);
        animation.person = mainHero;

        waves = new Waves(mainHero, 15, 5, 4, ctxAnim, canvasAnim, sprites, {
            type: 1,
            startCoef: 3
        }, {
            type: 3,
            startCoef: 0
        }, {
            type: 5,
            startCoef: -3
        });
        objects.push(waves);

        healthBar = new HealthBar(mainHero, avatar, ctxAnim, canvasAnim);
        objects.push(healthBar);
    };

    const animation = new AnimationGame(objects, 0, canvasAnim, ctxAnim);

    function anim() {
        animation.draw();
        animation.update(foreGround);
        renderBullets();
        if (mainHero.isDead) {
            postData('http://localhost:3000/leaderboard', JSON.stringify({
                playerName: nickname.value,
                time: mainHero.timeAlive,
                score: mainHero.score
            }));
            blockDead.style.display = 'flex';
            updatedInf.innerHTML = `
                <div class="game__title">You are dead</div>
                <div class="game__text">Score: ${mainHero.score}</div>
                <div class="game__text">Enemy kills: ${mainHero.kills}</div>
                <div class="game__text">Game time: ${mainHero.timeAlive}</div>
            `;
            // <div class="game__text">Place: ${playerPlace}</div> Need to add
            blockStat.insertAdjacentElement('afterbegin', updatedInf);
        } else {
            blockDead.style.display = 'none';
        }
        if (waves.spawnTime != 0 && !mainHero.isDead) {
            if (waves.numWave != +blockWaves.innerText.slice(0, blockWaves.innerText.length - 5)) {
                blockWaves.innerHTML = `${waves.numWave} Wave`;
                blockWaves.style.display = 'block';
            }
        } else {
            blockWaves.style.display = 'none';
        }
        if (!animation.isPause && !mainHero.isDead) {
            requestAnimationFrame(anim);
        }
    }

    function startGame() {
        event.preventDefault();

        if (nickname.value && loading === 1) {
            disableInput();
            event.target.style.display = 'none';
            postData('http://localhost:3000/loginnedPlayer', JSON.stringify({
                nickname: nickname.value
            }));
            startDate = new Date();
            blockStart.style.display = 'none';
            headerBtnExit.style.display = 'flex';
            activateControls(mainHero, animation, anim);
            fg.onload = () => {
                foreGround = new ForeGround(fg, canvasAnim, ctxAnim);
                objects.unshift(foreGround);
                anim();
            };
            fg.src = canvas.toDataURL();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            arena.drawBG();
            timerBody.style.display = 'flex';
            timer(startDate, mainHero, animation, timerBody);
        }
    }

    function endGame() {
        postData('http://localhost:3000/loginnedPlayer', JSON.stringify(new Object));
        enableInput();
        timerBody.style.display = 'none';
        event.target.style.display = 'none';
        reloadStats();
    }

    function disableInput() {
        nickname.classList.add('header__input--disabled');
        nickname.disabled = true;
    }

    function enableInput() {
        nickname.classList.remove('header__input--disabled');
        nickname.disabled = false;
    }

    function reloadStats() {
        mainHero.hp = 100;
        mainHero.score = 0;
        mainHero.kills = 0;
        mainHero.isDead = false;
        foreGround.posX = 0;
        waves.numWave = 1;
        waves.coef = 0;
        massiveOfBlocks.forEach(block => {
            block.posX = block.startPosX;
        });
        mainHero.posX = arena.startPos;
        bullets.splice(0, bullets.length);
        enemies.splice(0, enemies.length);
    }

    btnPlay.addEventListener('click', startGame);
    headerBtnExit.addEventListener('click', endGame);
    btnExit.addEventListener('click', endGame);
    // window.addEventListener('keyup', (e) => {
    //     if (e.keyCode === 13) startGame();
    // });

    btnTryAgain.addEventListener('click', (e) => {
        e.preventDefault();
        reloadStats();
        startDate = new Date();
        minutesBlock.innerHTML = '00';
        secondsBlock.innerHTML = '00';
        timerBody.style.display = 'flex';
        timer(startDate, mainHero, animation, timerBody);
        blockDead.style.display = 'none';
        anim();
    });
});