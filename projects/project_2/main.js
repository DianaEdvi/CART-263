import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Terrain, Biome, advanceBiome } from './Terrain.js';
import { PerlinNoise } from './PerlinNoise.js';

let terrain = new Terrain();

// Seed the random number generator

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(75, 60, 180);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(75, 0, 75);
controls.update();

const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(20, 100, 50);
scene.add(directionalLight);

terrain.setBiome(Biome.PLAINS);

// Initialize noise generators for each terrain level
let noiseLevels = [];
for (let i = 0; i < terrain.levels.length; i++) {
    noiseLevels.push(new PerlinNoise(terrain.n));
}

// Generate initial terrain
terrain.generateTerrain(noiseLevels);

let geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(terrain.V, 3));
geometry.setAttribute('color', new THREE.BufferAttribute(terrain.C, 3));
geometry.setIndex(new THREE.BufferAttribute(terrain.F, 1));
geometry.computeVertexNormals();

const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    flatShading: true,
    side: THREE.DoubleSide,
    // remove specular
    roughness: 1.0,
    metalness: 0.0
});

let mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

window.addEventListener('keydown', (event) => {
    // Regenerate terrain on space key press
    if (event.key === ' ' || event.code === 'Space') {
        let newNoiseLevels = [];
        terrain.currentBiome = advanceBiome(terrain.currentBiome);
        terrain.setBiome(terrain.currentBiome);
        
        for (let i = 0; i < terrain.levels.length; i++) {
            newNoiseLevels.push(new PerlinNoise(terrain.n));
        }
        
        terrain.generateTerrain(newNoiseLevels);
        
        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.color.needsUpdate = true;
        geometry.computeVertexNormals();
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