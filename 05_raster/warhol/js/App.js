class App {
  constructor() {
    this.pixelRatio = window.devicePixelRatio || 1;
    this.canvas = document.createElement("canvas");
    this.canvas.width = window.innerWidth * this.pixelRatio;
    this.canvas.height = window.innerHeight * this.pixelRatio;
    this.canvas.style.width = window.innerWidth;
    this.canvas.style.height = window.innerHeight;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.setup();
  }

  setup() {
    //this.circle = new Circle(100, 100, 50, this.ctx);


    this.grid = []
    for(let j=0; j < 100; j++){
      for(let i=0; i < 100; i++){
        const circle = new Circle(i*20, j*20, 10, this.ctx);
        this.grid.push(circle);
      }
    }

    //charger une image
    this.img = new Image();
    this.img.onload = ()=>{
      //this.draw();
      this.detectPixels();
    }
    this.img.src = "asset/zidane.jpeg";

    this.draw();
  }

  detectPixels(){
    this.ctx.drawImage(this.img, 0,0);
    const image_data = this.ctx.getImageData(0,0, this.img.width, this.img.height);
    
    console.log(image_data)
    this.pixels = image_data.data;

    this.rgb=[]
    const steps = this.img.width / 100
    for(let j=0; j<this.img.height; j+=steps){
      for(let i=0; i<this.img.width; j+=steps){
        let index = (j * this.img.width + i)*4
        
        this.rgb.push({
          r: this.pixels[index],
          g: this.pixels[index + 1],
          r: this.pixels[index + 2],
        }
          
        )
      }
    }

    this.draw();

  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
   
    this.grid.forEach((circle, index) =>{
      circle.color = this.rgb[index]
      circle.draw();
    })


    
    requestAnimationFrame(this.draw.bind(this));
  }
}

window.onload = function () {
  new App();
};
