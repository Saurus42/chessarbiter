const Board = require( './Board.js' );
const { Image } = require( "canvas" );
const { DMChannel, MessageAttachment, NewsChannel, TextChannel, User } = require( 'discord.js' );
const { readFileSync } = require( 'fs' );
const { IMG } = require( '../map/img' );
module.exports = ( async () => {
  const { Chess } = await import( 'chess.js' );
  return class Send {
    /**
     * 
     * @param {Map<string, Chess>} games 
     * @param {Map<string, Board>} board 
     * @param {Map<string, string>} types 
     * @param {TextChannel | DMChannel | NewsChannel} channel 
     * @param {User} author 
     */
    constructor( games, board, types, channel, author ) {
      this.#author = author;
      this.#channel = channel;
      this.#games = games;
      this.#board = board;
      this.#types = types;
      this.#map = JSON.parse( readFileSync( './map/img.json', { encoding: 'utf-8' } ) );
      this.#images = [];
    }
    #author;
    #channel;
    #games;
    #board;
    #types;
    /**
     * @type {Image[]}
     */
    #images;
    /**
     * @type {IMG}
     */
    #map;
    /**
     * Generate new game.
     * @param {string} param1
     * @param {string} param2
     */
    #newGame = ( param1, param2 = undefined ) => {
      if( param2 === undefined )
        param2 = 'pvc';
      if (!this.#games.has(this.#channel.id)) {
        if(param1 === 'chess') {
          this.#type( param2 );
        } else if(param1 === 'checkers') {}
        const game = this.#games.get( this.#channel.id );
        const board = this.#board.get( this.#channel.id );
        if( game && board ) {
          const struckt = board.updateBoard( game.ascii() );
          const canvas = board.render( this.#map, this.#images[0], struckt );
          this.#channel.send( new MessageAttachment( canvas.toBuffer( 'image/png' ) ) );
          // this.#channel.send( { files: [ { attachment: canvas.toBuffer( 'image/png' ) } ] } );
        }
      }
      else {
        this.#channel.send('The game is not over yet.');
      }
    }
    
    #end = () => {
      if (this.#games.has(this.#channel.id)) {
        // this.#games.get(this.#channel.id)?.terminate().then(() => this.#channel.send('End of the game.'));
        this.#games.delete(this.#channel.id);
      }
      else {
        this.#channel.send('The game is not over yet.');
      }
    }
    /**
     * //
     */
    #help = () => {
      const { token } = require( '../data.json' );
      this.#channel.send(`Hello, I am a chess bot equipped with the stockfish engine. The structure of my command is as follows, ${token}chess command [parameters]. Parameters are individual to the command. Here is a list of the most common commands:
  - help
  - new-game
  - move
  - man
  e.t.c.
  To learn more about a command, type ${token}chess man command.`);
    }
    /**
     * A manual for commands.
     * @param {string} param
     */
    #man = param => {
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
    /**
     * Determining the type of game.
     * @param {string} param
     */
    #type = param => {
      this.#types.set( this.#channel.id, param );
      this.#games.set( this.#channel.id, new Chess() );
      this.#board.set( this.#channel.id, new Board() );
    }
    /**
     * Setting of graphics to render.
     * @param {...Image} args
     */
    setImages(...args) {
      this.#images = args;
    }
  
    /**
     * Making a pawn move.
     * @param {string} param 
     */
    #move = param => {
      const game = this.#games.get( this.#channel.id );
      const type = this.#types.get( this.#channel.id );
      const board = this.#board.get( this.#channel.id );
      if( game && type && board ) {
        if( type === 'pvc' ) {
          game.move( param.slice( 2, 4 ) );
          const moves = game.moves();
          const move = moves[Math.floor(Math.random() * moves.length)];
          game.move(move);
        }
        if( type === 'pvp' )
        game.move( param.slice( 2, 4 ) );
        const struckt = board.updateBoard( game.ascii() );
        const canvas = board.render( this.#map, this.#images[0], struckt );
        this.#channel.send( new MessageAttachment( canvas.toBuffer( 'image/png' ) ) );
        if( game.game_over() ) {
          this.#games.delete( this.#channel.id );
          this.#types.delete( this.#channel.id );
          this.#board.delete( this.#channel.id );
          this.#channel.send( 'The end.' );
        }
      } else {
        this.#channel.send( 'Game isn\'t started' );
      }
    }
    /**
     * Send a reply.
     * @param {string} command
     * @param {string} param1
     * @param {string} param2
     */
    run( command, param1, param2 = undefined ) {
      switch (command) {
        case 'new-game': {
          this.#newGame( param1, param2 );
          break;
        }
        case 'move': {
          this.#move( param1 );
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
          this.#man( param1 );
          break;
        }
        default: {
          this.#channel.send('I don\'t know this command.');
        }
      }
    }
  }
})();
