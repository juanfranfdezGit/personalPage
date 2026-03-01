import { useRef, useEffect, useCallback } from "react";
import {
  MAP,
  ROWS,
  COLS,
  ISO_W,
  ISO_H,
  TILE_DEPTH,
  TILE_STYLES,
  toIso,
  fromIso,
  isWalkable,
} from "../constants/map";
import { INTERACTABLES, Interactable } from "../data/interactables";
import { PlayerPos, Direction } from "../hooks/useGameLoop";

interface Props {
  playerPos: PlayerPos;
  direction: Direction;
  moving: boolean;
  frame: number;
  nearObj: Interactable | null;
  onCanvasClick: (col: number, row: number, objId?: string) => void;
  onInteract: (obj: Interactable) => void;
  width: number;
  height: number;
}

// Canvas origin offset so the map is centered
function getOrigin(canvasW: number, canvasH: number) {
  const mapScreenW = (COLS + ROWS) * (ISO_W / 2);
  const mapScreenH = (COLS + ROWS) * (ISO_H / 2);
  return {
    ox: canvasW / 2,
    oy: (canvasH - mapScreenH) / 2 + ISO_H,
  };
}

// Draw an isometric tile (diamond top + optional depth sides)
function drawTile(
  ctx: CanvasRenderingContext2D,
  sx: number,
  sy: number,
  type: number,
  highlight = false,
) {
  const style = TILE_STYLES[type] ?? TILE_STYLES[0];
  const hw = ISO_W / 2;
  const hh = ISO_H / 2;
  const depth = style.hasDepth ? TILE_DEPTH : 0;

  if (style.hasDepth && depth > 0) {
    // Left side face
    ctx.beginPath();
    ctx.moveTo(sx - hw, sy);
    ctx.lineTo(sx - hw, sy + depth);
    ctx.lineTo(sx, sy + hh + depth);
    ctx.lineTo(sx, sy + hh);
    ctx.closePath();
    ctx.fillStyle = style.sideL;
    ctx.fill();

    // Right side face
    ctx.beginPath();
    ctx.moveTo(sx + hw, sy);
    ctx.lineTo(sx + hw, sy + depth);
    ctx.lineTo(sx, sy + hh + depth);
    ctx.lineTo(sx, sy + hh);
    ctx.closePath();
    ctx.fillStyle = style.sideR;
    ctx.fill();
  }

  // Top face (diamond)
  ctx.beginPath();
  ctx.moveTo(sx, sy - hh);
  ctx.lineTo(sx + hw, sy);
  ctx.lineTo(sx, sy + hh);
  ctx.lineTo(sx - hw, sy);
  ctx.closePath();
  ctx.fillStyle = highlight ? lighten(style.top, 40) : style.top;
  ctx.fill();

  // Outline
  ctx.strokeStyle = highlight ? style.outline : style.outline + "80";
  ctx.lineWidth = highlight ? 1.5 : 0.5;
  ctx.stroke();
}

function lighten(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0xff) + amount);
  const b = Math.min(255, (num & 0xff) + amount);
  return `rgb(${r},${g},${b})`;
}

