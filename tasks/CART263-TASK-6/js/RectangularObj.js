class RectangularObj {
  constructor(x, y, w, h, f_color, s_color, context) {
    // We write instructions to set up a Flower here
    // Position and size information
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.fill_color = f_color;
    this.stroke_color = s_color;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2; //full rotation
    this.context = context;
    this.baseWidth = w;
    this.baseHeight = h;
    this.angle = 0;
    this.originalX = x;
  }

  display() {
    this.context.fillStyle = this.fill_color; // change the color we are using
    this.context.fillRect(this.x, this.y,this.width, this.height);
    this.context.strokeStyle = this.stroke_color; // change the color we are using
    this.context.lineWidth = 2; //change stroke
    this.context.strokeRect(this.x, this.y,this.width, this.height);
  }

  update() {
    this.angle += 0.05;
    this.x = this.originalX + Math.sin(this.angle) * 50; // move left and right

    // Mic input
    if (window.micVolume) {
        this.height = this.baseHeight + (window.micVolume * 3); // increase height
        // Change color
        let redValue = Math.min(255, 100 + window.micVolume * 4);
        this.fill_color = `rgb(${redValue}, 87, 51)`;
    }
  }
}
