import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Terrain } from './Terrain.js';
import { PerlinNoise } from './perlinNoise.js';

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

// Helper to apply the mesh to the viewer and set rendering rules
function updateViewer(scene) {
    // Clear old data if regenerating
    if (currentMesh !== null) {
        scene.remove(currentMesh);
    }
    
    // Set geometry and colors
    let material = new THREE.MeshBasicMaterial({ 
        vertexColors: true 
    });
    
    currentMesh = new THREE.Mesh(terrain.geometry, material);
    scene.add(currentMesh);
    
    // Viewer settings
    // viewer.data().show_lines = false;
    // viewer.data().V_material_specular.setZero(); 
    // viewer.data().V_material_specular.col(3).setOnes();
}

// Setup Three.js environment (replacing igl::opengl::glfw::Viewer)
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(terrain.n / 2, 100, terrain.n + 50);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(terrain.n / 2, 0, terrain.n / 2);

// Seed the random number generator

// Generate and plot the initial terrain
generateNewMap();
updateViewer(scene);

// Generate new terrain whenever spacebar is pressed
window.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.keyCode === 32) {
        generateNewMap();
        updateViewer(scene);
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