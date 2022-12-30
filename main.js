//Canvas setting

let canvas  //declaring variables
let ctx

canvas = document.createElement("canvas") //creating element called canvas
ctx = canvas.getContext("2d")//getContext is returning a drawing context on the canvas. 2d is 2d drawing functions

canvas.width = 400
canvas.height = 700

document.body.appendChild(canvas) //adding canvas element that I created using canvas = canvas into body tag.



let backgroundImage, bulletImage, enemyImage, shuttleImage

//shuttle coordinates
let shuttleX = canvas.width/2-30
let shuttleY = canvas.height-60

function loadImage() {
    backgroundImage = new Image()
    backgroundImage.src = "images/background.jpg"
;
    bulletImage = new Image()
    bulletImage.src = "images/bullet.png"

    enemyImage = new Image()
    enemyImage = "images/enemy.png"

    shuttleImage = new Image()
    shuttleIMage = "images/shuttle.png"
}

function render() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(shuttleImage, shuttleX, shuttleY)
}


function main() {
    render()
    requestAnimationFrame(main)
}

loadImage()
main()