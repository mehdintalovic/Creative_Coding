class Body {
    constructor(x, y, radius, color, ctx) {
      this.x = x;
      this.y = y;
      this.targetY = y - y / 4;
      this.originY = y;
      this.radius = radius;
      this.ctx = ctx;
    }
  
    click(e) {
      this.t += this.speed;
      //on calcule le facteur d'interpolation suivant le type de easing
      const ease = Easing.elasticOut(this.t);
      this.y =
      this.originY + (this.targetY - this.originY) * this.ease;
  
      this.luminosity = this.map(ease, 0, 1, 50, 100);
    }
  
    draw(x, y) {
      this.ctx.save();
      this.ctx.translate(this.x, this.y);
      this.ctx.fillStyle = "blue";
      this.ctx.beginPath();
      this.ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
      this.ctx.restore();
  
      this.ctx.save();
      this.ctx.translate(this.x, this.y);
      this.ctx.fillStyle = "white";
      this.ctx.beginPath();
      this.ctx.arc(0, 0, this.radius, 0, Math.PI * 1);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
      this.ctx.restore();
      
    }
  
      //map number from one range to another
      map(value, in_min, in_max, out_min, out_max) {
        return (
          ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
        );
      }
  
  
  }
  