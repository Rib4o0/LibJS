// MATHHELPER FUN v 0.0.3 by Rosen Kamenov --------------------------------
var ctx;
var secondaryctx;
var canvas;
var secondaryCanvas;
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

// Canvas functions

function createCanvas(cWidth, cHeight) {
  canvas = document.createElement("canvas");
  canvas.style.border = "1px solid black";
  secondaryCanvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");
  secondaryctx = secondaryCanvas.getContext("2d");
  ctx.strokeStyle = "white";
  canvas.width = cWidth;
  canvas.height = cHeight;
  secondaryCanvas.width = cWidth
  secondaryCanvas.height = cHeight
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

// function push() {
//   let drawingState = { translateX: translated.x, translateY: translated.y, rotated: rotated };
//   translate(-translate.x, -translate.y);
//   rotate(-rotated);
//   drawingStates.push(drawingState);
// }

// function pop() {
//   let prevDrawingState = drawingStates.slice(-1);
// }

function translate(x, y) {
  secondaryctx = getCtx();
  secondaryctx.translate(x, y);
  translated = { x: parseFloat(translated.x) + x, y: parseFloat(translated.y) + y };
}

function rotate(angle) {
  secondaryctx = getCtx();
  let x = translated.x;
  let y = translated.y;
  translate(-x, -y);
  translate(centerX,centerY);
  secondaryctx.rotate(angle * Math.PI / 180);
  translate(-centerX, -centerY);
  translate(x, y);
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
  secondaryctx.arc(x, y, radius, 0, 2 * Math.PI);
  secondaryctx.fill();
  secondaryctx.stroke();
  resetStyles();
}

function createCircleExo(x, y, radius, color = "white") {
  secondaryctx = getCtx();
  secondaryctx.strokeStyle = color;
  secondaryctx.beginPath();
  secondaryctx.arc(x, y, radius, 0, 2 * Math.PI);
  secondaryctx.stroke();
  resetStyles();
}

function drawText(text, x, y, color = "white", fontSize = 16) {
  secondaryctx = getCtx();
  secondaryctx.fillStyle = color;
  secondaryctx.font = `${fontSize}px Arial`;
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

function displayImage(imgUrl, x, y, width, height) {
  let img = new Image();
  img.src = imgUrl;
  img.onload = function () {
    secondaryctx = getCtx();
    secondaryctx.drawImage(img, x, y, width, height);
    resetStyles();
  };
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

function dist(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
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
  return floor(Math.random() * (max + 1)) + min;
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

function dist3d(x1, y1, z1, x2, y2, z2) {
  return Math.sqrt(
    Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2)
  );
}

// Runs the default functions

setup()

currentFrameTime = 0;
lastFrameTime = 0;

doubleBufferedAnimation();

function doubleBufferedAnimation() {
  requestAnimationFrame(doubleBufferedAnimation);
  calculateFPS()
  draw();
  translate(parseFloat(-translated.x), parseFloat(-translated.y));
  rotate(-rotated);
  ctx.drawImage(secondaryCanvas, 0, 0);
}

function calculateFPS() {
  currentFrameTime = performance.now();
  fps = Math.round(1 / ((currentFrameTime - lastFrameTime) /1000));
  lastFrameTime = currentFrameTime;
}
