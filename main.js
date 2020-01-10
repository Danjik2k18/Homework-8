var app = document.getElementById('app')
document.body.style.cssText = `
    overflow: hidden
`

let modal = document.createElement('div')
modal.style.cssText = `
    height: 50px;  
    width: 200px; 
    background: white;
    top: calc(50% - ${50 / 2}px); 
    left: calc(50% - ${200 / 2}px);;
    font-size: 24px; 
    z-index: 9; 
    display: none; 
    position: fixed;
    border: 5px solid #383838;
`
document.body.appendChild(modal)

let hello = document.createElement('div')
hello.innerHTML = 'Дартс'
hello.style.cssText = `
    text-align: center;
    position: relative;
    top: 180px;
    z-index: 2;
    color: black;
    font-size: 100px; 
    font-family: Time New Romans, serif; 
`
document.body.appendChild(hello)

let startButton = document.createElement('input')
startButton.type = 'button'
startButton.value = 'Начать игру'
startButton.style.cssText = `
    height: 50px;  
    width: 200px;
    font-family: Time New Romans;
    font-size: 25px
`
modal.appendChild(startButton)

let sum = 0

function showModalWin() {
    let darkLayer = document.createElement('div')
    darkLayer.style.cssText = `
        position: fixed;
        width:100%;
        height:100%;
        z-index: 1;
        background:green;
        opacity: 0.5;
        left:0;
        top:0
    `
    document.body.appendChild(darkLayer)

    modal.style.display = 'block'

    startButton.addEventListener('click', function startGame() {
        darkLayer.style.display = 'none'
        modal.style.display = 'none'
        hello.style.display = 'none'
        app.style.display = 'block'
    }, false)
    startButton.addEventListener('click', function playMusic() {
        music.play()
    }, false)
    startButton.addEventListener('click', function countPoints() {
        points.innerText = ''
        sum = 0
        setTimeout(() => {
            showModalWin()
            let yourPoints = document.createElement('div')
            yourPoints.style.cssText = `
                width: 300px;
                height: 50px;
                background: white;
                top: 200px; 
                left: calc(50% - ${300 / 2}px);
                font-family: Time New Romans;
                font-size: 25px; 
                z-index: 9; 
                position: fixed;
                border: 1px solid #383838;
                text-align: center;  
        `
            document.body.appendChild(yourPoints)
            app.style.display = 'none'
            yourPoints.innerText = `You scored ${sum} points`
            setTimeout(() => {
                yourPoints.style.display = 'none'
            }, 3000)

        }, 50000)
    }, false)
}

showModalWin()

app.style.display = 'none'

let music = document.createElement('audio')
music.src = 'audio/music.mp3'
music.loop = true
music.volume = 0.2
app.appendChild(music)

let points = document.createElement('div')
points.style.cssText = `
    width: 200px;
    height: 50px;
    font-size: 40px;
    font-family: Time New Romans, cursive;
    position: absolute;
    line-height: 50px;
    right: 0;
    left: 0;
    border: 1px solid black;
    border-radius: 25%;
    background: black;
    color: #fff;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
`
app.appendChild(points)

let audioOne = document.createElement('audio')
audioOne.src = 'audio/Sound.mp3'
app.appendChild(audioOne)

function Circle(size, backgroundColor, point, zIndex = 0) {
    var element = document.createElement('div')
    element.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    background-color: ${backgroundColor};
    position: absolute;
    top: calc(50% - ${size / 2}px);
    left: calc(50% - ${size / 2}px);
    z-index: ${zIndex};
    transition: .7s all;   
    `
    element.addEventListener('click', fPlay, false)

    function fPlay() {
        audioOne.play()
    }
    element.addEventListener('click', pointSum, false)

    function pointSum() {
        sum += +`${point}`
        points.innerHTML = sum
    }
    this.appendToApp = () => circlesContainer.appendChild(element)

}

let circlesContainer = document.createElement('div')
circlesContainer.style.cssText = `
        width: ${500}px;
        height: ${500}px;
        border-radius: 50%;
        position: absolute;
        top: calc(50% - ${500 / 2}px);
        left: calc(50% - ${500 / 2}px)
        `
app.appendChild(circlesContainer)

let circles = [
    new Circle(390, 'black', 5),
    new Circle(330, 'white', 10, 1),
    new Circle(260, 'black', 20, 2),
    new Circle(190, 'white', 30, 3),
    new Circle(120, 'black', 40, 4),
    new Circle(60, 'red', 50, 5)
]
circles.forEach((circle) => circle.appendToApp())

function circlesMove() {
    circlesContainer.style.transition = `1s all`
    setInterval(() => {
        circlesContainer.style.top = `${random (0, 100)}px`
        circlesContainer.style.left = `${random (300, 700)}px`
    }, 500)
}
circlesMove()


circles.forEach((circle) => circle.appendToApp())

var random = (min, max) => Math.round(Math.random() * (max - min) + min)

function Bird(size, imageSrc, intervalTime, zIndex = 5) {
    var element = document.createElement('img')
    element.src = imageSrc
    element.style.cssText = `
    position: absolute;
    width: ${size}px;
    z-index: ${zIndex};
    transition: ${intervalTime / 1000}s all;
    `
    var random = (min, max) => Math.round(Math.random() * (max - min) + min)

    this.appendToApp = () => app.appendChild(element)
    this.startInterval = () => {
        setInterval(() => {
            element.style.top = `${random(0, window.innerHeight - size)}px`
            element.style.left = `${random(0, window.innerWidth - size)}px`
        }, intervalTime)
    }
}

var birds = []
var random = (min, max) => Math.round(Math.random() * (max - min) + min)
for (var i = 1; i <= 5; i++) {
    birds.push(new Bird(random(50, 200), 'img/bird.gif', random(1000, 3000)))
}

birds.forEach((bird) => bird.appendToApp())
birds.forEach((bird) => bird.startInterval())

var img = document.createElement('img')
img.src = 'dart.png'
img.style.zIndex = 10
img.style.width = '80px'
img.style.position = 'absolute'
app.appendChild(img)

var style = document.createElement('style')
style.innerText = `
html, body {
    height: 100%;
}
body:hover{
    cursor: none;
}
`
document.head.appendChild(style)

var dartInMotion = false

window.onmousemove = (event) => {
    if (!dartInMotion) {
        img.style.top = `${event.clientY - 80}px`
        img.style.left = `${event.clientX - 80}px`
    }
}

window.onclick = (event) => {
    if (!dartInMotion) {
        dartInMotion = false
    }
    img.src = 'img/newDart.gif'
    setTimeout(() => {
        img.src = 'img/dart.png'
    }, 800)
    console.log(event)
}