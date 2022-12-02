class Leg {
    constructor(x, y, w, h, ctx) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.originHeight = h;
      this.targetHeight = h;
      this.memoryHeight = h;
      this.ctx = ctx;
      this.speed = 0.01;
      this.t = 0;
    }

    checkiftouched(x, y) {
        return (
          x > this.x &&
          x < this.x + this.w &&
          y > this.y &&
          y < this.y + this.h
        );
      }

      reset(y) {
        this.t = 0;
        this.originHeight = y;
        this.h = y;
      }

  
    draw(x, y) {
        
        if (Math.abs(this.targetHeight - this.h) > 0.1) this.calculateHeight();
        else {
          this.h = this.targetHeight;
        }
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.beginPath();
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.w, this.h);
        this.ctx.closePath();
        this.ctx.restore();

        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.beginPath();
        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(this.w - 215, this.h, this.h / 2.5, this.w / 2);
        this.ctx.closePath();
        this.ctx.restore();

        
    }

    calculateHeight() {
        this.t += this.speed;
        this.ease = Easing.circInOut(this.t);
        this.h =
          this.originHeight + (this.targetHeight - this.originHeight) * this.ease;
      }

    //map number from one range to another
    map(value, in_min, in_max, out_min, out_max) {
        return (
          ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
        );
      }

  }
  