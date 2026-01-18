export class Snowflake {
  x: number;
  y: number;
  size: number;
  speed: number;
  sway: number;
  swaySpeed: number;
  shape: string;

  constructor(private canvasWidth: number, private canvasHeight: number, private FLAKES: string[]) {
    this.reset();
  }

  reset(): void {
    this.x = Math.random() * this.canvasWidth;
    this.y = Math.random() * -this.canvasHeight;
    this.size = 10 + Math.random() * 15;
    this.speed = 0.5 + Math.random() * 2;
    this.sway = Math.random() * 2 * Math.PI;
    this.swaySpeed = 0.01 + Math.random() * 0.03;
    this.shape = this.FLAKES[Math.floor(Math.random() * this.FLAKES.length)];
  }

  update(canvasWidth: number, canvasHeight: number, delta: number = 1): void {
    // wolniejsze ruchy, uwzględnia delta
    this.y += this.speed * delta * 0.5;  // 0.5 spowalnia ruch o połowę
    this.x += Math.sin(this.y * this.swaySpeed + this.sway) * delta;

    if (this.y > canvasHeight) {
      this.reset();
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.font = `${this.size}px serif`;
    ctx.fillStyle = '#ecf2f8';
    ctx.fillText(this.shape, this.x, this.y);
  }
}
