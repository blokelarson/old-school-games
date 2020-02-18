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
    [-2, -1, -1, -1, -1, -1,  2,  0,  0,  1, -1,  5,  5,  5],
    [-2,  1,  1,  1,  1,  1,  2,  1,  1,  1, -1,  5,  5,  5],
    [-2, -1, -1, -1, -1, -1,  2,  0,  0,  1, -1,  5,  5,  5],
    [-2, -2, -2, -2, -2, -1,  2,  0,  0,  1, -1, -1, -1, -1],
    [-2, -2, -2, -2, -2, -1,  2,  0,  0,  1,  1,  1,  1,  1],
    [-2, -2, -2, -2, -2, -1,  2,  0,  0,  1,  0,  0,  0,  0],
    [-1, -1, -1, -1, -1, -1,  2,  0,  0,  1,  0,  0,  0,  0],
    [-1,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  0],
    [-1,  2,  0,  0,  0,  0,  2,  0,  0,  0,  0,  0,  2,  0],
    [-1,  2,  0,  0,  0,  0,  2,  0,  0,  0,  0,  0,  2,  0],
    [-1,  2,  2,  2,  0,  0,  2,  2,  2,  2,  2,  2,  2,  1],
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


class Tile {
    static x = "53";

    constructor(row, column, value) {
        this.value = value;
        this.row = row;
        this.column = column;
    }
}
// Tile.map = Map.map;



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

    initialize_2() {
        this.map = [];
        for(let row = 0; row < BASE_MAZE.length; ++row) {
            for(let column = 0; column < BASE_MAZE[0].length; ++column) {
                let tile = new Tile(this.map, row, column, BASE_MAZE[row][column]);
                this.map.push(tile);
            }
        }
    }

    getValue(row, column) {
        if(row < 0 || row > this.maze.length - 1 || column < 0 || column > this.maze[0].length - 1) {
            return null;
        } else {
            return this.maze[row][column];
        }
    }

    setValue(row, column, value) {
        this.maze[row][column] = value;
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

        // console.log(this.map.length);
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
        for(let i = 0; i < components.length; ++i) {
            this.draw_rounded_shape(components[i], i);
        }
    }

    draw_path() {
        for(let pathDepth = 0; pathDepth >= 0; --pathDepth) {
            for(let row = 0; row < this.maze.length; ++row) {
                for(let column = 0; column < this.maze[0].length; ++column) {
                    let tileValue = this.maze[row][column];
                    if(tileValue == 1 || tileValue == 2) {
                        let xPosition = pathDepth + (this.startPosition[0] - this.borderAdjustment) + (column * this.tileSize);
                        let yPosition = pathDepth + (this.startPosition[1] - this.borderAdjustment) + (row * this.tileSize);

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
    //
    // draw_path() {
    //     canvasContext.beginPath();
    //     canvasContext.fillStyle = this.pathColor;
    //     canvasContext.fillRect(this.startPosition[0], this.startPosition[1], this.tileSize * this.maze[0].length, this.tileSize * this.maze.length);
    //     canvasContext.closePath();
    // }

    // -2 --> Empty
    // -1 --> Maze Border
    //  0 --> Maze Obstacle
    //  1 --> Maze Path (without food)
    //  2 --> Maze Path (with food)

    draw_border() {
        let yExtension = this.pathSize - this.tileSize;
        let xExtension = this.pathSize - this.tileSize;

        for(let depth = this.borderDepth; depth >= 0; --depth) {
            for(let row = 0; row < this.maze.length; ++row) {
                for(let column = 0; column < this.maze[0].length; ++column) {
                    let tileValue = this.getValue(row, column);
                    if(tileValue == -1) {
                        let above = this.getValue(row - 1, column);
                        let below = this.getValue(row + 1, column);
                        let right = this.getValue(row, column + 1);
                        let left = this.getValue(row, column - 1);

                        let xPosition = depth + this.startPosition[0] - this.borderAdjustment - this.borderDepth + (column * this.tileSize);
                        let yPosition = depth + this.startPosition[1] - this.borderAdjustment - this.borderDepth + (row * this.tileSize);

                        let xSize = this.tileSize;
                        let ySize = this.tileSize;

                        if(above == 2 || above == 1 || below == -2 || below == null) {
                            yPosition += yExtension + this.borderDepth;
                        }
                        else if(below == -1 && above == -1) {
                            ySize += yExtension + this.borderDepth;

                            // ySize += 4;
                        }

                        if(left == 2 || left == 1 || right == -2 || right == null) {
                            xPosition += xExtension + this.borderDepth;
                        }
                        else if(right == -1 && left == -1) {
                            xSize += xExtension + this.borderDepth;
                            // xSize += 4;
                        }


                        let gradient = ["#000000", "#111111", "#222222", "#333333", "#444444", "#555555", "#666666", "#777777", "#888888", "#999999", "#AAAAAA"];

                        if(depth != 0) {
                            // canvasContext.fillStyle = "black";
                            canvasContext.fillStyle = gradient[Math.floor(depth / 2)];
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
    }

    help_grid() {
        for(let i = 0; i < this.maze.length; ++i) {
            for(let j = 0; j < this.maze[0].length; ++j) {
                canvasContext.beginPath();
                canvasContext.lineWidth = 1;
                canvasContext.strokeStyle = "red";
                canvasContext.rect(this.startPosition[0] + j * this.tileSize, this.startPosition[1] + i * this.tileSize, this.tileSize, this.tileSize);
                canvasContext.stroke();
            }
        }
    }


    set_important_values() {


        let columns = this.maze.length + 4;
        let rows = this.maze.length + 4;

        this.tileSize = canvas.width / rows;
        this.pathSize = this.tileSize + 16;
        this.borderDepth = 6;

        //This only works when path size modifier and border depth are same;
        this.borderAdjustment = ((this.pathSize - this.tileSize) + this.borderDepth) / 4;
        this.lineSize = (this.tileSize - this.borderDepth - (this.pathSize - this.tileSize) / 2) / 2;
        console.log("Tile size:", this.tileSize);
        console.log("Line size:", this.lineSize);
        this.lineAdjustment = this.lineSize / 2 + this.borderDepth / 2 + (this.pathSize - this.tileSize) / 4;

        this.remainingSpace = canvas.width - this.tileSize * this.maze[0].length;

        this.startPosition = [(this.remainingSpace / 2) - this.borderAdjustment + this.borderDepth / 2, ((canvas.height / columns) * 2) - this.borderAdjustment + this.borderDepth / 2];

        console.log(rows, columns);
        this.pathColor = "#FFC500";
        this.foodColor = "#000000";
        this.foodSize = 2;

        // console.log("width:", canvas.width, "height:", canvas.height);
        // console.log(this.startPosition);
        // console.log(this.startPosition[0] + (this.maze[0].length + 1) * this.tileSize, this.startPosition[1] + (this.maze.length + 1) * this.tileSize);

        this.pathDepth = 0;
    }

    set_colors() {
        this.pathColor = "#FFC500";
        this.foodColor = "#000000";
        this.foodSize = 2;
    }

    set_important_values2() {
        let preliminaryMazeSpace = canvas.height * 0.8;
        this.tileSize = 2 * Math.round((preliminaryMazeSpace / this.maze.length) / 2); // Compute preliminary tileSize and then round to the nearest even number.
        this.pathSize = this.tileSize * 1.5;

        this.pathOffset = (this.pathSize - this.tileSize) / 2; // check this

        this.borderDepth = Math.round(this.tileSize / 3);

        this.lineSize = Math.ceil(this.tileSize / 2); //(this.tileSize - this.borderDepth) / 1.5;//Math.round((this.tileSize - this.borderDepth) / 2);
        this.lineDepth = 4; //this.tileSize - this.lineSize * 2;



        // this.lineDepth = Math.ceil((this.pathSize - this.tileSize) / 2 - this.lineSize / 2);
        // console.log("lineDepth:", this.lineDepth);

        //this.lineSize = 12Math.ceil(this.lineSize);

        this.remainingSpaceHorizontal = canvas.width - (this.tileSize * this.maze[0].length);
        this.remainingSpaceVertical = canvas.height - (this.tileSize * this.maze.length);


        // let startPositionX = this.remainingSpaceHorizontal / 2;
        // let startPositionY = this.remainingSpaceVertical / 2;
        let startPositionX = Math.ceil(this.remainingSpaceHorizontal / 2);
        let startPositionY = Math.ceil(this.remainingSpaceVertical / 2);
        this.startPosition = [startPositionX, startPositionY];

        let pathStartPositionX = startPositionX - this.pathOffset;
        let pathStartPositionY = startPositionY - this.pathOffset;
        this.pathStartPosition = [pathStartPositionX, pathStartPositionY];

        let borderStartPositionX = startPositionX - this.pathOffset;
        let borderStartPositionY = startPositionY - this.pathOffset;
        this.borderStartPosition = [borderStartPositionX, borderStartPositionY];

        let lineStartPositionX = startPositionX + (this.pathSize - this.tileSize) / 2 + this.lineSize / 2;
        let lineStartPositionY = startPositionY + (this.pathSize - this.tileSize) / 2 + this.lineSize / 2;
        this.lineStartPosition = [lineStartPositionX, lineStartPositionY];
        //
        // console.log("width:", canvas.width, "height:", canvas.height);
        // console.log("preliminaryMazeSpace:", preliminaryMazeSpace);
        // console.log("tileSize:", this.tileSize);
        // console.log("pathSize:", this.pathSize);
        // console.log("borderDepth:", this.borderDepth);
        // console.log("pathOffset:", this.pathOffset);
        // console.log("lineSize:", this.lineSize);
        //
        // console.log("remainingSpaceHorizontal:", this.remainingSpaceHorizontal);
        // console.log("remainingSpaceVertical:", this.remainingSpaceVertical);
        //
        // console.log("startPosition:", this.startPosition);
        // console.log("pathStartPosition:", this.pathStartPosition);
        // console.log("borderStartPosition:", this.borderStartPosition);
        // console.log("lineStartPosition:", this.lineStartPosition);
        //
        // console.log("-----------------------------------------");
    }

    draw_path2() {
        for(let pathDepth = 0; pathDepth >= 0; --pathDepth) {
            for(let row = 0; row < this.maze.length; ++row) {
                for(let column = 0; column < this.maze[0].length; ++column) {
                    let tileValue = this.maze[row][column];
                    if(tileValue == 1 || tileValue == 2) {
                        let xPosition = this.pathStartPosition[0] + (column * this.tileSize);
                        let yPosition = this.pathStartPosition[1] + (row * this.tileSize);

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
                        // console.log("?");
                        let xPosition = this.pathStartPosition[0] + this.pathSize / 2 + (column * this.tileSize);
                        let yPosition = this.pathStartPosition[1] + this.pathSize / 2 + (row * this.tileSize);

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

    draw_rounded_shape(corners, i) {
        for(let depth = this.lineDepth; depth >= 0; --depth) {
            if(depth != 0) {
                canvasContext.strokeStyle = "#333333";
            } else {
                canvasContext.strokeStyle = "green";
            }
            canvasContext.beginPath();
            canvasContext.lineWidth = this.lineSize;
            canvasContext.lineCap = "round";
            canvasContext.lineJoin = "round";
            canvasContext.moveTo(depth + this.lineStartPosition[0] + corners[0][1] * this.tileSize, depth + this.lineStartPosition[1] + corners[0][0] * this.tileSize);
            for(let j = 1; j < corners.length; ++j) {
                if(i == 5 && (j == 2 || j == 3)) {
                    canvasContext.lineTo(depth + this.lineStartPosition[0] - this.lineDepth + corners[j][1] * this.tileSize, depth + this.lineStartPosition[1] + corners[j][0] * this.tileSize);
                } else if (i == 7 && (j == 6 || j == 7)) {
                    canvasContext.lineTo(depth + this.lineStartPosition[0] + corners[j][1] * this.tileSize, depth + this.lineStartPosition[1] + corners[j][0] * this.tileSize);
                }
                else if(i == 12 && (j == 3 || j == 4)) {
                    canvasContext.lineTo(depth + this.lineStartPosition[0] + corners[j][1] * this.tileSize, depth + this.lineStartPosition[1] - this.lineDepth + corners[j][0] * this.tileSize);

                }

                else if((i == 6 || i == 11 || i == 17) && (j == 5 || j == 6)) {
                    canvasContext.lineTo(depth + this.lineStartPosition[0] + corners[j][1] * this.tileSize, depth + this.lineStartPosition[1] - this.lineDepth + corners[j][0] * this.tileSize);

                } else if((i == 16 || i == 18) && (j == 2 || j == 3 || j == 6 || j == 7)) {
                    if(j == 2 || j == 3) {
                        canvasContext.lineTo(depth + this.lineStartPosition[0] - this.lineDepth + corners[j][1] * this.tileSize, depth + this.lineStartPosition[1] + corners[j][0] * this.tileSize);
                    }
                    else if(j == 6 || j == 7) {
                        canvasContext.lineTo(depth + this.lineStartPosition[0] + corners[j][1] * this.tileSize, depth + this.lineStartPosition[1] + corners[j][0] * this.tileSize);
                    }

                }
                else if(corners[j][1] > corners[0][1] && corners[j][0] > corners[0][0]) {
                    canvasContext.lineTo(depth + this.lineStartPosition[0] - this.lineDepth + corners[j][1] * this.tileSize, depth + this.lineStartPosition[1] - this.lineDepth + corners[j][0] * this.tileSize);
                }
                else if(corners[j][1] > corners[0][1]) {
                    canvasContext.lineTo(depth + this.lineStartPosition[0] - this.lineDepth + corners[j][1] * this.tileSize, depth + this.lineStartPosition[1] + corners[j][0] * this.tileSize);
                } else if(corners[j][0] > corners[0][0]) {
                    canvasContext.lineTo(depth + this.lineStartPosition[0] + corners[j][1] * this.tileSize, depth + this.lineStartPosition[1] - this.lineDepth + corners[j][0] * this.tileSize);
                }
                else {
                    canvasContext.lineTo(depth + this.lineStartPosition[0] + corners[j][1] * this.tileSize, depth + this.lineStartPosition[1] + corners[j][0] * this.tileSize);
                }
            }
            canvasContext.lineTo(depth + this.lineStartPosition[0] + corners[0][1] * this.tileSize, depth + this.lineStartPosition[1] + corners[0][0] * this.tileSize);
            // canvasContext.fillStyle = "blue";
            // canvasContext.fill();
            canvasContext.stroke();
            canvasContext.closePath();
        }

        // canvasCon12
    }

    get_player_radius() {
        return this.pathSize;
    }

    get_player_position() {
        let xPosition = this.pathStartPosition[0] + this.pathSize / 2 + (13.5 * this.tileSize);
        let yPosition = this.pathStartPosition[1] + this.pathSize / 2 + (23 * this.tileSize);
        return [xPosition, yPosition];
    }

    // get_row(yPos) {
    //     let rawPos = yPos - this.startPosition[1];
    //     return rawPos / this.tileSize;
    // }

    make_middle_value_array() {
        this.middle_value = [];
        for(let i = 0; i < this.map.length; ++i) {
            this.middle_value[i] = [];
            for(let j = 0; j < this.map[0].length; ++j) {
                let xPosition = this.pathStartPosition[0] + this.pathSize / 2 + (j * this.tileSize);
                let yPosition = this.pathStartPosition[1] + this.pathSize / 2 + (i * this.tileSize);
                this.middle_value[i].push([xPosition, yPosition]);
            }
        }
    }

    draw_border2() {
        let yExtension = this.pathSize - this.tileSize;
        let xExtension = this.pathSize - this.tileSize;  //this.pathSize - this.tileSize;
        let ySizeExtension = this.pathSize - this.tileSize;
        let xSizeExtension = this.pathSize - this.tileSize;

        let special = [[0, 0, "+x"], [0, 26, "+x"], [9, 0, "+x"], [9, 26, "+x"], [13, 1, "+x"], [13, 25, "+x"], [15, 1, "+x"], [15, 25, "+x"], [19, 0, "+x"], [19, 26, "+x"], [25, 1, "-x"], [25, 26, "+x"], [30, 0, "+x"], [30, 26, "+x"], [1, 0, "-y"], [1, 13, "-y"], [1, 27, "-y"],
                        [8, 0, "+y"], [8, 27, "+y"], [20, 0, "-y"], [20, 27, "-y"], [29, 0, "+y"], [29, 27, "+y"]];

        for(let depth = this.borderDepth; depth >= 0; --depth) {
            for(let row = 0; row < this.maze.length; ++row) {
                for(let column = 0; column < this.maze[0].length; ++column) {
                    let tileValue = this.getValue(row, column);
                    if(tileValue == -1) {
                        let above = this.getValue(row - 1, column);
                        let below = this.getValue(row + 1, column);
                        let farBelow = this.getValue(row + 2, column);
                        let right = this.getValue(row, column + 1);
                        let farRight = this.getValue(row, column + 2);
                        let left = this.getValue(row, column - 1);

                        let xPosition = depth + this.borderStartPosition[0] + (column * this.tileSize);
                        let yPosition = depth + this.borderStartPosition[1] + (row * this.tileSize);

                        let xSize = this.tileSize - this.borderDepth;
                        let ySize = this.tileSize - this.borderDepth;

                        // for(let i = 0; i < special.length; ++i) {
                        //     let test = special[i];
                        //     if(test[0] == row && test[1] == column) {
                        //         console.log("?");
                        //         if(test[2] == "+x") {
                        //             xSize += xSizeExtension;
                        //         } else if(test[2] == "-x") {
                        //             xPosition -= xExtension;
                        //         } else if(test[2] == "-y") {
                        //             yPosition -= yExtension;
                        //             ySize += ySizeExtension;
                        //         } else if(test[2] == "+y") {
                        //             ySize += ySizeExtension;
                        //         }
                        //     }
                        // }

                        if(left == 1 || left == 2 || right == -2 || right == null) {
                            xPosition += xExtension;
                        } else if(left == -1 && right == -1) {
                            xSize += xSizeExtension;
                        }
                        if(above == 1 || above == 2 || below == -2 || below == null) {
                            yPosition += yExtension;
                        } else if(above == -1 && below == -1) {
                            ySize += ySizeExtension;
                        }


                        let gradient = ["#000000", "#111111", "#222222", "#333333", "#444444", "#555555", "#666666", "#777777", "#888888", "#999999", "#AAAAAA"];

                        if(depth != 0) {
                            canvasContext.fillStyle = "#333333";
                            // canvasContext.fillStyle = gradient[Math.floor(depth / 2)];
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
    }
}
