
class Player {
    constructor(map) {
        this.map = map;
        this.radius = map.get_player_radius() / 2;
        this.pos = this.map.get_player_position();
        this.row = 23;
        this.column = 13;
        this.speedX = -2;
        this.speedY = 0;
        this.direction = "left";
        this.pastdir = null;
        this.frameCounter = 0;
        this.dirFrames = [0, 1, 2, 1];
        this.frameIndex = 0;
        this.currentButton = null;
        this.scoreBox = new Score_Box(canvasContext, canvas.width / 2 - 75, 0, 150, 30, "black");
    }

    update_current_button(change) {
        this.currentButton = change;
        this.change_direction();
    }

    update_radius() {
        console.log(this.map.get_player_radius());
        this.radius = this.map.get_player_radius() / 2;
    }

    change_direction() {
        let right = this.map.getValue(this.row, this.column + 1);
        let rightPos = this.map.middle_value[this.row][this.column + 1];
        let left = this.map.getValue(this.row, this.column - 1);
        let leftPos = this.map.middle_value[this.row][this.column - 1];
        let up = this.map.getValue(this.row - 1, this.column);
        let upPos = this.map.middle_value[this.row - 1][this.column];
        let down = this.map.getValue(this.row + 1, this.column);
        let downPos = this.map.middle_value[this.row + 1][this.column];

        if(this.currentButton == "left" && (left == 1 || left == 2) && (this.pos[1] == leftPos[1])) {
            this.direction = "left";
            this.speedX = -2;
            this.speedY = 0;
        } else if(this.currentButton == "right" && (right == 1 || right == 2) && (this.pos[1] == rightPos[1])) {
            this.direction = "right";
            this.speedX = 2;
            this.speedY = 0;
        } else if(this.currentButton == "up" && (up == 1 || up == 2) && (this.pos[0] == upPos[0])) {
            this.direction = "up";
            this.speedX = 0;
            this.speedY = -2;
        } else if(this.currentButton == "down" && (down == 1 || down == 2) && (this.pos[0] == downPos[0])) {
            this.direction = "down";
            this.speedX = 0;
            this.speedY = 2;
        }
    }

    update_position() {
        // console.log(this.row, this.column);
        // console.log(this.direction);

        if(this.direction == "left") {
            this.pos[0] += this.speedX;

            let leftCenter = this.map.middle_value[this.row][this.column - 1].slice();
            if(this.pos[0] <= leftCenter[0]) {
                this.column--;
                if(this.map.getValue(this.row, this.column) == 2) {
                    this.map.setValue(this.row, this.column, 1);
                    this.scoreBox.updateScore(10);

                }

                let result = this.try_direction_change();

                let left = this.map.getValue(this.row, this.column - 1);
                if(left != 1 && left != 2 && (!result)) {
                    this.pos = this.map.middle_value[this.row][this.column].slice();
                    this.direction = "none";
                    this.speedX = 0;
                    this.speedY = 0;
                    this.currentButton = null;
                }
                if (left==-2) {         //Doesn't properly track Pac-Man's position, stays at tunnel after tp
                    this.pos = this.map.middle_value[this.row][26].slice();
                    this.direction = "left";
                    this.speedX = -2;
                    this.speedY = 0;
                    this.currentButton = null;
                }
            }
            // console.log(leftCenter);
        }
        if(this.direction == "up") {
            this.pos[1] += this.speedY;

            let upCenter = this.map.middle_value[this.row - 1][this.column].slice();
            if(this.pos[1] <= upCenter[1]) {
                this.row--;
                if(this.map.getValue(this.row, this.column) == 2) {
                    this.map.setValue(this.row, this.column, 1);
                    this.scoreBox.updateScore(10);

                }
                // console.log("Row:", this.row);
                // console.log("Current Button:", this.currentButton);
                let result = this.try_direction_change();
                // console.log("Result:", result);
                // console.log("Current Direction:", this.direction);

                let up = this.map.getValue(this.row - 1, this.column);
                // console.log("Up Value:", up);
                if(up != 1 && up != 2 && (!result)) {
                    this.pos = this.map.middle_value[this.row][this.column].slice();
                    // console.log
                    this.direction = "none";
                    this.speedX = 0;
                    this.speedY = 0;
                    this.currentButton = null;
                }
            }
        }
        if(this.direction == "right") {
            this.pos[0] += this.speedX;

            let rightCenter = this.map.middle_value[this.row][this.column + 1].slice();
            if(this.pos[0] >= rightCenter[0]) {
                this.column++;
                if(this.map.getValue(this.row, this.column) == 2) {
                    this.map.setValue(this.row, this.column, 1);
                    this.scoreBox.updateScore(10);

                }

                let result = this.try_direction_change();

                let right = this.map.getValue(this.row, this.column + 1);
                if(right != 1 && right != 2 && !(result)) {
                    this.pos = this.map.middle_value[this.row][this.column].slice();
                    this.direction = "none";
                    this.speedX = 0;
                    this.speedY = 0;
                    this.currentButton = null;
                }
                if (right==-2) {
                    this.pos = this.map.middle_value[this.row][1].slice();
                    this.direction = "right";
                    this.speedX = 2;
                    this.speedY = 0;
                    this.currentButton = null;
                }
            }
        }
        if(this.direction == "down") {
            this.pos[1] += this.speedY;

            let downCenter = this.map.middle_value[this.row + 1][this.column].slice();
            if(this.pos[1] >= downCenter[1]) {
                this.row++;
                if(this.map.getValue(this.row, this.column) == 2) {
                    this.map.setValue(this.row, this.column, 1);
                    this.scoreBox.updateScore(10);

                }
                let result = this.try_direction_change();

                let down = this.map.getValue(this.row + 1, this.column);
                if(down != 1 && down != 2 && !(result)) {
                    this.pos = this.map.middle_value[this.row][this.column].slice();
                    this.direction = "none";
                    this.speedX = 0;
                    this.speedY = 0;
                    this.currentButton = null;
                }
            }
        }
    }

