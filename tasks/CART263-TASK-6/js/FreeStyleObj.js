class FreeStyleObj {
    constructor(x, y, length, f_color, s_color,context) {
      // We write instructions to set up a Flower here
      // Position and size information
      this.x = x;
      this.y = y;
      this.fill_color = f_color;
      this.stroke_color = s_color;
      this.theta = 0;
      this.length = length;
      this.yOffset = 20;
      this.angularSpeed = .07;
      this.context =context;

      this.base_f_color = f_color;
      this.base_s_color = s_color;
      this.phase = 0;           
      this.baseAmplitude = 5;   
      this.amplitude = 5;

    }
  
    display() {
      this.theta = this.phase; 
      
      this.context.fillStyle = this.fill_color; 
      this.context.strokeStyle = this.stroke_color; 
      this.context.beginPath();
      this.context.moveTo(this.x, this.y);
      
      for(let i = this.x; i < this.x + this.length; i++){
        let waveY = Math.sin(this.theta) * this.amplitude;
        
        this.context.lineTo(i, waveY + this.y);
        this.context.lineTo(i, waveY + this.y + this.yOffset);
        
        this.theta += this.angularSpeed;
      }
      
      this.context.fill(); 
      this.context.stroke();
    }

    update() {
        // Shift to the right
        this.phase -= 0.1; 

        // Mic input
        if (window.micVolume) {
            
            // Increase amplitude based on how loud it is
            this.amplitude = this.baseAmplitude + window.micVolume; 

            // Change color based on volume
            let blueValue = Math.min(255, 150 + window.micVolume * 4);
            let greenValue = Math.min(255, 50 + window.micVolume * 3);
            
            let newColor = `rgb(50, ${greenValue}, ${blueValue})`;
            this.fill_color = newColor;
            this.stroke_color = newColor;

        }
    }
  }
  