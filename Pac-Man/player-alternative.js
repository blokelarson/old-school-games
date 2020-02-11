let img = document.getElementById("SpriteSheet");
img.onload = function(){
    draw();
};

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

window.requestAnimationFrame(draw);

x = 400;
y = 400;
speedX = 0;
speedY = 0;
currentKey = null;

function draw() {
    update_movement();
    update_position();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 520, 16, 32, 32, x, y, 32, 32);
    window.requestAnimationFrame(draw);
}

document.addEventListener('keydown', function(event) {  //basic movement, change for preset
    if(event.keyCode == 37 || event.keyCode == 65) {		//Left / A Key
        currentKey = "Left";
        event.preventDefault();

    }
    else if(event.keyCode == 38 || event.keyCode == 87) {	//Up key / W Key
        currentKey = "Up";
        event.preventDefault();
    }
    else if(event.keyCode == 39 || event.keyCode == 68) {	//Right key / D Key
        currentKey = "Right";
        event.preventDefault();
    }
    else if(event.keyCode == 40 || event.keyCode == 83) {	//Down key / S Key
        currentKey = "Down";
        event.preventDefault();
    }
    else if(event.keyCode == 32) {				//Space Key, stops sprite, test purposes
        currentKey = "Space";
    }
    console.log(currentKey);
});

function update_movement() {
    if (currentKey != null) {
        console.log(currentKey);
    }
    switch(currentKey){          //Changes speed of Pacman to respective direction
        case "Left":                    //Separate from keypress to save direction preset
            //if (PacMan.x-2 > other.x+width){        //Condition to check for open space
            speedX = -1;
            speedY = 0;
            currentKey = null;
            //}
            break;
        case "Right":
            speedX = 1;
            speedY = 0;
            currentKey = null;
            break;
        case "Up":
            speedX = 0;
            speedY = -1;
            currentKey = null;
            break;
        case "Down":
            speedX = 0;
            speedY = 1;
            currentKey = null;
            break;
        case "Space":                   //Stops PacMan, testing purposes
            speedX = 0;
            speedY = 0;
            currentKey = null;
            break;
        default:
            speedX = speedX;
            speedY = speedY;
            currentKey = null;
            break;
    }
}
function update_position() {
    x += speedX;
    y += speedY;
}