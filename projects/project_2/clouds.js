import * as THREE from 'three';
import { PerlinNoise } from './PerlinNoise.js';

export class CloudLayer {
    constructor(size, altitude, terrainSize) {
        this.size = size;
        this.altitude = altitude;
        this.terrainSize = terrainSize;

        this.texture = this.createProceduralClouds();
        this.mesh = this.createMesh();
    }

    // Use Perlin noise to create a procedural cloud texture on a canvas
    createProceduralClouds() {
        // Create a canvas to draw the cloud texture
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        const imgData = ctx.createImageData(512, 512);
        
        // Create a Perlin noise generator
        const cloudNoise = new PerlinNoise(512);
        
        // Loop through each pixel and set the alpha based on the noise value
        for (let x = 0; x < 512; x++) {
            for (let y = 0; y < 512; y++) {
                // Fractal Brownian Motion
                let n = cloudNoise.noise(x * 0.02, y * 0.02) * 1.0 + 
                        cloudNoise.noise(x * 0.05, y * 0.05) * 0.5;
                
                n = (n + 1.5) / 3; // Normalize roughly to 0-1
                
                // Cut out the bottom values to create clear sky between clouds
                let alpha = Math.max(0, (n - 0.5) * 2.5) * 255;

                // Set the pixel color to white with the calculated alpha
                const idx = (x + y * 512) * 4;
                imgData.data[idx] = 255;     // R 
                imgData.data[idx + 1] = 255; // G 
                imgData.data[idx + 2] = 255; // B 
                imgData.data[idx + 3] = alpha; // A
            }
        }
        // Draw the generated image data onto the canvas
        ctx.putImageData(imgData, 0, 0);
        
        // Create a texture 
        const texture = new THREE.CanvasTexture(canvas);
        // Allows infinite scrolling
        texture.wrapS = THREE.RepeatWrapping; 
        texture.wrapT = THREE.RepeatWrapping;
        return texture;
    }

    createMesh() {
        // Add the cloud plane high above the terrain
        const cloudGeo = new THREE.PlaneGeometry(this.size, this.size);
        const cloudMat = new THREE.MeshBasicMaterial({
            map: this.texture,
            transparent: true,
            opacity: 0.6,
            depthWrite: false, // Fixes transparency sorting issues against the sky
            side: THREE.DoubleSide
        });
        const mesh = new THREE.Mesh(cloudGeo, cloudMat);
        mesh.position.set(this.terrainSize / 2, this.altitude, this.terrainSize / 2);  // Center the cloud layer over the terrain
        mesh.rotation.x = Math.PI / 2; // Rotate to be horizontal
        return mesh;
    }

    // Animate
    update(velocityX, velocityY) {
        this.texture.offset.x -= velocityX;
        this.texture.offset.y -= velocityY;
    }
}