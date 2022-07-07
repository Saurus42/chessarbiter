const PouchDB = require( 'pouchdb' );

const data_to_manual = [
  {
    command: 'new-game',
    description: `Generates a new game and assigns it to the channel on which the command was issued. The command accepts one mandatory parameter and the other optional. The first parameter is the type of game, be it chess or checkers, the second is whether the user is playing with a bot or with another player. Only the game of chess works, but in the future there will be a game of checkers.
Sample commands:
\`$chess new-game chess\` - see command below
\`$chess new-game chess pvc\` - command to play with a chess bot
\`$chess new-game chess pvp\` - command to play chess with another person.`
  },
  {
    command: 'man',
    description: `Manual for the bot. It allows you to get to know the commands in more detail. Its scheme is as follows:
\`$chess man command\`
Example:
\`$chess man new-game\``
  },
  {
    command: 'move',
    description: `Command to instruct the bot where to move the player's pawn. Knowledge of algebraic notation is required. If this topic is unfamiliar to you, read more under the command: \`$chess help notation\`.
Example:
\`$chess move e4\``
  },
  {
    command: 'help',
    description: `Command to help players learning to use the bot. It also allows you to get acquainted with the rules of the game and chess notation. The command parameter is optional, if it is not given, the player will be presented with general help to operate the bot.
Command schema:
\`$chess help [paramater]\``
  }
];
const data_to_help = [
  {
    param: 'notation',
    description: [`Each square of the chessboard is identified by a unique coordinate pair—a letter and a number—from White's point of view. The vertical columns of squares, called files, are labeled a through h from White's left (the queenside) to right (the kingside). The horizontal rows of squares, called ranks, are numbered 1 to 8 starting from White's side of the board. Thus each square has a unique identification of file letter followed by rank number. For example, the initial square of White's king is designated as "e1".
Each piece type (other than pawns) is identified by an uppercase letter. English-speaking players use the letters K for king, Q for queen, R for rook, B for bishop, and N for knight (since K is already used).
See the \`$chess help move\` command for more information`]
  },
  {
    param: 'move',
    description: [`Each move of a piece is indicated by the piece's uppercase letter, plus the coordinate of the destination square. For example, Be5 (bishop moves to e5), Nf3 (knight moves to f3). For pawn moves, a letter indicating pawn is not used, only the destination square is given. For example, c5 (pawn moves to c5).
When a piece makes a capture, an "x" is inserted immediately before the destination square. For example, Bxe5 (bishop captures the piece on e5). When a pawn makes a capture, the file from which the pawn departed is used to identify the pawn. For example, exd5 (pawn on the e-file captures the piece on d5).`,
`En passant captures are indicated by specifying the capturing pawn's file of departure, the "x", the destination square (not the square of the captured pawn), for example, exd6.
When two (or more) identical pieces can move to the same square, the moving piece is uniquely identified by specifying the piece's letter, followed by (in descending order of preference):
the file of departure (if they differ); or
the rank of departure (if the files are the same but the ranks differ); or
both the file and rank of departure (if neither alone is sufficient to identify the piece – which occurs only in rare cases where a player has three or more identical pieces able to reach the same square, as a result of one or more pawns having promoted).`,
`In the diagram, both black rooks could legally move to f8, so the move of the d8-rook to f8 is disambiguated as Rdf8. For the white rooks on the a-file which could both move to a3, it is necessary to provide the rank of the moving piece, i.e., R1a3.
In the case of the white queen on h4 moving to e1, neither the rank nor file alone are sufficient to disambiguate from the other white queens. As such, this move is written Qh4e1.
As above, an "x" can be inserted to indicate a capture; for example, if the final case were a capture, it would be written as Qh4xe1.`]
  },
  {
    param: 'promotion',
    description: [`When a pawn promotes, the piece promoted to is indicated at the end of the move notation, for example: e8Q (promoting to queen). In standard FIDE notation, no punctuation is used; in Portable Game Notation (PGN) and many publications, pawn promotion is indicated by the equals sign (e8=Q). Other formulations used in chess literature include parentheses (e.g. e8(Q)) and a forward slash (e.g. e8/Q).`]
  },
  {
    param: 'castling',
    description: [`Castling is indicated by the special notations 0-0 (for kingside castling) and 0-0-0 (queenside castling). While the FIDE standard [6] is to use the digit zero (0-0 and 0-0-0), PGN uses the uppercase letter O (O-O and O-O-O)`]
  }
];
async function generateManual() {
  const manual = new PouchDB( 'Manual' );
  for( let i = 0; i < data_to_manual.length; i++ ) {
    await manual.post( data_to_manual[i] );
  }
  console.log(await manual.allDocs())
}

async function generateHelp() {
  const help = new PouchDB( 'Help' );
  for( let i = 0; i < data_to_help.length; i++ ) {
    await help.post( data_to_help[i] );
  }
  console.log(await help.allDocs())
}

// generateManual();
generateHelp();