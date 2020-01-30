const canvas=document.getElementById("jsCanvas");
let painting =false;
const ctx=canvas.getContext("2d");
const colors=document.getElementsByClassName("jsColor");
const range=document.getElementById("jsRange");
const mode=document.getElementById("jsMode");
const saveBtn=document.getElementById("jsSave");

let filling =false;

const CANVAS_SIZE=700;

canvas.width=CANVAS_SIZE;
canvas.height=CANVAS_SIZE;

const DEFAULT_COLOR="#2c2c2c";

//default canvas color
ctx.fillStyle="white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);

//default stroke style, fill style..
ctx.strokeStyle=DEFAULT_COLOR;
ctx.fillStyle=DEFAULT_COLOR;

ctx.lineWidth=2.5;



function startPainting(){
    painting=true;
}

function stopPainting(){
    painting=false;
}
function onMouseMove(event){

    const x=event.offsetX;
    const y=event.offsetY;

    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }
    else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }

}

function onMouseDown(event){
painting=true;
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);

    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);

    canvas.addEventListener("mouseleave",stopPainting);
canvas.addEventListener("click",handleCanvasClick);
canvas.addEventListener("contextmenu",handleCM);
}

function handleCM(event){
    event.preventDefault();
}

function handleCanvasClick(event){
    if(filling===true){
    ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

function changeColor(event){
const color=event.target.style.backgroundColor;
ctx.strokeStyle=color;
ctx.fillStyle=color;
}

Array.from(colors).forEach(color=>color.addEventListener("click",changeColor));

function handleRangeChange(event){
    const strokeSize=event.target.value;
    ctx.lineWidth=strokeSize;
}

if(range){

    range.addEventListener("input",handleRangeChange);
}

function handleModeClick(){

    if(filling===true){

        filling=false;
        mode.innerHTML="Fill";
    }
    else{

        filling=true;
        mode.innerHTML="Painting";
       
    }
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

function handleSaveClick() {



    const image = canvas.toDataURL();
  
  
  
    const link = document.createElement("a");
  
  
  
    link.href = image;
  
  
  
    link.download = "PaintJS[?]";
  
  
  
    link.click();
  
  
  
  }
if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}