export class PerlinNoise {
    constructor(n) {
        this.n = n;
        this.gradients = Array.from({ length: n }, () => new Array(n));
        this.populateGradients();
    }

    // Take an integral coordinate and return a pseudo-random gradient vector from the pre-populated grid
    pseudoRandomGradient(ix, iy) {
        let ixm = ((ix % this.n) + this.n) % this.n;
        let iym = ((iy % this.n) + this.n) % this.n;
        return this.gradients[ixm][iym];
    }

    noise(x, y) {
        let x0 = Math.floor(x);
        let x1i = x0 + 1;
        let y0 = Math.floor(y);
        let y1i = y0 + 1;

        let posX = x - x0; // Relative x coordinate in the unit square
        let posY = y - y0; // Relative y coordinate in the unit square

        let g00 = this.pseudoRandomGradient(x0, y0);
        let g10 = this.pseudoRandomGradient(x1i, y0);
        let g01 = this.pseudoRandomGradient(x0, y1i);
        let g11 = this.pseudoRandomGradient(x1i, y1i);

        let d00 = { x: posX, y: posY };
        let d10 = { x: posX - 1.0, y: posY };
        let d01 = { x: posX, y: posY - 1.0 };
        let d11 = { x: posX - 1.0, y: posY - 1.0 };

        let n00 = g00.x * d00.x + g00.y * d00.y;
        let n10 = g10.x * d10.x + g10.y * d10.y;
        let n01 = g01.x * d01.x + g01.y * d01.y;
        let n11 = g11.x * d11.x + g11.y * d11.y;

        let u = this.fade(posX);
        let v = this.fade(posY);

        let ix1 = n00 + u * (n10 - n00);
        let ix2 = n01 + u * (n11 - n01);

        return ix1 + v * (ix2 - ix1);
    }

    // Pre-populate the gradient vectors for the grid points
    populateGradients() {
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                let angle = Math.random() * 2.0 * Math.PI;
                this.gradients[i][j] = { x: Math.cos(angle), y: Math.sin(angle) };
            }
        }
    }

    // Fade function as defined by Ken Perlin.
    fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    add(P) {
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                this.gradients[i][j].y += P.gradients[i][j].y;
            }
        }
        return this;
    }
}