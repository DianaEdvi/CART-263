import * as THREE from 'three';

// Define a new Row-Major dynamic matrix type (Cache locality optimization for sparse solvers)

export class Level {
    constructor(frequency, amplitude) {
        this.frequency = frequency;
        this.amplitude = amplitude;
    }
}

export const Biome = {
    PLAINS: 0, MOUNTAINS: 1, VALLEYS: 2, ISLANDS: 3
};

// ++ operator overload 
// Wrap around

export class Terrain {
    constructor() {
        this.n = 300;
        this.width = 1;
        this.NUM_OCTAVES = 5;
        this.currentBiome = Biome.PLAINS;
        this.globalOffset = 0.0; // For sinking the terrain for islands 
        this.levels = [];

        this.geometry = new THREE.BufferGeometry();
        
        const vertexCount = (this.n + 1) * (this.n + 1);
        const vertices = new Float32Array(vertexCount * 3);
        const indices = [];

        for (let i = 0; i < this.n + 1; i++) {
            for (let j = 0; j < this.n + 1; j++) {
                let idx = (i * (this.n + 1) + j) * 3;
                vertices[idx] = i * this.width;
                vertices[idx + 1] = 0.0;
                vertices[idx + 2] = j * this.width;
            }
        }

        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                // Triangle 1 
                let p1 = i * (this.n + 1) + j;
                let p2 = i * (this.n + 1) + j + 1;
                let p3 = i * (this.n + 1) + j + this.n + 1;
                indices.push(p1, p2, p3);

                // Triangle 2 
                let q1 = i * (this.n + 1) + j + this.n + 1;
                let q2 = i * (this.n + 1) + j + 1;
                let q3 = i * (this.n + 1) + j + this.n + 2;
                indices.push(q1, q2, q3);
            }
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        this.geometry.setIndex(indices);
        
