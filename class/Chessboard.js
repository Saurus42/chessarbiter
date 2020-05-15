const { Pawns } = require("../build/Release/Pawns.node");
const { Player } = require("../build/Release/Player.node");
class Chessboard {
    constructor(canvas, game) {
        this.#canvas = canvas;
        this.#pawns = new Pawns( game );
        this.#position = {}
        const struct = this.#pawns.getStructure();
    }
    #canvas;
    #pawns;
    #playerWhite;
    #playerBlack;
    #position;
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
    setWhite( id ) {
        this.#playerWhite = new Player( id );
    }
    setBlack( id ) {
        this.#playerBlack = new Player( id );
    }
    getWhite() {
        return this.#playerWhite?.id;
    }
    getBlack() {
        return this.#playerBlack?.id;
    }
    render( ...args ) {
        const struct = this.#pawns.getStructure();
        const ctx = this.#canvas.getContext('2d');
        ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        for (let i = 0; i < struct.length; i++) {
            const str = struct[i];
            for (let j = 0; j < str.length; j++) {
                const char = str[j];
                switch (char) {
                    case 'R': {
                    }
                }
            }
        }
    }
}
exports.Chessboard = Chessboard;