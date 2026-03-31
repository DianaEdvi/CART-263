import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Grid, Level } from './Grid.js';
import { PerlinNoise } from './PerlinNoise.js';

let grid = new Grid();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(50, 40, 120);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(50, 0, 50);
controls.update();

const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(20, 100, 50);
scene.add(directionalLight);

let lvl0 = new Level(0.5, 2.0);
let lvl1 = new Level(0.05, 10.0);
let lvl2 = new Level(0.02, 40.0);

let level0 = new PerlinNoise(grid.n);
let level1 = new PerlinNoise(grid.n);
let level2 = new PerlinNoise(grid.n);

let rows = grid.getRows();
for (let i = 0; i < rows; i++) {
    let x = grid.V[i * 3];
    let z = grid.V[i * 3 + 2];

    let x0 = x * lvl0.frequency;
    let z0 = z * lvl0.frequency;
    let y0 = level0.noise(x0, z0);
    grid.V[i * 3 + 1] = y0 * lvl0.amplitude;

    let x1 = x * lvl1.frequency;
    let z1 = z * lvl1.frequency;
    let y1 = level1.noise(x1, z1);
    grid.V[i * 3 + 1] += y1 * lvl1.amplitude;

    let x2 = x * lvl2.frequency;
    let z2 = z * lvl2.frequency;
    let y2 = level2.noise(x2, z2);
    grid.V[i * 3 + 1] += y2 * lvl2.amplitude;
}

let geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(grid.V, 3));
geometry.setIndex(new THREE.BufferAttribute(grid.F, 1));
geometry.computeVertexNormals();

const material = new THREE.MeshStandardMaterial({
    color: 0x44aa88,
    flatShading: true,
    side: THREE.DoubleSide
});

let mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

window.addEventListener('keydown', (event) => {
    // Check if the 'r' or 'R' key was pressed
    if (event.key === 'r' || event.key === 'R') {
        level0 = new PerlinNoise(grid.n);
        level1 = new PerlinNoise(grid.n);
        level2 = new PerlinNoise(grid.n);

        for (let i = 0; i < rows; i++) {
            let x = grid.V[i * 3];
            let z = grid.V[i * 3 + 2];

            let x0 = x * lvl0.frequency;
            let z0 = z * lvl0.frequency;
            let y0 = level0.noise(x0, z0);
            grid.V[i * 3 + 1] = y0 * lvl0.amplitude;

            let x1 = x * lvl1.frequency;
            let z1 = z * lvl1.frequency;
            let y1 = level1.noise(x1, z1);
            grid.V[i * 3 + 1] += y1 * lvl1.amplitude;

            let x2 = x * lvl2.frequency;
            let z2 = z * lvl2.frequency;
            let y2 = level2.noise(x2, z2);
            grid.V[i * 3 + 1] += y2 * lvl2.amplitude;
        }

        geometry.attributes.position.needsUpdate = true;
        geometry.computeVertexNormals();
        // Tells libigl we handled this key press
    }
});

// Plot the mesh
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();