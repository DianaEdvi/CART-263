window.onload = setup;

var tileIDs = {
    green: 0,
    blue: 0,
    pink: 0,
    orange: 0
}

var words = [
    { "original": "Apple", "cipher": "Bqqmf", "skip": 1 },
    { "original": "Chair", "cipher": "Dibjs", "skip": 1 },
    { "original": "Mountain", "cipher": "Npvoubjo", "skip": 1 },
    { "original": "River", "cipher": "Sjwfs", "skip": 1 },
    { "original": "Lantern", "cipher": "Mboufso", "skip": 1 },
    { "original": "Cloud", "cipher": "Dmpve", "skip": 1 },
    { "original": "Carpet", "cipher": "Dbsqfu", "skip": 1 },
    { "original": "Mirror", "cipher": "Njssps", "skip": 1 },
    { "original": "Bicycle", "cipher": "Cjdzdmf", "skip": 1 },
    { "original": "Notebook", "cipher": "Opufcppl", "skip": 1 },
    { "original": "Ocean", "cipher": "Pdfbo", "skip": 1 },
    { "original": "Key", "cipher": "Lfz", "skip": 1 },
    { "original": "Forest", "cipher": "Gpsftu", "skip": 1 },
    { "original": "Clock", "cipher": "Dmpdl", "skip": 1 },
    { "original": "Window", "cipher": "Xjoepx", "skip": 1 },
    { "original": "Spoon", "cipher": "Tqppo", "skip": 1 },
    { "original": "Backpack", "cipher": "Cbdlqbdl", "skip": 1 },
    { "original": "Candle", "cipher": "Dboemf", "skip": 1 },
    { "original": "Bridge", "cipher": "Csjehf", "skip": 1 },
    { "original": "Pillow", "cipher": "Qjmmpx", "skip": 1 },
    { "original": "Castle", "cipher": "Ecuvng", "skip": 2 },
    { "original": "Feather", "cipher": "Hgcvjgt", "skip": 2 },
    { "original": "Guitar", "cipher": "Iwkvct", "skip": 2 },
    { "original": "Helmet", "cipher": "Jgnogv", "skip": 2 },
    { "original": "Garden", "cipher": "Ictfgp", "skip": 2 },
    { "original": "Rocket", "cipher": "Tqemgv", "skip": 2 },
    { "original": "Island", "cipher": "Kuncpf", "skip": 2 },
    { "original": "Ladder", "cipher": "Ncffgt", "skip": 2 },
    { "original": "Blanket", "cipher": "Dncpmgv", "skip": 2 },
    { "original": "Compass", "cipher": "Eqorcuu", "skip": 2 },
    { "original": "Dragon", "cipher": "Ftciqp", "skip": 2 },
    { "original": "Tunnel", "cipher": "Vwppgn", "skip": 2 },
    { "original": "Bottle", "cipher": "Dqvvng", "skip": 2 },
    { "original": "Planet", "cipher": "Rncpgv", "skip": 2 },
    { "original": "Hammer", "cipher": "Jcoogt", "skip": 2 },
    { "original": "Library", "cipher": "Nkdtcta", "skip": 2 },
    { "original": "Camera", "cipher": "Ecogtc", "skip": 2 },
    { "original": "Shadow", "cipher": "Ujcfqy", "skip": 2 },
    { "original": "Bracelet", "cipher": "Dtcegngv", "skip": 2 },
    { "original": "Volcano", "cipher": "Xqnecpq", "skip": 2 },
    { "original": "Treasure", "cipher": "Wuhdvxuh", "skip": 3 },
    { "original": "Whale", "cipher": "Zkdoh", "skip": 3 },
    { "original": "Elevator", "cipher": "Hohydwru", "skip": 3 },
    { "original": "Mushroom", "cipher": "Pxvkurrp", "skip": 3 },
    { "original": "Telescope", "cipher": "Whohvfrsh", "skip": 3 },
    { "original": "Snowflake", "cipher": "Vqrziodnh", "skip": 3 },
    { "original": "Anchor", "cipher": "Dqfkru", "skip": 3 },
    { "original": "Pyramid", "cipher": "Sbudplg", "skip": 3 },
    { "original": "Lighthouse", "cipher": "Oljkwkrxvh", "skip": 3 },
    { "original": "Suitcase", "cipher": "Vxlwfdvh", "skip": 3 },
    { "original": "Penguin", "cipher": "Shqjxlq", "skip": 3 },
    { "original": "Orchard", "cipher": "Rufkdug", "skip": 3 },
    { "original": "Keyboard", "cipher": "Nhberdug", "skip": 3 },
    { "original": "Helmet", "cipher": "Khophw", "skip": 3 },
    { "original": "Sandcastle", "cipher": "Vdqgfdvwoh", "skip": 3 },
    { "original": "Waterfall", "cipher": "Zdwhuidoo", "skip": 3 },
    { "original": "Coin", "cipher": "Frlq", "skip": 3 },
    { "original": "Moonlight", "cipher": "Prrqoljkw", "skip": 3 },
    { "original": "Backpack", "cipher": "Edfnsdfn", "skip": 3 },
    { "original": "Tornado", "cipher": "Wruqdgr", "skip": 3 },
    { "original": "Painting", "cipher": "Temrxmrk", "skip": 4 },
    { "original": "Starfish", "cipher": "Wxevjmwl", "skip": 4 },
    { "original": "Tunnel", "cipher": "Xyrrip", "skip": 4 },
    { "original": "Fireplace", "cipher": "Jmvitpegi", "skip": 4 },
    { "original": "Satellite", "cipher": "Wexippmxi", "skip": 4 },
    { "original": "Meadow", "cipher": "Qiehsa", "skip": 4 },
    { "original": "Hourglass", "cipher": "Lsyvkpeww", "skip": 4 },
    { "original": "Compass", "cipher": "Gsqteww", "skip": 4 },
    { "original": "Seahorse", "cipher": "Wielsvwi", "skip": 4 },
    { "original": "Pavilion", "cipher": "Tezmpmsr", "skip": 4 },
    { "original": "Notebook", "cipher": "Rsxifsso", "skip": 4 },
    { "original": "Icicle", "cipher": "Mgmgpi", "skip": 4 },
    { "original": "Fossil", "cipher": "Jswwmp", "skip": 4 },
    { "original": "Curtain", "cipher": "Gyvxemr", "skip": 4 },
    { "original": "Raindrop", "cipher": "Vemrhvst", "skip": 4 },
    { "original": "Avalanche", "cipher": "Ezepergli", "skip": 4 },
    { "original": "Trophy", "cipher": "Xvstlc", "skip": 4 },
    { "original": "Windmill", "cipher": "Amrhqmpp", "skip": 4 },
    { "original": "Passport", "cipher": "Tewwtsvx", "skip": 4 },
    { "original": "Lantern", "cipher": "Perxivr", "skip": 4 },
    { "original": "Hammock", "cipher": "Leqqsgo", "skip": 5 },
    { "original": "Reef", "cipher": "Viij", "skip": 5 },
    { "original": "Clocktower", "cipher": "Gpsgoxsaiv", "skip": 5 },
    { "original": "Parachute", "cipher": "Teveglyxi", "skip": 5 },
    { "original": "Teacup", "cipher": "Xiegyt", "skip": 5 },
    { "original": "Blizzard", "cipher": "Fpmddevh", "skip": 5 },
    { "original": "Map", "cipher": "Qet", "skip": 5 },
    { "original": "Snowman", "cipher": "Wrsaqer", "skip": 5 },
    { "original": "Vineyard", "cipher": "Zmricevh", "skip": 5 },
    { "original": "Helmet", "cipher": "Lipqix", "skip": 5 },
    { "original": "Marble", "cipher": "Qevfpi", "skip": 5 },
    { "original": "Backpack", "cipher": "Fegotego", "skip": 5 },
    { "original": "Fountain", "cipher": "Jsyrxemr", "skip": 5 },
    { "original": "Campfire", "cipher": "Geqtjmvi", "skip": 5 },
    { "original": "Squirrel", "cipher": "Wuymvvip", "skip": 5 },
    { "original": "Umbrella", "cipher": "Yqfvippe", "skip": 5 },
    { "original": "Galaxy", "cipher": "Kepebc", "skip": 5 },
    { "original": "Ladder", "cipher": "Pehhiv", "skip": 5 },
    { "original": "Puzzle", "cipher": "Tyddpi", "skip": 5 },
    { "original": "Echo", "cipher": "Igls", "skip": 5 }
]

