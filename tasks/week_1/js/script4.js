"use strict";

let canvasWidth = 600;
let canvasHeight = 400;

var r1 = {
    r: 90,
    g: 220,
    b: 200
}

var r2 = {
    r: 80,
    g: 180,
    b: 180
}

var r3 = {
    r: 70,
    g: 140,
    b: 160
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    background(30);
    noStroke();
}

function draw() {
    // draw three rectangles
    drawRect(0, 0, canvasWidth/3, canvasHeight, r1.r, r1.g, r1.b);
    drawRect(canvasWidth/3, 0, canvasWidth/3, canvasHeight, r2.r, r2.g, r2.b);
    drawRect(2*canvasWidth/3, 0, canvasWidth/3, canvasHeight, r3.r, r3.g, r3.b);
}

// Function to draw a rectangle with given parameters
function drawRect(x,y,w,h,r,g,b){
    // change color to white if mouse is inside rectangle, otherwise use given color
    if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h){      
        fill(255, 255, 255);
    } else {
        fill(r, g, b);
    }
    rect(x, y, w, h);
}

