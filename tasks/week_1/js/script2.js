"use strict";

let canvasWidth = 600;
let canvasHeight = 400;

let el = {
    x: 50,
    y: 50,
    width: 20,
    height: 20,
    fill: {
        r: 50,
        g: 100,
        b: 90
    }
};

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    background(30);
    drawEllipse(el.x, el.y, el.width, el.height, el.fill.r, el.fill.g, el.fill.b);
    el.x += 40;
    el.y += 40;
    el.width += 10;
    el.height += 10;
    el.fill.r -= 10;
    el.fill.g += 50;
    drawEllipse(el.x, el.y, el.width, el.height, el.fill.r, el.fill.g, el.fill.b);
    el.x += 50;
    el.y += 50;
    el.width += 10;
    el.height += 10;
    el.fill.r -= 10;
    el.fill.g += 50;
    drawEllipse(el.x, el.y, el.width, el.height, el.fill.r, el.fill.g, el.fill.b);
}

function draw() {


}

function drawEllipse(x,y,w,h,r,g,b){
    fill(r, g, b);
    ellipse(x, y, w, h);
}