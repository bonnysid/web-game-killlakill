import Hero from './mobs.js';
import headerShow from './header.js';

import {
    massiveOfBlocks,
    Map
} from './maps.js';

import arenaMatrix from './resources.js';


window.addEventListener('DOMContentLoaded', () => {
    headerShow();

    const canvasBody = document.querySelector('.content');
    const canvas = canvasBody.querySelector('#gameBG');
    const canvasAnim = canvasBody.querySelector('#gameAnim');
    const ctx = canvas.getContext('2d');
    const ctxAnim = canvasAnim.getContext('2d');
    const btnPlay = document.querySelector('.header__btn--play');
    const blockStart = document.querySelector('.game__play');
    const nickname = document.querySelector('.header__input');
    const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
    let setting = 'go';

    canvas.width = canvasBody.clientWidth - (canvasBody.clientWidth % 32);
    canvas.height = canvasBody.clientHeight - (canvasBody.clientHeight % 32);
    canvasAnim.width = canvasBody.clientWidth - (canvasBody.clientWidth % 32);
    canvasAnim.height = canvasBody.clientHeight - (canvasBody.clientHeight % 32);

    const arena = new Map(
        arenaMatrix,
        'img/blocks/AllBlocks.png',
        'img/bg/bg2.png',
        'img/bg/bgClose.png',
        canvas,
        ctx
    );

    const mainHero = new Hero(
        4,
        5,
        'img/people/SpritesPeople2.png',
        ctxAnim
    );

    btnPlay.addEventListener('click', (e) => {
        e.preventDefault();
        if (nickname.value) {
            blockStart.style.display = 'none';
            anim();
            window.addEventListener('keydown', (e) => {
                e.preventDefault();
                if (e.keyCode === 68) {
                    mainHero.move('right');
                    setting = 'stop';
                } else if (e.keyCode === 65) {
                    mainHero.move('left');
                    setting = 'stop';
                } else {
                    setting = 'go';
                    anim();
                }
            });
            window.addEventListener('keyup', (e) => {
                e.preventDefault();
                setting = 'go';
                anim();
            });
        }
    });

    arena.render();
    mainHero.stay();

    function anim() {
        if (setting != 'stop') {
            setTimeout(() => {
                mainHero.stay();
                requestAnimationFrame(anim);
            }, 150);
        }
    }

    //stay 150 ms
    //move 200 ms

});