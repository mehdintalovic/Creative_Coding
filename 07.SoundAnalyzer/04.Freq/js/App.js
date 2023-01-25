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
    this.audio = new AudioTool();
    document.addEventListener("click", (e) => {
      this.audio.play(e);
    });
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.audio.isPlaying) {
      this.audio.updateFrequency();

      let centerY = this.canvas.height / 2;
      const offset = 380;
      const step =
        this.canvas.width / (this.audio.dataFrequency.length - offset);
      const scale = 3;

      this.ctx.fillStyle = "white";
      for (let i = 0; i < this.audio.dataFrequency.length - offset; i++) {
        this.ctx.fillRect(
          i * step,
          centerY,
          1,
          this.audio.dataFrequency[i] * scale
        );
      }
      for (let i = 0; i < this.audio.dataFrequency.length - offset; i++) {
        this.ctx.fillRect(
          i * step,
          centerY,
          1,
          -this.audio.dataFrequency[i] * scale
        );
      }
    }
    requestAnimationFrame(this.draw.bind(this));
  }
}

window.onload = function () {
  new App();
};
