import * as THREE from 'three';

// Scene Setup
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x87CEEB, 500, 2500);
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000); 
camera.position.set(500, 150, 1100);

// Renderer Setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Test cube 
const geometry = new THREE.BoxGeometry(200, 200, 200);
const material = new THREE.MeshBasicMaterial({ color: 0xff4500 }); 
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Point the camera cube
camera.lookAt(cube.position);

// Render Loop
function animate() {
    requestAnimationFrame(animate);
    
    // Slowly rotate the cube
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}
animate();