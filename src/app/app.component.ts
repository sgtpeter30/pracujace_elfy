import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Snowflake } from './functions/snow';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'Pracujące elfy';

  @ViewChild('snowCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private width!: number;
  private height!: number;
  private flakes: Snowflake[] = [];
  private animationFrameId: number = 0;
  private intervalId: any;

  private readonly FLAKES = ["⋆", "꙳", "❅", "*", "❆", "✼", "✴"];

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Nie można uzyskać kontekstu 2D');
    }
    this.ctx = ctx;

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    canvas.width = this.width;
    canvas.height = this.height;

    window.addEventListener('resize', this.onResize);

    this.initFlakes();
    this.animate();

    // Aktualizacja liczby płatków co godzinę
    this.intervalId = setInterval(() => this.initFlakes(), 60 * 60 * 1000);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize);
    cancelAnimationFrame(this.animationFrameId);
    clearInterval(this.intervalId);
  }

  private onResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    const canvas = this.canvasRef.nativeElement;
    canvas.width = this.width;
    canvas.height = this.height;
  };

  private snowIntensityByDate(): number {
    const now = new Date();
    if (now.getMonth() !== 11) return 50; // grudzień
    const day = now.getDate();
    const minFlakes = 50;
    const maxFlakes = 800;
    return Math.floor(minFlakes + ((day - 1) / 23) * (maxFlakes - minFlakes));
  }

  private initFlakes(): void {
    const numFlakes = this.snowIntensityByDate();
    this.flakes = [];
    for (let i = 0; i < numFlakes; i++) {
      this.flakes.push(new Snowflake(this.width, this.height, this.FLAKES));
    }
  }

  private lastTime: number = performance.now();

  private animate = (time: number = performance.now()): void => {
    const delta = (time - this.lastTime) / 16.67; // 16.67 ms ≈ 60 FPS
    this.lastTime = time;

    if (!this.ctx) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    for (const f of this.flakes) {
      f.update(this.width, this.height, delta);
      f.draw(this.ctx);
    }

    this.animationFrameId = requestAnimationFrame(this.animate);
  };
}
