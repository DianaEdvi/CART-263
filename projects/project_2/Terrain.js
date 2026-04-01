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

export class Terrain {
    constructor() {
        this.n = 300;
        this.width = 1;
        this.NUM_OCTAVES = 5;
        this.currentBiome = Biome.PLAINS;
        // For sinking the terrain for islands 
        this.globalOffset = 0.0; 
        this.levels = [];

        // Triangle 1 
        // Triangle 2 
        this.geometry = new THREE.PlaneGeometry(this.n * this.width, this.n * this.width, this.n, this.n);
        this.geometry.rotateX(-Math.PI / 2);
        this.geometry.translate((this.n * this.width) / 2, 0, (this.n * this.width) / 2);
    }

    generateTerrain(noiseLevels) {
        let maxCoord = this.n * this.width;

        let quadrantBiomes = [Biome.PLAINS, Biome.MOUNTAINS, Biome.VALLEYS, Biome.ISLANDS];

        // Shuffle the list randomly every time spacebar is pressed
        quadrantBiomes.sort(() => Math.random() - 0.5);
        
        const positions = this.geometry.attributes.position;
        const colors = [];

        for (let i = 0; i < positions.count; i++) {
            let x = positions.getX(i);
            let z = positions.getZ(i);

            // Calculate normalized coordinates (0.0 to 1.0)
            let normalized_x = x / maxCoord;
            let normalized_z = z / maxCoord;

            // Smoothstep: 3t^2 - 2t^3
            // Blends nicely between biomes
            let smooth_x = 3 * Math.pow(normalized_x, 2.0) - 2 * Math.pow(normalized_x, 3.0);
            let smooth_z = 3 * Math.pow(normalized_z, 2.0) - 2 * Math.pow(normalized_z, 3.0);

            // Assign quadrant weights based on Cartesean quadrants
            let w_Q1 = smooth_x * smooth_z;               
            let w_Q2 = (1.0 - smooth_x) * smooth_z;       
            let w_Q3 = (1.0 - smooth_x) * (1.0 - smooth_z); 
            let w_Q4 = smooth_x * (1.0 - smooth_z);       

            // Calculate the height of all 4 biomes at this exact (X,Z) location
            let h_Q1 = this.calculateBiomeHeight(quadrantBiomes[0], x, z, noiseLevels);
            let h_Q2 = this.calculateBiomeHeight(quadrantBiomes[1], x, z, noiseLevels);
            let h_Q3 = this.calculateBiomeHeight(quadrantBiomes[2], x, z, noiseLevels);
            let h_Q4 = this.calculateBiomeHeight(quadrantBiomes[3], x, z, noiseLevels);

            // Blend the heights together using the spatial weights
            let finalHeight = (h_Q1 * w_Q1) + 
                              (h_Q2 * w_Q2) + 
                              (h_Q3 * w_Q3) + 
                              (h_Q4 * w_Q4);

            let originalAltitude = finalHeight;

            // Flatten water
            if (finalHeight < 0.0) {
                finalHeight = 0.0;
            }

            positions.setY(i, finalHeight);
            
            // Apply Color
            let col = this.getTerrainColor(this.currentBiome, originalAltitude);
            colors.push(col.r, col.g, col.b);
        }

        this.geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        positions.needsUpdate = true;
        this.geometry.computeVertexNormals();
    }

    getTerrainColor(biome, altitude) {
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
            let t = altitude / 5.0; 
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