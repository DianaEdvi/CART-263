window.onload = setup;

const main = document.querySelector('main');


function setup(){
    
}

// Create a pair of green tiles
function createGreenTilePair(){
    // First Tile
    const first = document.createElement('div');
    first.textContent = "JJDJSJSSJJDN"; // Coded message

    // Add classes and append to main
    first.classList.add('tile');
    first.classList.add('green');
    main.appendChild(first);
    
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
    main.appendChild(second);
}

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
    arrow.src = "../media/arrow.png";
    arrow.classList.add('arrow-image');
    first.appendChild(arrow);

    // Second Tile
    const second = document.createElement('div');
    second.classList.add('tile');
    second.classList.add('blue');
    second.appendChild(img.cloneNode()); // Clone the image for the second tile

    // Append tiles to main
    main.appendChild(first);
    main.appendChild(second);
}

function createPinkTilePair(){
    const first = document.createElement('div');
    first.classList.add('tile');
    first.classList.add('pink');

    const sliders = document.createElement('div');
    sliders.classList.add('sliders');
    first.appendChild(sliders);

    const rContainer = document.createElement('div');
    rContainer.classList.add('slider-container');
    sliders.appendChild(rContainer);
    rContainer.textContent = "R:";

    const r_slider = document.createElement('input');
    r_slider.type = 'range';
    r_slider.min = 0;
    r_slider.max = 255;
    r_slider.value = 255;
    r_slider.classList.add('slider');
    rContainer.appendChild(r_slider);

    const gContainer = document.createElement('div');
    gContainer.classList.add('slider-container');
    sliders.appendChild(gContainer);
    gContainer.textContent = "G:";

    const g_slider = document.createElement('input');
    g_slider.type = 'range';
    g_slider.min = 0;
    g_slider.max = 255;
    g_slider.value = 192;
    g_slider.classList.add('slider');
    gContainer.appendChild(g_slider);

    const bContainer = document.createElement('div');
    bContainer.classList.add('slider-container');
    sliders.appendChild(bContainer);
    bContainer.textContent = "B:";

    const b_slider = document.createElement('input');
    b_slider.type = 'range';
    b_slider.min = 0;
    b_slider.max = 255;
    b_slider.value = 203;
    b_slider.classList.add('slider');
    bContainer.appendChild(b_slider);

    const colorDisplay = document.createElement('div');
    colorDisplay.classList.add('color-display');
    first.appendChild(colorDisplay);

    main.appendChild(first);

    const second = document.createElement('div');
    second.classList.add('tile');
    second.classList.add('pink');

    const colorDisplay2 = document.createElement('div');
    colorDisplay2.classList.add('color-display-large');
    second.appendChild(colorDisplay2);

    main.appendChild(second);



}

function createOrangeTilePair(){
    const first = document.createElement('div');
    first.classList.add('tile');
    first.classList.add('orange');

    const points = document.createElement('ul');
    const point1 = document.createElement('li');
    point1.classList.add('coordinate-point');
    point1.textContent = "(0,0)";
    const point2 = document.createElement('li');
    point2.classList.add('coordinate-point');
    point2.textContent = "(1,1)";
    const point3 = document.createElement('li');
    point3.classList.add('coordinate-point');
    point3.textContent = "(2,2)";
    points.appendChild(point1);
    points.appendChild(point2);
    points.appendChild(point3);
    first.appendChild(points);
    points.appendChild(point1);
    
    main.appendChild(first);

    const second = document.createElement('div');
    second.classList.add('tile');
    second.classList.add('orange');

    main.appendChild(second);
}

function createSlider(){
    
}

createGreenTilePair();
createGreenTilePair();
createPinkTilePair();
createBlueTilePair();
createOrangeTilePair();