function setup(){
    console.log("Setup complete");
}
const main = document.querySelector('main');

// Create a pair of green tiles 
function createGreenTilePair(){
    // First Tile
    const first = document.createElement('div');

    // Add classes and append to main
    first.classList.add('tile');
    first.classList.add('green');
    first.classList.add('column-layout');
    
    const line1 = document.createElement('div');
    line1.classList.add('green-text');
    
    const line2 = document.createElement('div');
    line2.classList.add('green-text');
    first.appendChild(line1);
    first.appendChild(line2);
    
    
    // Second Tile
    const second = document.createElement('div');
    second.value = "JJDJSJSSJJDN";
    
    // Create search bar
    const searchBar = document.createElement('input');
    searchBar.type = 'search';
    searchBar.classList.add('search-bar');
    
    // Create submit button
    const submitButton = document.createElement('button');
    submitButton.textContent = "Submit";
    
    // Append search bar and button to second tile
    second.appendChild(searchBar);
    second.appendChild(submitButton);
    
    // Add classes and append to main
    second.classList.add('tile');
    second.classList.add('green');
    
    // Append tiles to main
    main.appendChild(first);
    main.appendChild(second);
    
    first.id = `green-tile-${tileIDs.green}`;
    second.id = `green-tile-${tileIDs.green}`;
    tileIDs.green++;
    
    // FUNCTIONALITY 
    function checkAnswer() {
        const userInput = searchBar.value;
        if (userInput === words[randomWord].original) {
            alert("Correct!");
        } else {
            alert("Incorrect!");
        }
    }

    submitButton.addEventListener('click', checkAnswer);

    const randomWord = Math.floor(Math.random() * words.length);
    const skip = words[randomWord].skip;
    line1.textContent = "Ceasar drank " + skip + " beers";
    line2.textContent = words[randomWord].cipher;
    
}

