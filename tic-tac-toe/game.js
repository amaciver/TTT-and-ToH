//setup reader
const readline = require('readline');

const rd = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const Board = require('./board.js');

class TTTGame {
  constructor(reader) {
    this.board = new Board;
    this.reader = reader;
    this.currentPlayer = "X";
  }

  gameIsOver() {
    let flat = this.board.grid.reduce( (result, el) => result.concat(el) );
    return this.board.isWon() || !flat.some( (el) => el === "_");
  }

  getMove(cb) {
    //get from and to towers
    console.log(this.board.to_s());
    this.reader.question("where? (r,c)", (ans) => {
      ans = ans.split(',');
      cb(ans[0], ans[1]);
    });
  }

  run(completionCallback) {
    const cb = (row, col) => {
      console.log(row, col);
      if (this.validPos([row, col])) {
        this.board.placeMark([row, col], this.currentPlayer);
      }
      this.switchPlayers();

      if (this.gameIsOver()) {
        completionCallback();
      } else {
        this.run(completionCallback);
      }
    };
    this.getMove(cb);
  }

  validPos(pos) {
    let bounds = ["0","1","2"];
    console.log(bounds.includes(pos[0]));
    if (!bounds.includes(pos[0]) || !bounds.includes(pos[1])) {
      return false;
    }
    return this.board.isEmpty(pos);
  }

  switchPlayers() {
    if (this.currentPlayer === "X") {
      this.currentPlayer = "O";
    } else {
      this.currentPlayer = "X";
    }
  }
}

let g = new TTTGame(rd);

const cb = () => {
  g.switchPlayers();
  console.log(`Game over, ${g.currentPlayer} wins!`);
  g.reader.close();
};

g.run(cb);
