export default class Hero {

    constructor(posX, posY, src, ctx, health = 100, mana = 100, speed = 10, widthSprite = 144, heihtSprite = 144, framesAnimStay = 3, framesAnimMove = 14) {
        this.hp = health;
        this.mp = mana;
        this.speed = speed;

        this.posX = posX * 96;
        this.posY = posY * 96;
        this.wSpr = widthSprite;
        this.hSpr = heihtSprite;
        this.frStay = framesAnimStay;
        this.frMove = framesAnimMove;
        this.ctx = ctx;
        this.step = 0;
        this.direction = 1;

        this.sprite = new Image();
        this.sprite.src = src;
    }

    stay() {
        this.step = this.step >= this.wSpr * this.frStay ? 0 : this.step += this.wSpr;
        this.ctx.clearRect(this.posX, this.posY - 35, this.wSpr, this.hSpr);
        this.ctx.drawImage(this.sprite, this.step, (this.direction == 1 ? 0 : 1) * this.hSpr, this.wSpr, this.hSpr, this.posX, this.posY - 35, this.wSpr, this.hSpr);
    }

    move(there) {
        this.direction = there === 'right' ? 1 : -1;
        this.posX += this.speed * this.direction;
        this.step = this.step >= this.wSpr * this.frMove ? this.wSpr * (this.frStay + 1) : this.step += this.wSpr;
        console.log(this.step);
        this.ctx.clearRect(this.posX, this.posY - 35, this.wSpr, this.hSpr);
        this.ctx.drawImage(this.sprite, this.step, (this.direction == 1 ? 0 : 1) * this.hSpr, this.wSpr, this.hSpr, this.posX, this.posY - 35, this.wSpr, this.hSpr);
    }
}