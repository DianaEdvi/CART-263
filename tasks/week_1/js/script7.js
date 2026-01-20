"use strict";

let canvasWidth = 600;
let canvasHeight = 400;

let shape = {
    type: "circle",
    x: 0,
    y: 0,
    diameter: 50,
    r: 0,
    g: 0,
    b: 0
};

let beginWithCircle = true;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    shape.x = shape.diameter / 2;
    shape.y = shape.diameter / 2;

    // set initial random color
    changeColor(shape);
}

function draw() {
    background(30);
    fill(shape.r, shape.g, shape.b);

    let y = shape.diameter / 2;

    // draw the columns 
    while (y < canvasHeight + shape.diameter / 2) {
        let x = shape.diameter / 2;

        // alternate starting shape for each row
        if (beginWithCircle) {
            shape.type = "circle";
        } else {
            shape.type = "square";
        }

        // draw the rows
        while (x < canvasWidth + shape.diameter / 2) {
            drawShape(x, y, shape);
            x += shape.diameter;
        }

        // move to next row and flip starting shape
        y += shape.diameter;
        beginWithCircle = !beginWithCircle;  
    }


}

// draw either a circle or square based on shape.type
function drawShape(x, y, shape){
    if (shape.type === "circle"){
        ellipse(x, y, shape.diameter, shape.diameter);
    } else {
        rect(x - shape.diameter/2, y - shape.diameter/2, shape.diameter, shape.diameter);
    }
}

// change shape color to random color
function changeColor(shape){
    shape.r = random(255);
    shape.g = random(255);
    shape.b = random(255);
}

// change color on spacebar press
function keyPressed(){
    if (key === ' '){
        changeColor(shape);
    }
}

// change starting shape on mouse click
function mouseClicked(){
    beginWithCircle = !beginWithCircle;
}
