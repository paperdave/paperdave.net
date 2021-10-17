import { Canvas2DAPI } from '$lib/components/canvasApi';

function addGSHelper(
  grad: CanvasGradient,
  color: string,
  dotOpacity: number,
  gradStop: number,
  gradOpacity: number
) {
  grad.addColorStop(gradStop, `rgba(${color},${dotOpacity * gradOpacity})`);
}

function randAround(target: number, dist: number) {
  return (Math.random() - 0.5) * dist * 2 + target;
}

class Dot {
  x = Math.random() * 1.1 - 0.05;
  y = Math.random() / 4 + 0.9;
  size = Math.random() * 150 + 50;
  opacity = 0;
  opacityRandom = Math.random() / 3 + 0.3;
  fadeInOpacity = 1;
  color = `${randAround(217, 30)}, ${randAround(170, 30)}, ${randAround(255, 20)}`;

  life = 0;

  ySpeed_1 = 0;
  ySpeed_2 = -0.0000065;
  ySpeed_3 = 0.000000018;
  ySpeed_4 = 0.000000000022;

  seed = Math.random();

  delete = false;

  constructor(noRender: boolean) {}

  update(init: boolean) {
    this.life++;
    if (this.life < 115) {
      this.opacity = this.life / 230;
    } else if (this.life > 450) {
      this.delete = true;
    } else if (this.life > 300) {
      this.opacity = (150 + 300 - this.life) / 300;
    }

    this.ySpeed_3 += this.ySpeed_4;
    this.ySpeed_2 += this.ySpeed_3;
    this.ySpeed_1 += this.ySpeed_2;
    this.y += this.ySpeed_1;

    this.size -= 0.1;

    if (this.delete) {
      Object.assign(this, new Dot(init));
    }
  }

  render(scene: VaultBackground) {
    const ctx = scene.ctx;

    if (this.fadeInOpacity < 1) {
      this.fadeInOpacity += 0.0075;
    }

    const finalX = this.x + Math.sin(this.seed * Math.PI * 2 + Date.now() / 15000) * 0.2;

    const drawX =
      scene.shakeX +
      finalX * Math.max(700, scene.width) -
      (Math.max(700, scene.width) - scene.width) / 2;
    const drawY = scene.shakeY + this.y * scene.height;

    const opacity = this.opacity * this.opacityRandom * this.fadeInOpacity;

    const grad = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, this.size);
    addGSHelper(grad, this.color, opacity, 0, 1);
    addGSHelper(grad, this.color, opacity, 0.8, 0.7);
    addGSHelper(grad, this.color, opacity, 0.87, 0.5);
    addGSHelper(grad, this.color, opacity, 0.93, 0.3);
    addGSHelper(grad, this.color, opacity, 1, 0);

    ctx.fillStyle = grad;
    ctx.fillRect(drawX - this.size, drawY - this.size, this.size * 2, this.size * 2);
  }
}

export class VaultBackground extends Canvas2DAPI {
  private items = new Set<Dot>();

  private shakeVar = 0;
  private dom?: HTMLElement;
  shakeX = 0;
  shakeY = 0;

  init() {
    for (let i = 0; i < 450; i++) {
      if (i % 9 === 0) {
        this.items.add(new Dot(true));
      }
      this.items.forEach((x) => x.update(true));
    }
    this.items.forEach((x) => (x.fadeInOpacity = 0));
  }

  render(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.items.forEach((x) => (x.update(false), x.render(this)));

    if (this.shakeVar >= 0.0001) {
      this.shakeVar *= 0.97 - 0.22 * this.shakeVar;

      if (this.shakeVar >= 0.0001) {
        this.shakeX = (Math.random() * 2 - 1) * this.shakeVar * 65;
        this.shakeY = (Math.random() * 2 - 1) * this.shakeVar * 65;
        if (this.dom) this.dom.style.transform = `translate(${this.shakeX}px,${this.shakeY}px)`;
      } else {
        this.shakeX = 0;
        this.shakeY = 0;
        if (this.dom) this.dom.style.removeProperty('transform');
        this.dom = undefined;
      }
    }
  }

  shake(dom?: HTMLElement | null) {
    this.dom = dom || undefined;
    this.shakeVar = 1;
  }
}
