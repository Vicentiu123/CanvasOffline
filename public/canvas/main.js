import { io } from "https://cdn.jsdelivr.net/npm/socket.io-client@4.8.1/dist/socket.io.esm.min.js";
const socket = io("http://192.168.0.118:8001");
console.log(socket);
socket.on("connect", () => console.log("Connected"));
socket.on("disconnect", () => console.log("Disconnected"));


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const baseWidth = 1600;
const baseHeight = 900;
function resizeCanvas(){
    const react=document.body.getBoundingClientRect();
    const scale = Math.min(react.width/baseWidth, react.height/baseHeight);
    canvas.style.width = `${baseWidth * (scale-0.05)}px`;
    canvas.style.height = `${baseHeight * (scale-0.05)}px`;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const teren =  new Image;
teren.src = "teren.png";

teren.onload = () => {
    ctx.drawImage(teren, 0, 0);
   
    ctx.fillStyle = "red";
    ctx.fillRect(0, 400, 20, 100);

    ctx.fillStyle = "blue";
    ctx.fillRect(1600-20, 400, 20, 100);
}
let x=400;
let y=400;
let down=false;
let up=false;
let w=false;
let s=false;
let scoreX=0;
let scoreY=0;
window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
        down=true;
    }
    if(e.key === "ArrowUp"){
        up=true;
    }
    if(e.key === "w"){
        w=true;
    }
    if(e.key === "s"){
        s=true;
    }
})
window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowDown") {
        down=false;
    }
    if(e.key === "ArrowUp"){
        up=false;
    }
    if(e.key === "w"){
        w=false;
    }
    if(e.key === "s"){
        s=false;
    }
})
function playerMove(){
    if(w){
        x-=10;
    }
    if(s){
        x+=10;
    }
}

function oponentMove(){
    if(up){
        y-=10;
    }
    if(down){
        y+=10;
    }
}
let random = Math.floor(Math.random() * (10 - (-10) + 1)) + (-10);;
let xBall=800; 
let yBall=450;
let direction=50+random;
const r=18;
const radian = Math.PI / 180;
function drawBall(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}


function ballMove() {
    xBall += Math.cos(direction*radian)*10;
    yBall += Math.sin(direction*radian)*10;
}
console.log(Math.cos(direction),Math.sin(direction));
function bounce(){
    random= Math.floor(Math.random() * (10 - (-10) + 1)) + (-10);
    if(yBall-r-20<0){
        yBall=r+20;
        direction=-direction+random;
    }
    if(yBall+r+20>canvas.height){
        direction=-direction+random;
        yBall=canvas.height-r-20;
        console.log(direction);
    }
    if(xBall-r<20){
        if(yBall>x&&yBall<x+100){
            direction=180-direction+random;
            xBall=r+20;
        }
        if(xBall-r<0){
            yBall=450; 
            xBall=800;
            direction=-50+random;
            scoreX++;
        }
    }
    if(xBall+r+20>canvas.width){
        if(yBall>y&&yBall<y+100){
            direction=180-direction;
            xBall=canvas.width-r-20;
        }
        if(xBall-r>canvas.width){
            yBall=450; 
            xBall=800;
            direction=70;
            scoreY++;
        }
    }
}

function scoreDraw() {
    ctx.fillStyle = "black";
    ctx.font = "bold 100px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`${scoreY}`, 700, 100);
    ctx.fillText(`${scoreX}`, 900, 100);
}
function gameLoop() {   
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    playerMove();
    oponentMove();
  
    ctx.drawImage(teren, 0, 0);
  
    if(x<0){
        x=0;
    }
    if(x+100>canvas.height){
        x=canvas.height-100;
    }
    
    if(y<0){
        y=0;
    }
    if(y+100>canvas.height){
        y=canvas.height-100;
    }

    ctx.fillStyle = "red";
    ctx.fillRect(0, x, 20, 100);

    ctx.fillStyle = "blue";
    ctx.fillRect(1600-20, y, 20, 100);
    ballMove();
    bounce();
    drawBall(xBall, yBall);
    scoreDraw();
    requestAnimationFrame(gameLoop);
}
gameLoop();
