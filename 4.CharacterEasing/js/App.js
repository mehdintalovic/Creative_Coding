/**
 *  EASING REF:
 *  https://easings.net/#
 */
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
    this.mouse = { x: 0, y: 0 };
    const amount = 2000;
    let radius = 10;
    this.PHI = 137.51 / 16;
    this.angle = 0;
    const center = {
      x: (window.innerWidth / 2) * this.pixelRatio,
      y: (window.innerHeight / 2) * this.pixelRatio,
    };
    for (let i = 0; i < amount; i++) {
      radius += 0.2;
      const x = center.x + Math.cos(this.angle * (Math.PI / 2)) * radius;
      const y = center.y + Math.sin(this.angle * (Math.PI / 2)) * radius;

      this.angle += this.PHI;
    }

    //EYES
    this.eyes = new Array(
      new Eye(center.x - 220, center.y - 100, 100, this.ctx),
      new Eye(center.x + 220, center.y - 100, 100, this.ctx)
    );
    // document.addEventListener("click", this.click.bind(this));
    document.addEventListener("mousemove", this.move.bind(this));

    //BODY
    this.body = new Body(center.x, center.y, 500, this.ctx)

    this.draw();
  }


  draw() {
    if (Math.abs(this.targetAngle - this.angle) > 0.0001) {
      this.move();
    } else {
      this.angle = this.targetAngle;
      this.luminosity = 100;
    }
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // this.fibonacciPoints.forEach((point) => point.draw());

    this.body.draw(this.mouse.x, this.mouse.y)

    this.eyes.forEach((eye) => {
      eye.draw(this.mouse.x, this.mouse.y);
    });

   
    
    requestAnimationFrame(this.draw.bind(this));
  }

  move(e) {
    this.mouse = {
      x: e.clientX * this.pixelRatio,
      y: e.clientY * this.pixelRatio,
    };
   
  }

  dist(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  }
}

window.onload = function () {
  new App();
};