// Create a pair of blue tiles
function createBlueTilePair(){
    // First Tile
    const first = document.createElement('div');
    first.classList.add('tile');
    first.classList.add('blue');

    // Add image to first tile
    const img = document.createElement('img');
    img.classList.add('tile-image');
    img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/220px-Cat03.jpg"; // temporary image
    first.appendChild(img);

    // Add arrow image
    const arrow = document.createElement('img');
    arrow.src = "./media/arrow.png";
    arrow.classList.add('arrow-image');
    first.appendChild(arrow);

    // Second Tile
    const second = document.createElement('div');
    second.classList.add('tile');
    second.classList.add('blue');
    const img2 = img.cloneNode(); // Clone the image for the second tile
    second.appendChild(img2);

    // Append tiles to main
    main.appendChild(first);
    main.appendChild(second);

    first.id = `blue-tile-${tileIDs.blue}`;
    second.id = `blue-tile-${tileIDs.blue}`;
    tileIDs.blue++;


    // FUNCTIONALITY GOES SOMEWHERE ELSE? 

    var degrees = [0, 45, 90, 135, 180, 225, 270, 315];
    var randomIndex = Math.floor(Math.random() * degrees.length);
    var randomDegree = degrees[randomIndex];

    var img1Angle = 0;

    img2.style.transform = "rotate(" + randomDegree + "deg)";
    arrow.addEventListener('click', rotateImage);
    
    function rotateImage() {
        img1Angle += 45;
        img.style.transform = "rotate(" + img1Angle + "deg)";
        console.log("Arrow clicked, image rotated to " + img1Angle + " degrees");
        checkMatch();
    }

    function checkMatch() {
        var currentRotation = img1Angle % 360;
        
        if (currentRotation === randomDegree) {
            alert("Images are aligned!");
        }
    }


}

// Helper function to create a slider in pink tile
function createSlider(label, initialValue) {
    // Create container for slider and label
    const container = document.createElement('div');
    container.classList.add('slider-container');
    container.textContent = label + ":";

    // Create slider input
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = 0;
    slider.max = 255;
    slider.value = initialValue;

    // Append slider to container
    container.appendChild(slider);
    
    return { container, slider };
}

