import headerShow from './header.js';
import {
    Hero,
    Enemy,
    AnimationGame,
    bullets
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
    objects
} from './resources.js';
import {
    pressedKeys,
    activateControls
} from './controls.js';

window.addEventListener('DOMContentLoaded', () => {
    let loading = 0;
    //Header render
    headerShow();

    //Get all need objects
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

    //Setting canvas
    canvas.width = canvasBody.clientWidth;
    canvas.height = canvasBody.clientHeight - (canvasBody.clientHeight % 32);
    canvasAnim.width = canvasBody.clientWidth;
    canvasAnim.height = canvasBody.clientHeight - (canvasBody.clientHeight % 32);

    //Creates new Map
    const arena = new Map(
        arenaMatrix,
        blocks,
        background,
        backgroundClose,
        canvas,
        ctx
    );

    //Creates player
    let mainHero;
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
        // objects.push(bullets);
    };
    const animation = new AnimationGame(objects, canvasAnim, ctxAnim);

    function anim() {
        animation.draw();
        animation.update();
        bullets.forEach((bullet, i) => {
            bullet.draw();
            bullet.update();
            if (bullet.isOut) {
                bullets.splice(i, 1);
            }
        });
        requestAnimationFrame(anim);
    }

    btnPlay.addEventListener('click', (e) => {
        e.preventDefault();
        if (nickname.value && loading === 1) {
            blockStart.style.display = 'none';
            activateControls(mainHero);
            anim();
        }
    });
    //Render New Map
    arena.render();
});