import * as THREE from 'three';

export class Grid {
    constructor() {
        this.n = 100;
        this.width = 1;
        
        this.geometry = new THREE.PlaneGeometry(this.n * this.width, this.n * this.width, this.n, this.n);
        
        this.geometry.rotateX(-Math.PI / 2);
        this.geometry.translate((this.n * this.width) / 2, 0, (this.n * this.width) / 2);

        this.V = this.geometry.attributes.position;
    }
}