        this.colors = new Float32Array(vertexCount * 3);
    }

    // Generates terrain of 16 biomes (from 4 types)
    generateTerrain(noiseLevels) {
        let maxCoord = this.n * this.width;

        // 4 of each biome type
        let gridBiomes = [
            Biome.PLAINS, Biome.PLAINS, Biome.PLAINS, Biome.PLAINS,
            Biome.MOUNTAINS, Biome.MOUNTAINS, Biome.MOUNTAINS, Biome.MOUNTAINS,
            Biome.VALLEYS, Biome.VALLEYS, Biome.VALLEYS, Biome.VALLEYS,
            Biome.ISLANDS, Biome.ISLANDS, Biome.ISLANDS, Biome.ISLANDS
        ];

        // Shuffle biomes
        gridBiomes.sort(() => Math.random() - 0.5);
        
        const positions = this.geometry.attributes.position.array;
        const vertexCount = (this.n + 1) * (this.n + 1);

        // Multithreading madness (generate vertex height and color)
        for (let i = 0; i < vertexCount; i++) {
            let x = positions[i * 3];
            let z = positions[i * 3 + 2];

            // Normalize from [0, 1]
            let normalized_x = x / maxCoord;
            let normalized_z = z / maxCoord;

            // Scale up to our 4x4 grid coordinates [0, 3] (there are 3 gaps between 4 biomes)
            let actual_x = normalized_x * 3.0;
            let actual_z = normalized_z * 3.0;

            // Determine which of the 3 transition cells we are inside
            let index_x = Math.min(Math.floor(actual_x), 2);
            let index_z = Math.min(Math.floor(actual_z), 2);

            // Get the fractional part for smooth blending inside this specific cell [0, 1]
            let remainder_x = actual_x - index_x;
            let remainder_z = actual_z - index_z;

            // Smoothstep: 3t^2 - 2t^3
            // Blends nicely between biomes
            let smooth_x = 3 * Math.pow(remainder_x, 2.0) - 2 * Math.pow(remainder_x, 3.0);
            let smooth_z = 3 * Math.pow(remainder_z, 2.0) - 2 * Math.pow(remainder_z, 3.0);

            // Calculate the blending weights for the 4 corners of our current cell
            let w00 = (1.0 - smooth_x) * (1.0 - smooth_z); // Top-Left
            let w10 = smooth_x * (1.0 - smooth_z);         // Top-Right
            let w01 = (1.0 - smooth_x) * smooth_z;         // Bottom-Left
            let w11 = smooth_x * smooth_z;                 // Bottom-Right

            // Grab the 4 specific biomes from vector
            let b00 = gridBiomes[index_x + (index_z * 4)];
            let b10 = gridBiomes[(index_x + 1) + (index_z * 4)];
            let b01 = gridBiomes[index_x + ((index_z + 1) * 4)];
            let b11 = gridBiomes[(index_x + 1) + ((index_z + 1) * 4)];

            // Calculate heights for the 4 biomes
            let h00 = this.calculateBiomeHeight(b00, x, z, noiseLevels);
            let h10 = this.calculateBiomeHeight(b10, x, z, noiseLevels);
            let h01 = this.calculateBiomeHeight(b01, x, z, noiseLevels);
            let h11 = this.calculateBiomeHeight(b11, x, z, noiseLevels);

            // Blend the heights together
            let finalHeight = (h00 * w00) + (h10 * w10) + (h01 * w01) + (h11 * w11);

            let originalAltitude = finalHeight;

            // Flatten water
            if (finalHeight < 0.0) {
                finalHeight = 0.0;
            }

            positions[i * 3 + 1] = finalHeight;
            
            // Apply Color
            let col = this.getTerrainColor(originalAltitude);
            this.colors[i * 3] = col.r;
            this.colors[i * 3 + 1] = col.g;
            this.colors[i * 3 + 2] = col.b;
        }

        this.geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3));
        this.geometry.attributes.position.needsUpdate = true;
        this.geometry.computeVertexNormals();
    }

    getTerrainColor(altitude) {
        let water = new THREE.Color(0.10, 0.30, 0.80);
        let sand = new THREE.Color(0.76, 0.70, 0.50); 
        let grass = new THREE.Color(0.20, 0.55, 0.20);
        let rock = new THREE.Color(0.40, 0.40, 0.45);
        let snow = new THREE.Color(0.95, 0.95, 0.95);
        
        let outColor = new THREE.Color();

        // Blend Water into Sand (Altitude -5.0 to 0.0)
        if (altitude <= 0.0) {
            let t = Math.max(0.0, (altitude + 5.0) / 5.0); 
            return outColor.lerpColors(water, sand, t);
        } 
        // Blend Sand into Grass (Altitude 0 to 5)
        else if (altitude < 5.0) {
            let t = altitude / 5.0; // t goes from 0.0 to 1.0
            return outColor.lerpColors(sand, grass, t);
        } 
        // Blend Grass into Rock (Altitude 5 to 50)
        else if (altitude < 50.0) {
            let t = (altitude - 5.0) / 45.0; 
            return outColor.lerpColors(grass, rock, t);
        } 
        // Blend Rock into Snow (Altitude 50 to 65)
        else if (altitude < 65.0) {
            let t = (altitude - 50.0) / 15.0;
            return outColor.lerpColors(rock, snow, t);
        } 
        // Solid Snow for peaks
        else {
            return snow;
        }
    }

    calculateBiomeHeight(biome, x, z, noiseLevels) {
        let amplitude;
        let persistence;
        let frequency = 0.01;
        let lacunarity = 2.0;
        let localOffset = 0.0;

        // Set parameters
        switch (biome) {
            case Biome.PLAINS:    amplitude = 20.0; persistence = 0.2;  localOffset = -10.0; break;
            case Biome.MOUNTAINS: amplitude = 80.0; persistence = 0.35; localOffset = -15.0; break;
            case Biome.VALLEYS:   amplitude = 90.0; persistence = 0.3;  localOffset = -10.0; break;
            case Biome.ISLANDS:   amplitude = 90.0; persistence = 0.35; localOffset = -80.0; break;
        }

        let height = 0.0;
        
        // Generate layered Perlin noise
        for (let i = 0; i < this.NUM_OCTAVES; i++) {
            let noiseX = x * frequency;
            let noiseZ = z * frequency;
            let noiseVal = noiseLevels[i].noise(noiseX, noiseZ);

            if (biome === Biome.VALLEYS) { 
                // abs creates sharp peaks and 1- inverts them
                noiseVal = 1.0 - Math.abs(noiseVal); 
                // sharpen tops and smooth out bases 
                noiseVal *= noiseVal;  
            } else {
                // normalize to [0,1]
                noiseVal = (noiseVal + 1.0) * 0.5; 
            }

            height += noiseVal * amplitude;
            
            frequency *= lacunarity;
            amplitude *= persistence;
        }

        // Elevation Redistribution
        if ((biome === Biome.MOUNTAINS || biome === Biome.ISLANDS) && height > 0.0) {
            let exponent = 2.2;
            let normalizationScale = 80.0; 
            height = Math.pow(height / normalizationScale, exponent) * normalizationScale;
        }

        // Sink the terrain
        height += localOffset;

        return height;
    }
}