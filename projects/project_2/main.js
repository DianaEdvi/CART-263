import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Grid } from './Grid.js';
import { PerlinNoise } from './PerlinNoise.js';

const grid = new Grid();
const pn = new PerlinNoise(grid.n);
const scale = 0.15;

// Apply noise to vertices
for (let i = 0; i < grid.V.count; i++) {
    let x = grid.V.getX(i) * scale;
    let z = grid.V.getZ(i) * scale;
    
    let y = pn.noise(x, z);
    grid.V.setY(i, y * 5.0); 
}

// Recalculate normals so lighting works correctly on the deformed surface
grid.geometry.computeVertexNormals();

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

const material = new THREE.MeshStandardMaterial({ 
    color: 0x44aa88, 
    flatShading: true,
    side: THREE.DoubleSide
});

const mesh = new THREE.Mesh(grid.geometry, material);
scene.add(mesh);

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Render Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();