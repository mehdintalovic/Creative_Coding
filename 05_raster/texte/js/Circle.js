class Circle {
  constructor(x, y, radius, ctx) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.ctx = ctx;
    this.color = "rgb(255,255,255)";
    this.color_decomposed = {};
    this.color2 = "rgb(0,0,255)";
    //this.letter = ["Z", "I", "Z", "O", "U"]
    this.letter = "";
    this.angle = 0;
  }

  move(){

    this.xInMotion = this.x + Math.cos(this.angle * Math.PI/180) * 100
    this.angle+=20
  }

  draw() {
    this.move();

    const luminance = this.getLuminance(this.color_decomposed);
    //const rnd = Math.floor(Math.random()*this.letter.length)
    //const letter = this.letter[rnd];

    this.ctx.fillStyle = this.color2;
    this.ctx.save();
    this.ctx.translate(this.xInMotion, this.y);
    this.ctx.beginPath();
    //this.ctx.arc(0, 0, this.radius * luminance, 0, 2 * Math.PI);
    this.ctx.font = this.radius * luminance * 3 + "px Arial"
    this.ctx.fillText(this.letter, 0, 0)
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }

  getLuminance(color){
    const luminance = 0.2126 * color.r + 0.7152*color.g + 0.0722*color.b;
    return luminance/255;
  }
}
