import {
    massiveOfBlocks
} from './maps.js';
import {
    blocks
} from './resources.js';

let bullets = [];
let enemies = [];

function renderBullets() {
    bullets.forEach((bullet, i) => {
        bullet.draw();
        bullet.update();
        if (bullet.isDeleted) {
            bullets.splice(i, 1);
        }
    });
}

function getRandom(min, max) {
    return Math.floor(Math.random() * max) + min;
}

//Class for creating game animation
class AnimationGame {
    constructor(objects, person, canvas, ctx) {
        this.objects = objects;
        this.canvas = canvas;
        this.ctx = ctx;
        this.isPause = false;
        this.person = person;
        this.speed = 0;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.objects.forEach((obj) => {
            obj.draw();
        });

    }

    update(fg) {
        this.objects.forEach((obj) => {
            obj.update(fg);
        });
    }


}

//Class for creating main character
class Hero {
    constructor(posX, posY, sprite, canvas, ctx, health = 100, mana = 100, speed = 8, widthSprite = 144, heightSprite = 144, paddingY = 0, framesAnimStay = 3, framesAnimMove = 14, framesAnimShoot = 10, startFrameShoot = 7, framesAnimJump = 18) {

        //Physical parametrs
        this.hp = health;
        this.mp = mana;
        this.speed = speed;
        this.sizeBlock = 96;
        this.gravitationPower = 0;
        this.jumpPower = -10;
        this.hitBoxHeight = heightSprite - 21;
        this.hitBoxWidth = widthSprite - 72;
        this.dump = 0;
        this.isDead = false;
        this.shootigDelay = 10;
        this.score = 0;
        this.kills = 0;
        this.timeAlive = 0;

        //Positions
        this.widthSprite = widthSprite;
        this.heightSprite = heightSprite;
        this.paddingY = paddingY;
        this.posX = posX * this.sizeBlock;
        this.posY = posY * this.sizeBlock - this.widthSprite % this.sizeBlock;
        this.hitBoxPosX = this.posX + 20;
        this.hitBoxPosY = this.posY + 21;
        this.shootPosX = this.posX + 110;
        this.shootPosY = this.posY + 77;

        //End and start of various animations
        this.frame = 0;
        this.endFrameStay = framesAnimStay;
        this.endFrameMove = framesAnimMove;
        this.endFrameShoot = framesAnimShoot;
        this.endFrameJump = framesAnimJump;
        this.startFrameShoot = startFrameShoot * this.widthSprite;
        this.firstShoot = true;

        //Actions
        this.isJumping = false;
        this.isMoving = false;
        this.isStaying = true;
        this.isShooting = false;

        //Get canvas for animations
        this.canvas = canvas;
        this.ctx = ctx;

        //Steps
        this.step = 0;
        this.stepForShoot = startFrameShoot * this.widthSprite;

        //Direction of move
        this.direction = 1;

        //Get image with sprites
        this.sprite = sprite;
    }

    update(fg) {
        // this.drawHitBoxes();
        // this.checkGettingDamage();
        if (this.hitBoxPosX <= 0) this.posX = 0;
        if (this.posX + this.hitBoxWidth >= fg.img.width || this.posX + Math.abs(fg.posX) + 120 >= fg.img.width) this.posX = this.posX - this.speed;
        if (this.hp <= 0) {
            this.isDead = true;
        }
        this.frame = this.frame >= 1000 ? 0 : this.frame += 1;
        if (this.isMoving) {
            if (this.checkPosition(fg)) {
                this.posX = this.canvas.width / 2;
                fg.speed = this.speed * this.direction * -1;
                enemies.forEach((enemy) => {
                    enemy.posX += this.speed * this.direction * -1;
                });
                bullets.forEach((bullet) => {
                    bullet.posX += this.speed * this.direction * -1;
                });
                massiveOfBlocks.forEach((block) => {
                    block.posX += this.speed * this.direction * -1;
                });
            } else {
                fg.speed = 0;
                this.posX += this.speed * this.direction;
            }
            if (this.frame % 2 === 0) {
                this.step = this.step >= this.widthSprite * this.endFrameMove ? this.widthSprite * (this.endFrameStay + 1) : this.step += this.widthSprite;
            }
        } else if (this.isStaying) {
            fg.speed = 0;
            if (this.frame % 10 === 0) {
                this.step = this.step >= this.widthSprite * this.endFrameStay ? 0 : this.step += this.widthSprite;
            }
        }
        if (this.isShooting) {
            if ((this.frame - (this.firstShoot === true ? this.frame % this.shootigDelay : 0)) % this.shootigDelay === 0) {
                bullets.push(new Bullet(50, 15, this.direction, this.shootPosX, this.shootPosY + 13, this.sprite, this.ctx, this.canvas, this));
            }
            this.shoot();
            this.firstShoot = false;
        } else {
            this.firstShoot = true;
        }
        if (this.gravity()) {
            this.isJumping = false;
            if (this.frame % 10 === 0) {
                this.step = this.step >= this.widthSprite * this.endFrameJump ? this.widthSprite * (this.endFrameMove + 1) : this.step += this.widthSprite;
            }
        }
        if (this.isJumping) {
            this.gravitationPower = -28;
            this.dump = Math.abs(this.gravitationPower);
            this.posY += this.gravitationPower;
        }
        this.hitBoxPosX = this.posX + (this.direction === 1 ? 20 : 48);
        this.hitBoxPosY = this.posY + 21;
        this.shootPosY = this.posY + 77;
        this.shootPosX = this.posX + (this.direction == 1 ? 110 : -32);
    }

