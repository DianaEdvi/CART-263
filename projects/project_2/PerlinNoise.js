// Inspiration taken from https://garagefarm.net/blog/perlin-noise-implementation-procedural-generation-and-simplex-noise
export class PerlinNoise {
    constructor(n) {
        this.n = n; // Number of grid points in each dimension
        this.gradients = new Float32Array(n * n * 2); // Store 2D gradient vectors
        this.populateGradients();
    }

    // Populate the gradients with random unit vectors
    populateGradients() {
        for (let i = 0; i < this.n * this.n; i++) {
            const angle = Math.random() * 2.0 * Math.PI;
            this.gradients[i * 2] = Math.cos(angle);
            this.gradients[i * 2 + 1] = Math.sin(angle);
        }
    }

    // Get the pseudo-random gradient vector for the grid point (ix, iy)
    pseudoRandomGradient(ix, iy) {
        const ixm = ix % this.n;
        const iym = iy % this.n;
        const idx = (ixm * this.n + iym) * 2;
        return { x: this.gradients[idx], y: this.gradients[idx + 1] };
    }

    // Fade function for smooth interpolation
    fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    // Compute Perlin noise value at (x, y)
    noise(x, y) {
        // Determine grid cell coordinates
        const x0 = Math.floor(x);
        const x1i = x0 + 1;
        const y0 = Math.floor(y);
        const y1i = y0 + 1;

        // Compute the distance vectors from the corners of the cell
        const posX = x - x0;
        const posY = y - y0;

        // Get the gradient vectors at the corners of the cell
        const g00 = this.pseudoRandomGradient(x0, y0);
        const g10 = this.pseudoRandomGradient(x1i, y0);
        const g01 = this.pseudoRandomGradient(x0, y1i);
        const g11 = this.pseudoRandomGradient(x1i, y1i);

        // Compute the dot products between the gradient vectors and the distance vectors
        const n00 = (g00.x * posX) + (g00.y * posY);
        const n10 = (g10.x * (posX - 1.0)) + (g10.y * posY);
        const n01 = (g01.x * posX) + (g01.y * (posY - 1.0));
        const n11 = (g11.x * (posX - 1.0)) + (g11.y * (posY - 1.0));

        // Interpolate the dot products using the fade function
        const u = this.fade(posX);
        const v = this.fade(posY);

        // Interpolate along x for both y=0 and y=1
        const ix1 = n00 + u * (n10 - n00);
        const ix2 = n01 + u * (n11 - n01);

        return ix1 + v * (ix2 - ix1);
    }
}