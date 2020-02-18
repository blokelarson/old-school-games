class Information_Box {
    constructor(canvasContext, xPosition, yPosition, width, height, color) {
        this.canvasContext = canvasContext;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        this.canvasContext.beginPath();
        this.canvasContext.fillStyle = this.color;
        this.canvasContext.rect(this.xPosition, this.yPosition, this.width, this.height);
        this.canvasContext.fill();
        this.canvasContext.closePath();
    }
}

class Score_Box extends Information_Box {
    constructor(canvasContext, xPosition, yPosition, width, height, color) {
        super(canvasContext, xPosition, yPosition, width, height, color);
        this.score = 0;
        // console.log(this.draw());
    }

    updateScore(score) {
        this.score += score;
    }

    draw() {
        super.draw();
        canvasContext.beginPath();
        canvasContext.fillStyle = "white";
        canvasContext.textAlign = "center";
        canvasContext.textBaseline = "middle";
        canvasContext.font = "bold 20px Verdana";
        canvasContext.fillText("Score: " + this.score, this.xPosition + this.width / 2, this.yPosition + this.height / 2);
        canvasContext.closePath();
    }
}
