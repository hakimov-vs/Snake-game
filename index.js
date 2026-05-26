var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

const BOX = 30;
const SPEED = 200;
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
    x: 8*BOX,
    y: 9*BOX
}
snakeCoords[1] = {
    x: 9*BOX,
    y: 9*BOX
}

function drawSnake(x, y){
     ctx.beginPath();

    ctx.arc(
        x + BOX/2,   
        y + BOX/2,   
        BOX/2,  
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "green";
    ctx.fill();

    ctx.closePath();
}

var myFoodList = ["banana", "apple", "carrot", "watermelon"];
var myFoodItem = () => myFoodList[Math.floor(Math.random() * 4)];

var myFood = new Image();

let FoodCoords = {
	x: Math.floor(17 * Math.random() + 1) * BOX,
	y: Math.floor(15 * Math.random() + 3) * BOX,
    image: myFoodItem(),
	update(){
		this.x = Math.floor(17 * Math.random() + 1) * BOX;
	    this.y = Math.floor(15 * Math.random() + 3) * BOX;
        this.image = myFoodItem();
	}
}

let pointForFood = 0;

function drawGame(){
    ctx.drawImage(groundImage, 0, 0, canvas.width, canvas.height); 
    ctx.font = `${BOX * 0.95}px Arial`;
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${score}`, BOX, BOX*1.5);

    let food = FoodCoords.image;

    myFood.src = `assets/${food}.png`;

    if(food == "banana"){
        pointForFood = 1;
    }
    else if(food == "apple"){
        pointForFood = 2;
    }
    else if(food == "carrot"){
        pointForFood = 3;
    }
    else if(food == "watermelon"){
        pointForFood = 4;
    }
    
    ctx.fillText(food.toUpperCase() + ` ${pointForFood}`, BOX*8, BOX*1.5);

    ctx.drawImage(myFood, FoodCoords.x, FoodCoords.y, BOX, BOX);

    for(let i=0; i<snakeCoords.length; i++){
        drawSnake(snakeCoords[i].x, snakeCoords[i].y);
    }

    let snakeX = snakeCoords[0].x;
    let snakeY = snakeCoords[0].y;

 
    let head = {};

    if(dir != ""){

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

        head.x = snakeX;
        head.y = snakeY;

        snakeCoords.unshift(head);
        
        snakeCoords.pop();
    }

    if(snakeX == FoodCoords.x && snakeY == FoodCoords.y){
        score+=pointForFood;
        FoodCoords.update();
        for(let i = 0; i<pointForFood; i++){
            snakeCoords.unshift(head);
        }
    }

    // for(let i=0; i<snakeCoords.length; i++){
    //     if(snakeCoords[i].x == head.x && snakeCoords[i].y == head.y){
    //         console.log("lost")
    //     }
    // }
}

var mygame = setInterval(drawGame, SPEED)