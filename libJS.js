// MATHHELPER FUN v 0.0.2 by Rosen Kamenov --------------------------------
var ctx;
var canvas;
export var height;
export var width;
export var center;
export var aspectRatio;

// Canvas functions

export function createCanvas(cWidth, cHeight) {
  canvas = document.createElement("canvas");
  canvas.style.border = "1px solid black";
  ctx = getCtx();
  ctx.strokeStyle = "white";
  canvas.width = cWidth;
  canvas.height = cHeight;
  width = canvas.width;
  height = canvas.height;

  ctx.imageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.msImageSmoothingEnabled = false;

  center = {
    x: width / 2,
    y: height / 2
  }
  aspectRatio = cWidth / cHeight;
  document.body.appendChild(canvas);
}

export function translate(x, y) { 
  ctx = getCtx();
  ctx.translate(x, y);  
}

export function rotate(angle) { 
  let angleRad = toRadians(angle);
  ctx = getCtx();
  ctx.rotate(angleRad)
}

export function createLine(x1, y1, x2, y2, lineColor = "white", lineWidth = 1) {
  ctx = getCtx();
  ctx.lineWidth = lineWidth;
  ctx.moveTo(x1 , y1 );
  ctx.lineTo(x2 , y2 );
  ctx.strokeStyle = lineColor;
  ctx.stroke();
  ctx.strokeStyle = "white";
  resetStyles()
}

export function colorPixel(x, y, pixelScale = 1, color = "white") {
  ctx = getCtx()
  ctx.fillStyle = color;
  ctx.fillRect(x , y , pixelScale, pixelScale);
  resetStyles();
}

export function createRect(x, y, width, height, color = "white") {
  ctx = getCtx();
  ctx.fillStyle = color;
  ctx.fillRect(x , y , width, height);
  resetStyles()
}

export function createRectExo(x, y, width, height, color = "white") {
  ctx = getCtx();
  ctx.strokeStyle = color;
  ctx.strokeRect(x , y , width, height);
  resetStyles()
}

export function createTriangle(x1, y1, x2, y2, x3, y3, color = "white") {
  ctx = getCtx();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();
  ctx.fill()
  resetStyles()
}

export function createTriangleExo(x1, y1, x2, y2, x3, y3, color = "white") {
  ctx = getCtx();
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();
  resetStyles()
}

export function createCircle(x, y, radius, color = "white") {
  ctx = getCtx();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x , y , radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
  resetStyles()
}

export function createCircleExo(x, y, radius, color = 'white') {
  ctx = getCtx();
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.arc(x , y , radius, 0, 2 * Math.PI);
  ctx.stroke();
  resetStyles();
}

export function drawText(text, x, y, color = "white", fontSize = 16) {
  ctx = getCtx();
  ctx.fillStyle = color;
  ctx.font = `${fontSize}px Arial`;
  ctx.fillText(text, x , y );
  resetStyles()
}

export function drawTextExo(text, x, y, color = "white", fontSize = 16) {
  ctx = getCtx();
  ctx.strokeStyle = color;
  ctx.font = `${fontSize}px Arial`;
  ctx.strokeText(text, x , y );
  resetStyles()
}

export function displayImage(imgUrl, x, y, width, height) {
  let img = new Image();
  img.src = imgUrl;
  img.onload = function () { 
    ctx = getCtx();
    ctx.drawImage(img, x , y , width, height);
    resetStyles()
  }
}

export function backgroundColor(color, g = undefined, b = 0) {
  ctx = getCtx();
  if (isNaN(color)) {
    ctx.fillStyle = color;
  } else {
    if (g !== undefined) {
      ctx.fillStyle = `rgb(${color}, ${g}, ${b})`;
    } else {
      ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
    }
  }
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  resetStyles();
}

export function dist(x1, y1, x2, y2) { 
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

export function clear() {
  ctx = getCtx();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function resetStyles() {
  ctx = getCtx();
  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;
  ctx.lineCap = "butt";
  ctx.lineJoin = "miter";
}

function getCtx() {
  return canvas.getContext("2d");
}

// Utility functions

export function root() {
  return document.querySelector(":root");
}

export function createVector(x, y) {
  return {
    x: x,
    y: y
  }
}

export function select(selector) {
  return document.querySelector(selector);
}

export function log(message1, message2 = '', message3 = '', message4 = '', message5 = '', message6 = '') { 
  console.log(`${message1} ${message2} ${message3} ${message4} ${message5} ${message6}`);
}

export function wait(miliseconds) {
  return new Promise(resolve => setTimeout(resolve, miliseconds))
}

export function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

export function toDegrees(radians) {
  return (radians * 180) / Math.PI;
}

export function sin(radians) {
  return Math.sin(radians);
}

export function cos(radians) {
  return Math.cos(radians);
}

export function random(min, max) { 

}

export function factorial(n) {
  let result = 1;
  for (let i = 1; i <= n; i++) { 
    result *= i; 
  }
  return result;
}

// 3D rendering functions

export function toMesh(shape) {
  return shape.map(toPolygon)
}

export function toPolygon(shape) {
  return shape.map(point => {
    createVector3(point[0], point[1], point[2])
  })
}

export function drawPolygon(polygon, x = 0, y = 0) {
  ctx = getCtx();
  ctx.beginPath();

  ctx.moveTo(polygon[0].x + x , polygon[0].y + y );
  polygon.forEach(point => {
    ctx.lineTo(point.x + x , point.y + y );
  })
  ctx.lineTo(polygon[0].x + x , polygon[0].y + y )

  ctx.closePath();
  ctx.stroke();
  resetStyles()
}

export function createVector3(x, y, z) { 
  return {
    x: x,
    y: y,
    z: z
  }
}

export function createMatrix4() {
  return [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]
}

export function multiplyMatrixVector3by4(i, o, matrix) {
  o.x = i.x * matrix[0][0] + i.y * matrix[1][0] + i.z * matrix[2][0] + matrix[3][0];
  o.y = i.x * matrix[0][1] + i.y * matrix[1][1] + i.z * matrix[2][1] + matrix[3][1];
  o.z = i.x * matrix[0][2] + i.y * matrix[1][2] + i.z * matrix[2][2] + matrix[3][2];
  let w = i.x * matrix[0][3] + i.y * matrix[1][3] + i.z * matrix[2][3] + matrix[3][3];

  if (w !== 0) {
    o.x /= w; 
    o.y /= w; 
    o.z /= w;
  }
}

export function dist3d(x1, y1, z1, x2, y2, z2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));
}
