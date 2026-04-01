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
        this.globalOffset = 0.0; // For sinking the terrain for islands 
        
        this.V = new Float32Array((this.n + 1) * (this.n + 1) * 3);
        this.F = new Uint32Array(this.n * this.n * 2 * 3);
        this.C = new Float32Array((this.n + 1) * (this.n + 1) * 3);

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

        this.levels = [];
    }

    // Generate terrain using multi-level Perlin noise
    generateTerrain(noiseLevels) {
        let rows = (this.n + 1) * (this.n + 1);
        for (let i = 0; i < rows; i++) {
            this.V[i * 3 + 1] = 0.0; // Reset height
            
            for (let level = 0; level < noiseLevels.length; level++) {
                let x = this.V[i * 3 + 0] * this.levels[level].frequency;
                let z = this.V[i * 3 + 2] * this.levels[level].frequency;
                let noiseVal = noiseLevels[level].noise(x, z);

                if (this.currentBiome === Biome.VALLEYS) { 
                    noiseVal = 1.0 - Math.abs(noiseVal); // abs creates sharp peaks and subtracting from 1 inverts them
                    noiseVal *= noiseVal; // make ridges sharper and valleys wider 
                } else {
                    noiseVal = (noiseVal + 1.0) * 0.5;
                }

                this.V[i * 3 + 1] += noiseVal * this.levels[level].amplitude;
            }

            // Elevation redistribution
            
            if ((this.currentBiome === Biome.MOUNTAINS || this.currentBiome === Biome.ISLANDS) && this.V[i * 3 + 1] > 0.0) {
                let exponent = 2.2;
                let normalizationScale = 80.0; // mtn amp
                
                // Normalize to ~[0,1], apply the curve, and scale back up
                this.V[i * 3 + 1] = Math.pow(this.V[i * 3 + 1] / normalizationScale, exponent) * normalizationScale;
            }

            this.V[i * 3 + 1] += this.globalOffset;

            let originalAltitude = this.V[i * 3 + 1];
            // If below 0, flatten terrain
            if (this.V[i * 3 + 1] < 0.0) {
                this.V[i * 3 + 1] = 0.0;
            }

            let color = this.getTerrainColor(this.currentBiome, originalAltitude);
            this.C[i * 3 + 0] = color.r;
            this.C[i * 3 + 1] = color.g;
            this.C[i * 3 + 2] = color.b;
        }
    }

    setBiome(biome) {
        this.currentBiome = biome;
        this.levels = [];

        let amplitude;
        let persistence;
        let numOctaves = 5;
        let frequency = 0.01;
        let lacunarity = 2.0;
        this.globalOffset = 0.0;

        switch (this.currentBiome) {
            case Biome.PLAINS:
                amplitude = 20.0;
                persistence = 0.2;
                break;
            case Biome.MOUNTAINS:
                amplitude = 80.0;
                persistence = 0.35;
                this.globalOffset = -40.0;
                break;
            case Biome.VALLEYS:
                amplitude = 50.0;
                persistence = 0.3;
                break;
            case Biome.ISLANDS:
                amplitude = 90.0;
                persistence = 0.35;
                this.globalOffset = -80.0;
                break;    
        }

        for (let i = 0; i < numOctaves; i++) {
            this.levels.push(new Level(frequency, amplitude));
            frequency *= lacunarity;
            amplitude *= persistence;
        }
    }

    getTerrainColor(biome, altitude) {
        let water = {r: 0.10, g: 0.30, b: 0.80};
        let sand = {r: 0.76, g: 0.70, b: 0.50}; 
        let grass = {r: 0.20, g: 0.55, b: 0.20};
        let rock = {r: 0.40, g: 0.40, b: 0.45};
        let snow = {r: 0.95, g: 0.95, b: 0.95};

        // Blend Deep Water into Shallow Sand (Altitude -5.0 to 0.0)
        if (altitude <= 0.0) {
            // If depth is -5.0 or lower, t = 0.0 (Solid Water)
            // If depth is 0.0 (shoreline), t = 1.0 (Solid Sand)
            let t = Math.max(0.0, (altitude + 5.0) / 5.0); 
            return {
                r: water.r * (1.0 - t) + sand.r * t,
                g: water.g * (1.0 - t) + sand.g * t,
                b: water.b * (1.0 - t) + sand.b * t
            };
        } 
        // Blend Sand into Grass (Altitude 0 to 5)
        else if (altitude < 5.0) {
            let t = altitude / 5.0; // t goes from 0.0 to 1.0
            return {
                r: sand.r * (1.0 - t) + grass.r * t,
                g: sand.g * (1.0 - t) + grass.g * t,
                b: sand.b * (1.0 - t) + grass.b * t
            };
        } 
        // Blend Grass into Rock (Altitude 5 to 50)
        else if (altitude < 50.0) {
            let t = (altitude - 5.0) / 45.0; 
            return {
                r: grass.r * (1.0 - t) + rock.r * t,
                g: grass.g * (1.0 - t) + rock.g * t,
                b: grass.b * (1.0 - t) + rock.b * t
            };
        } 
        // Blend Rock into Snow (Altitude 50 to 65)
        else if (altitude < 65.0) {
            let t = (altitude - 50.0) / 15.0;
            return {
                r: rock.r * (1.0 - t) + snow.r * t,
                g: rock.g * (1.0 - t) + snow.g * t,
                b: rock.b * (1.0 - t) + snow.b * t
            };
        } 
        // Solid Snow for peaks
        else {
            return snow;
        }
    }
}

// ++ operator overload 
export function advanceBiome(b) {
    if (b === Biome.ISLANDS) return Biome.PLAINS; // Wrap around
    return b + 1;
}