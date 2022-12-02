class Torso {
    constructor(x, y, radius, ctx) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.originRadius = radius;
      this.targetRadius = radius;
      this.memoryRadius = radius;
      this.ctx = ctx;
         /*
      vitesse de d'incrémentation de t
    */
    this.speed = 0.01;
    /*
      t est un compteur qui va de 0 à 1
      qui definit la portion du chemin parcouru
    */
    this.t = 0;
    }

    checkiftouched(x, y) {
        return (
          x > this.x - this.radius / 2&&
          x < this.x + this.radius / 2 &&
          y > this.y - this.radius / 2 &&
          y < this.y + this.radius / 2
        );
      }

      rotate(){

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
      this.ctx.fillStyle = "blue";
      this.ctx.beginPath();
      this.ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.closePath();
      this.ctx.restore();
      //
      // calculate the angle between the eye and the mouse
      const angle = Math.atan2(y - this.y, x - this.x);

      this.ctx.save();
      this.ctx.translate(this.x, this.y);
      this.ctx.fillStyle = "white";
      this.ctx.beginPath();
      this.ctx.arc(0, 0, this.radius, 0, Math.PI * 1);
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
  