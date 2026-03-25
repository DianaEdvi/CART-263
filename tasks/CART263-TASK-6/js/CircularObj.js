class CircularObj {
  constructor(x, y, radius, f_color, s_color, context) {
    // We write instructions to set up a Flower here
    // Position and size information
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.fill_color = f_color;
    this.stroke_color = s_color;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2; //full rotation
    this.context = context;
    this.angle = 0;
    this.centerX = x;
    this.centerY = y;
    this.orbitRadius = 50;
    this.orbitSpeed = 10;
    this.isShrinking = false;
    this.toDelete = false;
  }

  display() {
    this.context.fillStyle = this.fill_color; // change the color we are using
    this.context.strokeStyle = this.stroke_color; // change the color we are using
    this.context.beginPath();
    this.context.arc(
      this.x,
      this.y,
      this.radius,
      this.startAngle,
      this.endAngle,
      true
    );
    this.context.fill(); // set the fill
    this.context.lineWidth = 2; //change stroke
    this.context.closePath();
    this.context.stroke();
  }

  animate() {
    this.update();
  }

  update() {
    if (this.isShrinking) {
      this.radius -= 0.5; 
      if (this.radius <= 0.1) {
        this.radius = 0;
        this.toDelete = true; 
      }
    }

    this.x = this.centerX + Math.cos(this.angle) * this.orbitRadius;
    this.y = this.centerY + Math.sin(this.angle) * this.orbitRadius;
    this.angle += 0.01 * this.orbitSpeed;
    //update circle
    //this.x += 1;
    //console.log("circle update");
  }
  


}
