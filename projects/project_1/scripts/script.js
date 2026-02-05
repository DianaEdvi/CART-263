window.onload = setup;

const tileIDs = { green: 0, blue: 0, pink: 0, orange: 0 };

const words = [
  { original: "Apple", cipher: "Bqqmf", skip: 1 },
  { original: "Chair", cipher: "Dibjs", skip: 1 },
  { original: "Mountain", cipher: "Npvoubjo", skip: 1 },
  { original: "River", cipher: "Sjwfs", skip: 1 },
  { original: "Lantern", cipher: "Mboufso", skip: 1 },
  { original: "Cloud", cipher: "Dmpve", skip: 1 },
  { original: "Carpet", cipher: "Dbsqfu", skip: 1 },
  { original: "Mirror", cipher: "Njssps", skip: 1 },
  { original: "Bicycle", cipher: "Cjdzdmf", skip: 1 },
  { original: "Notebook", cipher: "Opufcppl", skip: 1 },
  { original: "Ocean", cipher: "Pdfbo", skip: 1 },
  { original: "Key", cipher: "Lfz", skip: 1 },
  { original: "Forest", cipher: "Gpsftu", skip: 1 },
  { original: "Clock", cipher: "Dmpdl", skip: 1 },
  { original: "Window", cipher: "Xjoepx", skip: 1 },
  { original: "Spoon", cipher: "Tqppo", skip: 1 },
  { original: "Backpack", cipher: "Cbdlqbdl", skip: 1 },
  { original: "Candle", cipher: "Dboemf", skip: 1 },
  { original: "Bridge", cipher: "Csjehf", skip: 1 },
  { original: "Pillow", cipher: "Qjmmpx", skip: 1 },
  // … truncated for brevity (keep the full words array in your project)
];

const main = document.querySelector('main');

const container = document.createElement('div');
container.classList.add('container');
main.appendChild(container);

// ------------------- SETUP -------------------
function setup() {
  console.log("Setup complete");

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
  const randomWordIndex = Math.floor(Math.random() * words.length);
  const word = words[randomWordIndex];

  const first = createTile('green', ['column-layout']);
  const line1 = createTextDiv('green-text', `Ceasar drank ${word.skip} beers`);
  const line2 = createTextDiv('green-text', word.cipher);
  first.append(line1, line2);

  const second = createTile('green');
  const searchBar = createInput('search', 'search-bar');
  const submitButton = createButton('Submit', () => {
    alert(searchBar.value === word.original ? 'Correct!' : 'Incorrect!');
  });
  second.append(searchBar, submitButton);

  appendTiles(first, second, 'green');
}

// ------------------- BLUE TILE -------------------
function createBlueTilePair() {
  const first = createTile('blue');
  const img = createImage('https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/220px-Cat03.jpg', 'tile-image');
  const arrow = createImage('./media/arrow.png', 'arrow-image');
  first.append(img, arrow);

  const second = createTile('blue');
  const img2 = img.cloneNode();
  second.appendChild(img2);

  appendTiles(first, second, 'blue');

  // Rotation logic
  const degrees = [0, 45, 90, 135, 180, 225, 270, 315];
  const targetRotation = degrees[Math.floor(Math.random() * degrees.length)];
  let currentRotation = 0;
  img2.style.transform = `rotate(${targetRotation}deg)`;

  arrow.addEventListener('click', () => {
    currentRotation += 45;
    img.style.transform = `rotate(${currentRotation}deg)`;
    if ((currentRotation % 360) === targetRotation) alert('Images are aligned!');
  });
}

// ------------------- PINK TILE -------------------
function createPinkTilePair() {
  const first = createTile('pink', ['column-layout']);
  const sliders = createSliders(['R', 'G', 'B'], [255, 192, 203]);
  const colorDisplay = createDiv('color-display');
  first.append(sliders.container, colorDisplay);

  const second = createTile('pink');
  const targetColorDisplay = createDiv('color-display-large');
  second.appendChild(targetColorDisplay);

  appendTiles(second, first, 'pink');

  // Color matching
  const targetColor = getRandomRGB();
  targetColorDisplay.style.backgroundColor = targetColor;
  sliders.inputs.forEach(input => input.addEventListener('input', () => {
    const currentColor = `rgb(${sliders.inputs[0].value}, ${sliders.inputs[1].value}, ${sliders.inputs[2].value})`;
    colorDisplay.style.backgroundColor = currentColor;
    if (colorsMatch(currentColor, targetColor)) alert('Colors match!');
  }));
}