// Create a pair of pink tiles
function createPinkTilePair() {
    // First Tile
    const first = document.createElement('div');
    first.classList.add('tile', 'pink');

    // Create sliders container
    const sliders = document.createElement('div');
    sliders.classList.add('sliders');
    sliders.classList.add('column-layout');
    first.appendChild(sliders);

    // Create sliders and append to sliders container
    const r = createSlider("R", 255);
    const g = createSlider("G", 192);
    const b = createSlider("B", 203);

    sliders.appendChild(r.container);
    sliders.appendChild(g.container);
    sliders.appendChild(b.container);

    // Create color display box
    const colorDisplay = document.createElement('div');
    colorDisplay.classList.add('color-display');
    first.appendChild(colorDisplay);

    // Second Tile
    const second = document.createElement('div');
    second.classList.add('tile', 'pink');
    
    // Create larger color display box
    const colorDisplay2 = document.createElement('div');
    colorDisplay2.classList.add('color-display-large');
    second.appendChild(colorDisplay2);
    
    // Append tiles to main
    main.appendChild(second);
    main.appendChild(first);

    first.id = `pink-tile-${tileIDs.pink}`;
    second.id = `pink-tile-${tileIDs.pink}`;
    tileIDs.pink++;

    // SEPARATE FUNCTIONALITY LATER 
    // Update color display based on slider values

    // Set random target color
    function setRandomColor() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);

        const rgbString = `rgb(${r}, ${g}, ${b})`;
        colorDisplay2.style.backgroundColor = rgbString;
    }

    // Update color display based on slider values
    function updateColor() {
        const rValue = r.slider.value;
        const gValue = g.slider.value;
        const bValue = b.slider.value;
        const rgbString = `rgb(${rValue}, ${gValue}, ${bValue})`;
        colorDisplay.style.backgroundColor = rgbString;

        // Check for match
        checkMatch();
    }

    // Check if colors match within a threshold
    function checkMatch() {      
        const rValue = r.slider.value;
        const gValue = g.slider.value;
        const bValue = b.slider.value;
        const targetColor = colorDisplay2.style.backgroundColor;
        const currentColor = `rgb(${rValue}, ${gValue}, ${bValue})`;

        // Parse RGB values from target color
        let targetR, targetG, targetB;
        targetR = parseInt(targetColor.slice(4, targetColor.indexOf(',')));
        targetG = parseInt(targetColor.slice(targetColor.indexOf(',') + 2, targetColor.lastIndexOf(',')));
        targetB = parseInt(targetColor.slice(targetColor.lastIndexOf(',') + 2, targetColor.indexOf(')')));

        // Calculate differences
        const redDiff = Math.abs(targetR - rValue);
        const greenDiff = Math.abs(targetG - gValue);
        const blueDiff = Math.abs(targetB - bValue);

        const threshold = 25; // Allowable difference

        // If all differences are within the threshold, colors match
        if (redDiff <= threshold && greenDiff <= threshold && blueDiff <= threshold) {
            alert("Colors match!");
        }
    }

    // Add event listeners to sliders
    r.slider.addEventListener('input', updateColor);
    g.slider.addEventListener('input', updateColor);
    b.slider.addEventListener('input', updateColor);

    // Initialize color display
    setRandomColor();
    updateColor();
    
}

// Helper function to draw a Cartesian plane
function drawCartesianPlane(drawings) {
    const plane = document.createElement('div');
    plane.classList.add('cartesian-plane');
    
    const gridSize = 7;
    let randomDrawingCoords = [];
    
    if (drawings) {
        // Get all keys
        const keys = Object.keys(drawings);
        
        // Pick a random key
        const randomDrawing = keys[Math.floor(Math.random() * keys.length)];
        console.log('Selected drawing:', randomDrawing);
        randomDrawingCoords = drawings[randomDrawing];
        console.log('Coordinates:', randomDrawingCoords);
    }
    
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            
            // Check if this cell's coordinates match any in the random drawing
            if (randomDrawingCoords.some(coord => coord[0] === j && coord[1] === i)) {
                cell.classList.add('filled');
            }
            
            plane.appendChild(cell);
        }
    }
    
    return plane;
}

var drawings = {
    plus: [[3,1], [3,2], [3,3], [3,4], [3,5], [1,3], [2,3], [4,3], [5,3]],
    x: [[1,1], [2,2], [3,3], [4,4], [5,5], [1,5], [2,4], [4,2], [5,1]],
    minus: [[1,3], [2,3], [3,3], [4,3], [5,3]],
    divide: [[1,3], [2,3], [3,3], [4,3], [5,3], [3,1], [3,5]]
}
// Create a pair of orange tiles
function createOrangeTilePair(){
    const first = document.createElement('div');
    first.classList.add('tile');
    first.classList.add('orange');
    
    const plane = drawCartesianPlane(drawings);
    first.appendChild(plane);
    
    const second = document.createElement('div');
    second.classList.add('tile');
    second.classList.add('orange');
    
    const plane2 = drawCartesianPlane();
    second.appendChild(plane2);
    
    main.appendChild(first);
    main.appendChild(second);

    first.id = `orange-tile-${tileIDs.orange}`;
    second.id = `orange-tile-${tileIDs.orange}`;
    tileIDs.orange++;

    const cells = plane2.querySelectorAll('.grid-cell');
    
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            console.log('Cell clicked');
            cell.classList.toggle('filled');
            checkMatch();
            
        });
    });

    function checkMatch() {
        const cells1 = plane.querySelectorAll('.grid-cell');
        const cells2 = plane2.querySelectorAll('.grid-cell');

        if (cells1.length !== cells2.length) return false;

        for (let i = 0; i < cells1.length; i++) {
            const isFilled1 = cells1[i].classList.contains('filled');
            const isFilled2 = cells2[i].classList.contains('filled');
            
            if (isFilled1 !== isFilled2) {
                return false;
            }
        }
        alert("Tiles match!");
    }
}


createGreenTilePair();
// createGreenTilePair();
// createPinkTilePair();
// createPinkTilePair();
// createBlueTilePair();
// createBlueTilePair();
createOrangeTilePair();




// TODO 
// Get checking for orange tile up and running
// Decide whether to do either paired tiles, or any of the same color are ok 
// Randomize tile generation
// Find a way to layer them like in mahjong 
// Playtest to see if it actually works 
