export interface SceneAssets {
  wall: HTMLImageElement | null;
  floor: HTMLImageElement | null;
  sky: HTMLImageElement | null;
  window: HTMLImageElement | null;
}

export interface ParallaxState {
  x: number;
  y: number;
}

export function renderScene(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  assets: SceneAssets,
  parallax: ParallaxState,
) {
  const { wall, floor, sky, window } = assets;
  const { x, y } = parallax;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Ciudad fondo (más lejos)
  if (sky?.complete) {
    ctx.drawImage(sky, -x * 0.2, -y * 0.2, canvas.width, canvas.height);
  }

  // Ventana
  if (window?.complete) {
    ctx.drawImage(window, -x - 250, -y, canvas.width, canvas.height - 200);
  }
  // Pared
  if (wall?.complete) {
    ctx.drawImage(wall, -x + 30, -y - 160, canvas.width, canvas.height);
  }

  // Suelo
  if (floor?.complete) {
    ctx.drawImage(floor, -x, -y, canvas.width, canvas.height);
  }
}
