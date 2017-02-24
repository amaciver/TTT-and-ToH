//setup reader
const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


class HanoiGame {
  constructor(towers) {
    if (typeof towers === 'undefined') {
      towers = [[3,2,1],[],[]];
    }
    this.towers = towers;
    this.startingStack = this.towers.findIndex( (tower) => tower.length > 0);
  }

  getMove(cb) {
    //get from and to towers
    this.print();
    reader.question("From where, to where? (f,t) ", (ans) => {
      ans = ans.split(',');
      cb(ans[0], ans[1]);
    });
  }

  isValid(move) {
    if (!Array.isArray(move) ||
      move.length !== 2 ||
      !move.every( (el) => el >=0 && el < this.towers.length) ||
      !this.legalMove(move)) {
      return false;
    } else {
      return true;
    }
  }

  legalMove(move) {
    const from = move[0];
    const to = move[1];
    if (this.towers[from][this.towers[from].length-1] === undefined) {
      return false;
    }
    if (this.towers[to][this.towers[to].length-1] === undefined) {
      return true;
    }
    if (this.towers[from][this.towers[from].length-1] >
       this.towers[to][this.towers[to].length-1]) {
      return false;
    }
    return true;
  }

  processMove(move) {
    this.towers[move[1]].push(this.towers[move[0]].pop());
  }

  print() {
    console.log(this.towers);
  }

  play(completionCallback) {
    const cb = (from, to) => {
      if (this.isValid([from, to])) {
        this.processMove([from, to]);
      } else {
        console.log("error");
      }
      if (this.gameIsOver()) {
        completionCallback();
      } else {
        this.play(completionCallback);
      }
    };
    this.getMove(cb);
  }

  gameIsOver() {
    return this.towers[this.startingStack].length === 0 &&
    this.towers.filter( tower => tower.length > 0 ).length === 1;
  }
}

let g = new HanoiGame;

const cb = () => {
  console.log("Game over, you win");
  reader.close();
};

g.play(cb);
