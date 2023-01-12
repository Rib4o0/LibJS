// MATHHELPER FUN v 0.0.4 by Rosen Kamenov --------------------------------
var ctx;
var secondaryctx;
var imgctx;
var canvas;
var secondaryCanvas;
var imgCanvas;
var drawingStates = [];
var translated = { x: 0, y: 0 };
var rotated = 0;
var height;
var width;
var centerX;
var centerY;
var center;
var aspectRatio;
var fps;
var currentFrameTime;
var lastFrameTime;
var loop;
var drawRate;
var fRate;
var mouseX;
var mouseY;
var textAlign;
// Canvas functions

function createCanvas(cWidth, cHeight) {
  canvas = document.createElement("canvas");
  canvas.style.border = "1px solid black";
  secondaryCanvas = document.createElement("canvas");
  imgCanvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");
  secondaryctx = secondaryCanvas.getContext("2d");
  imgctx = imgCanvas.getContext("2d");
  ctx.strokeStyle = "white";
  canvas.width = cWidth;
  canvas.height = cHeight;
  secondaryCanvas.width = cWidth
  secondaryCanvas.height = cHeight
  imgCanvas.width = cWidth;
  imgCanvas.height = cHeight;
  width = canvas.width;
  height = canvas.height;
  centerX = cWidth / 2;
  centerY = cHeight / 2;

  ctx.imageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.msImageSmoothingEnabled = false;

  center = {
    x: width / 2,
    y: height / 2,
  };
  aspectRatio = cWidth / cHeight;
  document.body.appendChild(canvas);
}

function push() {
  let drawingState = { translatedX: translated.x, translatedY: translated.y, rotated: rotated };
  translate(-translated.x, -translated.y);
  translated.x = 0; translated.y = 0;
  rotate(-rotated);
  drawingStates.push(drawingState);
}

function pop() {
  let prevDrawingState = drawingStates[drawingStates.length / 2];
  translate(-translated.x, -translated.y);
  translated.x = 0; translated.y = 0;
  rotate(-rotated);
  if (drawingStates[drawingStates.length / 2] == undefined) return
  translate(prevDrawingState.translatedX, prevDrawingState.translatedY);
  drawingStates.pop();
}

function translate(x, y) {
  secondaryctx = getCtx();
  secondaryctx.translate(x, y);
  translated = { x: parseFloat(translated.x) + x, y: parseFloat(translated.y) + y };
}

function alignText(alignment) {
  textAlign = alignment;
}

function rotate(angle, relativeToCenter = false) {
  secondaryctx = getCtx();
  if (relativeToCenter) {
    let x = translated.x; let y = translated.y;
    translate(-x, -y);translate(centerX,centerY);
  };
  
  
  secondaryctx.rotate(angle * Math.PI / 180);
  if (relativeToCenter) {
    translate(-centerX, -centerY);
    translate(x, y);
  }
  rotated += angle;
}

function createLine(x1, y1, x2, y2, lineColor = "white", lineWidth = 1) {
  var dx = Math.abs(x2 - x1);
  var dy = Math.abs(y2 - y1);
  var sx = x1 < x2 ? 1 : -1;
  var sy = y1 < y2 ? 1 : -1;
  var err = dx - dy;

  while (true) {
    colorPixel(x1, y1, lineWidth, lineColor); // Do what you need to for this

    if (x1 === x2 && y1 === y2) break;
    var e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x1 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y1 += sy;
    }
  }
  resetStyles();
}

function createCtxLine(x1, y1, x2, y2, lineColor = "white", lineWidth = 1) {
  ctx = getCtx();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = lineColor;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  resetStyles();
}

function colorPixel(x, y, pixelScale = 1, color = "white") {
  secondaryctx = getCtx();
  secondaryctx.fillStyle = color;
  secondaryctx.fillRect(x, y, pixelScale, pixelScale);
  resetStyles();
}

function createRect(x, y, width, height, color = "white") {
  secondaryctx = getCtx();
  secondaryctx.fillStyle = color;
  secondaryctx.fillRect(x, y, width, height);
  resetStyles();
}

