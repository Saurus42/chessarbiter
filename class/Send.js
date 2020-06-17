///<reference path="../types/Board.d.ts"/>
const { Worker } = require("worker_threads");
const { Board } = require("./Board");
const { Canvas } = require("canvas");
class Send {
    /**
     * 
     * @param {string} games 
     * @param {Board} board 
     * @param {string} channel 
     * @param {string} author 
     */
    constructor(games, board, channel, author) {
        this.#author = author;
        this.#channel = channel;
        this.#games = games;
        this.#board = board;
        this.#map = require('../map/img.json');
    }
    #author;
    #channel;
    #games;
    #board;
    #images;
    #map;
    #messagefromWorker = value => {
        let data = value.toString();
        let values = data.split(' ');
        if (this.#board.get(this.#channel.id)?.isPlayers()) {
            this.#channel.send(`Go @${this.#board.get(this.#channel.id)?.getWhite()}.`);
        }
        else if (this.#board.get(this.#channel.id)?.isPlayer()) {
            if (typeof this.#board.get(this.#channel.id)?.getWhite() === 'undefined') {
            }
            else {
            }
        }
        else {
            this.#channel.send('You cannot start the game without at least one player.');
        }
    };
    #newGame = () => {
        if (!this.#games.has(this.#channel.id)) {
            this.#games.set(this.#channel.id, new Worker('./thread/index.js'));
            this.#games.get(this.#channel.id)?.postMessage('start');
            this.#games.get(this.#channel.id)?.on('message', this.#messagefromWorker);
        }
        else {
            this.#channel.send('The game is not over yet.');
        }
    }
    #play = param => {
        if (!this.#board.has(this.#channel.id)) {
            this.#board.set(this.#channel.id, new Board());
        }
        if (param === 'black') {
            this.#board.get(this.#channel.id)?.setBlack(this.#author.id);
        }
        if (param === 'white') {
            this.#board.get(this.#channel.id)?.setWhite(this.#author.id);
        }
    }
    #end = () => {
        if (this.#games.has(this.#channel.id)) {
            this.#games.get(this.#channel.id)?.terminate().then(() => this.#channel.send('End of the game.'));
            this.#games.delete(this.#channel.id);
        }
        else {
            this.#channel.send('The game is not over yet.');
        }
    }
    #help = () => {
        this.#channel.send(`Hello, I am a chess bot equipped with the stockfish engine. The structure of my command is as follows, $chess command [parameters]. Parameters are individual to the command. Here is a list of the most common commands:
 - help
 - new-game
 - move
 - play
 - man
e.t.c.
To learn more about a command, type $chess man command.`);
    }
    #man = (param) => {
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
    }
    setImages(...args) {
        this.#images = args;
    }
    run(command, param) {
        switch (command) {
            case 'play': {
                this.#play(param);
                break;
            }
            case 'new-game': {
                this.#newGame();
                break;
            }
            case 'end': {
                this.#end();
                break;
            }
            case 'help': {
                this.#help();
                break;
            }
            case 'man': {
                this.#man(param);
                break;
            }
            default: {
                this.#channel.send('I don\'t know this command.');
            }
        }
    }
}
exports.Send = Send;