    try_direction_change() {
        if(this.currentButton == "up") {
            console.log("HERE");
            let above = this.map.getValue(this.row - 1, this.column);
            if(above == 2 || above == 1) {
                this.pos = this.map.middle_value[this.row][this.column].slice();
                this.direction = "up";
                this.speedX = 0;
                this.speedY = -2;
                this.currentButton = null;
                return true;
            }
        }
        if(this.currentButton == "down") {
            let down = this.map.getValue(this.row + 1, this.column);
            if(down == 2 || down == 1) {
                this.pos = this.map.middle_value[this.row][this.column].slice();
                this.direction = "down";
                this.speedX = 0;
                this.speedY = 2;
                this.currentButton = null;
                return true;
            }
        }
        if(this.currentButton == "left") {
            let left = this.map.getValue(this.row, this.column - 1);
            if(left == 2 || left == 1) {
                this.pos = this.map.middle_value[this.row][this.column].slice();
                this.direction = "left";
                this.speedX = -2;
                this.speedY = 0;
                this.currentButton = null;
                return true;
            }
        }
        if(this.currentButton == "right") {
            let right = this.map.getValue(this.row, this.column + 1);
            if(right == 2 || right == 1) {
                this.pos = this.map.middle_value[this.row][this.column].slice();
                this.direction = "right";
                this.speedX = 2;
                this.speedY = 0;
                this.currentButton = null;
                return true;
            }
        }
        // if(this.currentButton == null) {
        //     this.currentButton = this.direction;
        //     // if(this.direction == "up") {
        //     //     this.currentButton = "up";
        //     // } else if(this.direction == "down") {
        //     //     this.currentButton = "down";
        //     // } else if (this.direction == "right") {
        //     //     this.currentButton = "right";
        //     // } else if(this.direction == "left") {
        //     //     this.currentButton = "left";
        //     // }
        //     // return true;
        // }
        return false;
        // if(this.currentButton == "")
    }
    // get_row_and_column() {
    //     r = this.map.get_row(pos[1]);
    // }

