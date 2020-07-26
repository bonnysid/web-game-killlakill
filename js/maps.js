export let massiveOfBlocks = [];

export class Map {
    constructor(mapMatrix, blocks, bg, bgClose, canvas, ctx, widthBlock = 96, heightBlock = 96) {
        this.mapMatrix = mapMatrix;
        this.canvas = canvas;
        this.ctx = ctx;
        this.widthBlock = widthBlock;
        this.heightBlock = heightBlock;


        //get a background
        this.bg = bg;
        this.bgClose = bgClose;

        //get a tails
        this.blocks = blocks;
    }

    render() {
        this.bg.onload = () => {
            this.ctx.drawImage(this.bg, 0, 0, 1400, 788, 0, 0, this.canvas.width, this.canvas.height);
        };

        this.bgClose.onload = setTimeout(() => {
            this.ctx.drawImage(this.bgClose, 0, 0, 1400, 788, 0, 0, this.canvas.width, this.canvas.height);
        }, 50);

        this.blocks.onload = setTimeout(() => {
            this.mapMatrix.forEach(({
                coefX,
                coefY,
                coordX,
                coordY,
                fg
            }) => {
                // coordY = coordY >= this.canvas.height / this.heightBlock ? coordY - 1 : coordY - (this.canvas.height / this.heightBlock - coordY >= 1 ? 1 : 0);
                this.ctx.drawImage(this.blocks, this.widthBlock * coefX, this.widthBlock * coefY, this.widthBlock, this.heightBlock, this.widthBlock * coordX, this.heightBlock * coordY, this.widthBlock, this.heightBlock);
                if (fg) {
                    massiveOfBlocks.push({
                        'coordX': coordX * this.widthBlock,
                        'coordY': coordY * this.heightBlock
                    });
                }

            });
        }, 100);
    }
}