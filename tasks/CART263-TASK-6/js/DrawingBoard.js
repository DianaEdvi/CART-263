class DrawingBoard {
  /* Constructor */
  constructor(canvas, context,drawingBoardId) {
    this.canvas = canvas;
    this.context = context;
    this.objectsOnCanvas = [];
    let self = this;
    this.drawingBoardId = drawingBoardId;
    this.isCleaningUp = false;
    //each element has a mouse clicked and a mouse over
    this.canvas.addEventListener("click", function (e) {
      self.clickCanvas(e);
    });

    this.canvas.addEventListener("mousemove", function (e) {
      self.overCanvas(e);
    });
  }

  overCanvas(e) {
    //console.log("over");
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);
    console.log(this.mouseOffsetX, this.mouseOffsetY);
    //differentiate which canvas
    //you can remove the console.logs /// 
    if(this.drawingBoardId ==="partA"){
      console.log("in A")
    }
    if(this.drawingBoardId ==="partB"){
      console.log("in B")
    }
    if(this.drawingBoardId ==="partC"){
      console.log("in C")
    }
    if(this.drawingBoardId === "partD" && this.objectsOnCanvas.length > 0){
      this.objectsOnCanvas[0].updatePositionRect(this.mouseOffsetX, this.mouseOffsetY);
    }
  }

  clickCanvas(e) {
   // console.log("clicked");
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);
    //console.log(this.mouseOffsetX, this.mouseOffsetY);
     
    //differentiate which canvas
   //you can remove the console.logs /// 
     if(this.drawingBoardId ==="partA"){
      console.log("in A")
    }
    if(this.drawingBoardId ==="partB"){
      console.log("in B")
    }
    if(this.drawingBoardId ==="partC"){
      console.log("in C")
    }
    if(this.drawingBoardId === "partD" && this.objectsOnCanvas.length > 0){
      // random color
      let randomCol = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
      this.objectsOnCanvas[0].changeColor(randomCol);
    }
  }
  /* method to add obj to canvas */
  addObj(objToAdd) {
    this.objectsOnCanvas.push(objToAdd);
  }

  /* method to add display objects on canvas */
  display() {
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].display();
    }
  }

  /* method to add animate objects on canvas */
  animate() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.isCleaningUp && this.objectsOnCanvas.length > 0) {
      // Check if the first circle in line is already shrinking
      if (!this.objectsOnCanvas[0].isShrinking) {
        this.objectsOnCanvas[0].isShrinking = true;
      }
    }

    for (let i = this.objectsOnCanvas.length - 1; i >= 0; i--) {
      let obj = this.objectsOnCanvas[i];
      obj.update();
      obj.display();

      if (obj.toDelete) {
        this.objectsOnCanvas.splice(i, 1);
        
        // If that was the last circle, stop deleting circles
        if (this.objectsOnCanvas.length === 0) {
          this.isCleaningUp = false;
        }
      }
    }
  }

  run(videoElement){
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].update(videoElement);
      this.objectsOnCanvas[i].display();
    }

  }

  deleteCircles() {
    this.isCleaningUp = true;
  }
}
