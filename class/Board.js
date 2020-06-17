/**
 * Replace char
 * @param {number} index 
 * @param {string} replacement 
 */
String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}
const { Player } = require("../build/Release/Player.node");
const { Image, Canvas } = require('canvas')
class Board {
    constructor() {}
    #canvas = new Canvas(270, 270, 'pdf');
    #playerWhite;
    #playerBlack;
    #createStructure = () => {
        const struct = [
            '        ',
            '        ',
            '        ',
            '        ',
            '        ',
            '        ',
            '        ',
            '        ',
        ];
        const black = this.#playerBlack?.getStructure();
        const white = this.#playerWhite?.getStructure();
        for(let i = 0; i < black?.length; i++) {
            let str = struct[i];
            for(let j = 0; j < black?.length; j++) {
                if(black[i][j] !== ' ') {
                    str = str.replaceAt(j, black[i][j]);
                }
                if(white[i][j] !== ' ') {
                    str = str.replaceAt(j, black[i][j]);
                }
            }
            struct[i] = str;
        }
        return {struct, black, white};
    }
    isPlayers() {
        if( typeof this.#playerBlack !== 'undefined' && typeof this.#playerWhite !== 'undefined' ) {
            return true;
        }
        else {
            return false;
        }
    }
    isPlayer() {
        if( typeof this.#playerBlack !== 'undefined' || typeof this.#playerWhite !== 'undefined' ) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * Set white player
     * @param {string} id 
     * @param {string} game 
     */
    setWhite( id, game ) {
        this.#playerWhite = new Player( id, 'white', game );
    }
    /**
     * Set black player
     * @param {string} id 
     * @param {string} game 
     */
    setBlack( id, game ) {
        this.#playerBlack = new Player( id, 'black', game );
    }
    /**
     * Get ID white player
     * @returns {string|undefined}
     */
    getWhite() {
        return this.#playerWhite?.id;
    }
    /**
     * Get ID black player
     * @returns {string|undefined}
     */
    getBlack() {
        return this.#playerBlack?.id;
    }
    /**
     * Update position pawns
     * @param {string} color 
     * @param {string} move 
     */
    update(color, move) {}
    /**
     * Render pawn into canvas
     * @param {string} name
     * @param {Object} ctx 
     * @param {(image: Canvas|Image, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number) => void} ctx.drawImage
     * @param {Object} map 
     * @param {any[]} map.frames 
     */
    #generatePawns = (name, ctx, map) => {
        const data = map.frames.find(value => value.filename.includes(name));
        ctx.drawImage(
            image,
            data.frame.x,
            data.frame.y,
            data.frame.w,
            data.frame.h,
            i * data.sourceSize.w,
            j * data.sourceSize.h,
            data.sourceSize.w,
            data.sourceSize.h
        );
    }
    /**
     * 
     * @param {string} char
     * @param {Object} ctx 
     * @param {(image: Canvas|Image, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number) => void} ctx.drawImage
     * @param {Object} map 
     * @param {any[]} map.frames 
     * @param {string} color 
     */
    #renderPawns = (char, ctx, map, color) => {
        switch (char) {
            case 'R': {
                this.#generatePawns(`${color}Rock.png`, ctx, map);
                break;
            }
            case 'N': {
                this.#generatePawns(`${color}Knight.png`, ctx, map);
                break;
            }
            case 'B': {
                this.#generatePawns(`${color}Bishop.png`, ctx, map);
                break;
            }
            case 'K': {
                this.#generatePawns(`${color}King.png`, ctx, map);
                break;
            }
            case 'Q': {
                this.#generatePawns(`${color}Queen.png`, ctx, map);
                break;
            }
            case 'P': {
                this.#generatePawns(`${color}Pawn.png`, ctx, map);
                break;
            }
            case 'q': {
                this.#generatePawns(`${color}CircleQ.png`, ctx, map);
                break;
            }
            case 'p': {
                this.#generatePawns(`${color}Circle.png`, ctx, map);
                break;
            }
            
        }
    }
    /**
     * Set pawns on Board
     * @param {string} char 
     * @param {Object} ctx 
     * @param {(image: Canvas|Image, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number) => void} ctx.drawImage
     * @param {string[]} black 
     * @param {string[]} white 
     * @param {Object} map 
     * @param {any[]} map.frames 
     */
    #setPawns = (char, ctx, black, white, map) => {
        if(black[i][j] === char) {
            this.#renderPawns(char, ctx, map, 'Black');
        }
    }
    /**
     * Render board
     * @param {string} game 
     * @param {Object} map 
     * @param {any[]} map.frames 
     * @param  {Image} image
     * @returns {Canvas}
     */
    render( game, map, image ) {
        const {struct, black, white} = this.#createStructure();
        const ctx = this.#canvas.getContext('2d');
        ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        for(let i = 0; i < struct.length; i++) {
            for(let j = 0; j < struct[i].length; j++) {
                const num = j % 2;
                const data = map.frames.find(value => value.filename.includes(`field${num}.png`));
                ctx.drawImage(
                    image,
                    data.frame.x,
                    data.frame.y,
                    data.frame.w,
                    data.frame.h,
                    i * data.sourceSize.w,
                    j * data.sourceSize.h,
                    data.sourceSize.w,
                    data.sourceSize.h
                );
            }
        }
        for (let i = 0; i < struct.length; i++) {
            const str = struct[i];
            for (let j = 0; j < str.length; j++) {
                const char = str[j];
                this.#setPawns(char, ctx, black, white, map);
            }
        }
        return this.#canvas;
    }
}
exports.Board = Board;