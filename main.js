//Canvas setting

let canvas  //declaring variables
let ctx

canvas = document.createElement("canvas") //creating element called canvas
ctx = canvas.getContext("2d")//getContext is returning a drawing context on the canvas. 2d is 2d drawing functions

canvas.width = 400
canvas.height = 700

document.body.appendChild(canvas) //adding canvas element that I created using canvas = canvas into body tag.



let backgroundImage, bulletImage, enemyImage, shuttleImage, gameoverImage
let gameOver = false //if true game is over. False not over
let score = 0

//shuttle coordinates
let shuttleX = canvas.width/2-30
let shuttleY = canvas.height-60

let bulletList = [] //to save bullets


//this function is like having ingredients to make bullets
function bullet(){
    this.x = 0
    this.y = 0
    this.init = function(){
        this.x = shuttleX + 20 //adding 20 px so bullets fire from the centre of the shuttle
        this.y = shuttleY
        this.alive = true // bullet is visible. False is invisible because collided with enemies

        bulletList.push(this) //"this" includes this.x, this.y, and this.init 
    }

    this.update = function() {
        this.y -= 7
    }
    //for bullet to hit enemies. Looping enemyList.length because we cannot give coords for every enemy and bullet to collide
    this.checkHit = function(){
        for (let i = 0; i < enemyList.length; i++) {
      if(this.y <= enemyList[i].y && this.x >= enemyList[i].x && this.x <= enemyList[i].x + 35) {
        score++;
        this.alive = false;
        enemyList.splice(i, 1)

      }
        
    }
    }
    

}
function randomValue(min, max){
    let randomNum = Math.floor(Math.random() * (max-min + 1)) + min
    return randomNum
}

let enemyList = []

function enemy(){
    //putting 0 because we dont know the coords
    this.x = 0
    this.y = 0
    this.init = function(){
        this.y = 0
        this.x = randomValue(0, canvas.width - 64)

        enemyList.push(this)
    }

    this.update = function() {
        this.y += 2

        if(this.y >= canvas.height - 64) {
            gameOver = true
           
        }
    }
}

function loadImage() {
    backgroundImage = new Image()
    backgroundImage.src = "images/background.jpg"

    bulletImage = new Image()
    bulletImage.src = "images/bullet.png"

    enemyImage = new Image()
    enemyImage.src = "images/enemy.png"

    shuttleImage = new Image()
    shuttleImage.src = "images/shuttle.png"

    gameoverImage = new Image()
    gameoverImage.src = "images/gameover.jpg"
}

let keysDown = {} //{} is an object. This is where you store keys pressed

function keySetup(){
    document.addEventListener("keydown", function(event){
      keysDown[event.key] = true    //this saves what key got pressed
     
      
    })

    document.addEventListener("keyup", function(event){
        delete keysDown[event.key]  //this deletes as soon as you stop pressing arrow buttons
       
        if(event.key == " "){
            createBullet()
        }
    })
}

function createEnemy(){
    let interval = setInterval(function(){
        let e = new enemy()
        e.init()
    }, 1000)
}

function createBullet(){
    let b = new bullet() //new means making a new function bullet(). The new created bullet will be stored in b
    b.init()
}

function updateCoords() {
    if("ArrowRight" in keysDown){ //this will make the shuttle go right
        shuttleX += 5
    }

    if("ArrowLeft" in keysDown){ //this will make the shuttle go left
        shuttleX -= 5
    }

    if(shuttleX <= 0){ //this will make the lowest the shuttle can go as 0.
        shuttleX = 0
    }

    if(shuttleX >= canvas.width - 60) { //You do -60 from the width cuz if you dont the shuttle will get drawn off the canvas because the shuttle gets drawn from top left so it will go out of the canvas. So you need to minus whatever the size of your image is
        shuttleX = canvas.width - 60
    }

    //bullet y coord update function 
    for (let i = 0; i < bulletList.length; i++) {
        if(bulletList[i].alive){
                bulletList[i].update()   
        bulletList[i].checkHit()
        }
    
    }
    //enemy y coord update function
    for (let i = 0; i < enemyList.length; i++) {
        enemyList[i].update()   
    }
}

//render draws image but only once
function render() {


    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(shuttleImage, shuttleX, shuttleY);
   ctx.fillText(`Score: ${score}`, 20, 20)
   ctx.fillStyle = "white"
   ctx.font = "20px Arial"

    for (let i = 0; i < bulletList.length; i++) {
        if(bulletList[i].alive){
            ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y)     
        }
        
    }

    for (let i = 0; i < enemyList.length; i++) {
        ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y)     
    }
}


function main() {
    //if gameOver = false call these functions
    if(gameOver == false){
    updateCoords() //update coordinates
    render() //draws the updated coordinates
    requestAnimationFrame(main) //this will continually draw so images wont disappear right away. You use main to call itself  
    }else{
        ctx.drawImage(gameoverImage, 10, 100, 380, 380)
    }
    
}

loadImage()
keySetup()
createEnemy()
main()


//bullet
// 1. bullet fires when spacebar gets pressed
// 2. initial x, y coords for bullets will be the same as shuttle coords. The y coords for bullets will be decreasing
// 3.  