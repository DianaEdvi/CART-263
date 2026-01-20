"use strict";

let canvasWidth = 600;
let canvasHeight = 400;

let counter = 0;

let r1 = {
    x: 90,
    y: 100,
    width: 120,
    height: 120,
    r: 200,
    g: 100,
    b: 40
}

let el = {
    x: 300,
    y: 200,
    radius: 20,
    fill: {
        r: 255,
        g: 255,
        b: 255,
        alpha: 255
    }
};

let el2 = {
    x: 50,
    y: 50,
    rad: 30,
    fill: {
        r: 100,
        g: 200,
        b: 250,
        a: 10
    }
};


function setup() {
    createCanvas(canvasWidth, canvasHeight);
    noStroke();    
}

function draw() {    
    background(30);
    // map alpha and radius to mouse position
    el.fill.alpha = map(mouseY, 0, canvasHeight, 10, 255);
    el.radius = map(mouseX, 0, canvasWidth, 10, 100);

    // draw the ellipse
    fill(el.fill.r, el.fill.g, el.fill.b, el.fill.alpha);
    ellipse(el.x, el.y, el.radius, el.radius);
    
    // draw the square
    displaySquare(r1.x, r1.y, r1.width, r1.height, r1.r, r1.g, r1.b);

    // change color of square based on collision
    if (checkCollisionWithSquare()){
        r1.r = 230;
        r1.g = 155;
        r1.b = 130;
    }
    else {
        r1.r = 200;
        r1.g = 100;
        r1.b = 40;
    }

    // draw circles with alpha increasing 
    if (counter > 0 && counter <= 10){
        let radius = 20;
        let alpha = 50;
        let i = 0;
        while (i < counter){
            fill(el2.fill.r, el2.fill.g, el2.fill.b, alpha);
            ellipse(el2.x, el2.y, radius, radius);

            alpha += 10;
            radius += 20;
            i++;
        }
    }

}

// Function to draw the square with given parameters
function displaySquare(x, y, w, h, r, g, b){
    fill(r, g, b);
    rect(x, y, w, h);
}
// increase counter when mouse clicked
function mouseClicked(){
    if (checkCollisionWithSquare()){
        counter++;
        console.log(counter);
    }
}
   
// Function to check collision between mouse and square
function checkCollisionWithSquare(){
    if (mouseX > r1.x && mouseX < r1.x + r1.width && mouseY > r1.y && mouseY < r1.y + r1.height){
        return true;
    }
    return false;
}

// i did not do the bonus parts