function createRectExo(x, y, width, height, color = "white") {
  secondaryctx = getCtx();
  secondaryctx.strokeStyle = color;
  secondaryctx.strokeRect(x, y, width, height);
  resetStyles();
}

function createTriangle(x1, y1, x2, y2, x3, y3, color = "white") {
  secondaryctx = getCtx();
  secondaryctx.fillStyle = color;
  secondaryctx.beginPath();
  secondaryctx.moveTo(x1, y1);
  secondaryctx.lineTo(x2, y2);
  secondaryctx.lineTo(x3, y3);
  secondaryctx.closePath();
  secondaryctx.fill();
  resetStyles();
}

function createTriangleExo(x1, y1, x2, y2, x3, y3, color = "white") {
  secondaryctx = getCtx();
  secondaryctx.strokeStyle = color;
  secondaryctx.beginPath();
  secondaryctx.moveTo(x1, y1);
  secondaryctx.lineTo(x2, y2);
  secondaryctx.lineTo(x3, y3);
  secondaryctx.closePath();
  resetStyles();
}

function createCircle(x, y, radius, color = "white") {
  secondaryctx = getCtx();
  secondaryctx.strokeStyle = color;
  secondaryctx.fillStyle = color;
  secondaryctx.beginPath();
  secondaryctx.arc(x, y, radius / 2, 0, 2 * Math.PI);
  secondaryctx.fill();
  secondaryctx.stroke();
  resetStyles();
}

function createCircleExo(x, y, radius, color = "white") {
  secondaryctx = getCtx();
  secondaryctx.strokeStyle = color;
  secondaryctx.beginPath();
  secondaryctx.arc(x, y, radius / 2, 0, 2 * Math.PI);
  secondaryctx.stroke();
  resetStyles();
}

function drawText(text, x, y,fontSize = 16, color = "white" ) {
  secondaryctx = getCtx();
  secondaryctx.fillStyle = color;
  secondaryctx.font = `${fontSize}px Arial`;
  if (textAlign === "center") secondaryctx.textBaseline = "middle"; secondaryctx.textAlign = "center";//x -= ctx.measureText(text).width / 2;
  secondaryctx.fillText(text, x, y);
  resetStyles();
}

function drawTextExo(text, x, y, color = "white", fontSize = 16) {
  secondaryctx = getCtx();
  secondaryctx.strokeStyle = color;
  secondaryctx.font = `${fontSize}px Arial`;
  secondaryctx.strokeText(text, x, y);
  resetStyles();
}

function displayImage(img, x, y, width, height) {
  secondaryctx = getCtx();
  secondaryctx.drawImage(img, x, y, width, height);
}

function backgroundColor(color, g = undefined, b = 0) {
  secondaryctx = getCtx();
  if (isNaN(color)) {
    secondaryctx.fillStyle = color;
  } else {
    if (g !== undefined) {
      secondaryctx.fillStyle = `rgb(${color}, ${g}, ${b})`;
    } else {
      secondaryctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
    }
  }
  secondaryctx.fillRect(0, 0, canvas.width, canvas.height);
  resetStyles();
}

function dist(x1, y1, x2, y2, z1 = 0, z2 = 0) {
  return Math.sqrt(
    (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1) + (z2 - z1) * (z2 - z1));
}

function rotate2dPoint(x, y, angle, xc = 0, yc = 0) {
  let x1 = (x - xc) * cos(angle) - (y - yc) * sin(angle) + xc;
  let y1 = (x - xc) * sin(angle) + (y - yc) * cos(angle) + yc;
  return {
    x: x1,
    y: y1
  }
}

function clear() {
  secondaryctx = getCtx();
  secondaryctx.clearRect(0, 0, canvas.width, canvas.height);
}

function resetStyles() {
  secondaryctx = getCtx();
  secondaryctx.fillStyle = "white";
  secondaryctx.strokeStyle = "white";
  secondaryctx.lineWidth = 1;
  secondaryctx.lineCap = "butt";
  secondaryctx.lineJoin = "miter";
}

// Loading functions

