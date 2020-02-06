

var canvas = document.getElementById("canvas");
var canvasContext = canvas.getContext("2d");

canvasContext.fillStyle = "#ED3D33";
canvasContext.fillRect(0, 0, canvas.width, canvas.height);

var map = new Map();
map.draw();

var player = new Player(map);
player.draw();



// canvasContext.roundRect(35, 10, 225, 110, 40).stroke();

function loop() {
    player.update_movement();
    player.update_position();
    player.draw();
    window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
