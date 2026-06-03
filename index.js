var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
const restart = document.getElementById("restart");
const levels = document.getElementById("levels");
const statusShow = document.getElementById("status");

let BOX = 30;
let SPEED = 200;
let score = 0;

let level = "Level1";

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


let lvl1 = [
	{x: 5*BOX, y: 6*BOX}, 
	{x: 6*BOX, y: 6*BOX}, 
	{x: 7*BOX, y: 6*BOX}, 
	{x: 8*BOX, y: 6*BOX}, 

	{x: 11*BOX, y: 6*BOX}, 
	{x: 12*BOX, y: 6*BOX},
	{x: 13*BOX, y: 6*BOX},
	{x: 14*BOX, y: 6*BOX},
	// bottom
	{x: 5*BOX, y: 12*BOX}, 
	{x: 6*BOX, y: 12*BOX}, 
	{x: 7*BOX, y: 12*BOX}, 
	{x: 8*BOX, y: 12*BOX}, 
	
	{x: 11*BOX, y: 12*BOX}, 
	{x: 12*BOX, y: 12*BOX},
	{x: 13*BOX, y: 12*BOX},
	{x: 14*BOX, y: 12*BOX},
]

let lvl2 = [
    {x: 4*BOX, y: 5*BOX},
    {x: 5*BOX, y: 5*BOX},
    {x: 6*BOX, y: 5*BOX},
    {x: 7*BOX, y: 5*BOX},
    {x: 8*BOX, y: 5*BOX},

    {x: 12*BOX, y: 5*BOX},
    {x: 13*BOX, y: 5*BOX},
    {x: 14*BOX, y: 5*BOX},


    {x: 6*BOX, y: 7*BOX},
    {x: 6*BOX, y: 8*BOX},
    {x: 6*BOX, y: 9*BOX},

    {x: 12*BOX, y: 7*BOX},
    {x: 12*BOX, y: 8*BOX},
    {x: 12*BOX, y: 9*BOX},


    {x: 3*BOX, y: 12*BOX},
    {x: 4*BOX, y: 12*BOX},
    {x: 5*BOX, y: 12*BOX},
    {x: 6*BOX, y: 12*BOX},

    {x: 10*BOX, y: 12*BOX},
    {x: 11*BOX, y: 12*BOX},
    {x: 12*BOX, y: 12*BOX},
    {x: 13*BOX, y: 12*BOX},

    {x: 8*BOX, y: 14*BOX},
    {x: 8*BOX, y: 15*BOX},
    {x: 8*BOX, y: 16*BOX},

    {x: 12*BOX, y: 14*BOX},
    {x: 12*BOX, y: 15*BOX},
    {x: 12*BOX, y: 16*BOX},
];


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
        pointForFood = 2;
    }
    else if(food == "apple"){
        pointForFood = 1;
    }
    else if(food == "carrot"){
        pointForFood = 1;
    }
    else if(food == "watermelon"){
        pointForFood = 2;
    }
    
    ctx.fillText(food.toUpperCase() + ` ${pointForFood}`, BOX*8, BOX*1.5);

    ctx.drawImage(myFood, FoodCoords.x, FoodCoords.y, BOX, BOX);

    for(let i=0; i<snakeCoords.length; i++){
        drawSnake(snakeCoords[i].x, snakeCoords[i].y);
    }


    let activeFences = [];

    if(level === "Level2"){
        activeFences = lvl1;
    }
    else if(level === "Level3"){
        activeFences = lvl2;
    }

    for(let i = 0; i < activeFences.length; i++){
        ctx.fillStyle = "brown";
        ctx.fillRect(
            activeFences[i].x,
            activeFences[i].y,
            BOX,
            BOX
        );
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

        head = {
            x: snakeX,
            y: snakeY
        };

        snakeCoords.unshift(head);

        snakeCoords.pop();

         // collisions
         for(let i = 1; i < snakeCoords.length; i++){
            if(snakeCoords[i].x === head.x &&
            snakeCoords[i].y === head.y){
                gameover()
            }
        }

        for(let i = 0; i < activeFences.length; i++){
            if(
                activeFences[i].x === head.x &&
                activeFences[i].y === head.y
            ){
                gameover();
            }
        }
        
        
    }

    // eatin 
    if(snakeX == FoodCoords.x && snakeY == FoodCoords.y){
        score+=pointForFood;
        FoodCoords.update();
        for(let i = 0; i<pointForFood; i++){
            snakeCoords.unshift(head);
        }
    }
    
}

var mygame = setInterval(drawGame, SPEED)

const speedSlider = document.getElementById("speedControl");
const speedValue = document.getElementById("speedValue");

let maxspeed = 500;

speedSlider.addEventListener("input", function(e){
    SPEED = maxspeed - Number(this.value);
    console.log( this.value)

    speedValue.textContent = this.value;

    clearInterval(mygame);
    mygame = setInterval(drawGame, SPEED);

    this.blur();
});


levels.addEventListener("change", function(){
    level = this.value;
    restartGame();
    this.blur();
})

restart.onclick = ()=>{
    restartGame();   
}


function restartGame(){
    gameover();
    restart.style.display = "none";
    statusShow.style.display = "none";
    snakeCoords = [];
    snakeCoords[0] = {
    x: 8*BOX,
    y: 9*BOX
    }
    snakeCoords[1] = {
        x: 9*BOX,
        y: 9*BOX
    }
    score = 0;
    mygame = setInterval(drawGame, SPEED);
    dir = "";
}

function gameover(){
    clearInterval(mygame);
    restart.style.display = null;
    statusShow.style.display = "block";
    dir = "";
}