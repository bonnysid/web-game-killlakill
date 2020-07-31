function createListOfTypes(cols, rows, listOfNames, measurementError = 0) {
    const list = {};

    for (let row = 0, indexOfName = 0; row < rows; row++) {
        if (row === rows - 1) {
            for (let col = 0; col < cols - measurementError; col++, indexOfName++) {
                list[listOfNames[indexOfName]] = {
                    coefX: col,
                    coefY: row
                };
            }
        } else {
            for (let col = 0; col < cols; col++, indexOfName++) {
                list[listOfNames[indexOfName]] = {
                    coefX: col,
                    coefY: row
                };
            }
        }

    }
    return list;
}

const listNamesOfBlocks = ['dirtL', 'dirtWithGrassL', 'dirtAngleL', 'dirtAngleR', 'dirtWithGrassR'];

const arenaMatrix = [{
        coefX: 8,
        coefY: 1,
        posX: 0,
        posY: 6,
        fg: true
    },
    {
        coefX: 8,
        coefY: 1,
        posX: 1,
        posY: 6,
        fg: true
    },
    {
        coefX: 8,
        coefY: 1,
        posX: 2,
        posY: 6,
        fg: true
    },
    {
        coefX: 8,
        coefY: 1,
        posX: 3,
        posY: 6,
        fg: true
    },
    {
        coefX: 8,
        coefY: 1,
        posX: 4,
        posY: 6,
        fg: true
    },
    {
        coefX: 6,
        coefY: 1,
        posX: 5,
        posY: 6,
        fg: true
    },
    {
        coefX: 7,
        coefY: 1,
        posX: 6,
        posY: 6,
        fg: true
    },
    {
        coefX: 3,
        coefY: 1,
        posX: 7,
        posY: 6,
        fg: true
    },
    {
        coefX: 3,
        coefY: 1,
        posX: 8,
        posY: 6,
        fg: true
    },
    {
        coefX: 3,
        coefY: 1,
        posX: 9,
        posY: 6,
        fg: true
    },
    {
        coefX: 3,
        coefY: 1,
        posX: 10,
        posY: 6,
        fg: true
    },
    {
        coefX: 3,
        coefY: 1,
        posX: 11,
        posY: 6,
        fg: true
    },
    {
        coefX: 3,
        coefY: 1,
        posX: 12,
        posY: 6,
        fg: true
    },
    {
        coefX: 3,
        coefY: 1,
        posX: 13,
        posY: 6,
        fg: true
    },
    {
        coefX: 3,
        coefY: 1,
        posX: 14,
        posY: 6,
        fg: true
    },
    {
        coefX: 3,
        coefY: 1,
        posX: 15,
        posY: 6,
        fg: true
    },
    {
        coefX: 3,
        coefY: 1,
        posX: 16,
        posY: 6,
        fg: true
    },
    {
        coefX: 3,
        coefY: 1,
        posX: 17,
        posY: 6,
        fg: true
    },
    {
        coefX: 3,
        coefY: 1,
        posX: 18,
        posY: 6,
        fg: true
    },
    {
        coefX: 3,
        coefY: 1,
        posX: 19,
        posY: 6,
        fg: true
    },
    {
        coefX: 3,
        coefY: 1,
        posX: 20,
        posY: 6,
        fg: true
    },
    {
        coefX: 3,
        coefY: 1,
        posX: 21,
        posY: 6,
        fg: true
    },
    {
        coefX: 3,
        coefY: 1,
        posX: 22,
        posY: 6,
        fg: true
    },
    {
        coefX: 3,
        coefY: 1,
        posX: 23,
        posY: 6,
        fg: true
    },
    {
        coefX: 3,
        coefY: 1,
        posX: 24,
        posY: 6,
        fg: true
    },
    {
        coefX: 3,
        coefY: 1,
        posX: 25,
        posY: 6,
        fg: true
    },
    {
        coefX: 3,
        coefY: 1,
        posX: 26,
        posY: 6,
        fg: true
    },
    {
        coefX: 1,
        coefY: 2,
        posX: 0,
        posY: 5,
        fg: false
    },

    {
        coefX: 0,
        coefY: 2,
        posX: 0,
        posY: 5,
        fg: false
    },
    {
        coefX: 1,
        coefY: 2,
        posX: 1,
        posY: 5,
        fg: false
    },
    {
        coefX: 4,
        coefY: 1,
        posX: 2,
        posY: 5,
        fg: false
    },
    {
        coefX: 10,
        coefY: 2,
        posX: 2,
        posY: 5,
        fg: false
    },
    {
        coefX: 12,
        coefY: 2,
        posX: 2,
        posY: 5,
        fg: false
    },
    {
        coefX: 13,
        coefY: 2,
        posX: 2,
        posY: 5,
        fg: false
    },
    {
        coefX: 1,
        coefY: 2,
        posX: 3,
        posY: 5,
        fg: false
    },
    {
        coefX: 11,
        coefY: 2,
        posX: 3,
        posY: 5,
        fg: false
    },
    {
        coefX: 0,
        coefY: 2,
        posX: 4,
        posY: 5,
        fg: false
    },
    {
        coefX: 9,
        coefY: 2,
        posX: 5,
        posY: 5,
        fg: false
    },
    {
        coefX: 3,
        coefY: 4,
        posX: 6,
        posY: 5,
        fg: false
    },
    {
        coefX: 3,
        coefY: 4,
        posX: 7,
        posY: 5,
        fg: false
    },
    {
        coefX: 13,
        coefY: 3,
        posX: 7,
        posY: 5,
        fg: false
    },
    {
        coefX: 0,
        coefY: 4,
        posX: 8,
        posY: 5,
        fg: false
    },
    {
        coefX: 3,
        coefY: 4,
        posX: 9,
        posY: 5,
        fg: false
    },
    {
        coefX: 1,
        coefY: 4,
        posX: 9,
        posY: 5,
        fg: false
    },
    {
        coefX: 3,
        coefY: 4,
        posX: 10,
        posY: 5,
        fg: false
    },
    {
        coefX: 8,
        coefY: 3,
        posX: 10,
        posY: 5,
        fg: false
    },
    {
        coefX: 3,
        coefY: 4,
        posX: 11,
        posY: 5,
        fg: false
    },
    {
        coefX: 5,
        coefY: 3,
        posX: 11,
        posY: 5,
        fg: false,
        stairs: true
    },
    {
        coefX: 3,
        coefY: 4,
        posX: 12,
        posY: 5,
        fg: false
    },
    {
        coefX: 8,
        coefY: 3,
        posX: 12,
        posY: 5,
        fg: false
    },
    {
        coefX: 3,
        coefY: 4,
        posX: 13,
        posY: 5,
        fg: false
    },
    {
        coefX: 4,
        coefY: 4,
        posX: 14,
        posY: 5,
        fg: true
    },

    {
        coefX: 4,
        coefY: 2,
        posX: 0,
        posY: 4,
        fg: false
    },
    {
        coefX: 6,
        coefY: 2,
        posX: 1,
        posY: 4,
        fg: false
    },
    {
        coefX: 5,
        coefY: 1,
        posX: 2,
        posY: 4,
        fg: false
    },
    {
        coefX: 3,
        coefY: 2,
        posX: 3,
        posY: 4,
        fg: false
    },
    {
        coefX: 5,
        coefY: 2,
        posX: 4,
        posY: 4,
        fg: false
    },
    {
        coefX: 8,
        coefY: 2,
        posX: 5,
        posY: 4,
        fg: false
    },
    {
        coefX: 9,
        coefY: 3,
        posX: 10,
        posY: 4,
        fg: false
    },
    {
        coefX: 2,
        coefY: 3,
        posX: 11,
        posY: 4,
        fg: false,
        stairs: true
    },
    {
        coefX: 9,
        coefY: 3,
        posX: 12,
        posY: 4,
        fg: false
    },

    {
        coefX: 8,
        coefY: 4,
        posX: 0,
        posY: 3,
        fg: true
    },
    {
        coefX: 8,
        coefY: 4,
        posX: 1,
        posY: 3,
        fg: true
    },
    {
        coefX: 8,
        coefY: 4,
        posX: 2,
        posY: 3,
        fg: true
    },
    {
        coefX: 8,
        coefY: 4,
        posX: 3,
        posY: 3,
        fg: true
    },
    {
        coefX: 8,
        coefY: 4,
        posX: 4,
        posY: 3,
        fg: true
    },
    {
        coefX: 8,
        coefY: 4,
        posX: 5,
        posY: 3,
        fg: true
    },
    {
        coefX: 9,
        coefY: 4,
        posX: 6,
        posY: 3,
        fg: true
    },
    {
        coefX: 9,
        coefY: 3,
        posX: 10,
        posY: 3,
        fg: false
    },
    {
        coefX: 3,
        coefY: 3,
        posX: 11,
        posY: 3,
        fg: false,
        stairs: true
    },
    {
        coefX: 9,
        coefY: 3,
        posX: 12,
        posY: 3,
        fg: false
    },

    {
        coefX: 5,
        coefY: 4,
        posX: 0,
        posY: 2,
        fg: true
    },
    {
        coefX: 5,
        coefY: 4,
        posX: 1,
        posY: 2,
        fg: true
    },
    {
        coefX: 6,
        coefY: 4,
        posX: 2,
        posY: 2,
        fg: true
    },
    {
        coefX: 5,
        coefY: 4,
        posX: 3,
        posY: 2,
        fg: true
    },
    {
        coefX: 6,
        coefY: 4,
        posX: 4,
        posY: 2,
        fg: true
    },
    {
        coefX: 7,
        coefY: 4,
        posX: 5,
        posY: 2,
        fg: true
    },
    {
        coefX: 10,
        coefY: 4,
        posX: 6,
        posY: 2,
        fg: true
    },
    {
        coefX: 10,
        coefY: 3,
        posX: 10,
        posY: 2,
        fg: false
    },
    {
        coefX: 6,
        coefY: 3,
        posX: 10,
        posY: 2,
        fg: false
    },
    {
        coefX: 7,
        coefY: 3,
        posX: 11,
        posY: 2,
        fg: false,
        stairs: true
    },
    {
        coefX: 3,
        coefY: 3,
        posX: 11,
        posY: 2,
        fg: false
    },
    {
        coefX: 10,
        coefY: 3,
        posX: 12,
        posY: 2,
        fg: false
    },
    {
        coefX: 7,
        coefY: 3,
        posX: 12,
        posY: 2,
        fg: false
    },

    {
        coefX: 14,
        coefY: 2,
        posX: 10,
        posY: 1,
        fg: false
    },
    {
        coefX: 0,
        coefY: 3,
        posX: 11,
        posY: 1,
        fg: false,
        stairs: true
    },
    {
        coefX: 14,
        coefY: 2,
        posX: 12,
        posY: 1,
        fg: false
    },
];

const sprites = new Image();
sprites.src = 'img/people/SpritesPeople2.png';

const background = new Image();
background.src = 'img/bg/bg2.png';

const backgroundClose = new Image();
backgroundClose.src = 'img/bg/bgClose.png';

const blocks = new Image();
blocks.src = 'img/blocks/AllBlocks.png';

const avatar = new Image();
avatar.src = 'img/people/avatar.png';

const objects = [];

export {
    arenaMatrix,
    sprites,
    background,
    backgroundClose,
    blocks,
    objects,
    createListOfTypes,
    avatar
};