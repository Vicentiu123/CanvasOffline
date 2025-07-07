import { io } from "https://cdn.jsdelivr.net/npm/socket.io-client@4.8.1/dist/socket.io.esm.min.js";
const socket = io("http://192.168.0.106:8004");
console.log(socket);
socket.on("connect", () => console.log("Connected"));
socket.on("disconnect", () => console.log("Disconnected"));

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d")
const baseWidth = 1600;
const baseHeight = 900;

function resizeCanvas() {
    const react = document.body.getBoundingClientRect();
    const scale = Math.min(react.width / baseWidth, react.height / baseHeight);
    canvas.style.width = `${baseWidth * (scale - 0.05)}px`;
    canvas.style.height = `${baseHeight * (scale - 0.05)}px`;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

const teren = new Image;
teren.src = "teren.png";

teren.onload = () => {
    ctx.drawImage(teren, 0, 0);
    ctx.fillStyle = "red";
    ctx.fillRect(0, 400, 20, 100);
    ctx.fillStyle = "blue";
    ctx.fillRect(1600 - 20, 400, 20, 100);
}
socket.on("update", (e) =>{
    ctx.drawImage(teren, 0, 0)
    drawPlayers(e.player[0].y, e.player[1].y)
    if(e.player[0].shoot==1){
        e.player[0].shoot==1;
        shoot(18, e.player[0].y, e.player[0].dir)
    }
});
let speed = 3;
function shoot(x, y, dir){
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    let angleRadians = angleDegrees * (Math.PI / 180);
    x += Math.cos(angleRadians) * speed;
    y += Math.sin(angleRadians) * speed;
    ctx.fill();
    ctx.closePath();
    if( x<1600 && x>0 && y<900 && y>0 ) {
        requestAnimationFrame(shoot);
    }
}
/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Draws two players on the canvas.
 *
 * @param {number} a - The vertical position of the first player (red).
 * @param {number} b - The vertical position of the second player (blue).
 */

/*******  96a9cb4f-ccb3-4249-bf25-35db7f2f50ab  *******/
function drawPlayers(a, b){
    ctx.fillStyle = "red";
    ctx.fillRect(0, a, 20, 100);
    ctx.fillStyle = "blue";
    ctx.fillRect(1600 - 20, b, 20, 100);
}

let role=-1;
socket.on("role",(rol)  => {
    if(role==-1){
        role=rol;
    }
})
window.addEventListener("keyup", (e) => {
    socket.emit("keyup", { key: e.key, role });
});
window.addEventListener("keydown", (e) => {
    socket.emit("keydown", { key: e.key, role });
});

