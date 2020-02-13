
class Player {
    constructor(map) {
        this.map = map;
        this.radius = map.get_player_radius() / 2;
        this.pos = this.map.get_player_position();
        this.row = 23;
        this.column = 13;
        this.speedX = -1.5;
        this.speedY = 0;
        this.direction = "left";
        this.currentButton = null;
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
        let left = this.map.getValue(this.row, this.column - 1);
        let up = this.map.getValue(this.row - 1, this.column);
        let down = this.map.getValue(this.row + 1, this.column);

        if(this.currentButton == "left" && (left == 1 || left == 2)) {
            this.direction = "left";
            this.speedX = -1.5;
            this.speedY = 0;
        } else if(this.currentButton == "right" && (right == 1 || right == 2)) {
            this.direction = "right";
            this.speedX = 1.5;
            this.speedY = 0;
        } else if(this.currentButton == "up" && (up == 1 || up == 2)) {
            console.log("We in here");
            this.direction = "up";
            this.speedX = 0;
            this.speedY = -1.5;
        } else if(this.currentButton == "down" && (down == 1 || down == 2)) {
            this.direction = "down";
            this.speedX = 0;
            this.speedY = 1.5;
        }
    }

    update_position() {


        if(this.direction == "left") {
            this.pos[0] += this.speedX;

            let leftCenter = this.map.middle_value[this.row][this.column - 1];
            if(this.pos[0] <= leftCenter[0]) {
                this.column--;
                let result = this.try_direction_change();

                let left = this.map.getValue(this.row, this.column - 1);
                if(left != 1 && left != 2 && (!result)) {
                    this.pos = this.map.middle_value[this.row][this.column];
                    this.direction = "none";
                    this.speedX = 0;
                    this.speedY = 0;
                    this.currentButton = null;
                }
            }
            // console.log(leftCenter);
        }
        if(this.direction == "up") {
            this.pos[1] += this.speedY;

            let upCenter = this.map.middle_value[this.row - 1][this.column];
            console.log(this.pos[1], upCenter);
            if(this.pos[1] <= upCenter[1]) {
                this.row--;
                console.log("Row:", this.row);
                console.log("Current Button:", this.currentButton);
                let result = this.try_direction_change();

                let up = this.map.getValue(this.row - 1, this.column);
                if(up != 1 && up != 2 && (!result)) {
                    this.pos = this.map.middle_value[this.row][this.column];
                    this.direction = "none";
                    this.speedX = 0;
                    this.speedY = 0;
                    this.currentButton = null;
                }
            }
        }
        if(this.direction == "right") {
            this.pos[0] += this.speedX;

            let rightCenter = this.map.middle_value[this.row][this.column + 1];
            if(this.pos[0] >= rightCenter[0]) {
                this.column++;
                let result = this.try_direction_change();

                let right = this.map.getValue(this.row, this.column + 1);
                if(right != 1 && right != 2 && !(result)) {
                    this.pos = this.map.middle_value[this.row][this.column];
                    this.direction = "none";
                    this.speedX = 0;
                    this.speedY = 0;
                    this.currentButton = null;
                }
            }
        }
        if(this.direction == "down") {
            this.pos[1] += this.speedY;

            let downCenter = this.map.middle_value[this.row + 1][this.column];
            if(this.pos[1] >= downCenter[1]) {
                this.row++;
                let result = this.try_direction_change();

                let down = this.map.getValue(this.row + 1, this.column);
                if(down != 1 && down != 2 && !(result)) {
                    this.pos = this.map.middle_value[this.row][this.column];
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
                this.pos = this.map.middle_value[this.row][this.column];
                this.direction = "up";
                this.speedX = 0;
                this.speedY = -1.5;
                this.currentButton = null;
                return true;
            }
        }
        if(this.currentButton == "down") {
            let down = this.map.getValue(this.row + 1, this.column);
            if(down == 2 || down == 1) {
                this.pos = this.map.middle_value[this.row][this.column];
                this.direction = "down";
                this.speedX = 0;
                this.speedY = 1.5;
                this.currentButton = null;
                return true;
            }
        }
        if(this.currentButton == "left") {
            let left = this.map.getValue(this.row, this.column - 1);
            if(left == 2 || left == 1) {
                this.pos = this.map.middle_value[this.row][this.column];
                this.direction = "left";
                this.speedX = -1.5;
                this.speedY = 0;
                this.currentButton = null;
                return true;
            }
        }
        if(this.currentButton == "right") {
            let right = this.map.getValue(this.row, this.column + 1);
            if(right == 2 || right == 1) {
                this.pos = this.map.middle_value[this.row][this.column];
                this.direction = "right";
                this.speedX = 1.5;
                this.speedY = 0;
                this.currentButton = null;
                return true;
            }
        }
        return false;
        // if(this.currentButton == "")
    }
    // get_row_and_column() {
    //     r = this.map.get_row(pos[1]);
    // }

    draw() {
        // let pos = this.map.get_player_position(this.row, this.column);
        // console.log(pos);
        canvasContext.beginPath();
        canvasContext.fillStyle = "red";
        canvasContext.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
        canvasContext.fill();
        canvasContext.closePath();
    }
}
