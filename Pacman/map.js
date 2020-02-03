const BASE_MAP = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0],
  [3, 3, 3, 3, 3, 0, 1, 0, 0, 0, 0, 0, 2, 0],
  [3, 3, 3, 3, 3, 0, 1, 0, 0, 2, 2, 2, 2, 2],
  [3, 3, 3, 3, 3, 0, 1, 0, 0, 2, 0, 0, 0, 0],
  [3, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 2, 2, 2],
  [3, 2, 2, 2, 2, 2, 1, 2, 2, 2, 0, 2, 2, 2],
  [3, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 2, 2, 2],
  [3, 3, 3, 3, 3, 0, 1, 0, 0, 2, 0, 0, 0, 0],
  [3, 3, 3, 3, 3, 0, 1, 0, 0, 2, 2, 2, 2, 2],
  [3, 3, 3, 3, 3, 0, 1, 0, 0, 2, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

//const MAP_BOUNDARIES

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x+r, y);
  this.arcTo(x+w, y,   x+w, y+h, r);
  this.arcTo(x+w, y+h, x,   y+h, r);
  this.arcTo(x,   y+h, x,   y,   r);
  this.arcTo(x,   y,   x+w, y,   r);
  this.closePath();
  return this;
}

class Map {
  constructor() {
    this.initialize();

    console.log(this.map);
  }

  initialize() {
    this.map = [];
    for(let row = 0; row < BASE_MAP.length; ++row) {
      this.map[row] = [];
      for(let column = 0, row_length = BASE_MAP[row].length; column < row_length; ++column) {
        this.map[row][column] = BASE_MAP[row][column];
        this.map[row][row_length + column] = BASE_MAP[row][row_length - column - 1];
      }
    }
  }

  getValue(row, column) {
    if(row < 0 || row > this.map.length - 1 || column < 0 || column > this.map[0].length - 1) {
      return null;
    } else {
      return this.map[row][column];
    }
  }

  draw() {
    let components = [];

    let toAdd = [];
    for(let i = 0; i < this.map.length; ++i) {
      for(let j = 0; j < this.map.length; ++j) {
        let val = this.map[i][j];

        if(val == 0) {
          let above = this.getValue(i - 1, j);
          let below = this.getValue(i + i, j);
          let left = this.getValue(i, j - 1);
          let right = this.getValue(i, j + 1);
          if((above != 0 || below != 0) && (left != 0 || right != 0)) {
            components.push([i, j]);
          }
        }
      }
    }

    // for(let i = 0; i < components.length; ++i) {
    //   if(components[i] != null) {
    //     corners = [];
    //   }
    //
    // }

    // The draw function could take th epoints in an arbitrary order and still make the correct shape.
    // The issue is getting the points that correspond to the correct thing.

    // Within the baseMap the function needs to find blocks of 0 somehow.

    // while i < 20, j < 20....
    // Jump ahead to a different i if necesarry
    // This loop will populate the corners array

    for(let i = 0; i < this.map.length; ++i) {
      for(let j = 0; j < this.map[0].length; ++j) {
        let val = this.map[i][j];
        if(val == 0) {
          canvasContext.fillStyle = "#06294D";
          canvasContext.fillRect(170 + j * 20, 170 + i * 20, 20, 20);
        } else if(val == 1) {
          canvasContext.fillStyle = "#FFC500";
          canvasContext.fillRect(170 + j * 20, 170 + i * 20, 20, 20);
          canvasContext.fillStyle = "#000000";
          canvasContext.arc(170 + j * 20 + 10, 170 + i * 20 + 10, 2, 0, 2 * Math.PI);
          canvasContext.fill();
          canvasContext.closePath()
        } else if(val == 2) {
          canvasContext.fillStyle = "#FFC500";
          canvasContext.fillRect(170 + j * 20, 170 + i * 20, 20, 20);
        }
      }
    }
  }
}
