import { Client } from 'discord.js'
import data = require("./data.json");
import { loadImage, Image } from "canvas";
import { Send } from "./class/Send";
import { Worker } from 'worker_threads'
import { Board } from './class/Board';
const client = new Client();
var texture: Image;
var games: Map<string, Worker>;
var chessboard: Map<string, Board>;
client.on('ready', async () => {
    client.user?.setActivity('$chess help', { type: "WATCHING" });
    texture = await loadImage('./images/texture.png');
    games = new Map();
    chessboard = new Map();
    console.log('I\'m reading.');
});
client.on('message', msg => {
    const massage = msg.content.split(' ');
    const s = new Send(games, chessboard, msg.channel, msg.author);
    s.setImages(texture);
    if (massage[0] === `${data.token}chess`) {
        s.run(massage[1], massage[2]);
    }
});
client.login(data.secret);