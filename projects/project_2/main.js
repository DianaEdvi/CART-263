import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Sky } from 'three/addons/objects/Sky.js'; 
import { PerlinNoise } from './perlinNoise.js';
import {NUM_OCTAVES, generateTerrain } from './terrain.js';
import { CloudLayer } from './clouds.js'; 

const terrainGridSize = 1000; 
const maxCoord = terrainGridSize;

// Scene Setup
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x87CEEB, 500, 2500);
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000); // Increased far clipping plane for the skybox
camera.position.set(maxCoord / 2, 150, maxCoord + 100);

// Renderer Setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Move the center of the orbit controls to the middle of the terrain
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(maxCoord / 2, 0, maxCoord / 2);
controls.update();

// Skybox Setup
const sky = new Sky();
sky.scale.setScalar(450000); 
scene.add(sky);

const sun = new THREE.Vector3();

// Configure the sky values
const skyUniforms = sky.material.uniforms;
skyUniforms['turbidity'].value = 2;  
skyUniforms['rayleigh'].value = 0.5; 
skyUniforms['mieCoefficient'].value = 0.005;
skyUniforms['mieDirectionalG'].value = 0.8;

// Set Sun Position
const elevation = 25;
const azimuth = 180;
const phi = THREE.MathUtils.degToRad(90 - elevation);
const theta = THREE.MathUtils.degToRad(azimuth);
sun.setFromSphericalCoords(1, phi, theta);
sky.material.uniforms['sunPosition'].value.copy(sun);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
dirLight.position.copy(sun).multiplyScalar(100); // Put the light where the sun is
scene.add(dirLight);


// Terrain Mesh Setup
const geometry = new THREE.PlaneGeometry(maxCoord, maxCoord, terrainGridSize, terrainGridSize);
geometry.rotateX(-Math.PI / 2);
geometry.translate(maxCoord / 2, 0, maxCoord / 2);

const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.8,
    flatShading: true,
});

const terrainMesh = new THREE.Mesh(geometry, material);
scene.add(terrainMesh);

// Generate a new map
function generateNewMap() {
    // Create Perlin noise generators for each octave
    const noiseLevels = [];
    for (let i = 0; i < NUM_OCTAVES; i++) {
        noiseLevels.push(new PerlinNoise(terrainGridSize));
    }

    // Calculate the colors of the terrain
    const colors = generateTerrain(noiseLevels, geometry, maxCoord);

    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    // Update the geometry
    geometry.attributes.position.needsUpdate = true; 
    geometry.computeVertexNormals(); 
}

// Initialize
generateNewMap();

// Create and add the cloud layer
const clouds = new CloudLayer(8000, 400, maxCoord);
scene.add(clouds.mesh);

// Event Listeners
window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        generateNewMap();
    }
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Render Loop
function animate() {
    requestAnimationFrame(animate);
    
    // Animate the clouds
    clouds.update(0.0005, 0.0002);
    
    controls.update();
    renderer.render(scene, camera);
}
animate();