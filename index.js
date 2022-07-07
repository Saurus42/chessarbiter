const { Client } = require( 'discord.js' );
const { readFileSync } = require( 'fs' );
const { loadImage, Image, registerFont } = require( 'canvas' );
const Send = require( './class/Send.js' );
const Board = require( './class/Board.js' );
const path = require( 'path' );
const config = JSON.parse( readFileSync( './data.json', { encoding: 'utf-8' } ) );
const client = new Client();
/**
 * Tiles for building a chessboard.
 * @type {Image}
 */
var texture;
/**
 * Collection of games with channel id.
 * @type {Map<string, any>}
 */
var games;
/**
 * Collection of boards with channel id.
 * @type {Map<string, Board>}
 */
var chessboard;
/**
 * Collection of types whether pvc or pvp with channel id.
 * @type {Map<string, string>}
 */
var types;
client.on('ready', async () => {
  client.user?.setActivity('$chess help', { type: "WATCHING" });
  texture = await loadImage( path.join( __dirname, 'images', 'texture.png' ) );
  registerFont( './font/Pixel Emulator.otf', { family: 'Pixel Emulator' } );
  games = new Map();
  chessboard = new Map();
  types = new Map();
  console.log('I\'m reading.');
});
client.on('message', async msg => {
  const message = msg.content.split(' ');
  const s = new (await Send)(games, chessboard, types, msg.channel, msg.author);
  s.setImages(texture);
  if (message[0] === `${config.token}chess`) {
    s.run(message[1], message[2], message[3]);
  }
});
client.login(config.secret);