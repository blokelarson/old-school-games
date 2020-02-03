

var canvas = document.getElementById("canvas");
var canvasContext = canvas.getContext("2d");

canvasContext.fillStyle = "#ED3D33";
canvasContext.fillRect(0, 0, canvas.width, canvas.height);

map = new Map();
map.draw();



// canvasContext.roundRect(35, 10, 225, 110, 40).stroke();
