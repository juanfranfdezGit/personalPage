export interface SceneAssets {
  wall: HTMLImageElement | null;
  floor: HTMLImageElement | null;
  cityFar: HTMLImageElement | null;
  cityMid: HTMLImageElement | null;
  cityNear: HTMLImageElement | null;
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
  const { wall, floor, cityFar, cityMid, cityNear } = assets;
  const { x, y } = parallax;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Ciudad fondo (más lejos)
  if (cityFar?.complete) {
    ctx.drawImage(cityFar, -x * 0.2, -y * 0.2, canvas.width, canvas.height);
  }

  if (cityMid?.complete) {
    ctx.drawImage(cityMid, -x * 0.4, -y * 0.4, canvas.width, canvas.height);
  }

  if (cityNear?.complete) {
    ctx.drawImage(cityNear, -x * 0.6, -y * 0.6, canvas.width, canvas.height);
  }

  // Pared
  if (wall?.complete) {
    ctx.drawImage(wall, -x * 0.8, -y * 0.8, canvas.width, canvas.height);
  }

  // Suelo
  if (floor?.complete) {
    ctx.drawImage(floor, -x, -y, canvas.width, canvas.height);
  }
}
