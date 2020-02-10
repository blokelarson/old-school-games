// -2 --> Empty
// -1 --> Maze Border
//  0 --> Maze Obstacle
//  1 --> Maze Path (without food)
//  2 --> Maze Path (with food)
const BASE_MAZE = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2, -1],
    [-1,  2,  0,  0,  0,  0,  2,  0,  0,  0,  0,  0,  2, -1],
    [-1,  2,  0,  0,  0,  0,  2,  0,  0,  0,  0,  0,  2, -1],
    [-1,  2,  0,  0,  0,  0,  2,  0,  0,  0,  0,  0,  2, -1],
    [-1,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2],
    [-1,  2,  0,  0,  0,  0,  2,  0,  0,  2,  0,  0,  0,  0],
    [-1,  2,  0,  0,  0,  0,  2,  0,  0,  2,  0,  0,  0,  0],
    [-1,  2,  2,  2,  2,  2,  2,  0,  0,  2,  2,  2,  2,  0],
    [-1, -1, -1, -1, -1, -1,  2,  0,  0,  0,  0,  0,  1,  0],
    [-2, -2, -2, -2, -2, -1,  2,  0,  0,  0,  0,  0,  1,  0],
    [-2, -2, -2, -2, -2, -1,  2,  0,  0,  1,  1,  1,  1,  1],
    [-2, -2, -2, -2, -2, -1,  2,  0,  0,  1, -1, -1, -1, -1],
    [-2, -1, -1, -1, -1, -1,  2,  0,  0,  1, -1,  0,  0,  0],
    [-2,  1,  1,  1,  1,  1,  2,  1,  1,  1, -1,  0,  0,  0],
    [-2, -1, -1, -1, -1, -1,  2,  0,  0,  1, -1,  0,  0,  0],
    [-2, -2, -2, -2, -2, -1,  2,  0,  0,  1, -1, -1, -1, -1],
    [-2, -2, -2, -2, -2, -1,  2,  0,  0,  1,  1,  1,  1,  1],
    [-2, -2, -2, -2, -2, -1,  2,  0,  0,  1,  0,  0,  0,  0],
    [-1, -1, -1, -1, -1, -1,  2,  0,  0,  1,  0,  0,  0,  0],
    [-1,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  0],
    [-1,  2,  0,  0,  0,  0,  2,  0,  0,  0,  0,  0,  2,  0],
    [-1,  2,  0,  0,  0,  0,  2,  0,  0,  0,  0,  0,  2,  0],
    [-1,  2,  2,  2,  0,  0,  2,  2,  2,  2,  2,  2,  2,  2],
    [-1, -1, -1,  2,  0,  0,  2,  0,  0,  2,  0,  0,  0,  0],
    [-1, -1, -1,  2,  0,  0,  2,  0,  0,  2,  0,  0,  0,  0],
    [-1,  2,  2,  2,  2,  2,  2,  0,  0,  2,  2,  2,  2,  0],
    [-1,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  2,  0],
    [-1,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  2,  0],
    [-1,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
];

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
        for(let row = 0; row < BASE_MAZE.length; ++row) {
            this.map[row] = [];
            for(let column = 0, row_length = BASE_MAZE[row].length; column < row_length; ++column) {
                this.map[row][column] = BASE_MAZE[row][column];
                this.map[row][row_length + column] = BASE_MAZE[row][row_length - column - 1];
            }
        }
        this.maze = [];
        for(let row = 0; row < BASE_MAZE.length; ++row) {
            this.maze[row] = [];
            for(let column = 0, row_length = BASE_MAZE[row].length; column < row_length; ++column) {
                this.maze[row][column] = BASE_MAZE[row][column];
                this.maze[row][row_length + column] = BASE_MAZE[row][row_length - column - 1];
            }
        }
    }

    draw_rounded_shape(corners) {
        let lineSize = 12;
        for(let i = 4; i >= 0; --i) {
            if(i != 0) {
                canvasContext.strokeStyle = "#222222";
            } else {
                canvasContext.strokeStyle = "black";
            }
            canvasContext.beginPath();
            canvasContext.lineWidth = lineSize - 4;
            canvasContext.moveTo(this.startPosition[0] - 2 + i + lineSize / 2 + 5 + corners[0][1] * this.tileSize, this.startPosition[1] - 2 + i + lineSize / 2 + 5 + corners[0][0] * this.tileSize);
            for(let j = 1; j < corners.length; ++j) {
                canvasContext.lineTo(this.startPosition[0] - 2 + i + lineSize / 2 + 5 + corners[j][1] * this.tileSize, this.startPosition[1] - 2 + i + lineSize / 2 + 5 + corners[j][0] * this.tileSize);
            }
            canvasContext.lineTo(this.startPosition[0] - 2+ i + lineSize / 2 + 5 + corners[0][1] * this.tileSize, this.startPosition[1] - 2 + i + lineSize / 2 + 5 + corners[0][0] * this.tileSize);
            // canvasContext.fill();
            canvasContext.stroke();
            canvasContext.closePath();
        }

        // canvasCon12
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
        // console.log(components);

        //
        //
        // for(let i = 0; i < this.map.length; ++i) {
        //     for(let j = 0; j < this.map[0].length; ++j) {
        //         let val = this.map[i][j];
        //         if(val == 2) {
        //             //#FFC500
        //             canvasContext.fillStyle = "#FFC500";
        //             canvasContext.fillRect(170 + j * 20, 170 + i * 20, 30, 30);
        //             canvasContext.fillStyle = "#000000";
        //             canvasContext.arc(170 + j * 20 + 15, 170 + i * 20 + 15, 2, 0, 2 * Math.PI);
        //             canvasContext.fill();
        //             canvasContext.closePath()
        //         }
        //         else if(val == 1) {
        //             canvasContext.fillStyle = "#FFC500";
        //             canvasContext.fillRect(170 + j * 20, 170 + i * 20, 30, 30);
        //         }
        //     }
        // }
        //
        // for(let n = 5; n >= 0; --n) {
        //     for(let i = 0; i < this.map.length; ++i) {
        //         for(let j = 0; j < this.map[0].length; ++j) {
        //             let val = this.map[i][j];
        //             if(val == -1) {
        //                 if(n != 0) {
        //                     canvasContext.fillStyle = "#222222";
        //                 } else {
        //                     canvasContext.fillStyle = "black";
        //                 }
        //                 // canvasContext.fillStyle = "#06294D";
        //                 canvasContext.fillRect(175 + n + j * 20, 175 + n + i * 20, 20, 20);
        //             }
        //         }
        //     }
        // }
        // for(let i = 0; i < this.map.length; ++i) {
        //     for(let j = 0; j < this.map[0].length; ++j) {
        //         let val = this.map[i][j];
        //         if(val == 0) {
        //             canvasContext.fillStyle = "#ED3D33";
        //             canvasContext.fillRect(175 + j * 20, 175 + i * 20, 20, 20);
        //         }
        //     }
        // }




        for(let i = 0; i < components.length; ++i) {
            this.draw_rounded_shape(components[i]);
        }
    }

    draw_path() {
        for(let n = 10; n >= 0; --n) {
            for(let row = 0; row < this.maze.length; ++row) {
                for(let column = 0; column < this.maze[0].length; ++column) {
                    let tileValue = this.maze[row][column];
                    if(tileValue == 1 || tileValue == 2) {
                        let xPosition = n + (this.startPosition[0] - ((this.pathSize - this.tileSize) / 2)) + (column * this.tileSize);
                        let yPosition = n + (this.startPosition[1] - ((this.pathSize - this.tileSize) / 2)) + (row * this.tileSize);

                        canvasContext.beginPath();
                        // canvasContext.lineWidth = 10;
                        // canvasContext.strokeStyle = "#000000";
                        canvasContext.fillStyle = this.pathColor;
                        canvasContext.rect(xPosition, yPosition, this.pathSize, this.pathSize);
                        canvasContext.fill();
                        // if(n == 4) {
                        //     canvasContext.stroke();
                        // }
                        canvasContext.closePath();
                    }
                    if(tileValue == 2) {
                        let xPosition = this.startPosition[0] + this.tileSize * 0.5 + (column * this.tileSize);
                        let yPosition = this.startPosition[1] + this.tileSize * 0.5 + (row * this.tileSize);

                        canvasContext.beginPath();
                        canvasContext.fillStyle = this.foodColor;
                        canvasContext.arc(xPosition, yPosition, this.foodSize, 0, 2 * Math.PI);
                        canvasContext.fill();
                        canvasContext.closePath();
                    }
                }
            }
        }
    }

    // -2 --> Empty
    // -1 --> Maze Border
    //  0 --> Maze Obstacle
    //  1 --> Maze Path (without food)
    //  2 --> Maze Path (with food)

    draw_border() {
        let yExtension = this.pathSize - this.tileSize;
        let xExtension = this.pathSize - this.tileSize;

        for(let n = 10; n >= 0; --n)
        for(let row = 0; row < this.maze.length; ++row) {
            for(let column = 0; column < this.maze[0].length; ++column) {
                let tileValue = this.maze[row][column];


                if(tileValue == -1) {
                    let above = this.getValue(row - 1, column);
                    let below = this.getValue(row + 1, column);
                    let right = this.getValue(row, column + 1);
                    let left = this.getValue(row, column - 1);


                    let xPosition = n + (this.startPosition[0] - 10 - ((this.pathSize - this.tileSize) / 2)) + (column * this.tileSize);
                    let yPosition = n + (this.startPosition[1] - 10 - ((this.pathSize - this.tileSize) / 2)) + (row * this.tileSize);
                    let xSize = this.tileSize;
                    let ySize = this.tileSize;

                    if(above == 2 || above == 1 || below == -2 || below == null) {
                        yPosition += yExtension + 10;
                    }
                    else if(below == -1 && above == -1) {
                        ySize += yExtension + 10;

                        // ySize += 4;
                    }

                    if(left == 2 || left == 1 || right == -2 || right == null) {
                        xPosition += xExtension + 10;
                    }
                    else if(right == -1 && left == -1) {
                        xSize += xExtension + 10;
                        // xSize += 4;
                    }


                    let gradient = ["#000000", "#111111", "#222222", "#333333", "#444444", "#555555", "#666666", "#777777", "#888888", "#999999", "#AAAAAA"];

                    if(n != 0) {
                        canvasContext.fillStyle = gradient[Math.floor(n / 2)];
                    } else {
                        canvasContext.fillStyle = "black";
                    }


                    canvasContext.beginPath();
                    canvasContext.rect(xPosition, yPosition, xSize, ySize);

                    canvasContext.fill();


                    // if(n == 6) {
                    //     canvasContext.lineWidth = 2;
                    //     canvasContext.stroke();
                    // }
                    canvasContext.closePath();
                }
            }
        }
    }

    draw_border2() {
        for(let n = 5; n >= 0; --n) {
            for(let row = 0; row < this.maze.length; ++row) {
                let yLength = 0;
                let xLength = 0;
                // let necessary = false;
                let additionalX = this.pathSize - this.tileSize;
                let additionalY = this.pathSize - this.tileSize;
                for(let column = 0; column < this.maze[0].length; ++column) {
                    let tileValue = this.maze[row][column];
                    if(tileValue == 1 || tileValue == 2) {
                        xLength = this.pathSize - this.tileSize;
                    }

                    let left = this.getValue(row, column - 1);
                    let right = this.getValue(row, column + 1);
                    let above = this.getValue(row - 1, column);
                    let below = this.getValue(row + 1, column);

                    if(above == 1 || above == 2 && ((below != 1 && below != 2) || (below == null || below == -2 || below == -1))) {
                        yLength = this.pathSize - this.tileSize;
                    }


                    if(tileValue == -1) {
                        let xPosition = (this.startPosition[0] - ((this.pathSize - this.tileSize) / 2)) + (column * this.tileSize + xLength);
                        let yPosition = (this.startPosition[1] - ((this.pathSize - this.tileSize) / 2)) + (row * this.tileSize + yLength);

                        if(n != 0) {
                            canvasContext.fillStyle = "#222222";
                        } else {
                            canvasContext.fillStyle = "black";
                        }
                        canvasContext.beginPath();
                        // canvasContext.fillStyle = "#000000";
                        let x = this.tileSize;
                        let y = this.tileSize;
                        if(right != 2 && right != 1 && xLength == 0) { // column == this.maze[0].length - 1 && xLength == 0
                            x += additionalX
                        }
                        else if(above != 2 && above != 1 && below != 2 && below != 1 && yLength == 0) {
                            y += additionalY;
                        }
                        canvasContext.rect(xPosition, yPosition, x, y);

                        canvasContext.fill();
                        canvasContext.closePath();
                        xLength = 0;
                        // if(xLength == 0){
                        //     xLength = 0;
                        // } else {
                        //     xLength = this.pathSize - this.tileSize;
                        // }

                    }
                    yLength = 0;

                }
            }
        }
    }



    set_important_values() {
        this.pathColor = "#FFC500"; // Yellow
        this.foodColor = "#000000";
        this.startPosition = [40, 40];
        this.tileSize = 22;
        this.pathSize = 32;
        this.foodSize = 2;
    }

}