    draw() {
        this.ctx.drawImage(this.sprite, this.step, (this.direction == 1 ? this.paddingY : this.paddingY + 1) * this.heightSprite, this.widthSprite, this.heightSprite, this.posX, this.posY, this.widthSprite, this.heightSprite);
    }

    shoot() {
        this.stepForShoot = this.stepForShoot >= this.endFrameShoot * this.widthSprite ? this.startFrameShoot : this.stepForShoot += this.widthSprite;
        this.ctx.drawImage(this.sprite, this.stepForShoot, (this.direction == 1 ? 8 : 9) * this.heightSprite + 54, 76, 48, this.shootPosX, this.shootPosY, 76, 48);
    }

    onBlock(block) {
        // return massiveOfBlocks.some(block => ((this.hitBoxPosY + this.hitBoxHeight === block.posY) && ((this.hitBoxPosX >= block.posX && this.hitBoxPosX <= block.posX + this.sizeBlock) || (this.hitBoxPosX + this.hitBoxWidth >= block.posX && this.hitBoxPosX + this.hitBoxWidth <= block.posX + this.sizeBlock))));
        return ((this.hitBoxPosY + this.hitBoxHeight === block.posY) && ((this.hitBoxPosX >= block.posX && this.hitBoxPosX <= block.posX + this.sizeBlock) || (this.hitBoxPosX + this.hitBoxWidth >= block.posX && this.hitBoxPosX + this.hitBoxWidth <= block.posX + this.sizeBlock)));
    }

    gravity() {
        if (!massiveOfBlocks.some(block => this.onBlock(block)) || this.gravitationPower < 0) {
            this.gravitationPower = this.gravitationPower >= this.dump ? this.dump : this.gravitationPower += 2;
            for (let i = 0; i < Math.abs(this.gravitationPower); i++) {
                if (this.gravitationPower < 0) {
                    this.posY--;
                    this.hitBoxPosY = this.posY + 21;
                } else if (!massiveOfBlocks.some(block => this.onBlock(block))) {
                    this.posY++;
                    this.hitBoxPosY = this.posY + 21;
                }
            }
            return true;
        } else {
            this.gravitationPower = 0;
            return false;
        }
    }

    checkGettingDamage() {
        bullets.forEach((bullet, i) => {
            // console.log(bullet.bulletOfEnemy);
            // console.log((bullet.posX + bullet.width === this.hitBoxPosX));
            console.log(bullet.posX);
            if (bullet.bulletOfEnemy && ((bullet.posX + bullet.width === this.hitBoxPosX || bullet.posX === this.hitBoxPosX + this.hitBoxWidth) && (bullet.posY >= this.hitBoxPosY && bullet.posY + bullet.height <= this.hitBoxPosY + this.hitBoxHeight))) {
                if (this.hp <= 0) {
                    this.isDead = true;
                }
                bullet.isDeleted = true;
            }
        });
    }

    drawHitBoxes() {
        bullets.forEach(bullet => {
            this.ctx.strokeRect(bullet.posX, bullet.posY, bullet.width, bullet.height);
        });
        massiveOfBlocks.forEach(block => {
            // this.ctx.strokeRect(block.posX, block.posY, this.sizeBlock, this.sizeBlock);
            if (((this.hitBoxPosY + this.hitBoxHeight === block.posY) && ((this.hitBoxPosX >= block.posX && this.hitBoxPosX <= block.posX + this.sizeBlock) || (this.hitBoxPosX + this.hitBoxWidth >= block.posX && this.hitBoxPosX + this.hitBoxWidth <= block.posX + this.sizeBlock)))) {
                this.ctx.strokeRect(block.posX, block.posY, this.sizeBlock, this.sizeBlock);
            }
        });
        this.ctx.strokeRect(this.hitBoxPosX, this.hitBoxPosY, this.hitBoxWidth, this.hitBoxHeight);
    }

