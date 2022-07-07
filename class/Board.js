const { Player } = require( '../build/Release/Player.node' );
require( '../string.extensions' );
const { Canvas, Image, CanvasRenderingContext2D } = require( 'canvas' );
const { translate } = require( '../build/Release/translate.node' );
const { IMG } = require( '../map/img' );
module.exports = class Board {
  constructor() {}
  /**
   * The white player's pawns.
   */
  #pawnsWhite = [ 'P', 'R', 'N', 'B', 'K', 'Q' ];
  /**
   * The black player's pawns.
   */
  #pawnsBlack = [ 'p', 'r', 'n', 'b', 'k', 'q' ];
  /**
   * Canvas for rendering of a chessboard.
   */
  #canvas = new Canvas(270, 270, 'image');
  /**
   * The white player.
   * @type {Player}
   */
  #playerWhite
  /**
   * The black player.
   * @type {Player}
   */
  #playerBlack
  /**
   * Create a template to render a checkerboard.
   */
  #createStructure = () => {
    const struct = [
        '        ',
        '        ',
        '        ',
        '        ',
        '        ',
        '        ',
        '        ',
        '        ',
    ];
    const black = this.#playerBlack?.getStructure();
    const white = this.#playerWhite?.getStructure();
    if(black && white)
    for(let i = 0; i < black?.length; i++) {
      let str = struct[i];
      for(let j = 0; j < black?.length; j++) {
        if(black[i][j] !== ' ') {
          str = str.replaceAt(j, black[i][j].toUpperCase());
        }
        if(white[i][j] !== ' ') {
          str = str.replaceAt(j, black[i][j].toLowerCase());
        }
      }
      struct[i] = str;
    }
    return {struct, black, white};
  }
  /**
   * Are all the players.
   */
  isPlayers() {
    if( typeof this.#playerBlack !== 'undefined' && typeof this.#playerWhite !== 'undefined' ) {
      return true;
    }
    else {
      return false;
    }
  }
  /**
   * Set white player.
   * @param {string} id
   * @param {string} game
   */
  setWhite( id, game ) {
    this.#playerWhite = new Player( id, 'white', game );
  }
  /**
   * Set black player.
   * @param {string} id
   * @param {string} game
   */
  setBlack( id, game ) {
    this.#playerBlack = new Player( id, 'black', game );
  }
  /**
   * Get ID white player.
   */
  getWhite() {
    return this.#playerWhite?.id;
  }
  /**
   * Get ID black player.
   */
  getBlack() {
    return this.#playerBlack?.id;
  }
  /**
   * Update position pawns.
   * @param {string} color
   * @param {string} move
   */
  update( color, move ) {
    let width = translate(move[3]);
    let height = translate(move[4]);
    if(color === 'black') {
      const struct = this.#playerWhite?.getStructure();
      if(struct)
        if(struct[height][width] !== ' ') {
            this.#playerWhite?.deleteFigure(move.substring(3));
            this.#playerBlack?.updateStructure(move);
        }
    } else if(color === 'white') {
      const struct = this.#playerBlack?.getStructure();
      if(struct)
        if(struct[height][width] !== ' ') {
          this.#playerBlack?.deleteFigure(move.substring(3));
          this.#playerWhite?.updateStructure(move);
        }
    }
  }
  /**
   * Render pawn into canvas.
   * @param {string} name
   * @param {CanvasRenderingContext2D} ctx
   * @param {IMG} map
   * @param {number} positionX
   * @param {number} positionY
   * @param {Image} image
   */
  #generatePawns = ( name, ctx, map, positionX, positionY, image ) => {
    const data = map.frames.find(value => value.filename.includes(name));
    if( data.rotated ) {
      ctx.save();
      ctx.translate( data.sourceSize.w, data.sourceSize.h )
      ctx.rotate( Math.PI * 0.5 );
      ctx.rotate( Math.PI );
      ctx.scale( 1, -1 );
    }
    if(data)
      ctx.drawImage(
        image,
        data.frame.x,
        data.frame.y,
        data.frame.w,
        data.frame.h,
        ( data.rotated ? positionY : positionX ) * data.sourceSize.w * (data.rotated ? -1 : 1),
        ( data.rotated ? positionX : positionY ) * data.sourceSize.h * (data.rotated ? -1 : 1),
        data.sourceSize.w,
        data.sourceSize.h
      );
    if( data.rotated ) {
      ctx.restore();
    }
  }
  /**
   * Choosing graphics to render the pawn.
   * @param {string} char
   * @param {CanvasRenderingContext2D} ctx
   * @param {IMG} map
   * @param {string} color
   * @param {number} positionX
   * @param {number} positionY
   * @param {Image} image
   */
  #renderPawns = ( char, ctx, map, color, positionX, positionY, image ) => {
    switch( char.toUpperCase() ) {
      case 'R': {
        this.#generatePawns(`${color}Rock.png`, ctx, map, positionX, positionY, image);
        break;
      }
      case 'N': {
        this.#generatePawns(`${color}Knight.png`, ctx, map, positionX, positionY, image);
        break;
      }
      case 'B': {
        this.#generatePawns(`${color}Bishop.png`, ctx, map, positionX, positionY, image);
        break;
      }
      case 'K': {
        this.#generatePawns(`${color}King.png`, ctx, map, positionX, positionY, image);
        break;
      }
      case 'Q': {
        this.#generatePawns(`${color}Queen.png`, ctx, map, positionX, positionY, image);
        break;
      }
      case 'P': {
        this.#generatePawns(`${color}Pawn.png`, ctx, map, positionX, positionY, image);
        break;
      }
      case 'q': {
        this.#generatePawns(`${color}CircleQ.png`, ctx, map, positionX, positionY, image);
        break;
      }
      case 'p': {
        this.#generatePawns(`${color}Circle.png`, ctx, map, positionX, positionY, image);
        break;
      }
    }
  }
  /**
   * Set pawns on Board.
   * @param {string} char
   * @param {CanvasRenderingContext2D} ctx
   * @param {boolean} black
   * @param {boolean} white
   * @param {IMG} map
   * @param {number} positionX
   * @param {number} positionY
   * @param {Image} image
   */
  #setPawns = ( char, ctx, black, white, map, positionX, positionY, image ) => {
    if( black ) {
      this.#renderPawns(char, ctx, map, 'Black', positionX, positionY, image);
    }
    if( white ) {
      this.#renderPawns(char, ctx, map, 'White', positionX, positionY, image);
    }
  }
  /**
   * Generating a template from text.
   * @param {string} structure
   */
  updateBoard( structure ) {
    const struckt = structure.split( '\n' );
    delete struckt[0];
    delete struckt[struckt.length - 2];
    delete struckt[struckt.length - 1];
    for( let i = 1; i < 9; i++ ) {
      struckt[i] = struckt[i].slice( 5, struckt[i].length - 2 );
      while( struckt[i].includes( '  ' ) ) struckt[i] = struckt[i].replace( '  ', '' );
      while( struckt[i].includes( '.' ) ) struckt[i] = struckt[i].replace( '.', ' ' );
    }
    return struckt;
  }
  /**
   * Render board.
   * @param {IMG} map
   * @param {Image} image
   * @param {string[]} structure
   */
  render( map, image, structure = undefined ) {
    /**
     * @type {string[]}
     */
    let structures;
    if( structure === undefined ) {
      let { struct } = this.#createStructure();
      structures = struct;
    } else {
      structures = structure;
    }
    const ctx = this.#canvas.getContext('2d');
    ctx.font = '30px "Pixel Emulator"';
    ctx.fillStyle = '#ffffff';
    ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    for(let i = 0; i < structures.length; i++) {
      if( structures[i] === undefined )
        continue;
      for(let j = 0; j < structures[i].length; j++) {
        let num;
        if( i % 2 === 0 )
          num = j % 2;
        else
          num = (j % 2 === 0 ? 1 : 0);
        const data = map.frames.find(value => value.filename.includes(`field${num}.png`));
        if(data)
        ctx.drawImage(
          image,
          data.frame.x,
          data.frame.y,
          data.frame.w,
          data.frame.h,
          i * data.sourceSize.w,
          j * data.sourceSize.h,
          data.sourceSize.w,
          data.sourceSize.h
        );
      }
    }
    for( let i = 0; i < structures.length; i++ ) {
      if( structures[i] === undefined )
        continue;
      const str = structures[i];
      for( let j = 0; j < str.length; j++ ) {
        const char = str[j];
        for( let k = 0; k < this.#pawnsBlack.length; k++ ) {
          if( this.#pawnsBlack[k] !== char && this.#pawnsWhite[k] !== char )
            continue;
          this.#setPawns(char, ctx, this.#pawnsBlack[k] === char, this.#pawnsWhite[k] === char, map, j + 1, i - 1, image);
        }
      }
    }
    const numbers = [ '8', '7', '6', '5', '4', '3' ,'2', '1' ];
    const chars = [ 'A', 'B', 'C', 'D', 'E', 'F' ,'G', 'H' ];
    for( let i = 0; i < numbers.length; i++) {
      ctx.fillText( numbers[i], 0, (i + 1) * 30 );
      ctx.fillText( chars[i], (i + 1) * 30, this.#canvas.height );
    }
    return this.#canvas;
  }
}