export class PerlinNoise {
    constructor(n) {
        this.n = n;
        this.gradients = [];
        this.populateGradients();
    }

    populateGradients() {
        for (let i = 0; i < this.n; i++) {
            let row = [];
            for (let j = 0; j < this.n; j++) {
                let angle = Math.random() * 2.0 * Math.PI;
                row.push({ x: Math.cos(angle), y: Math.sin(angle) });
            }
            this.gradients.push(row);
        }
    }

    pseudoRandomGradient(ix, iy) {
        let ixm = ((ix % this.n) + this.n) % this.n;
        let iym = ((iy % this.n) + this.n) % this.n;
        return this.gradients[ixm][iym];
    }

    fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    noise(x, y) {
        let x0 = Math.floor(x);
        let x1i = x0 + 1;
        let y0 = Math.floor(y);
        let y1i = y0 + 1;

        let posX = x - x0; 
        let posY = y - y0; 

        let g00 = this.pseudoRandomGradient(x0, y0);
        let g10 = this.pseudoRandomGradient(x1i, y0);
        let g01 = this.pseudoRandomGradient(x0, y1i);
        let g11 = this.pseudoRandomGradient(x1i, y1i);

        let n00 = (g00.x * posX) + (g00.y * posY);
        let n10 = (g10.x * (posX - 1.0)) + (g10.y * posY);
        let n01 = (g01.x * posX) + (g01.y * (posY - 1.0));
        let n11 = (g11.x * (posX - 1.0)) + (g11.y * (posY - 1.0));

        let u = this.fade(posX);
        let v = this.fade(posY);

        let ix1 = n00 + u * (n10 - n00);
        let ix2 = n01 + u * (n11 - n01);

        return ix1 + v * (ix2 - ix1);
    }
}