window.onload = setup;

// ------------------- DATA -------------------
// I swear i could not figure out how to parse my json file and i give up
const words = [
    { "original": "apple", "cipher": "bqqmf", "skip": 1 },
    { "original": "chair", "cipher": "dibjs", "skip": 1 },
    { "original": "mountain", "cipher": "npvoubjo", "skip": 1 },
    { "original": "river", "cipher": "sjwfs", "skip": 1 },
    { "original": "lantern", "cipher": "mboufso", "skip": 1 },
    { "original": "cloud", "cipher": "dmpve", "skip": 1 },
    { "original": "carpet", "cipher": "dbsqfu", "skip": 1 },
    { "original": "mirror", "cipher": "njssps", "skip": 1 },
    { "original": "bicycle", "cipher": "cjdzdmf", "skip": 1 },
    { "original": "notebook", "cipher": "opufcppl", "skip": 1 },
    { "original": "ocean", "cipher": "pdfbo", "skip": 1 },
    { "original": "key", "cipher": "lfz", "skip": 1 },
    { "original": "forest", "cipher": "gpsftu", "skip": 1 },
    { "original": "clock", "cipher": "dmpdl", "skip": 1 },
    { "original": "window", "cipher": "xjoepx", "skip": 1 },
    { "original": "spoon", "cipher": "tqppo", "skip": 1 },
    { "original": "backpack", "cipher": "cbdlqbdl", "skip": 1 },
    { "original": "candle", "cipher": "dboemf", "skip": 1 },
    { "original": "bridge", "cipher": "csjehf", "skip": 1 },
    { "original": "pillow", "cipher": "qjmmpx", "skip": 1 },
    { "original": "castle", "cipher": "ecuvng", "skip": 2 },
    { "original": "feather", "cipher": "hgcvjgt", "skip": 2 },
    { "original": "guitar", "cipher": "iwkvct", "skip": 2 },
    { "original": "helmet", "cipher": "jgnogv", "skip": 2 },
    { "original": "garden", "cipher": "ictfgp", "skip": 2 },
    { "original": "rocket", "cipher": "tqemgv", "skip": 2 },
    { "original": "island", "cipher": "kuncpf", "skip": 2 },
    { "original": "ladder", "cipher": "ncffgt", "skip": 2 },
    { "original": "blanket", "cipher": "dncpmgv", "skip": 2 },
    { "original": "compass", "cipher": "eqorcuu", "skip": 2 },
    { "original": "dragon", "cipher": "ftciqp", "skip": 2 },
    { "original": "tunnel", "cipher": "vwppgn", "skip": 2 },
    { "original": "bottle", "cipher": "dqvvng", "skip": 2 },
    { "original": "planet", "cipher": "rncpgv", "skip": 2 },
    { "original": "hammer", "cipher": "jcoogt", "skip": 2 },
    { "original": "library", "cipher": "nkdtcta", "skip": 2 },
    { "original": "camera", "cipher": "ecogtc", "skip": 2 },
    { "original": "shadow", "cipher": "ujcfqy", "skip": 2 },
    { "original": "bracelet", "cipher": "dtcegngv", "skip": 2 },
    { "original": "volcano", "cipher": "xqnecpq", "skip": 2 },
    { "original": "treasure", "cipher": "wuhdvxuh", "skip": 3 },
    { "original": "whale", "cipher": "zkdoh", "skip": 3 },
    { "original": "elevator", "cipher": "hohydwru", "skip": 3 },
    { "original": "mushroom", "cipher": "pxvkurrp", "skip": 3 },
    { "original": "telescope", "cipher": "whohvfrsh", "skip": 3 },
    { "original": "snowflake", "cipher": "vqrziodnh", "skip": 3 },
    { "original": "anchor", "cipher": "dqfkru", "skip": 3 },
    { "original": "pyramid", "cipher": "sbudplg", "skip": 3 },
    { "original": "lighthouse", "cipher": "oljkwkrxvh", "skip": 3 },
    { "original": "suitcase", "cipher": "vxlwfdvh", "skip": 3 },
    { "original": "penguin", "cipher": "shqjxlq", "skip": 3 },
    { "original": "orchard", "cipher": "rufkdug", "skip": 3 },
    { "original": "keyboard", "cipher": "nhberdug", "skip": 3 },
    { "original": "helmet", "cipher": "khophw", "skip": 3 },
    { "original": "sandcastle", "cipher": "vdqgfdvwoh", "skip": 3 },
    { "original": "waterfall", "cipher": "zdwhuidoo", "skip": 3 },
    { "original": "coin", "cipher": "frlq", "skip": 3 },
    { "original": "moonlight", "cipher": "prrqoljkw", "skip": 3 },
    { "original": "backpack", "cipher": "edfnsdfn", "skip": 3 },
    { "original": "tornado", "cipher": "wruqdgr", "skip": 3 },
    { "original": "painting", "cipher": "temrxmrk", "skip": 4 },
    { "original": "starfish", "cipher": "wxevjmwl", "skip": 4 },
    { "original": "tunnel", "cipher": "xyrrip", "skip": 4 },
    { "original": "fireplace", "cipher": "jmvitpegi", "skip": 4 },
    { "original": "satellite", "cipher": "wexippmxi", "skip": 4 },
    { "original": "meadow", "cipher": "qiehsa", "skip": 4 },
    { "original": "hourglass", "cipher": "lsyvkpeww", "skip": 4 },
    { "original": "compass", "cipher": "gsqteww", "skip": 4 }
  ];

