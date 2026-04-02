import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Terrain } from './Terrain.js';
import { PerlinNoise } from './PerlinNoise.js';

let terrain = new Terrain();
let currentMesh = null;

// Helper to generate fresh noise and terrain
function generateNewMap(){
    let noiseLevels = [];
    for (let i = 0; i < terrain.NUM_OCTAVES; i++) {
        noiseLevels.push(new PerlinNoise(terrain.n));
    }
    terrain.generateTerrain(noiseLevels);
}

// Setup Three.js environment
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(terrain.n * terrain.width / 2, 200, terrain.n * terrain.width + 100);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(terrain.n * terrain.width / 2, 0, terrain.n * terrain.width / 2);

// Add lighting since Three.js requires it for flat shading to show depth
const light = new THREE.DirectionalLight(0xffffff, 1.0);
light.position.set(100, 200, 50);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

// Helper to apply the mesh to the viewer and set rendering rules
function updateViewer() {
    // Clear old data if regenerating
    if (currentMesh !== null) {
        scene.remove(currentMesh);
    }
    
    // Set geometry and colors
    let material = new THREE.MeshStandardMaterial({ 
        vertexColors: true,
        roughness: 0.8,
        flatShading: true
    });
    
    currentMesh = new THREE.Mesh(terrain.geometry, material);
    scene.add(currentMesh);
}

// Generate and plot the initial terrain
generateNewMap();
updateViewer();

// Generate new terrain whenever spacebar is pressed
window.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.keyCode === 32) {
        generateNewMap();
        updateViewer();
    }
});

// Launch the window
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});