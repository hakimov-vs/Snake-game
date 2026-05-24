var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

const BOX = 30;
const SPEED = 100;
let score = 0;

canvas.width = BOX * 19;
canvas.height = BOX * 19;

let dir = "";

document.addEventListener("keydown", (e)=>{
    if(dir != "down" && e.which == 38) { dir = "up"}
    if(dir != "up" && e.which == 40) { dir = "down"}
    if(dir != "left" && e.which == 39) { dir = "right"}
    if(dir != "right" && e.which == 37) { dir = "left"}
})

var groundImage = new Image();
groundImage.src = "assets/ground.png";

let snakeCoords = [];

snakeCoords[0] = {
    x: 9*BOX,
    y: 9*BOX
}

function drawSnake(x, y){
    ctx.fillStyle = "green";
    ctx.fillRect(x, y, BOX, BOX);
}

function drawGame(){
    ctx.drawImage(groundImage, 0, 0, canvas.width, canvas.height); 
    ctx.font = `${BOX * 0.95}px Arial`;
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${score}`, BOX, BOX*1.5);

    for(let i=0; i<snakeCoords.length; i++){
        drawSnake(snakeCoords[i].x, snakeCoords[i].y);
    }

    let snakeX = snakeCoords[0].x;
    let snakeY = snakeCoords[0].y;


    if (dir == "up") snakeY -= BOX;
	if (dir == "down") snakeY += BOX;
    if (dir == "left") snakeX -= BOX;
    if (dir == "right") snakeX += BOX;

    if(snakeX == 18*BOX){
        snakeX = BOX;
    }
    else if(snakeX == 0){
        snakeX = 17*BOX;
    }
    if(snakeY == 18*BOX){
        snakeY = BOX * 3;
    }
    else if(snakeY == BOX*2){
        snakeY = 17*BOX;
    }

    let head = {x: snakeX, y: snakeY}

    snakeCoords.unshift(head);

    // snakeCoords.pop();

}


var mygame = setInterval(drawGame, SPEED)
