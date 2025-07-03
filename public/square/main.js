const square = document.getElementById("square");
const ctx = square.getContext("2d");
const baseWidth = 1600;
const baseHeight = 900;
function resizeCanvas(){
    const react=document.body.getBoundingClientRect();
    const scale = Math.min(react.width/baseWidth, react.height/baseHeight);
    square.stylewidth = `${baseWidth * (scale-0.05)}px`;
    square.style.height = `${baseHeight * (scale-0.05)}px`;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
const teren =  new Image;
teren.src = "teren.png";
teren.onload = () => {
    ctx.beginPath();
    ctx.rect(810, 800, 90, 90);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}
let right=0;
let left=0;
let x=800;
window.addEventListener("keydown", (e) => {
    if(e.key === "ArrowRight"){
        right=1;
    }
    if(e.key === "ArrowLeft"){
        left=1;
    }
})
window.addEventListener("keyup", (e) => {
    if(e.key === "ArrowRight"){
        right=0;
    }
    if(e.key === "ArrowLeft"){
        left=0;
    }
})
const fast=10;
let y=800
let random=0;
function drawSquare() {
    ctx.beginPath();
    if(right==1){
        x+=fast;
    }
    if(left==1){
        x-=fast;
    }
    ctx.rect(x, 700, 90, 120);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}
drawSquare();
const v=[{
    positionX: randomPosition(),
    positionY: 80,
    color: randomColor()
}];
let nrObjects=1;
function randomPosition(){
    const random = Math.random() * 1700 - 100;
    return random;
}
function randomColor(){
    const random = Math.random();
    if(random<0.33){
        return "yellow";
    }
    else if(random<0.66){
        return "red";
    }
    else{
        return "blue";
    }
}
function createObject(){
    v[nrObjects]={
        positionX: randomPosition(),
        positionY: -90,
        color: randomColor()
    }
    nrObjects++;
}
function drawObjects(){
    let i=0;
    for(i=0;i<nrObjects;i++){
        ctx.beginPath();
        ctx.rect(v[i].positionX, v[i].positionY, 120, 20);
        ctx.fillStyle = v[i].color;
        const aux=v[i].positionY+nrObjects/20+1;
        while(v[i].positionY<aux){
            if(v[i].positionY>700&&v[i].positionY<1000){
                if(v[i].positionX>x-90 && v[i].positionX<x+90){
                    console.log(time);
                    v[i].positionY=1001
                }
            }
            v[i].positionY+=1;
        }
        v[i].positionY+=nrObjects/20+1;
        ctx.fill();
        ctx.closePath();
    }
}
/*function randomObject(){
     const random =Math.random();
    if(random<0.5{
        ctx.beginPath();
        ctx.rect(randomPosition(), 810, 90, 90);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }
    else{
        ctx.beginPath();
        ctx.rect(randomPosition(), 810, 90, 90);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
    }
}*/
let time=0;
let timep=10;
function gameLoop(){
        ctx.clearRect(0, 0, square.width, square.height);
        drawSquare();
        requestAnimationFrame(gameLoop);
        drawObjects();
        time+=nrObjects/2000+1;
        if(time>=timep){
            timep+=20;
            createObject();
        }
}
gameLoop();
