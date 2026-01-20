"use strict";

let canvasWidth = 600;
let canvasHeight = 500;

const TEXTCOLOR = {
    r: 255,
    g: 255,
    b: 255
};

const TEXTSIZE = 28;

var text1 = {
    str: "test",
    x: canvasWidth / 2,
    y: canvasHeight / 2,
};

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    // set text properties
    textAlign(CENTER, CENTER);
    textSize(TEXTSIZE);
    fill(TEXTCOLOR.r, TEXTCOLOR.g, TEXTCOLOR.b);
}

function draw() {    
    background(30);
    text(text1.str, text1.x, text1.y);

    // draw numbers along top and left edges
    let startX = 30;
    let startY = 30;
    let offsetHorizontal = 20;
    let offsetVertical = 25;    

    // top row
    for (let i = 0; i < 10; i++) {
    text(i.toString(), startX + i * offsetHorizontal, startY);
    }

    // left column
    for (let i = 1; i <= 15; i++) {
        text(i.toString(), startX, startY + i * offsetVertical);
    }

}

// I did not do the bonus parts