"use strict";

let canvasWidth = 600;
let canvasHeight = 400;

let el = {
    x: 50,
    y: 50,
    width: 20,
    height: 20,
    fill: {
        r: 220,
        g: 90,
        b: 200
    }
};

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    background(30);

    fill(el.fill.r, el.fill.g, el.fill.b);
    ellipse(el.x, el.y, el.width, el.height);

    el.x += 20;
    el.y += 20;
    el.width += 10;
    el.height += 10;
    el.fill.r -= 50;

    fill(el.fill.r, el.fill.g, el.fill.b);
    
    ellipse(el.x, el.y, el.width, el.height);

    el.x += 30;
    el.y += 30;
    el.width += 10;
    el.height += 10;
    el.fill.r -= 100;
    el.fill.g += 50;

    fill(el.fill.r, el.fill.g, el.fill.b);
    ellipse(el.x, el.y, el.width, el.height);



}

function draw() {

}