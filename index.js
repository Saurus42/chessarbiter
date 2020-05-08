"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const data = require("./data.json");
const canvas_1 = require("canvas");
const Send_1 = require("./class/Send");
const client = new discord_js_1.Client();
var chess;
var field;
var pawn;
var games;
var chessboard;
client.on('ready', async () => {
    client.user?.setActivity('$chess help', { type: "WATCHING" });
    const img = ['./images/chess.png', './images/field.png', './images/pawn.png'];
    const images = await Promise.all(img.map(v => canvas_1.loadImage(v)));
    chess = images[0];
    field = images[1];
    pawn = images[2];
    games = new Map();
    chessboard = new Map();
    console.log('I\'m reading.');
});
client.on('message', msg => {
    const massage = msg.content.split(' ');
    const s = new Send_1.Send(games, chessboard, msg.channel, msg.author);
    if (massage[0] === `${data.token}chess`) {
        s.run(massage[1], massage[2]);
    }
});
client.login(data.secret);
//# sourceMappingURL=index.js.map