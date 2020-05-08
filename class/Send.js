"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const Chessboard_1 = require("./Chessboard");
const canvas_1 = require("canvas");
class Send {
    constructor(games, chessboard, channel, author) {
        this.#messagefromWorker = (value) => {
            let data = value.toString();
            let values = data.split(' ');
            if (this.#chessboard.get(this.#channel.id)?.isPlayers()) {
                this.#channel.send(`Go @${this.#chessboard.get(this.#channel.id)?.getWhite()}.`);
            }
            else if (this.#chessboard.get(this.#channel.id)?.isPlayer()) {
                if (typeof this.#chessboard.get(this.#channel.id)?.getWhite() === 'undefined') {
                    //
                }
                else {
                    //
                }
            }
            else {
                this.#channel.send('You cannot start the game without at least one player.');
            }
        };
        this.#author = author;
        this.#channel = channel;
        this.#games = games;
        this.#chessboard = chessboard;
    }
    #author;
    #channel;
    #games;
    #chessboard;
    #messagefromWorker;
    run(command, param) {
        switch (command) {
            case 'play': {
                if (!this.#chessboard.has(this.#channel.id)) {
                    this.#chessboard.set(this.#channel.id, new Chessboard_1.Chessboard(new canvas_1.Canvas(270, 270, 'pdf')));
                }
                if (param === 'black') {
                    this.#chessboard.get(this.#channel.id)?.setBlack(this.#author.id);
                }
                if (param === 'white') {
                    this.#chessboard.get(this.#channel.id)?.setWhite(this.#author.id);
                }
                break;
            }
            case 'new-game': {
                if (!this.#games.has(this.#channel.id)) {
                    this.#games.set(this.#channel.id, new worker_threads_1.Worker('./thread/index.js'));
                    this.#games.get(this.#channel.id)?.postMessage('start');
                    this.#games.get(this.#channel.id)?.on('message', this.#messagefromWorker);
                }
                else {
                    this.#channel.send('The game is not over yet.');
                }
                break;
            }
            case 'end': {
                if (this.#games.has(this.#channel.id)) {
                    this.#games.get(this.#channel.id)?.terminate().then(() => this.#channel.send('End of the game.'));
                    this.#games.delete(this.#channel.id);
                }
                else {
                    this.#channel.send('The game is not over yet.');
                }
                break;
            }
            case 'help': {
                this.#channel.send(`Hello, I am a chess bot equipped with the stockfish engine. The structure of my command is as follows, $chess command [parameters]. Parameters are individual to the command. Here is a list of the most common commands:
 - help
 - new-game
 - move
 - play
 - man
e.t.c.
To learn more about a command, type $chess man command.`);
                break;
            }
            case 'man': {
                switch (param) {
                    case 'help': {
                        this.#channel.send('Preliminary information on how to use the bot and brief information about the bot.');
                        break;
                    }
                    case 'new-game': {
                        this.#channel.send('Generates a new game and assigns it to the channel where the command was given. Without a generated chessboard and player assignment, the bot will ignore this command.');
                        break;
                    }
                    case 'end': {
                        this.#channel.send('Forced ending of the game. When the bot ends the game, it will give information on who won based on the points obtained from the figures in the game at a specific player.');
                        break;
                    }
                    case 'play': {
                        this.#channel.send('First use generates chessboards. each subsequent one requires the black or white parameter.');
                        break;
                    }
                    case 'move': {
                        this.#channel.send('Based on this command, the bot moves the pawn on the chessboard. Chess notation is required as a parameter.');
                        break;
                    }
                    default: {
                        this.#channel.send('I don\'t know this command.');
                    }
                }
                break;
            }
            default: {
                this.#channel.send('I don\'t know this command.');
            }
        }
    }
}
exports.Send = Send;
//# sourceMappingURL=Send.js.map