// Draw pixel character on canvas
function drawCharacter(
  ctx: CanvasRenderingContext2D,
  sx: number,
  sy: number,
  direction: Direction,
  moving: boolean,
  frame: number,
  isNear: boolean,
) {
  const scale = 2;
  const bobY = moving && frame === 1 ? 1 : 0;
  const flipX = direction === "nw" || direction === "sw";

  ctx.save();
  ctx.translate(sx, sy - ISO_H - 10 + bobY);
  if (flipX) {
    ctx.scale(-1, 1);
  }

  // Shadow ellipse
  ctx.save();
  ctx.translate(0, ISO_H + 10 - bobY + 2);
  ctx.scale(1, 0.3);
  ctx.beginPath();
  ctx.arc(0, 0, 12, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.fill();
  ctx.restore();

  // Pixel rects: [x, y, w, h, color] — centered at 0,0
  type Rect = [number, number, number, number, string];
  const pixels: Rect[] = [
    // head
    [-8, -40, 16, 14, "#FBBF24"],
    [-8, -40, 16, 5, "#1e1b4b"],
    // eyes
    [-5, -36, 3, 3, "#1e1b4b"],
    [2, -36, 3, 3, "#1e1b4b"],
    // body
    [-9, -26, 18, 14, "#4f46e5"],
    // arms
    [-13, -24, 4, 10, "#FBBF24"],
    [9, -24, 4, 10, "#FBBF24"],
    // legs
    [-8, -12, 7, 12, "#312e81"],
    [1, -12, 7, 12, "#312e81"],
    // shoes
    [-9, -2, 9, 5, "#1e293b"],
    [0, -2, 9, 5, "#1e293b"],
  ];

  for (const [px, py, pw, ph, color] of pixels) {
    ctx.fillStyle = color;
    ctx.fillRect(
      (px * scale) / 2,
      (py * scale) / 2,
      (pw * scale) / 2,
      (ph * scale) / 2,
    );
  }

  ctx.restore();

  // "E to interact" badge
  if (isNear) {
    ctx.save();
    ctx.translate(sx, sy - ISO_H - 46);
    const text = "[E] Interactuar";
    ctx.font = "bold 10px monospace";
    const tw = ctx.measureText(text).width;
    ctx.fillStyle = "rgba(15,23,42,0.92)";
    roundRect(ctx, -tw / 2 - 6, -14, tw + 12, 18, 4);
    ctx.fill();
    ctx.strokeStyle = "#7c3aed";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = "#e2e8f0";
    ctx.textAlign = "center";
    ctx.fillText(text, 0, -1);
    ctx.restore();
  }
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// Draw decorative details on top of tiles
function drawTileDetails(
  ctx: CanvasRenderingContext2D,
  sx: number,
  sy: number,
  type: number,
) {
  const hw = ISO_W / 2;
  const hh = ISO_H / 2;

  if (type === 6) {
    // Rug pattern
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(sx, sy - hh);
    ctx.lineTo(sx + hw, sy);
    ctx.lineTo(sx, sy + hh);
    ctx.lineTo(sx - hw, sy);
    ctx.closePath();
    ctx.clip();
    ctx.strokeStyle = "rgba(167,139,250,0.25)";
    ctx.lineWidth = 1;
    for (let i = -2; i <= 2; i++) {
      ctx.beginPath();
      ctx.moveTo(sx + i * 10, sy - hh);
      ctx.lineTo(sx + i * 10, sy + hh);
      ctx.stroke();
    }
    ctx.restore();
  }

  if (type === 3) {
    // Books on shelf
    const colors = ["#dc2626", "#2563eb", "#16a34a", "#d97706"];
    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillRect(sx - 14 + i * 7, sy - 12 - TILE_DEPTH, 5, 10);
    }
  }

  if (type === 4) {
    // Monitor glow
    ctx.save();
    ctx.shadowColor = "#3b82f6";
    ctx.shadowBlur = 8;
    ctx.fillStyle = "#60a5fa";
    ctx.fillRect(sx - 8, sy - 14 - TILE_DEPTH, 16, 10);
    ctx.restore();
    // Screen content lines
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    for (let i = 0; i < 3; i++) {
      ctx.fillRect(sx - 6, sy - 13 - TILE_DEPTH + i * 3, 12, 1);
    }
  }

  if (type === 5) {
    // Plant leaves
    const leafColors = ["#15803d", "#16a34a", "#22c55e"];
    for (let i = 0; i < 3; i++) {
      ctx.save();
      ctx.translate(sx + (i - 1) * 5, sy - TILE_DEPTH - 8 - i * 4);
      ctx.rotate((i - 1) * 0.4);
      ctx.fillStyle = leafColors[i];
      ctx.beginPath();
      ctx.ellipse(0, 0, 5, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    // Pot
    ctx.fillStyle = "#b45309";
    ctx.fillRect(sx - 5, sy - TILE_DEPTH + 2, 10, 8);
  }

  if (type === 2) {
    // Desk items
    ctx.fillStyle = "#e2e8f0";
    ctx.fillRect(sx - 10, sy - TILE_DEPTH - 3, 8, 5); // paper
    ctx.fillStyle = "#f59e0b";
    ctx.fillRect(sx + 4, sy - TILE_DEPTH - 5, 3, 7); // pencil
  }
}

export default function IsoRoom({
  playerPos,
  direction,
  moving,
  frame,
  nearObj,
  onCanvasClick,
  onInteract,
  width,
  height,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Keyboard E to interact
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "e" || e.key === "E") && nearObj) {
        onInteract(nearObj);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nearObj, onInteract]);

  // Main draw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { ox, oy } = getOrigin(width, height);

    ctx.clearRect(0, 0, width, height);

    // Background gradient
    const bg = ctx.createRadialGradient(
      width / 2,
      height / 2,
      0,
      width / 2,
      height / 2,
      width * 0.8,
    );
    bg.addColorStop(0, "#0f0f24");
    bg.addColorStop(1, "#050510");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    // Painter's algorithm: draw tiles back-to-front (row + col order)
    // We sort by row+col so tiles closer to camera draw last
    const renderList: {
      row: number;
      col: number;
      sx: number;
      sy: number;
      type: number;
    }[] = [];

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const iso = toIso(col, row);
        renderList.push({
          row,
          col,
          sx: ox + iso.x,
          sy: oy + iso.y,
          type: MAP[row][col],
        });
      }
    }

    // Sort: back to front
    renderList.sort((a, b) => a.row + a.col - (b.row + b.col));

    const playerGridRow = Math.round(playerPos.row);
    const playerGridCol = Math.round(playerPos.col);

    for (const tile of renderList) {
      // Check if any interactable is on this tile and player is near
      const isHighlighted =
        nearObj?.tiles.some((t) => t.r === tile.row && t.c === tile.col) ??
        false;

      drawTile(ctx, tile.sx, tile.sy, tile.type, isHighlighted);
      drawTileDetails(ctx, tile.sx, tile.sy, tile.type);

      // Draw player when we reach his tile (painter's algo depth sort)
      if (tile.row === playerGridRow && tile.col === playerGridCol) {
        const pIso = toIso(playerPos.col, playerPos.row);
        drawCharacter(
          ctx,
          ox + pIso.x,
          oy + pIso.y,
          direction,
          moving,
          frame,
          nearObj !== null,
        );
      }
    }
  }, [playerPos, direction, moving, frame, nearObj, width, height]);

  // Click → convert screen coords to grid
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      const { ox, oy } = getOrigin(width, height);
      const { col, row } = fromIso(cx - ox, cy - oy);
      const gridCol = Math.round(col);
      const gridRow = Math.round(row);

      // Check interactable
      const obj = INTERACTABLES.find((o) =>
        o.tiles.some((t) => t.r === gridRow && t.c === gridCol),
      );
      if (obj) {
        onCanvasClick(gridCol, gridRow, obj.id);
        onInteract(obj);
        return;
      }

      onCanvasClick(gridCol, gridRow);
    },
    [width, height, onCanvasClick, onInteract],
  );

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onClick={handleClick}
      style={{
        cursor: "crosshair",
        display: "block",
        borderRadius: 8,
        boxShadow:
          "0 0 0 2px rgba(124,58,237,0.3), 0 0 60px rgba(124,58,237,0.1), 0 30px 80px rgba(0,0,0,0.8)",
      }}
    />
  );
}
