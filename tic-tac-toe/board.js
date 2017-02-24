class Board {
  constructor () {
    let grid = new Array(3);
    for (let i = 0; i < grid.length; i++) {
      grid[i] = ["_","_","_"];
    }
    this.grid = grid;
  }

  isWon() {
    let result = false;
    this.allRows().forEach( (row) => {
      if (this.rowWin(row)) {
        result = row;
      }
    });
    return result;
  }

  allRows() {
    let result = [];
    result = result.concat(this.grid);
    let cols = new Array(3);
    for (let i = 0; i < cols.length; i++) {
      cols[i] = new Array(3);
    }
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid.length; j++) {
        cols[j][i] = this.grid[i][j];
      }
    }
    result = result.concat(cols);
    let leftDiag = [this.grid[0][0], this.grid[1][1], this.grid[2][2]];
    let rightDiag = [this.grid[2][0], this.grid[1][1], this.grid[0][2]];
    result.push(leftDiag);
    result.push(rightDiag);
    return result;
  }

  rowWin(row) {
    return row[0] && row.every( (el) => el === row[0]) && row[0] !== "_";
  }

  winner () {
    return (this.isWon() ? this.isWon()[0] : null);
  }

  isEmpty(pos) {
    return this.grid[pos[0]][pos[1]] === "_";
  }

  placeMark(pos, mark) {
    this.grid[pos[0]][pos[1]] = mark;
  }

  to_s() {
    let result = [];
    this.grid.forEach( (row) => result.push(row.join(" ")));
    return result.join("\n");
  }

}

module.exports = Board;



// let b = new Board;
// console.log(b.allRows());
// console.log(b.isWon());
// console.log(b.winner());
// b.placeMark([0,1], "X");
//
// console.log(b.to_s());
