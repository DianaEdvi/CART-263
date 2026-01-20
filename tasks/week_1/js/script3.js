"use strict";

let canvasWidth = 600;
let canvasHeight = 400;


var r1 = {
    x: 100,
    y: 100,
    width: 50,
    height: 50,
    fill: {
        r: 200,
        g: 0,
        b: 0
    }
}

var r2 = {
    x: 200,
    y: 150,
    width: 75,
    height: 75,
    fill: {
        r: 0,
        g: 200,
        b: 0
    }
}

var r3 = {
    x: 300,
    y: 200,
    width: 100,
    height: 100,
    fill: {
        r: 0,
        g: 0,
        b: 200
    }
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
}

function draw() {
    background(30);

    // draw rectangles 1 and 2
    drawRect(r1.x, r1.y, r1.width, r1.height, r1.fill.r, r1.fill.g, r1.fill.b);
    drawRect(r2.x, r2.y, r2.width, r2.height, r2.fill.r, r2.fill.g, r2.fill.b);
    
    // move rectangle 3
    r3.y += 1;
    if (r3.y + r3.height > canvasHeight){
        r3.y = 0;
    }
    
    // draw rectangle 3 with color based on mouse position
    r3.fill.r = map(mouseX, 0, canvasWidth, 0, 255);
    r3.fill.g = map(mouseY, 0, canvasHeight, 0, 255);
    drawRect(r3.x, r3.y, r3.width, r3.height, r3.fill.r, r3.fill.g, r3.fill.b); 
}

// Function to draw a rectangle with given parameters
function drawRect(x,y,w,h,r,g,b){
    fill(r, g, b);
    rect(x, y, w, h);
}

// Move the first rectangle to the mouse position when clicked
function mouseClicked(){
    r1.x = mouseX;
    r1.y = mouseY;
}

// Move the second rectangle to a random position when the spacebar is pressed
function keyPressed(){
    if(key === ' '){
        r2.x = Math.floor(Math.random() * canvasWidth - r2.width);
        r2.y = Math.floor(Math.random() * canvasHeight - r2.height);
    }

}