const drawings = {
  plus: [[3,1], [3,2], [3,3], [3,4], [3,5], [1,3], [2,3], [4,3], [5,3]],
  x: [[1,1], [2,2], [3,3], [4,4], [5,5], [1,5], [2,4], [4,2], [5,1]],
  minus: [[1,3], [2,3], [3,3], [4,3], [5,3]],
  divide: [[1,3], [2,3], [3,3], [4,3], [5,3], [3,1], [3,5]]
};

const main = document.querySelector('main');

let container = document.createElement('div');
container.classList.add('container');
main.appendChild(container);

// ------------------- SETUP -------------------
function setup() {
  createTilePair('pink');
  createTilePair('green');
  createTilePair('blue');
  createTilePair('orange');
}

// ------------------- TILE CREATOR -------------------
function createTilePair(color) {
  switch (color) {
    case 'green': return createGreenTilePair();
    case 'blue': return createBlueTilePair();
    case 'pink': return createPinkTilePair();
    case 'orange': return createOrangeTilePair();
    default: console.warn(`Unknown color: ${color}`);
  }
}

// ------------------- GREEN TILE -------------------
function createGreenTilePair() {
    // Get random word 
    const randomWordIndex = Math.floor(Math.random() * words.length);
    const word = words[randomWordIndex];

    // Create first tile
    const first = createTile('green');
    first.classList.add('column-layout');
    const line1 = createTextDiv('green-text', `Ceasar drank -${word.skip} beers`);
    const line2 = createTextDiv('green-text', word.cipher);
    first.append(line1, line2);

    // Create second tile 
    // if the submitted word matches, remove the tile 
    const second = createTile('green');
    const searchBar = createInput('search', 'search-bar');
    const submitButton = createButton('Submit', () => {
        if (searchBar.value === word.original) removeMatchedTiles(first, second);
    });
    second.append(searchBar, submitButton);

    // Add tiles to container 
    container.append(first, second);

}

// ------------------- BLUE TILE -------------------
function createBlueTilePair() {
    // Create first tile 
    const first = createTile('blue');
    const img = createImage('https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/220px-Cat03.jpg', 'tile-image');
    const arrow = createImage('./media/arrow.png', 'arrow-image');
    first.append(img, arrow);

    // Create second tile 
    const second = createTile('blue');
    const img2 = img.cloneNode();
    second.appendChild(img2);

    // Add tiles to the container
    container.append(first, second);

    // Rotation logic
    const degrees = [0, 45, 90, 135, 180, 225, 270, 315];
    const randomIndex = Math.floor(Math.random() * degrees.length);
    const targetRotation = degrees[randomIndex];
    let currentRotation = 0;
    img2.style.transform = `rotate(${targetRotation}deg)`; // set rotation of the target image 

    // Rotate the user's image when clicking on arrow 
    // If the rotation matches, remove the tile 
    arrow.addEventListener('click', () => {
        currentRotation += 45;
        img.style.transform = `rotate(${currentRotation}deg)`;
        if ((currentRotation % 360) === targetRotation) removeMatchedTiles(first, second);
    });
}