    draw() {
        // let pos = this.map.get_player_position(this.row, this.column);
        // console.log(pos);
        var x = this.pos[0], y = this.pos[1], ctx = canvasContext, dir = null;
        ctx.beginPath();
        ctx.fillStyle = "red";
        if (this.speedX > 0){
            dir = "R";
            this.pastdir = dir;
            this.frame_count();
        }
        else if (this.speedX < 0){
            dir = "L";
            this.pastdir = dir;
            this.frame_count();
        }
        else if (this.speedY > 0){
            dir = "D";
            this.pastdir = dir;
            this.frame_count();
        }
        else if (this.speedY < 0){
            dir = "U";
            this.pastdir = dir;
            this.frame_count();
        }
        else{
            dir = this.pastdir;
        }
        this.draw_dir(dir, ctx, x , y);
        ctx.fill();
        ctx.closePath();
    }

    frame_count(){
        this.frameCounter++;
        if (this.frameCounter == 4) {
            if (this.frameIndex == 3) {
                this.frameIndex = 0;
            }
            else {
                this.frameIndex++;
            }
            this.frameCounter = 0;
        }
    }

    draw_dir(dir, ctx, x, y){
        if (dir == "R") {
            if (this.dirFrames[this.frameIndex] == 0) {
                ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
            }
            if (this.dirFrames[this.frameIndex] == 1) {
                ctx.arc(x, y, this.radius, Math.PI/6, 7 * Math.PI/6);
                ctx.moveTo(x, y);
                ctx.arc(x, y, this.radius, 5 * Math.PI/6, 11 * Math.PI/6);
            }
            if (this.dirFrames[this.frameIndex] == 2) {
                ctx.arc(x, y, this.radius, Math.PI/4, 5 * Math.PI/4);
                ctx.moveTo(x, y);
                ctx.arc(x, y, this.radius, 3 * Math.PI/4, 7 * Math.PI/4);
            }
        }
        else if (dir == "L") {
            if (this.dirFrames[this.frameIndex] == 0) {
                ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
            }
            if (this.dirFrames[this.frameIndex] == 1) {
                ctx.arc(x, y, this.radius, 5 * Math.PI/6, 11 * Math.PI/6,true);
                ctx.moveTo(x, y);
                ctx.arc(x, y, this.radius, 1 * Math.PI/6, 7 * Math.PI/6,true);
            }
            if (this.dirFrames[this.frameIndex] == 2) {
                ctx.arc(x, y, this.radius, 3 * Math.PI/4, 7 * Math.PI/4, true);
                ctx.moveTo(x, y);
                ctx.arc(x, y, this.radius, 1 * Math.PI/4, 5 * Math.PI/4, true);
            }
        }
        else if (dir == "D") {
            if (this.dirFrames[this.frameIndex] == 0) {
                ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
            }
            if (this.dirFrames[this.frameIndex] == 1) {
                ctx.arc(x, y, this.radius, 4 * Math.PI/6, 10 * Math.PI/6);
                ctx.moveTo(x, y);
                ctx.arc(x, y, this.radius, 8 * Math.PI/6, 14 * Math.PI/6);
            }
            if (this.dirFrames[this.frameIndex] == 2) {
                ctx.arc(x, y, this.radius, 5* Math.PI/4, 9 * Math.PI/4);
                ctx.moveTo(x, y);
                ctx.arc(x, y, this.radius, 3 * Math.PI/4, 7 * Math.PI/4);
            }
        }
        else if (dir == "U") {
            if (this.dirFrames[this.frameIndex] == 0) {
                ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
            }
            if (this.dirFrames[this.frameIndex] == 1) {
                ctx.arc(x, y, this.radius, 2 * Math.PI/6, 8 * Math.PI/6);
                ctx.moveTo(x, y);
                ctx.arc(x, y, this.radius, 10 * Math.PI/6, 16 * Math.PI/6);
            }
            if (this.dirFrames[this.frameIndex] == 2) {
                ctx.arc(x, y, this.radius, Math.PI/4, 5 * Math.PI/4);
                ctx.moveTo(x, y);
                ctx.arc(x, y, this.radius, 7 * Math.PI/4, 11 * Math.PI/4);
            }
        }
    }

    draw_score() {
        this.scoreBox.draw();
    }
}
