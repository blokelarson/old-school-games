

var canvas = document.getElementById("canvas");
var canvasContext = canvas.getContext("2d");

canvasContext.fillStyle = "#06294D";
//#ED3D33
// canvasContext.fillStyle = "#000000";
canvasContext.fillRect(0, 0, canvas.width, canvas.height);

var maze = new Map();
console.log(maze);
// maze.draw();

maze.set_important_values();
maze.draw_path();
maze.draw_border();
maze.draw();




// var player = new Player(map);
// player.draw();



// canvasContext.roundRect(35, 10, 225, 110, 40).stroke();

// function loop() {
//     player.update_movement();
//     player.update_position();
//     player.draw();
//     window.requestAnimationFrame(loop);
// }
//
// window.requestAnimationFrame(loop);
