"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const data = require("./data.json");
const canvas_1 = require("canvas");
const worker_threads_1 = require("worker_threads");
const client = new discord_js_1.Client();
var chess;
var field;
var pawn;
var games;
client.on('ready', async () => {
    const img = ['./images/chess.png', './images/field.png', './images/pawn.png'];
    const images = await Promise.all(img.map(v => canvas_1.loadImage(v)));
    chess = images[0];
    field = images[1];
    pawn = images[2];
    games = new Map();
    console.log('I\'m reading.');
});
client.on('message', msg => {
    const massage = msg.content.split(' ');
    if (massage[0] === `${data.token}chess`) {
        switch (massage[1]) {
            case 'new-game': {
                games.set(msg.channel.id, new worker_threads_1.Worker('./thread/index.js'));
            }
        }
    }
});
client.login(data.secret);
