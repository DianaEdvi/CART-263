export class Level {
    constructor(frequency, amplitude) {
        this.frequency = frequency;
        this.amplitude = amplitude;
    }
}

export class Grid {
    constructor() {
        this.n = 100;
        this.width = 1;
        
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
    }

    getRows() {
        return (this.n + 1) * (this.n + 1);
    }
}