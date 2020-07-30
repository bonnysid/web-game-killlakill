export let massiveOfBlocks = [];
import {
    objects
} from './resources.js';
import {
    ForeGround
} from './classes.js';

export class Map {
    constructor(mapMatrix, blocks, bg, bgClose, canvas, ctx, startPos = 384, widthBlock = 96, heightBlock = 96, width = 2560) {
        this.mapMatrix = mapMatrix;
        this.canvas = canvas;
        this.ctx = ctx;
        this.widthBlock = widthBlock;
        this.heightBlock = heightBlock;
        this.canvas.width = width;
        this.startPos = startPos;

        //get a background
        this.bg = bg;
        this.bgClose = bgClose;

        //get a tails
        this.blocks = blocks;
    }

    drawBG() {
        this.bg.onload = setTimeout(() => {
            this.ctx.drawImage(this.bg, 0, 0, 1400, 788, 0, 0, this.canvas.width, this.canvas.height);
        }, 50);
    }

    render() {
        this.bgClose.onload = setTimeout(() => {
            this.ctx.drawImage(this.bgClose, 0, 0, 1400, 788, 0, 0, this.canvas.width, this.canvas.height);
        }, 50);

        this.blocks.onload = setTimeout(() => {
            this.mapMatrix.forEach(({
                coefX,
                coefY,
                posX,
                posY,
                fg
            }) => {
                // posY = posY >= this.canvas.height / this.heightBlock ? posY - 1 : posY - (this.canvas.height / this.heightBlock - posY >= 1 ? 1 : 0);
                this.ctx.drawImage(this.blocks, this.widthBlock * coefX, this.widthBlock * coefY, this.widthBlock, this.heightBlock, this.widthBlock * posX, this.heightBlock * posY, this.widthBlock, this.heightBlock);
                if (fg) {
                    massiveOfBlocks.push({
                        'posX': posX * this.widthBlock,
                        'posY': posY * this.heightBlock,
                        'startPosX': posX * this.widthBlock
                    });
                }

            });
        }, 100);
    }
}