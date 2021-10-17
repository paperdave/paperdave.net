export abstract class CanvasAPI {
  canvas!: HTMLCanvasElement;
  width = 0;
  height = 0;
  private _disposed = false;
  private _running = false;
  private _last = 0;

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }
  stopRenderLoop() {
    this._running = false;
  }
  startRenderLoop() {
    if (this._disposed) return;
    this._running = true;
    this._last = performance.now();
    requestAnimationFrame(this._renderLoop);
  }

  private _renderLoop = (delta: number) => {
    if (!this._running) return;
    this.render(delta - this._last);
    this._last = delta;
    requestAnimationFrame(this._renderLoop);
  };

  abstract setup(): void;
  abstract render(delta: number): void;
  abstract dispose(): void;

  onResize() {}
}

export abstract class Canvas2DAPI extends CanvasAPI {
  ctx!: CanvasRenderingContext2D;

  abstract init(ctx: CanvasRenderingContext2D): void;

  setup() {
    const ctx = this.canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas2D Not Supported!');
    }
    this.ctx = ctx;
    this.init(ctx);
  }
  dispose() {
    delete (this as any).ctx;
  }
}

export abstract class CanvasGLAPI extends CanvasAPI {
  gl!: WebGL2RenderingContext;

  abstract init(gl: WebGL2RenderingContext): void;

  setup() {
    const gl = this.canvas.getContext('webgl2');
    if (!gl) {
      throw new Error('Canvas2D Not Supported!');
    }
    this.gl = gl;
    this.init(gl);
  }
  dispose() {
    delete (this as any).ctx;
  }
}
