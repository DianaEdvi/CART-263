// Define a new Row-Major dynamic matrix type (Cache locality optimization for sparse solvers)

export const Biome = {
    PLAINS: 0,
    MOUNTAINS: 1,
    VALLEYS: 2,
    ISLANDS: 3
};

export class Level {
    constructor(frequency, amplitude) {
        this.frequency = frequency;
        this.amplitude = amplitude;
    }
}

export class Terrain {
    constructor() {
        this.n = 150;
        this.width = 1;
        this.currentBiome = Biome.PLAINS;
        // For sinking the terrain for islands 
        this.globalOffset = 0.0; 
        
        this.V = new Float32Array((this.n + 1) * (this.n + 1) * 3);
        this.F = new Uint32Array(this.n * this.n * 2 * 3);

        for (let i = 0; i < this.n + 1; i++){
            for (let j = 0; j < this.n + 1; j++){
                let index = (i * (this.n + 1) + j) * 3;
                this.V[index] = i * this.width;
                this.V[index + 1] = 0.0;
                this.V[index + 2] = j * this.width;
            }
        }

        let currentFace = 0;
        for (let i = 0; i < this.n; i++){
            for (let j = 0; j < this.n; j++){
                // Triangle 1 
                let p1 = i * (this.n + 1) + j;
                let p2 = i * (this.n + 1) + j + 1;
                let p3 = i * (this.n + 1) + j + this.n + 1;

                this.F[currentFace * 3] = p1;
                this.F[currentFace * 3 + 1] = p2;
                this.F[currentFace * 3 + 2] = p3;
                
                // Triangle 2 
                let q1 = i * (this.n + 1) + j + this.n + 1;
                let q2 = i * (this.n + 1) + j + 1;
                let q3 = i * (this.n + 1) + j + this.n + 2;
                
                this.F[(currentFace + 1) * 3] = q1;
                this.F[(currentFace + 1) * 3 + 1] = q2;
                this.F[(currentFace + 1) * 3 + 2] = q3;
                
                currentFace += 2;
            }
        }

        // Terrain generation parameters
        this.levels = [
        // new Level(0.5, 2.0),
        // new Level(0.05, 10.0),
        // new Level(0.02, 40.0)
        ];
    }

    // Generate terrain using multi-level Perlin noise
    generateTerrain(noiseLevels) {
        let rows = (this.n + 1) * (this.n + 1);
        for (let i = 0; i < rows; i++) {
            // Reset height
            this.V[i * 3 + 1] = 0.0; 
            
            for (let level = 0; level < noiseLevels.length; level++) {
                let x = this.V[i * 3 + 0] * this.levels[level].frequency;
                let z = this.V[i * 3 + 2] * this.levels[level].frequency;
                let noiseVal = noiseLevels[level].noise(x, z);

                if (this.currentBiome === Biome.VALLEYS) { 
                    // abs creates sharp peaks and subtracting from 1 inverts them
                    noiseVal = 1.0 - Math.abs(noiseVal); 
                    // make ridges sharper and valleys wider 
                    noiseVal *= noiseVal; 
                }

                this.V[i * 3 + 1] += noiseVal * this.levels[level].amplitude;
            }

            this.V[i * 3 + 1] += this.globalOffset;
        }
    }

    setBiome(biome) {
        this.currentBiome = biome;
        this.levels = [];

        let numOctaves = 5;
        let frequency = 0.01;
        let amplitude = 10.0;
        let persistence = 0.5;
        let lacunarity = 2.0;

        switch (this.currentBiome) {
            case Biome.PLAINS:
                amplitude = 20.0;
                persistence = 0.2;
                break;
            case Biome.MOUNTAINS:
                amplitude = 80.0;
                persistence = 0.35;
                break;
            case Biome.VALLEYS:
                amplitude = 50.0;
                persistence = 0.3;
                break;
            case Biome.ISLANDS:
                amplitude = 90.0;
                persistence = 0.35;
                this.globalOffset = -20.0;
                break;    
        }

        for (let i = 0; i < numOctaves; i++) {
            this.levels.push(new Level(frequency, amplitude));
            frequency *= lacunarity;
            amplitude *= persistence;
        }
    }
}

export function advanceBiome(b) {
    // Wrap around
    if (b === Biome.ISLANDS) return Biome.PLAINS;
    return b + 1;
}