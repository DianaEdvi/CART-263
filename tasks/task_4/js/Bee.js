
class Bee {
  // Create a new Bee object
  constructor(x = 100, y = 100, width = 75, height = 75, tintColor = "transparent", homeBeehive = null) { 
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.tintColor = tintColor; 

    this.homeBeehive = homeBeehive;
    
    // Make the wrapper div
    this.body = document.createElement("div"); 
  }

  // Since I uploaded a PNG and we need to modify the color, I'll create a tint layer and mask out the transparent background
  renderBee() {
    // Wrapper div
    this.body.classList.add("bee");
    this.body.style.position = "absolute";
    this.body.style.width = this.width + "px";
    this.body.style.height = this.height + "px";
    this.body.style.left = this.x + "px";
    this.body.style.top = this.y + "px";

    // Bee image
    let beeImg = document.createElement("img");
    beeImg.src = "./media/Bee.png";
    beeImg.style.width = "100%";
    beeImg.style.height = "100%";
    beeImg.style.objectFit = "contain";
    beeImg.style.position = "absolute"; // Stack it inside the wrapper

    // Tinted overlay
    let tintLayer = document.createElement("div");
    tintLayer.style.width = "100%";
    tintLayer.style.height = "100%";
    tintLayer.style.position = "absolute"; // Stack exactly on top of the image
    
    // Apply the color from the constructor parameter
    tintLayer.style.backgroundColor = this.tintColor; 
    
    // Mask out the background so that only the bee is colored
    tintLayer.style.maskImage = "url('./media/Bee.png')";
    tintLayer.style.maskSize = "contain";
    
    // Blend the tint and bee colors
    tintLayer.style.mixBlendMode = "multiply"; 

    // Put it all together
    this.body.appendChild(beeImg);
    this.body.appendChild(tintLayer);
    document.getElementsByTagName("main")[0].appendChild(this.body);
  }
}