export class Avatar {
  x: number;
  y: number;
  speed: number;
  image: HTMLImageElement;
  width: number;
  height: number;

  constructor(x: number, y: number, imageSrc: string) {
    this.x = x;
    this.y = y;
    this.speed = 3;

    this.image = new Image();
    this.image.src = imageSrc;

    this.width = 280;
    this.height = 420;
  }

  update(keys: Record<string, boolean>) {
    if (keys["ArrowUp"] || keys["w"]) this.y -= this.speed;
    if (keys["ArrowDown"] || keys["s"]) this.y += this.speed;
    if (keys["ArrowLeft"] || keys["a"]) this.x -= this.speed;
    if (keys["ArrowRight"] || keys["d"]) this.x += this.speed;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();

    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 10;

    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

    ctx.restore();
  }
}
