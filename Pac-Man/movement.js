var PacMan = component(50, 50);     // Creates PacMan at particular x and y position

function component(x, y) {
    this.width = 20;     //fixed numbers, to be set to sprite boundaries
    this.height = 20;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;    
    this.currentKey = "";
    this.updatePosition = function() {              //Suppose to update PacMan's x and y, redraw P
        this.x += this.speedX;
        this.y += this.speedY;
        //ctx.drawImage(,,,);
    }  
    this.keyPress = function(){
        document.addEventListener('keydown', function(event) {  //basic movement, change for preset
            if(event.keyCode == 37 || event.keyCode == 65) {		//Left / A Key
                currentKey = "Left";
    		}
            else if(event.keyCode == 38 || event.keyCode == 87) {	//Up key / W Key
                currentKey = "Up";
    		}
    		else if(event.keyCode == 39 || event.keyCode == 68) {	//Right key / D Key
                currentKey = "Right";
    		}
            else if(event.keyCode == 40 || event.keyCode == 83) {	//Down key / S Key
                currentKey = "Down";
    		}
            else if(event.keyCode == 32) {				//Space Key, stops sprite, test purposes
    		    currentKey = "Space";
    		}
		});
    }
    this.mvmtCheck = function(){
        switch(PacMan.currentKey){          //Changes speed of Pacman to respective direction
            case "Left":                    //Separate from keypress to save direction preset
                //if (PacMan.x-2 > other.x+width){        //Condition to check for open space
                    PacMan.speedX = -2;
                    PacMan.speedY = 0;
                    currentKey = "";
                //}
                break;
            case "Right":
                PacMan.speedX = 2; 
                PacMan.speedY = 0;
                currentKey = "";
                break;
            case "Up":
                PacMan.speedX = 0; 
                PacMan.speedY = -2;
                currentKey = "";
                break;
            case "Down":
                PacMan.speedX = 0; 
                PacMan.speedY = 2;
                currentKey = "";
                break;
            case "Space":                   //Stops PacMan, testing purposes
                PacMan.speedX = 0; 
                PacMan.speedY = 0;
                currentKey = "";
                break;
            default:
                PacMan.speedX = PacMan.speedX; 
                PacMan.speedY = PacMan.speedX;
                currentKey = "";
                break;
        }
        /*
            Spot for wall collision checks, 
        */
    }
}