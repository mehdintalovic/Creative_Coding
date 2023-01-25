class Circle {
  constructor(x, y, radius, ctx) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.originRadius = radius;
    this.targetRadius = radius;
    this.memoryRadius = radius;
    this.ctx = ctx;
    this.color = 'red';
    this.r = null;
    this.g = null;
    this.b = null;
    this.speed = 0.01;
    this.t = 0;
  }

  checkiftouched(x, y) {
    return (
      x > this.x - this.radius &&
      x < this.x + this.radius &&
      y > this.y - this.radius &&
      y < this.y + this.radius
    );
  }

  reset(y) {

    this.t = 0;
    this.originRadius = y;
    this.radius = y;
    
  }

  draw() {
    if (Math.abs(this.targetRadius - this.radius) > 0.1) this.calculateRadius();
    else {
      this.radius = this.targetRadius;
    }
    this.ctx.save();
    this.ctx.fillStyle = this.color;
    this.ctx.translate(this.x, this.y);
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }

  calculateRadius() {
    this.t += this.speed;
    this.ease = Easing.circInOut(this.t);
    this.radius =
      this.originRadius + (this.targetRadius - this.originRadius) * this.ease;
  }

  map(value, in_min, in_max, out_min, out_max) {
    return (
      ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
  }

}


