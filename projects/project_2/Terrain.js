import * as THREE from 'three';

export const Biome = { PLAINS: 0, MOUNTAINS: 1, VALLEYS: 2, ISLANDS: 3 };
export const NUM_OCTAVES = 5;

// Calculate the terrain color based on altitude using smooth interpolation
export function getTerrainColor(altitude) {
    const water = new THREE.Color(0.10, 0.30, 0.80);
    const sand  = new THREE.Color(0.76, 0.70, 0.50);
    const grass = new THREE.Color(0.20, 0.55, 0.20);
    const rock  = new THREE.Color(0.40, 0.40, 0.45);
    const snow  = new THREE.Color(1, 1, 1);

    let c = new THREE.Color();
    let t = 0;

    // Use smoothstep interpolation for color transitions between biomes
    if (altitude <= 0.0) { // Water
        t = Math.max(0.0, (altitude + 5.0) / 5.0);
        t = t * t * (3.0 - 2.0 * t);
        c.lerpColors(water, sand, t);
    } else if (altitude < 5.0) { // Sand
        t = altitude / 5.0;
        t = t * t * (3.0 - 2.0 * t);
        c.lerpColors(sand, grass, t);
    } else if (altitude < 50.0) { // Grass
        t = (altitude - 5.0) / 45.0;
        t = t * t * (3.0 - 2.0 * t);
        c.lerpColors(grass, rock, t);
    } else if (altitude < 95.0) { // Rock
        t = (altitude - 50.0) / 45.0;
        t = t * t * (3.0 - 2.0 * t);
        c.lerpColors(rock, snow, t);
    } else { // Snow
        c.copy(snow);
    }
    return c;
}

// Calculate the height of a point based on its biome and Perlin noise
export function calculateBiomeHeight(biome, x, z, noiseLevels) {
    // Biome-specific parameters for noise generation
    let amplitude, persistence;
    let frequency = 0.01;
    let lacunarity = 2.0;
    let localOffset = -20.0;

    // Set parameters based on biome type
    switch (biome) {
        case Biome.PLAINS:    amplitude = 20.0; persistence = 0.2;  localOffset = -10.0; break;
        case Biome.MOUNTAINS: amplitude = 80.0; persistence = 0.35; localOffset = -15.0; break;
        case Biome.VALLEYS:   amplitude = 90.0; persistence = 0.3;  localOffset = -10.0; break;
        case Biome.ISLANDS:   amplitude = 90.0; persistence = 0.35; localOffset = -80.0; break;
    }

    let height = 0.0;
    // Loop through octaves to create fractal noise
    for (let i = 0; i < NUM_OCTAVES; i++) {
        let noiseX = x * frequency;
        let noiseZ = z * frequency;
        let noiseVal = noiseLevels[i].noise(noiseX, noiseZ);

        if (biome === Biome.VALLEYS) {
            const epsilon = 0.001;
            // Create valley-like features
            noiseVal = 1.0 - Math.sqrt((noiseVal * noiseVal) + epsilon);
            // Sharper valleys
            noiseVal *= noiseVal;
        } else {
            noiseVal = (noiseVal + 1.0) * 0.5;
        }

        // Add the noise contribution of this octave to the height
        height += noiseVal * amplitude;
        frequency *= lacunarity;
        amplitude *= persistence;
    }

    // For mountains and islands, apply a non-linear transformation to create sharper peaks
    if ((biome === Biome.MOUNTAINS || biome === Biome.ISLANDS) && height > 0.0) {
        const normalizationScale = 80.0;
        let h_norm = height / normalizationScale;
        height = h_norm * h_norm * normalizationScale;
    }

    return height + localOffset;
}

// Change the function signature to accept these arguments
export function generateTerrain(noiseLevels, geometry, maxCoord) {
    // Grid of biomes
    let gridBiomes = [
        Biome.PLAINS, Biome.PLAINS, Biome.PLAINS, Biome.PLAINS,
        Biome.MOUNTAINS, Biome.MOUNTAINS, Biome.MOUNTAINS, Biome.MOUNTAINS,
        Biome.VALLEYS, Biome.VALLEYS, Biome.VALLEYS, Biome.VALLEYS,
        Biome.ISLANDS, Biome.ISLANDS, Biome.ISLANDS, Biome.ISLANDS
    ];
    // Shuffle biomes
    gridBiomes.sort(() => Math.random() - 0.5);

    const positions = geometry.attributes.position;
    const colors = [];

    // Loop through each vertex in the geometry and calculate its height and color
    for (let i = 0; i < positions.count; i++) {
        // Get the x and z coordinates of the vertex
        let x = positions.getX(i);
        let z = positions.getZ(i);

        // Normalize coordinates to [0, 1] range and scale to [0, 3] for biome grid
        let normalized_x = x / maxCoord;
        let normalized_z = z / maxCoord;
        let actual_x = normalized_x * 3.0;
        let actual_z = normalized_z * 3.0;

        // Determine the indices of the biome grid cell and the remainders for interpolation
        let index_x = Math.min(Math.floor(actual_x), 2);
        let index_z = Math.min(Math.floor(actual_z), 2);

        let remainder_x = actual_x - index_x;
        let remainder_z = actual_z - index_z;

        // Smooth the remainders using a smoothstep function 
        let smooth_x = remainder_x * remainder_x * (3.0 - 2.0 * remainder_x);
        let smooth_z = remainder_z * remainder_z * (3.0 - 2.0 * remainder_z);

        // Calculate the weights for the four surrounding biome corners
        let w00 = (1.0 - smooth_x) * (1.0 - smooth_z);
        let w10 = smooth_x * (1.0 - smooth_z);
        let w01 = (1.0 - smooth_x) * smooth_z;
        let w11 = smooth_x * smooth_z;

        // Get the biome types for the four surrounding corners
        let b00 = gridBiomes[index_x + (index_z * 4)];
        let b10 = gridBiomes[(index_x + 1) + (index_z * 4)];
        let b01 = gridBiomes[index_x + ((index_z + 1) * 4)];
        let b11 = gridBiomes[(index_x + 1) + ((index_z + 1) * 4)];

        // Calculate the height contributions from each of the four surrounding biomes
        let h00 = calculateBiomeHeight(b00, x, z, noiseLevels);
        let h10 = calculateBiomeHeight(b10, x, z, noiseLevels);
        let h01 = calculateBiomeHeight(b01, x, z, noiseLevels);
        let h11 = calculateBiomeHeight(b11, x, z, noiseLevels);

        // Combine the height contributions using the calculated weights to get the final height
        let finalHeight = (h00 * w00) + (h10 * w10) + (h01 * w01) + (h11 * w11);
        let originalAltitude = finalHeight;

        // Clamp to sea level
        if (finalHeight < 0.0) finalHeight = 0.0;

        // Update the vertex height in the geometry
        positions.setY(i, finalHeight);

        // Calculate the color
        const col = getTerrainColor(originalAltitude);
        colors.push(col.r, col.g, col.b);
    }
    
    return colors; 
}