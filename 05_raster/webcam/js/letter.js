class Circle {
  constructor(x, y, radius, ctx) {
    this.x = x;
    this.y = y;
    this.origin = { x: x, y: y };
    this.radius = radius;
    this.originRadius = radius;
    this.targetRadius = radius;
    this.memoryRadius = radius;
    this.ctx = ctx;
    this.color = "rgb(255,255,255)";
    //this.replacement_color = "rgb(255,255,255)";
    this.letter = "";
    this.speed = 0.02;
    this.t = 0;
  }

  checkiftouched(x, y) {
    return (
      x > this.x &&
      x < this.x + this.radius &&
      y > this.y &&
      y < this.y + this.radius
    );
  }

  reset(y) {
    this.t = 0;
    this.originRadius = y;
    this.radius = y;
  }

  draw() {
    const luminosity_percentage = this.detectLuminance();


    // if (luminosity_percentage > 0.19) {
    this.ctx.fillStyle = this.color;
    this.ctx.save();
    if (Math.abs(this.targetRadius - this.radius) > 0.1) this.calculateHeight();
    else {
      this.radius = this.targetRadius;
    }

    this.ctx.translate(this.x, this.y);
    this.ctx.beginPath();
    this.ctx.font = this.radius * luminosity_percentage + "px Arial"
    this.ctx.fillText(this.letter, 0, 0)
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
    // }
  }


  calculateHeight() {
    this.t += this.speed;
    this.ease = Easing.circInOut(this.t);
    this.radius =
      this.originRadius + (this.targetRadius - this.originRadius) * this.ease;
  }

  detectLuminance() {
    const rgb = this.color.replace(/[^\d,]/g, "").split(",");
    const luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    return luminance / 255;
  }
}
