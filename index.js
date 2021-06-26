const { Client } = require( 'discord.js' );
const data = require("./data.json");
const { loadImage, Image } = require( 'canvas' );
const Send = require( './class/Send' );
const { Worker } = require( 'worker_threads' );
const Board = require( './class/Board' );
const client = new Client();
/**
 * @type {Image}
 */
var texture;
/**
 * @type {Map<string, Worker>}
 */
var games;
/**
 * @type {Map<string, Board>}
 */
var chessboard;
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