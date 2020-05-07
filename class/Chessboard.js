"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pawns_1 = require("./Pawns");
class Chessboard {
    constructor(canvas) {
        this.#canvas = canvas;
        this.#pawns = new Pawns_1.Pawns('chess');
    }
    #canvas;
    #pawns;
    render(...args) {
        const struct = this.#pawns.getStructure();
        const ctx = this.#canvas.getContext('2d');
        ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        for (let i = 0; i < struct.length; i++) {
            const str = struct[i];
            for (let j = 0; j < str.length; j++) {
                const char = str[j];
                switch (char) {
                    case 'R': {
                        //
                    }
                }
            }
        }
    }
}
exports.Chessboard = Chessboard;
