let pressedKeys = {
    'runRight': false,
    'runLeft': false,
    'jump': false,
    'shoot': false
};

const game = document.querySelector('.content.game');
const pauseBlock = document.createElement('div');
pauseBlock.classList.add('pause');
pauseBlock.innerText = 'Paused';
game.append(pauseBlock);
pauseBlock.style.display = 'none';

function activateControls(person, animation, startFunc) {
    function toggleKey(button, activation) {
        const code = button.keyCode;
        let action;

        switch (code) {
            case 39:
            case 68:
                action = 'runRight';
                break;
            case 37:
            case 65:
                action = 'runLeft';
                break;
            case 87:
            case 32:
            case 38:
                action = 'jump';
                break;
            case 72:
            case 90:
                action = 'shoot';
                break;
            case 27:
                action = 'pause';
                break;
            default:
                break;
        }

        if (pressedKeys[action] != activation) {
            pressedKeys[action] = activation;
        }
        if ((button.which === 65 || button.which === 37) && activation === true) {
            // if (pressedKeys['shoot'] === true) {
            //     person['ctx'].clearRect(person['shootPosX'], person['shootPosY'], 76, 48);
            // }
            pressedKeys['runRight'] = !activation;
        }
        if ((button.which === 68 || button.which === 39) && activation === true) {
            // if (pressedKeys['shoot'] === true) {
            //     person['ctx'].clearRect(person['shootPosX'], person['shootPosY'], 76, 48);
            // }
            pressedKeys['runLeft'] = !activation;
        }
    }

    function run(direction) {
        person.direction = direction;

        if (person.isStaying) {
            person.isStaying = false;
        }
        if (!person.isMoving) {
            person.isMoving = true;
        }
    }

    function stay() {
        if (person.isMoving) {
            person.isMoving = false;
        }
        if (!person.isStaying) {
            person.isStaying = true;
        }
    }

    function checkPressKey(callback, ...keys) {
        if (!pressedKeys[keys[0]] && !pressedKeys[keys[1]]) {
            callback();
        }
    }

    window.addEventListener('keydown', (e) => {
        toggleKey(e, true);
        for (let action in pressedKeys) {
            if (pressedKeys[action] === true) {
                switch (action) {
                    case 'runRight':
                        run(1);
                        break;
                    case 'runLeft':
                        run(-1);
                        break;
                    case 'jump':
                        person.isJumping = true;
                        break;
                    case 'shoot':
                        person.isShooting = true;
                        break;
                    case 'pause':
                        if (animation.isPause) {
                            pauseBlock.style.display = 'none';
                            animation.isPause = false;
                            startFunc();
                        } else {
                            animation.isPause = true;
                            pauseBlock.style.display = 'flex';
                        }
                        break;
                }
            }
        }
    });

    window.addEventListener('keyup', (e) => {
        toggleKey(e, false);
        for (let action in pressedKeys) {
            if (pressedKeys[action] === false) {
                switch (action) {
                    case 'runRight':
                        checkPressKey(stay, 'runRight', 'runLeft');
                        break;
                    case 'runLeft':
                        checkPressKey(stay, 'runRight', 'runLeft');
                        break;
                    case 'jump':
                        person.isJumping = false;
                        break;
                    case 'shoot':
                        person.isShooting = false;
                        break;
                }
            }
        }
    });

    window.addEventListener('blur', () => {
        pressedKeys = {};
    });
}

export {
    pressedKeys,
    activateControls
};