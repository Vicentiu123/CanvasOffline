import { io } from "https://cdn.jsdelivr.net/npm/socket.io-client@4.8.1/dist/socket.io.esm.min.js";
const socket = io("http://192.168.0.118:8002");
console.log(socket);
socket.on("connect", () => console.log("Connected"));
socket.on("disconnect", () => console.log("Disconnected"));

const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");

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

const ball={
    x:800,
    y:450
}

const teren =  new Image;
teren.src = "teren.png";
teren.onload = () => {
    ctx.drawImage(teren, 0, 0);
    ctx.fillStyle = "red";
    ctx.fillRect(0, 400, 20, 100);
    ctx.fillStyle = "blue";
    ctx.fillRect(1600-20, 400, 20, 100);
}
function drawBall(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}
socket.on("waiting",()=>{
    console.log("waiting");
})
socket.on("update",(room) =>{
    ball.x=room.ball.x;
    ball.y=room.ball.y;
})
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(teren, 0, 0);
    drawBall(ball.x, ball.y);
    requestAnimationFrame(gameLoop);
}
gameLoop();