

class Player {
    constructor(map) {
        this.map = map;
        this.row = 23;
        this.column = 14;
        this.currentKey = null;
        this.speedX = 0;
        this.speedY = 0;
        this.xPos = 400;
        this.yPos = 400;

        document.addEventListener('keydown', function(event) {  //basic movement, change for preset
            if(event.keyCode == 37 || event.keyCode == 65) {		//Left / A Key
                this.currentKey = "Left";
                event.preventDefault();

    		}
            else if(event.keyCode == 38 || event.keyCode == 87) {	//Up key / W Key
                this.currentKey = "Up";
                event.preventDefault();
    		}
    		else if(event.keyCode == 39 || event.keyCode == 68) {	//Right key / D Key
                this.currentKey = "Right";
                event.preventDefault();
    		}
            else if(event.keyCode == 40 || event.keyCode == 83) {	//Down key / S Key
                this.currentKey = "Down";
                event.preventDefault();
    		}
            else if(event.keyCode == 32) {				//Space Key, stops sprite, test purposes
    		    this.currentKey = "Space";
    		}
            console.log(this.currentKey);
    	});
    }

    update_position() {
        this.xPos += this.speedX;
        this.yPos += this.speedY;
    }

    update_movement() {
        console.log(this.currentKey);
        switch(this.currentKey){          //Changes speed of Pacman to respective direction
            case "Left":                    //Separate from keypress to save direction preset
                //if (PacMan.x-2 > other.x+width){        //Condition to check for open space
                this.speedX = -2;
                this.speedY = 0;
                this.currentKey = "";
                //}
                break;
            case "Right":
                this.speedX = 2;
                this.speedY = 0;
                this.currentKey = "";
                break;
            case "Up":
                this.speedX = 0;
                this.speedY = -2;
                this.currentKey = "";
                break;
            case "Down":
                this.speedX = 0;
                this.speedY = 2;
                this.currentKey = "";
                break;
            case "Space":                   //Stops PacMan, testing purposes
                this.speedX = 0;
                this.speedY = 0;
                this.currentKey = "";
                break;
            default:
                this.speedX = this.speedX;
                this.speedY = this.speedX;
                this.currentKey = "";
                break;
        }
    }




    draw() {
        canvasContext.beginPath();
        canvasContext.fillStyle = "green";
        // canvasContext.arc(170 + this.column * 20 + 15, 170 + this.row * 20 + 15, 10, 0, 2 * Math.PI);
        canvasContext.arc(this.xPos, this.yPos, 10, 0, 2 * Math.PI);
        canvasContext.fill();
        canvasContext.closePath();

    }
}