// ------------------- PINK TILE -------------------
function createPinkTilePair() {
    // Create the first tile 
    const first = createTile('pink');
    first.classList.add('column-layout');
    const sliders = createSliders();
    const colorDisplay = createDiv('color-display');
    first.append(sliders.container, colorDisplay);

    // Create the second tile
    const second = createTile('pink');
    const targetColorDisplay = createDiv('color-display-large');
    second.appendChild(targetColorDisplay);

    // Add tiles to container 
    container.append(first, second);

    // Color matching logic
    const targetColor = getRandomRGB();
    targetColorDisplay.style.backgroundColor = targetColor;

    // loop through slider objects and set current display color to what the user inputs 
    // if the color matches, remove the tiles 
    for (let i = 0; i < sliders.sliders.length; i++) {
        sliders.sliders[i].addEventListener("input", function () {

            let red = sliders.sliders[0].value;
            let green = sliders.sliders[1].value;
            let blue = sliders.sliders[2].value;

            let currentColor = "rgb(" + red + ", " + green + ", " + blue + ")";
            colorDisplay.style.backgroundColor = currentColor;

            if (colorsMatch(currentColor, targetColor)) {
                removeMatchedTiles(first, second);
            }

        });
    }

}

// ------------------- ORANGE TILE -------------------
function createOrangeTilePair() {
    // Create tiles
    const first = createTile('orange');
    const second = createTile('orange');

    const plane1 = drawCartesianPlane(drawings);
    const plane2 = drawCartesianPlane();

    first.appendChild(plane1);
    second.appendChild(plane2);

    container.append(first, second);


    // fill tiles of user's grid
    plane2.querySelectorAll('.grid-cell').forEach(cell => {
        cell.addEventListener('click', () => {
        cell.classList.toggle('filled');
        if (checkPlaneMatch(plane1, plane2)) removeMatchedTiles(first, second);;
        });
    });
}

// ------------------- HELPER FUNCTIONS -------------------
// creates a div, assigns the appropriate tile and color class and returns it 
function createTile(color) {
  const tile = document.createElement('div');
  tile.classList.add('tile', color);
  return tile;
}

// creates and returns a div with the requested class name and text assigned 
function createTextDiv(className, text) {
  const div = document.createElement('div');
  div.classList.add(className);
  div.textContent = text;
  return div;
}

// creates and returns an input type with the requested classname attached
function createInput(type, className) {
  const input = document.createElement('input');
  input.type = type;
  input.classList.add(className);
  return input;
}

// creates and returns a button with the passed in text and callback function
function createButton(text, callback) {
  const btn = document.createElement('button');
  btn.textContent = text;
  btn.addEventListener('click', callback);
  return btn;
}

// creates and returns an image with the class name assigned to it, along with the specified src
function createImage(src, className) {
  const img = document.createElement('img');
  img.src = src;
  img.classList.add(className);
  return img;
}

// creates and returns a plain div and assigns a class to it for styling
function createDiv(className) {
  const div = document.createElement('div');
  div.classList.add(className);
  return div;
}

// Create RGB sliders and return the container div and the slider inputs
function createSliders() {
    // Create a main container div to hold all sliders
    const container = document.createElement('div');
    container.classList.add('sliders', 'column-layout');

    // This array will store the actual slider input elements
    const sliders = [];
    const colorLables = ['R', 'G', 'B'];

    // Loop through each color (r, g, b)
    for (let i = 0; i < colorLables.length; i++) {
        // Create a div to hold the label and the slider
        const sliderBox = document.createElement('div');
        sliderBox.classList.add('slider-container');

        // Add text for the label
        sliderBox.textContent = colorLables[i] + ":";

        // Create the slider input
        const slider = document.createElement('input');
        slider.type = 'range';   
        slider.min = 0;           
        slider.max = 255;        
        slider.value = 0; 

        // put the slider inside the sliderBox
        sliderBox.appendChild(slider);

        // add the sliderBox to the main container
        container.appendChild(sliderBox);

        // store the slider 
        sliders.push(slider);
    }

    // return both the container and the array of sliders
    return {
        container: container,
        sliders: sliders
    };
}