// ------------------- ORANGE TILE -------------------
const drawings = {
  plus: [[3,1], [3,2], [3,3], [3,4], [3,5], [1,3], [2,3], [4,3], [5,3]],
  x: [[1,1], [2,2], [3,3], [4,4], [5,5], [1,5], [2,4], [4,2], [5,1]],
  minus: [[1,3], [2,3], [3,3], [4,3], [5,3]],
  divide: [[1,3], [2,3], [3,3], [4,3], [5,3], [3,1], [3,5]]
};

function createOrangeTilePair() {
  const first = createTile('orange');
  const second = createTile('orange');

  const plane1 = drawCartesianPlane(drawings);
  const plane2 = drawCartesianPlane();

  first.appendChild(plane1);
  second.appendChild(plane2);

  appendTiles(first, second, 'orange');

  plane2.querySelectorAll('.grid-cell').forEach(cell => {
    cell.addEventListener('click', () => {
      cell.classList.toggle('filled');
      if (checkPlaneMatch(plane1, plane2)) alert('Tiles match!');
    });
  });
}

// ------------------- HELPER FUNCTIONS -------------------
function createTile(color, classes = []) {
  const tile = document.createElement('div');
  tile.classList.add('tile', color, ...classes);
  return tile;
}

function createTextDiv(className, text) {
  const div = document.createElement('div');
  div.classList.add(className);
  div.textContent = text;
  return div;
}

function createInput(type, className) {
  const input = document.createElement('input');
  input.type = type;
  input.classList.add(className);
  return input;
}

function createButton(text, callback) {
  const btn = document.createElement('button');
  btn.textContent = text;
  btn.addEventListener('click', callback);
  return btn;
}

function createImage(src, className) {
  const img = document.createElement('img');
  img.src = src;
  img.classList.add(className);
  return img;
}

function createDiv(className) {
  const div = document.createElement('div');
  div.classList.add(className);
  return div;
}

function appendTiles(first, second, color) {
  first.id = `${color}-tile-${tileIDs[color]}`;
  second.id = `${color}-tile-${tileIDs[color]}`;
  container.append(first, second);
  tileIDs[color]++;
}

function createSliders(labels, values) {
  const container = document.createElement('div');
  container.classList.add('sliders', 'column-layout');
  const inputs = labels.map((label, i) => {
    const sliderContainer = document.createElement('div');
    sliderContainer.classList.add('slider-container');
    sliderContainer.textContent = `${label}:`;
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = 0;
    slider.max = 255;
    slider.value = values[i];
    sliderContainer.appendChild(slider);
    container.appendChild(sliderContainer);
    return slider;
  });
  return { container, inputs };
}

function getRandomRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

function colorsMatch(color1, color2, threshold = 25) {
  const [r1, g1, b1] = color1.match(/\d+/g).map(Number);
  const [r2, g2, b2] = color2.match(/\d+/g).map(Number);
  return Math.abs(r1 - r2) <= threshold &&
         Math.abs(g1 - g2) <= threshold &&
         Math.abs(b1 - b2) <= threshold;
}

function drawCartesianPlane(drawings = null) {
  const plane = createDiv('cartesian-plane');
  const gridSize = 7;
  let coords = [];

  if (drawings) {
    const keys = Object.keys(drawings);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    coords = drawings[randomKey];
  }

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const cell = createDiv('grid-cell');
      if (coords.some(([cx, cy]) => cx === x && cy === y)) cell.classList.add('filled');
      plane.appendChild(cell);
    }
  }
  return plane;
}

function checkPlaneMatch(plane1, plane2) {
  const cells1 = plane1.querySelectorAll('.grid-cell');
  const cells2 = plane2.querySelectorAll('.grid-cell');
  return Array.from(cells1).every((cell, i) =>
    cell.classList.contains('filled') === cells2[i].classList.contains('filled')
  );
}