function loadImage() { 
  secondaryctx = getCtx();

  let imgObj = new Image();
  imgObj.src = "img.png";

  imgObj.onload = function() {
    ctx.drawImage(imgObj, 0, 0);
  }
}

function getCtx() {
  return secondaryCanvas.getContext("2d");
}

// Utility functions

function root() {
  return document.querySelector(":root");
}

function createVector(x, y) {
  return {
    x: x,
    y: y,
  };
}

function select(selector) {
  return document.querySelector(selector);
}

function log(
  message1,
  message2 = "",
  message3 = "",
  message4 = "",
  message5 = "",
  message6 = ""
) {
  console.log(
    `${message1} ${message2} ${message3} ${message4} ${message5} ${message6}`
  );
}

function wait(miliseconds) {
  return new Promise((resolve) => setTimeout(resolve, miliseconds));
}

function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function toDegrees(radians) {
  return (radians * 180) / Math.PI;
}

function sin(radians) {
  return Math.sin(radians);
}

function cos(radians) {
  return Math.cos(radians);
}

function random(min, max) {
  return Math.floor(Math.random() * (max + 1)) + min;
}

function isPrime(x) {
  if (x <= 1) return false; // 1 is not prime 
  for (let i = 2; i <= Math.sqrt(x); i++) { 
    if (x % i == 0) return false;
  }
  return true;
}

function factorial(n) {
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

// 3D rendering functions

function toMesh(shape) {
  return shape.map(toPolygon);
}

function toPolygon(shape) {
  return shape.map((point) => {
    createVector3(point[0], point[1], point[2]);
  });
}

function drawPolygon(polygon, x = 0, y = 0) {
  secondaryctx = getCtx();
  secondaryctx.beginPath();

  secondaryctx.moveTo(polygon[0].x + x, polygon[0].y + y);
  polygon.forEach((point) => {
    secondaryctx.lineTo(point.x + x, point.y + y);
  });
  secondaryctx.lineTo(polygon[0].x + x, polygon[0].y + y);

  secondaryctx.closePath();
  secondaryctx.stroke();
  resetStyles();
}

function createVector3(x, y, z) {
  return {
    x: x,
    y: y,
    z: z,
  };
}

// animation cotrolling functions

function noLoop() {
  loop = false;
  fps = 0;
  calculateFPS();
  draw();
  translate(parseFloat(-translated.x), parseFloat(-translated.y));
  rotate(-rotated);
  ctx.drawImage(secondaryCanvas, 0, 0);
}

function reLoop() { 
  if (loop) { return; }
  loop = true;
  doubleBufferedAnimation();
}

function redraw() {
  calculateFPS();
  draw();
  translate(parseFloat(-translated.x), parseFloat(-translated.y));
  rotate(-rotated);
  ctx.drawImage(secondaryCanvas, 0, 0);
}

function screenFrameRate(rate) {
  fRate = rate;
}

function awaitDraw() { 
  
}

// Runs the default functions

loop = true;
fRate = undefined;
setup()

currentFrameTime = 0;
lastFrameTime = 0;


if (loop == false) {
  redraw();
} else if (fRate != undefined) {
  log("Frame rate", fRate)
  drawRate = setInterval(redraw, 1000/fRate);
} else {
  log("Buffering frame rate")
  doubleBufferedAnimation();
} 

function doubleBufferedAnimation() {
  requestAnimationFrame(doubleBufferedAnimation);
  calculateFPS();
  if (loop) draw(() => { });
  if (fRate != undefined) loop = false;
    translate(parseFloat(-translated.x), parseFloat(-translated.y));
  rotate(-rotated);
  ctx.drawImage(secondaryCanvas, 0, 0);
}

function calculateFPS() {
  currentFrameTime = performance.now();
  fps = Math.round(1 / ((currentFrameTime - lastFrameTime) /1000));
  lastFrameTime = currentFrameTime;
}

window.addEventListener('mousemove', (e) => {
  onMouseMove(e);
});

function onMouseMove(event) {
  mouseX = event.clientX
  mouseY = event.clientY
}
