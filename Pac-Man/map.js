const BASE_MAP = [
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5],
    [5, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 5],
    [5, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 5],
    [5, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 5],
    [5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [5, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
    [5, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
    [5, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0],
    [5, 5, 5, 5, 5, 5, 1, 0, 0, 0, 0, 0, 2, 0],
    [3, 3, 3, 3, 3, 5, 1, 0, 0, 0, 0, 0, 2, 0],
    [3, 3, 3, 3, 3, 5, 1, 0, 0, 2, 2, 2, 2, 2],
    [3, 3, 3, 3, 3, 5, 1, 0, 0, 2, 5, 5, 5, 5],
    [3, 5, 5, 5, 5, 5, 1, 0, 0, 2, 5, 2, 2, 2],
    [3, 2, 2, 2, 2, 2, 1, 2, 2, 2, 5, 2, 2, 2],
    [3, 5, 5, 5, 5, 5, 1, 0, 0, 2, 5, 2, 2, 2],
    [3, 3, 3, 3, 3, 5, 1, 0, 0, 2, 5, 5, 5, 5],
    [3, 3, 3, 3, 3, 5, 1, 0, 0, 2, 2, 2, 2, 2],
    [3, 3, 3, 3, 3, 5, 1, 0, 0, 2, 0, 0, 0, 0],
    [5, 5, 5, 5, 5, 5, 1, 0, 0, 2, 0, 0, 0, 0],
    [5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [5, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [5, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [5, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [5, 5, 5, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
    [5, 5, 5, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
    [5, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0],
    [5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
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

    draw_rounded_shape(corners) {
        canvasContext.strokeStyle = "black";

        canvasContext.beginPath();
        canvasContext.lineWidth = 10;
        canvasContext.moveTo(15 + 170 + corners[0][1] * 20, 15 + 170 + corners[0][0] * 20);
        for(let i = 1; i < corners.length; ++i) {
            canvasContext.lineTo(15 + 170 + corners[i][1] * 20, 15 + 170 + corners[i][0] * 20);
        }
        canvasContext.lineTo(15 + 170 + corners[0][1] * 20, 15 + 170 + corners[0][0] * 20);
        canvasContext.stroke();
        canvasContext.closePath();




    }

    getValue(row, column) {
        if(row < 0 || row > this.map.length - 1 || column < 0 || column > this.map[0].length - 1) {
            return null;
        } else {
            return this.map[row][column];
        }
    }

    draw() {

    // let components = [];
    //
    // let toAdd = [];
    // for(let i = 0; i < this.map.length; ++i) {
    //   for(let j = 0; j < this.map.length; ++j) {
    //     let val = this.map[i][j];
    //
    //     if(val == 0) {
    //       let above = this.getValue(i - 1, j);
    //       let below = this.getValue(i + i, j);
    //       let left = this.getValue(i, j - 1);
    //       let right = this.getValue(i, j + 1);
    //       if((above != 0 || below != 0) && (left != 0 || right != 0)) {
    //         components.push([i, j]);
    //       }
    //     }
    //   }
    // }

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

        let components = [];
        let currentRow = 0;
        let inBlock = false;
        let corners = [];
        let start = [];
        let skip = {0: [0], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [22], 10: [], 11: [], 12: [10],
                    13: [1], 14: [], 15: [1, 22], 16: [], 17: [], 18: [], 19: [0], 20: [], 21: [], 22: [], 23: [], 24: [25], 25: [], 26: [],
                    27: [], 28: [], 29: [], 30: []};

        console.log(this.map.length);
        let componentsIndex = 0;
        while(currentRow < this.map.length) { //this.map.length 13
            let currentCol = 0;
            while(currentCol < this.map[0].length) {
                if(skip[currentRow].includes(currentCol)) {
                    currentCol++;
                    continue;
                }
                let val = this.getValue(currentRow, currentCol);
                let left = this.getValue(currentRow, currentCol - 1);
                let above = this.getValue(currentRow - 1, currentCol);
                if(val == 0 && !inBlock && above != 0 && left != 0) {
                    inBlock = true;
                    start.push([currentRow, currentCol]);
                    components.push([]);
                    components[componentsIndex].push([currentRow, currentCol]);
                    //corners.push([currentRow, currentCol]);
                } else if(val == 0 && inBlock) {

                    skip[currentRow].push(currentCol);

                    let topRightDiagonal = this.getValue(currentRow - 1, currentCol + 1);
                    let bottomRightDiagonal = this.getValue(currentRow + 1, currentCol + 1);
                    let bottomLeftDiagonal = this.getValue(currentRow + 1, currentCol - 1);
                    let topLeftDiagonal = this.getValue(currentRow - 1, currentCol - 1);

                    let below = this.getValue(currentRow + 1, currentCol);
                    let right = this.getValue(currentRow, currentCol + 1);

                    if(currentRow == components[componentsIndex][0][0] && currentCol == components[componentsIndex][0][1]) {
                        // Back to top left corner
                        inBlock = false;
                        componentsIndex++;
                    } else if(left != 0 && above != 0) {
                        components[componentsIndex].push([currentRow, currentCol]);
                    } else if(right != 0 && above != 0) {
                        // Top right corner check
                        components[componentsIndex].push([currentRow, currentCol]);
                        currentRow++;
                        currentCol--;
                    } else if(right != 0 && below != 0) {
                        // bottom right corner check
                        components[componentsIndex].push([currentRow, currentCol]);
                        currentCol -= 2;
                    } else if(left != 0 && below != 0) {
                        // left corner go up
                        components[componentsIndex].push([currentRow, currentCol]);
                        currentRow--;
                        currentCol--;
                    }
                    else if(right != 0) {
                        // middle one... go down
                        currentRow++;
                        currentCol--;
                    } else if(right == 0 && above == 0 && topRightDiagonal != 0) {
                        components[componentsIndex].push([currentRow, currentCol]);
                    } else if(right == 0 && below == 0 && bottomRightDiagonal != 0) {
                        components[componentsIndex].push([currentRow, currentCol]);
                        currentRow++;
                        currentCol--;
                    } else if(left == 0 && below == 0 && bottomLeftDiagonal != 0) {
                        components[componentsIndex].push([currentRow, currentCol]);
                        currentCol -= 2;
                    } else if(left == 0 && above == 0 && topLeftDiagonal != 0) {
                        components[componentsIndex].push([currentRow, currentCol]);
                        currentRow--;
                        currentCol--;
                    } else if(left == 0 && below != 0) {
                        // middle one... go left
                        currentCol -= 2;
                    } else if(left != 0 && below == 0) {
                        // middle one... go up
                        currentRow--;
                        currentCol--;
                    }
                }
                currentCol++;

            }
            currentRow++;
        }
        console.log(components);


        for(let i = 0; i < this.map.length; ++i) {
            for(let j = 0; j < this.map[0].length; ++j) {
                let val = this.map[i][j];
                if(val == 5) {
                    canvasContext.fillStyle = "#06294D";
                    canvasContext.fillRect(170 + j * 20, 170 + i * 20, 30, 30);
                }
            }
        }

        for(let i = 0; i < this.map.length; ++i) {
            for(let j = 0; j < this.map[0].length; ++j) {
                let val = this.map[i][j];
                if(val == 0) {
                    canvasContext.fillStyle = "#06294D";
                    canvasContext.fillRect(185 + j * 20, 185 + i * 20, 20, 20);
                }
            }
        }

        for(let i = 0; i < this.map.length; ++i) {
            for(let j = 0; j < this.map[0].length; ++j) {
                let val = this.map[i][j];
                if(val == 1) {
                    canvasContext.fillStyle = "#FFC500";
                    canvasContext.fillRect(170 + j * 20, 170 + i * 20, 30, 30);
                    canvasContext.fillStyle = "#000000";
                    canvasContext.arc(170 + j * 20 + 15, 170 + i * 20 + 15, 2, 0, 2 * Math.PI);
                    canvasContext.fill();
                    canvasContext.closePath()
                }
                else if(val == 2) {
                    canvasContext.fillStyle = "#FFC500";
                    canvasContext.fillRect(170 + j * 20, 170 + i * 20, 30, 30);
                }
            }
        }



        for(let i = 0; i < components.length; ++i) {
            this.draw_rounded_shape(components[i]);
        }

    }
}