    checkPosition(fg) {
        return (this.posX - 1 - this.canvas.width / 2 === 0 || this.posX - this.canvas.width / 2 === 0) && ((fg.posX + fg.img.width - 10 >= this.canvas.width && this.direction === 1) || (fg.posX < 0 && this.direction === -1)) && this.isMoving;
    }

}

//Class for creating bullet
class Bullet {
    constructor(damage, speed, direction, posX, posY, img, ctx, canvas, player, bulletOfEnemy = false, width = 93, height = 15, step = 0, endFrame = 2, widthSprite = 144, paddingX = 0, paddingY = 8) {
        this.damage = damage;
        this.speed = speed;
        this.direction = direction;
        this.posX = this.direction === 1 ? posX : posX - 32;
        this.posY = posY;
        this.endFrame = endFrame * widthSprite + 51;
        this.widthSprite = widthSprite;
        this.width = width;
        this.height = height;
        this.paddingX = paddingX * this.widthSprite + 51;
        this.step = this.paddingX;
        this.paddingY = paddingY * this.widthSprite + 69;
        this.img = img;
        this.canvas = canvas;
        this.ctx = ctx;
        this.isDeleted = false;
        this.bulletOfEnemy = bulletOfEnemy;
        this.player = player;
        this.frame = 0;
    }

    update() {
        this.frame = this.frame === 1000 ? 0 : this.frame += 1;
        if (this.step === 1080) this.isDeleted = true;
        for (let count = 0; count < this.speed; count++) {
            this.posX += 1 * this.direction;
            massiveOfBlocks.forEach(block => {
                if ((this.posX + this.width === block.posX || this.posX === block.posX + 96 || (this.posX + this.width >= block.posX && this.posX + this.width <= block.posX + 96)) && (this.posY >= block.posY && this.posY + this.height <= block.posY + 96)) {
                    this.isDeleted = true;
                }
            });
            if (!this.bulletOfEnemy) {
                enemies.forEach((enemy, index) => {
                    if ((this.posX + this.width === enemy.hitBoxPosX || this.posX === enemy.hitBoxPosX + enemy.hitBoxWidth) && (this.posY >= enemy.hitBoxPosY && this.posY + this.height <= enemy.hitBoxPosY + enemy.hitBoxHeight)) {
                        this.height = 144;
                        this.width = 72;
                        this.endFrame = 7 * this.widthSprite + 72;
                        this.step = 4 * this.widthSprite + 72;
                        this.speed = 0;
                        this.paddingY = 8 * this.widthSprite;
                        this.posY -= 77;
                        this.posX -= this.direction === -1 ? 20 : -30;
                        enemy.hp -= this.damage;
                        if (enemy.hp <= 0) {
                            this.player.score += 20;
                            this.player.kills++;
                            enemies.splice(index, 1);
                        }
                    }
                });
            } else if ((this.posX + this.width === this.player.hitBoxPosX || this.posX === this.player.hitBoxPosX + this.player.hitBoxWidth) && (this.posY >= this.player.hitBoxPosY && this.posY + this.height <= this.player.hitBoxPosY + this.player.hitBoxHeight)) {
                this.player.hp -= this.damage;
                this.height = 144;
                this.width = 72;
                this.endFrame = 7 * this.widthSprite + 72;
                this.step = 4 * this.widthSprite + 72;
                this.speed = 0;
                this.paddingY = 8 * this.widthSprite;
                this.posY -= 77;
                this.posX -= this.direction === -1 ? 20 : -30;
                if (this.player.hp <= 0) {
                    if (this.step === 1080) {
                        this.player.isDead = true;
                    }
                }
            }
        }
        if (this.frame % 5 === 0) {
            this.step = this.step >= this.endFrame ? this.paddingX : this.step += this.widthSprite;
        }
        if (this.posX + this.width >= this.canvas.width || this.posX < 0) {
            this.isDeleted = true;
        }

    }

    draw() {
        this.ctx.drawImage(this.img, this.step, this.direction === 1 ? this.paddingY : this.paddingY + 144, this.width, this.height, this.direction === 1 ? this.posX : this.posX, this.posY, this.width, this.height);
    }
}

class Enemy extends Hero {
    constructor(type, posX, posY, target, sprite, canvas, ctx, health = 100, mana = 100, speed = 8, widthSprite = 144, heightSprite = 144, paddingY = 0, framesAnimStay = 3, framesAnimMove = 14, framesAnimShoot = 10, startFrameShoot = 7, framesAnimJump = 18) {
        super(posX, posY, sprite, canvas, ctx, health, mana, speed, widthSprite, heightSprite, paddingY, framesAnimStay, framesAnimMove, framesAnimShoot, startFrameShoot, framesAnimJump);
        this.type = type;
        this.paddingY = type + 1;
        this.target = target;
        this.shootigDelay = 100;
        this.speed = 6;
        this.heightSprite = 144;
        this.firingRange = getRandom(400, 500);
    }

