// Tile dimensions in isometric space
export const ISO_W = 64; // diamond width
export const ISO_H = 32; // diamond height
export const TILE_DEPTH = 20; // extrusion depth for walls/objects

export const PLAYER_SPEED = 2;

// 0=floor, 1=wall, 2=desk, 3=shelf, 4=monitor, 5=plant, 6=rug
export const MAP: number[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 3, 3, 3, 0, 0, 0, 0, 0, 4, 4, 0, 0, 1],
  [1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 6, 6, 6, 6, 0, 0, 0, 0, 5, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export const ROWS = MAP.length;
export const COLS = MAP[0].length;

/** Grid → isometric screen coords (origin at top of canvas, offset applied later) */
export function toIso(col: number, row: number) {
  return {
    x: (col - row) * (ISO_W / 2),
    y: (col + row) * (ISO_H / 2),
  };
}

/** Isometric screen coords → grid (continuous) */
export function fromIso(sx: number, sy: number) {
  return {
    col: sx / (ISO_W / 2) / 2 + sy / (ISO_H / 2) / 2,
    row: -sx / (ISO_W / 2) / 2 + sy / (ISO_H / 2) / 2,
  };
}

export function isWalkable(row: number, col: number): boolean {
  const r = Math.floor(row);
  const c = Math.floor(col);
  if (r < 0 || c < 0 || r >= ROWS || c >= COLS) return false;
  return MAP[r][c] === 0 || MAP[r][c] === 6;
}

export interface TileStyle {
  top: string;
  sideL: string;
  sideR: string;
  outline: string;
  hasDepth?: boolean;
}

export const TILE_STYLES: Record<number, TileStyle> = {
  0: {
    top: "#1e1e3a",
    sideL: "#13132a",
    sideR: "#16162e",
    outline: "#2a2a50",
    hasDepth: false,
  },
  1: {
    top: "#3a3a6a",
    sideL: "#1a1a3a",
    sideR: "#252550",
    outline: "#5050a0",
    hasDepth: true,
  },
  2: {
    top: "#8B6340",
    sideL: "#3d2b1a",
    sideR: "#5c3d20",
    outline: "#a07840",
    hasDepth: true,
  },
  3: {
    top: "#7a5530",
    sideL: "#3a2810",
    sideR: "#52381e",
    outline: "#9a7040",
    hasDepth: true,
  },
  4: {
    top: "#1e4a7f",
    sideL: "#0f1e3a",
    sideR: "#162d50",
    outline: "#3b82f6",
    hasDepth: true,
  },
  5: {
    top: "#2a5a2a",
    sideL: "#0d2a0d",
    sideR: "#1a3d1a",
    outline: "#22c55e",
    hasDepth: true,
  },
  6: {
    top: "#4c1d95",
    sideL: "#2e0f5a",
    sideR: "#3b1670",
    outline: "#7c3aed",
    hasDepth: false,
  },
};
