"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pawns {
    constructor(game) {
        if (game === 'chess') {
            this.#structure = [
                'RBNKQNBR',
                'pppppppp',
                '        ',
                '        ',
                '        ',
                '        ',
                'pppppppp',
                'RBNKQNBR'
            ];
        }
        else {
            this.#structure = [
                'p p p p ',
                ' p p p p',
                'p p p p ',
                '        ',
                '        ',
                'p p p p ',
                ' p p p p',
                'p p p p '
            ];
        }
    }
    #structure;
    getStructure() {
        return this.#structure;
    }
}
exports.Pawns = Pawns;
//# sourceMappingURL=Pawns.js.map