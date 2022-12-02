class Eye {
  constructor(x, y, radius, ctx) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.originRadius = radius;
    this.targetRadius = radius;
    this.memoryRadius = radius;
    this.ctx = ctx;
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

  draw(x, y) {
    this.ctx.save();
    if (Math.abs(this.targetRadius - this.radius) > 0.1) this.calculateHeight();
    else {
      this.radius = this.targetRadius;
    }
    this.ctx.translate(this.x, this.y);
    this.ctx.fillStyle = "white";
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
    //
    // calculate the angle between the eye and the mouse
    const angle = Math.atan2(y - this.y, x - this.x);
    // calculate the position of the pupil
    const pupilX = this.x + Math.cos(angle) * this.radius * 0.5;
    const pupilY = this.y + Math.sin(angle) * this.radius * 0.5;
    this.ctx.save();
    this.ctx.translate(pupilX, pupilY);
    this.ctx.fillStyle = "blue";
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.radius/2, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.closePath();
    this.ctx.restore();
  }

  calculateHeight() {
    this.t += this.speed;
    this.ease = Easing.circInOut(this.t);
    this.radius =
      this.originRadius + (this.targetRadius - this.originRadius) * this.ease;
  }

//map number from one range to another
map(value, in_min, in_max, out_min, out_max) {
    return (
      ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
  }
}