    update() {
        // this.drawHitBoxes();
        if (this.target.hitBoxPosX + this.target.hitBoxWidth + this.firingRange < this.hitBoxPosX) {
            this.direction = -1;
            this.isMoving = true;
            this.isShooting = false;
        } else if (this.target.hitBoxPosX + this.target.hitBoxWidth - this.firingRange > this.hitBoxPosX) {
            this.direction = 1;
            this.isMoving = true;
            this.isShooting = false;
        } else if (this.target.hitBoxPosX + this.target.hitBoxWidth < this.hitBoxPosX) {
            this.direction = -1;
            this.isShooting = true;
            this.isMoving = false;
        } else if (this.target.hitBoxPosX + this.target.hitBoxWidth > this.hitBoxPosX) {
            this.direction = 1;
            this.isShooting = true;
            this.isMoving = false;
        } else {
            this.isShooting = true;
            this.isMoving = false;
        }
        if (this.hp <= 0) {
            this.isDead = true;
        }
        this.frame = this.frame >= 1000 ? 0 : this.frame += 1;
        if (this.isMoving) {
            this.posX += this.speed * this.direction;
            if (this.frame % 2 === 0) {
                this.step = this.step >= this.widthSprite * this.endFrameMove ? this.widthSprite * (this.endFrameStay + 1) : this.step += this.widthSprite;
            }
        } else if (this.isStaying) {
            if (this.frame % 10 === 0) {
                this.step = this.step >= this.widthSprite * this.endFrameStay ? 0 : this.step += this.widthSprite;
            }
        }
        if (this.isShooting) {
            if ((this.frame % this.shootigDelay === 0)) {
                bullets.push(new Bullet(50, 15, this.direction, this.shootPosX, this.shootPosY + 13, this.sprite, this.ctx, this.canvas, this.target, true));
                this.shoot();
            }
        }
        if (this.gravity()) {
            this.isJumping = false;
            if (this.frame % 10 === 0) {
                this.step = this.step >= this.widthSprite * this.endFrameJump ? this.widthSprite * (this.endFrameMove + 1) : this.step += this.widthSprite;
            }
        }
        if (this.isJumping) {
            this.gravitationPower = -28;
            this.dump = Math.abs(this.gravitationPower);
            this.posY += this.gravitationPower;
        }
        this.hitBoxPosX = this.posX + (this.direction === 1 ? 20 : 48);
        this.hitBoxPosY = this.posY + 21;
        this.shootPosY = this.posY + 77;
        this.shootPosX = this.posX + (this.direction == 1 ? 110 : -32);
        this.stepForShoot = this.stepForShoot >= this.endFrameShoot * this.widthSprite ? this.startFrameShoot : this.stepForShoot += this.widthSprite;

        // super.update();
    }

}

class Waves {
    constructor(person, spawPosX, spawPosY, initNumOfEnemies, ctx, canvas, sprite, ...typesOfEnemies) {
        this.person = person;
        this.posX = spawPosX;
        this.posY = spawPosY;
        this.initNumOfEnemies = initNumOfEnemies;
        this.typesOfEnemies = typesOfEnemies;
        this.numWave = 1;
        this.enemiesAlive = false;
        this.ctx = ctx;
        this.canvas = canvas;
        this.sprite = sprite;
        this.spawnTime = 500;
        this.frame = 0;
        this.coef = 0;
    }

    update() {
        this.frame = this.frame >= 1000 ? 0 : this.frame++;
        if (!enemies.length) {
            if (this.frame % 10 === 0) {
                this.spawnTime--;
            }
            if (this.spawnTime === 0) {
                this.numWave++;
                this.typesOfEnemies.forEach(({
                    type,
                    startCoef
                }) => {
                    for (let i = 0; i < startCoef + this.coef; i++) {
                        enemies.push(new Enemy(type, this.posX + type + getRandom(2, 10), this.posY, this.person, this.sprite, this.canvas, this.ctx));
                    }
                });
                this.coef++;
                this.enemiesAlive = true;
            } else if (this.spawnTime < 0) {
                this.spawnTime = 500;
            }
        }
    }

    draw() {
        if (this.enemiesAlive) {
            enemies.forEach(enemy => {
                enemy.update();
                enemy.draw();
            });
        }
    }
}

class ForeGround {
    constructor(img, canvas, ctx) {
        this.img = img;
        this.canvas = canvas;
        this.ctx = ctx;
        this.posX = 0;
        this.speed = 0;
    }

    draw() {
        this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, this.posX, 0, this.img.width, this.img.height);
    }

    update() {
        this.posX += this.speed;
    }
}

export {
    Hero,
    Enemy,
    AnimationGame,
    Waves,
    enemies,
    renderBullets,
    ForeGround,
    bullets
};