const lineWidth = document.getElementById("line-width");
const saveBtn= document.getElementById("save-btn");
const txtInput= document.getElementById("txt-input");
const fileInput=document.getElementById("img-input");
const fillBtn=document.getElementById("btn-mode");
const resetBtn=document.getElementById("btn-destroy");
const easerBtn=document.getElementById("btn-eraser");
const colorOptions= Array.from(document.getElementsByClassName("colour-option"));
const colours=document.getElementById("color");
const canvas =document.querySelector("canvas");
const ctx=canvas.getContext("2d");

const CanvasHeight=800;
const CanvasWidth=800;

canvas.width = CanvasWidth;
canvas.height = CanvasHeight;
ctx.lineWidth = lineWidth.value;
console.log(lineWidth);
/*context.rect(50,50,100,100);
context.rect(150,150,100,100);
context.rect(250,250,100,100);
context.fill();
context.beginPath();
context.rect(350,350,100,100);
context.fillStyle="red";
context.fill();
context.fillStyle="blue"
setTimeout(() => {
   context.fill();},
     5000);

context.moveTo(50,50);
context.lineTo(150,50);
context.lineTo(150,150);
context.lineTo(50,150);
context.lineTo(50,50);
context.stroke();

ctx.fillRect(200,200,50, 200);
ctx.fillRect(400,200,50,200);
ctx.strokeRect(300, 300, 50,100);
ctx.fillRect(200, 200,200,20);
ctx.moveTo(200,200);
ctx.lineTo(325,100);
ctx.lineTo(450,200);
ctx.stroke();
ctx.arc(150, 100 ,50 ,0 ,1 * Math.PI);
ctx.fill();*/

const colors = [
    "#27ae60",
    "#e74c3c",
    "#f39c12",
    "#8e44ad",
    "#ff7979",
    "#30336b"
];
//draw when mouse is moving
/*function onClick(event){
ctx.beginPath();
console.log(event);
ctx.moveTo(event.offsetX, event.offsetY);
const color = colors[Math.floor(Math.random() * colors.length)];
ctx.strokeStyle =color;
ctx.lineTo(event.offsetX, event.offsetY);
ctx.stroke();
//ctx.lineTo(event.o)
}
canvas.addEventListener("mousemove",onClick);
*/
//dwan when mouse is clicked down, holds and released
let isPainting=false;
let isFilling=false;
function onMove(event){
  if(isPainting){
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX,event.offsetY);
}
function onMouseDown(){
  isPainting=true;
  console.log("mouseDown");
}
function onMouseUp(){
isPainting=false;
ctx.beginPath();
console.log("mouseUP");
}
function onLineWidthChange(event){
console.log(event.target.value);
ctx.lineWidth=event.target.value;
}

function onColourChange(event){
console.log(event.target.value);
ctx.strokeStyle=event.target.value;
ctx.fillStyle=event.target.value;
}

function onColourClick(event){
const colorValue=event.target.dataset.color;
ctx.strokeStyle=colorValue;
ctx.fillStyle=colorValue;
color.value=colorValue;
}

function onFill(){
  if(isFilling){
    isFilling=false;
    fillBtn.innerText="Fill";
  }
else{
  isFilling=true;
  fillBtn.innerText="Draw";
  
  
  //ctx.fillStyle(event.target.dataset.color);
}

}

function onCanvasClick(){
if(isFilling){
  ctx.fillRect(0,0,CanvasWidth,CanvasHeight);
}
}
function onResetClick(){
  ctx.fillStyle="white";
  ctx.fillRect(0,0,CanvasWidth,CanvasHeight);
  
}
function onEraserClick(){
  ctx.strokeStyle="white";
  isFilling=false;
  fillBtn.innerText="Fill";
}

function onImgSelect(event){
const file=event.target.files[0];
const url=URL.createObjectURL(file);
console.log(url);
//document.getElementById(canvas).innerHTML+=<canvas>url</canvas>;
let img = new Image();
 img.src =url;
 img.onload= function(){
ctx.drawImage(img,0,0,200,200);
fileInput.value=null;
 };
   
}

function onDoubleClick(event){
  ctx.save();
  console.log(event.offsetX, event.offsetY);
  const txt=txtInput.value;
  if(txt !==null){
    ctx.lineWidth=1;
    ctx.strokeText(txt,event.offsetX,event.offsetY);
  }
  ctx.restore();
}


function onSaveBtnClick(){

  console.log(canvas.toDataURL());
  const url=canvas.toDataURL();
  const a=document.createElement("a");
  a.href=url;
  a.download="myImg.png";
  a.click();
}

canvas.addEventListener("dblclick",onDoubleClick);
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("mousemove",onMove)
canvas.addEventListener("mousedown",onMouseDown); 
document.addEventListener("mouseup",onMouseUp);
canvas.addEventListener("mouseleave",onMouseUp)
lineWidth.addEventListener("change",onLineWidthChange);

colorOptions.forEach(colours=>colours.addEventListener("click", onColourClick))
colours.addEventListener("change",onColourChange);
fillBtn.addEventListener("click",onFill);
resetBtn.addEventListener("click", onResetClick);
easerBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onImgSelect);
saveBtn.addEventListener("click", onSaveBtnClick);
console.log(colorOptions);