// creates and returns a random rgb value 
function getRandomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

// Compare two RGB colors to see if they match within a threshold
function colorsMatch(currentColor, targetColor, threshold = 30) {
    // extract numbers from strings like "rgb(255, 192, 203)"
    const current = currentColor.match(/\d+/g).map(Number); // [r, g, b]
    const target = targetColor.match(/\d+/g).map(Number);   // [r, g, b]

    // calculate differences for each channel
    const redDiff = Math.abs(current[0] - target[0]);
    const greenDiff = Math.abs(current[1] - target[1]);
    const blueDiff = Math.abs(current[2] - target[2]);

    // return true only if all channels are within the threshold
    return redDiff <= threshold && greenDiff <= threshold && blueDiff <= threshold;
}

// creates and returns a grid 
function drawCartesianPlane(drawings = null) {
  const plane = createDiv('cartesian-plane');
  const gridSize = 7;
  let coords = [];

  // if an array of drawings is passed in, pick a random one and grab its coordinates 
  if (drawings) {
    const keys = Object.keys(drawings);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    coords = drawings[randomKey];
  }

    // create a grid of cells for the plane
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {

            // create a new cell div
            const cell = createDiv('grid-cell');

            // Check if this cell should be filled based on coords and fill them
            // (only applies for preset drawing)
            for (let i = 0; i < coords.length; i++) {
                const [coordX, coordY] = coords[i];
                if (coordX === col && coordY === row) {
                    cell.classList.add('filled');
                    break; 
                }
            }

            // Add the cell to the plane
            plane.appendChild(cell);
        }
    }

  return plane;
}

// Check if two grids match exactly
function checkPlaneMatch(plane1, plane2) {
    // get all the cells from both planes
    const cells1 = plane1.querySelectorAll('.grid-cell');
    const cells2 = plane2.querySelectorAll('.grid-cell');

    // loop through each cell and compare
    for (let i = 0; i < cells1.length; i++) {
        const cell1Filled = cells1[i].classList.contains('filled');
        const cell2Filled = cells2[i].classList.contains('filled');

        // if any cell is different, the planes don't match
        if (cell1Filled !== cell2Filled) {
            return false;
        }
    }
    return true;
}

// creates a path to a random image and returns the string 
function pickRandomBackgroundImage(){
    var path = "./media/random";
    var numImages = 10;

    var imgs = []
    // create the image elements
    for(var i = 0; i < numImages; i++){
        imgs[i] = document.createElement('img');
        imgs[i].src = path + i + ".jpg";
    }
    var randomIndex = Math.floor(Math.random() * 10);
    var random = imgs[randomIndex];
    return path + randomIndex + ".jpg";
}

// once two tiles are matched, they are removed from the scene 
function removeMatchedTiles(tile1, tile2) {
    if (!tile1 || !tile2) return;

    tile1.classList.add('fadeOut');
    tile2.classList.add('fadeOut');

    // fade out 
    setTimeout(() => {
        tile1.remove();
        tile2.remove();

        // collect remaining tiles
        const remainingTiles = container.querySelectorAll('.tile');

        // if all are cleared, generate an image to display and animate its reveal 
        if (remainingTiles.length === 0) {
            const imgPath = pickRandomBackgroundImage();

            const overlay = document.createElement('div');
            overlay.classList.add('image-overlay');
            overlay.style.backgroundImage = `url(${imgPath})`;
            container.appendChild(overlay);

            // trigger animation by adding the class
            requestAnimationFrame(() => {
                overlay.classList.add('reveal');
            });

            // when the transition is over, set the image
            overlay.addEventListener('transitionend', () => {
                container.style.backgroundImage = `url(${imgPath})`;
                overlay.remove();
            });
        }
    }, 500);
}
