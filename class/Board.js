/**
 * 
 * @param {number} index 
 * @param {string} replacement 
 * @returns {string}
 */
String.prototype.replaceAt = function( index, replacement ) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}
const { Player } = require( "../build/Release/Player.node" );
const { Image, Canvas } = require( 'canvas' );
const { translate } = require( '../build/Release/translate.node' );
const { IMG } = require( '../map/img' );
module.exports = class Board {
    constructor() {}
    #canvas = new Canvas(270, 270, 'pdf');
    /**
     * @type {Player}
     */
    #playerWhite
    /**
     * @type {Player}
     */
    #playerBlack
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
        if(black && white)
        for(let i = 0; i < black?.length; i++) {
            let str = struct[i];
            for(let j = 0; j < black?.length; j++) {
                if(black[i][j] !== ' ') {
                    // @ts-ignore
                    str = str.replaceAt(j, black[i][j]);
                }
                if(white[i][j] !== ' ') {
                    // @ts-ignore
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
     */
    getWhite() {
        return this.#playerWhite?.id;
    }
    /**
     * Get ID black player
     */
    getBlack() {
        return this.#playerBlack?.id;
    }
    /**
     * Update position pawns
     * @param {string} color
     * @param {string} move
     */
    update( color, move ) {
        let width = translate(move[3]);
        let height = translate(move[4]);
        if(color === 'black') {
            const struct = this.#playerWhite?.getStructure();
            if(struct)
                if(struct[height][width] !== ' ') {
                    this.#playerWhite?.deleteFigure(move.substring(3));
                    this.#playerBlack?.updateStructure(move);
                }
        } else if(color === 'white') {
            const struct = this.#playerBlack?.getStructure();
            if(struct)
                if(struct[height][width] !== ' ') {
                    this.#playerBlack?.deleteFigure(move.substring(3));
                    this.#playerWhite?.updateStructure(move);
                }
        }
    }
    /**
     * Render pawn into canvas
     * @param {string} name
     * @param {CanvasRenderingContext2D} ctx
     * @param {IMG} map
     * @param {number} positionX
     * @param {number} positionY
     * @param {CanvasImageSource} image
     */
    #generatePawns = ( name, ctx, map, positionX, positionY, image ) => {
        const data = map.frames.find(value => value.filename.includes(name));
        if(data)
        ctx.drawImage(
            image,
            data.frame.x,
            data.frame.y,
            data.frame.w,
            data.frame.h,
            positionX * data.sourceSize.w,
            positionY * data.sourceSize.h,
            data.sourceSize.w,
            data.sourceSize.h
        );
    }
    /**
     * 
     * @param {string} char
     * @param {CanvasRenderingContext2D} ctx
     * @param {IMG} map 
     * @param {string} color 
     * @param {number} positionX
     * @param {number} positionY
     * @param {CanvasImageSource} image
     */
    #renderPawns = ( char, ctx, map, color, positionX, positionY, image ) => {
        switch (char) {
            case 'R': {
                this.#generatePawns(`${color}Rock.png`, ctx, map, positionX, positionY, image);
                break;
            }
            case 'N': {
                this.#generatePawns(`${color}Knight.png`, ctx, map, positionX, positionY, image);
                break;
            }
            case 'B': {
                this.#generatePawns(`${color}Bishop.png`, ctx, map, positionX, positionY, image);
                break;
            }
            case 'K': {
                this.#generatePawns(`${color}King.png`, ctx, map, positionX, positionY, image);
                break;
            }
            case 'Q': {
                this.#generatePawns(`${color}Queen.png`, ctx, map, positionX, positionY, image);
                break;
            }
            case 'P': {
                this.#generatePawns(`${color}Pawn.png`, ctx, map, positionX, positionY, image);
                break;
            }
            case 'q': {
                this.#generatePawns(`${color}CircleQ.png`, ctx, map, positionX, positionY, image);
                break;
            }
            case 'p': {
                this.#generatePawns(`${color}Circle.png`, ctx, map, positionX, positionY, image);
                break;
            }
            
        }
    }
    /**
     * Set pawns on Board
     * @param {string} char
     * @param {CanvasRenderingContext2D} ctx
     * @param {string[]} black 
     * @param {string[]} white 
     * @param {IMG} map
     * @param {number} positionX
     * @param {number} positionY
     * @param {CanvasImageSource} image
     */
    #setPawns = ( char, ctx, black, white, map, positionX, positionY, image ) => {
        if(black[positionX][positionY] === char) {
            this.#renderPawns(char, ctx, map, 'Black', positionX, positionY, image);
        }
    }
    /**
     * Render board
     * @param {string} game
     * @param {IMG} map
     * @param {CanvasImageSource} image
     */
    render( game, map, image ) {
        const {struct, black, white} = this.#createStructure();
        const ctx = this.#canvas.getContext('2d');
        ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        for(let i = 0; i < struct.length; i++) {
            for(let j = 0; j < struct[i].length; j++) {
                const num = j % 2;
                const data = map.frames.find(value => value.filename.includes(`field${num}.png`));
                if(data)
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
                if(black && white)
                this.#setPawns(char, ctx, black, white, map, i, j, image);
            }
        }
        return this.#canvas;
    }
}