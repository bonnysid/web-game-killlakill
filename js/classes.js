import {
    massiveOfBlocks
} from './maps.js';

let bullets = [];

//Class for creating game animation
class AnimationGame {
    constructor(objects, canvas, ctx) {
        this.objects = objects;
        this.canvas = canvas;
        this.ctx = ctx;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.objects.forEach((obj) => {
            obj.draw();
        });

    }

    update() {
        this.objects.forEach((obj) => {
            obj.update();
        });
    }
}

//Class for creating main character
class Hero {
    constructor(posX, posY, sprite, canvas, ctx, health = 100, mana = 100, speed = 8, widthSprite = 144, heightSprite = 144, paddingY = 0, framesAnimStay = 3, framesAnimMove = 14, framesAnimShoot = 6, startFrameShoot = 3, framesAnimJump = 18) {

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

    update() {
        this.drawHitBoxes();
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
            if (this.frame % 10 === 0) {
                bullets.push(new Bullet(50, 15, this.direction, this.shootPosX, this.shootPosY + 13, this.sprite, this.ctx, this.canvas));
            }
            this.shoot();
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
    }

    draw() {
        this.ctx.drawImage(this.sprite, this.step, (this.direction == 1 ? this.paddingY : this.paddingY + 1) * this.heightSprite, this.widthSprite, this.heightSprite, this.posX, this.posY, this.widthSprite, this.heightSprite);
    }

    shoot() {
        this.ctx.drawImage(this.sprite, this.stepForShoot, (this.direction == 1 ? 8 : 9) * this.heightSprite + 54, 76, 48, this.shootPosX, this.shootPosY, 76, 48);
    }

    onBlock(block) {
        // return massiveOfBlocks.some(block => ((this.hitBoxPosY + this.hitBoxHeight === block.coordY) && ((this.hitBoxPosX >= block.coordX && this.hitBoxPosX <= block.coordX + this.sizeBlock) || (this.hitBoxPosX + this.hitBoxWidth >= block.coordX && this.hitBoxPosX + this.hitBoxWidth <= block.coordX + this.sizeBlock))));
        return ((this.hitBoxPosY + this.hitBoxHeight === block.coordY) && ((this.hitBoxPosX >= block.coordX && this.hitBoxPosX <= block.coordX + this.sizeBlock) || (this.hitBoxPosX + this.hitBoxWidth >= block.coordX && this.hitBoxPosX + this.hitBoxWidth <= block.coordX + this.sizeBlock)));
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

    drawHitBoxes() {
        bullets.forEach(bullet => {
            this.ctx.strokeRect(bullet.posX, bullet.posY, bullet.width, bullet.height);
        });
        massiveOfBlocks.forEach(block => {
            // this.ctx.strokeRect(block.coordX, block.coordY, this.sizeBlock, this.sizeBlock);
            if (((this.hitBoxPosY + this.hitBoxHeight === block.coordY) && ((this.hitBoxPosX >= block.coordX && this.hitBoxPosX <= block.coordX + this.sizeBlock) || (this.hitBoxPosX + this.hitBoxWidth >= block.coordX && this.hitBoxPosX + this.hitBoxWidth <= block.coordX + this.sizeBlock)))) {
                this.ctx.strokeRect(block.coordX, block.coordY, this.sizeBlock, this.sizeBlock);
            }
        });
        this.ctx.strokeRect(this.hitBoxPosX, this.hitBoxPosY, this.hitBoxWidth, this.hitBoxHeight);
    }

}

//Class for creating bullet
class Bullet {
    constructor(damage, speed, direction, posX, posY, img, ctx, canvas, width = 93, height = 15, step = 0, endFrame = 2, widthSprite = 144, paddingX = 0, paddingY = 8) {
        this.damage = damage;
        this.speed = speed;
        this.direction = direction;
        this.posX = posX;
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
        this.isOut = false;
    }

    update() {
        this.posX += this.speed * this.direction;
        this.step = this.step >= this.endFrame ? this.paddingX : this.step += this.widthSprite;
        if (this.posX + this.width >= this.canvas.width || this.posX < 0) {
            this.isOut = true;
        }
    }

    draw() {
        this.ctx.drawImage(this.img, this.step, this.direction === 1 ? this.paddingY : this.paddingY + 144, this.width, this.height, this.direction === 1 ? this.posX : this.posX - 32, this.posY, this.width, this.height);
    }
}

class Enemy extends Hero {
    constructor(type, posX, posY, sprite, canvas, ctx, health = 100, mana = 100, speed = 8, widthSprite = 144, heightSprite = 144, paddingY = 0, framesAnimStay = 3, framesAnimMove = 14, framesAnimShoot = 6, startFrameShoot = 3, framesAnimJump = 18) {
        super(posX, posY, sprite, canvas, ctx, health, mana, speed, widthSprite, heightSprite, paddingY, framesAnimStay, framesAnimMove, framesAnimShoot, startFrameShoot, framesAnimJump);
        this.type = type;
        this.paddingY = type + 1;
    }

}

export {
    Hero,
    Enemy,
    AnimationGame,
    Bullet,
    bullets
};