//
// window.addEventListener("resize", function(event) {
//     canvas.height = window.innerHeight
//     canvas.width = canvas.height;
//
//     canvasContext.fillStyle = "#06294D";
//     // canvasContext.fillStyle = "#FFC500";
//     //#ED3D33
//     // canvasContext.fillStyle = "#000000";
//     canvasContext.fillRect(0, 0, canvas.width, canvas.height);
//     maze.set_important_values();
//     maze.draw_path();
//     maze.draw_border();
//     maze.help_grid();
//     maze.draw();
// });

//
window.addEventListener("resize", function(event) {
    canvas.height = window.innerHeight
    canvas.width = canvas.height;

    canvasContext.fillStyle = "#06294D";
    // canvasContext.fillStyle = "#FFC500";
    //#ED3D33
    // canvasContext.fillStyle = "#000000";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    maze.set_colors();
    maze.set_important_values2();
    maze.make_middle_value_array();
    player.update_radius();
});

document.addEventListener('keydown', function(event) {  //basic movement, change for preset
    if(event.keyCode == 37 || event.keyCode == 65) {		//Left / A Key
        player.update_current_button("left");
        // currentKey = "left";
    }
    else if(event.keyCode == 38 || event.keyCode == 87) {	//Up key / W Key
        player.update_current_button("up");
        // currentKey = "up";
    }
    else if(event.keyCode == 39 || event.keyCode == 68) {	//Right key / D Key
        player.update_current_button("right");
        // currentKey = "right";
    }
    else if(event.keyCode == 40 || event.keyCode == 83) {	//Down key / S Key
        player.update_current_button("down");
        // currentKey = "down";
    }
    else if(event.keyCode == 32) {				//Space Key, stops sprite, test purposes
        player.currentButton = "space";
        // currentKey = "space";
    }
    console.log(player.currentButton);
});


var canvas = document.getElementById("game-canvas");
var canvasContext = canvas.getContext("2d");


canvas.height = window.innerHeight
canvas.width = canvas.height;

// canvas.width = 400;
// canvas.height = 400;


var maze = new Map();
console.log(maze);
// maze.draw();

canvasContext.fillStyle = "#06294D";
// canvasContext.fillStyle = "#FFC500";
//#ED3D33
// canvasContext.fillStyle = "#000000";
canvasContext.fillRect(0, 0, canvas.width, canvas.height);
maze.set_colors();
maze.set_important_values2();
maze.make_middle_value_array();
// maze.draw_path();
// maze.draw_border();

maze.draw_path2();
maze.draw_border2();
maze.draw();
// maze.help_grid();

// maze.initialize_2();
// console.log(maze.map);

console.log(maze.middle_value);

var player = new Player(maze);
player.draw();
player.draw_score();



// canvasContext.roundRect(35, 10, 225, 110, 40).stroke();

function loop() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.fillStyle = "#06294D";
    // canvasContext.fillStyle = "#FFC500";
    //#ED3D33
    // canvasContext.fillStyle = "#000000";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    maze.draw_path2();
    maze.draw_border2();
    maze.draw();
    // maze.help_grid();
    player.update_position();
    player.draw();
    player.draw_score();
    window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
