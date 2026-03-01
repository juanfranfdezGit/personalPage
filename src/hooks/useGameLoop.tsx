import { useState, useEffect, useRef, useCallback } from "react";
import { PLAYER_SPEED, isWalkable, ROWS, COLS } from "../constants/map";
import { INTERACTABLES, Interactable } from "../data/interactables";

export type Direction = "ne" | "nw" | "se" | "sw" | "idle";

export interface PlayerPos {
  col: number; // continuous grid col
  row: number; // continuous grid row
}

interface UseGameLoopReturn {
  playerPos: PlayerPos;
  direction: Direction;
  moving: boolean;
  frame: number;
  nearObj: Interactable | null;
  onCanvasClick: (gridCol: number, gridRow: number, objId?: string) => void;
}

// Simple grid-based pathfinding node
interface Node {
  row: number;
  col: number;
  g: number;
  h: number;
  f: number;
  parent: Node | null;
}

function findPath(
  sr: number,
  sc: number,
  er: number,
  ec: number,
): { row: number; col: number }[] {
  const key = (r: number, c: number) => `${r},${c}`;
  const open: Node[] = [{ row: sr, col: sc, g: 0, h: 0, f: 0, parent: null }];
  const closed = new Set<string>();
  const openMap: Record<string, Node> = { [key(sr, sc)]: open[0] };

  while (open.length > 0) {
    open.sort((a, b) => a.f - b.f);
    const curr = open.shift()!;
    delete openMap[key(curr.row, curr.col)];
    closed.add(key(curr.row, curr.col));

    if (curr.row === er && curr.col === ec) {
      const path: { row: number; col: number }[] = [];
      let n: Node | null = curr;
      while (n) {
        path.unshift({ row: n.row, col: n.col });
        n = n.parent;
      }
      return path;
    }

    for (const [dr, dc] of [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]) {
      const nr = curr.row + dr,
        nc = curr.col + dc;
      if (closed.has(key(nr, nc))) continue;
      const walkable = isWalkable(nr, nc) || (nr === er && nc === ec);
      if (!walkable) continue;
      const g = curr.g + 1;
      const h = Math.abs(nr - er) + Math.abs(nc - ec);
      const f = g + h;
      if (openMap[key(nr, nc)] && openMap[key(nr, nc)].g <= g) continue;
      const node: Node = { row: nr, col: nc, g, h, f, parent: curr };
      open.push(node);
      openMap[key(nr, nc)] = node;
    }
  }
  return [];
}

export function useGameLoop(): UseGameLoopReturn {
  const [playerPos, setPlayerPos] = useState<PlayerPos>({ col: 5, row: 5 });
  const [direction, setDirection] = useState<Direction>("se");
  const [moving, setMoving] = useState(false);
  const [frame, setFrame] = useState(0);
  const [nearObj, setNearObj] = useState<Interactable | null>(null);

  const keysRef = useRef<Record<string, boolean>>({});
  const posRef = useRef(playerPos);
  const pathRef = useRef<{ row: number; col: number }[]>([]);
  const animRef = useRef<number>(0);

  posRef.current = playerPos;

  // Walk animation
  useEffect(() => {
    const t = setInterval(() => {
      setFrame((f) => (f + 1) % 2);
    }, 220);
    return () => clearInterval(t);
  }, []);

  // Check proximity to interactables
  const checkNear = useCallback((row: number, col: number) => {
    const r = Math.floor(row),
      c = Math.floor(col);
    for (const obj of INTERACTABLES) {
      for (const t of obj.tiles) {
        if (Math.abs(t.r - r) <= 1 && Math.abs(t.c - c) <= 1) {
          setNearObj(obj);
          return;
        }
      }
    }
    setNearObj(null);
  }, []);

  // Keyboard
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true;
      const movKeys = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "w",
        "a",
        "s",
        "d",
      ];
      if (movKeys.includes(e.key)) {
        e.preventDefault();
        pathRef.current = [];
      }
    };
    const onUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false;
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, []);

  // Game loop — isometric movement:
  // In iso, screen directions map to grid diagonals:
  //   ↑ (W/ArrowUp)    → row--, col--  (NW)
  //   ↓ (S/ArrowDown)  → row++, col++  (SE)
  //   ← (A/ArrowLeft)  → row++, col--  (SW)
  //   → (D/ArrowRight) → row--, col++  (NE)
  useEffect(() => {
    const SPEED = PLAYER_SPEED / 16; // grid units per frame

    const loop = () => {
      const keys = keysRef.current;
      let { col, row } = posRef.current;
      let dCol = 0,
        dRow = 0;

      if (keys["ArrowUp"] || keys["w"]) {
        dRow -= 1;
        dCol -= 1;
      }
      if (keys["ArrowDown"] || keys["s"]) {
        dRow += 1;
        dCol += 1;
      }
      if (keys["ArrowLeft"] || keys["a"]) {
        dRow += 1;
        dCol -= 1;
      }
      if (keys["ArrowRight"] || keys["d"]) {
        dRow -= 1;
        dCol += 1;
      }

      // Normalise diagonal
      if (dCol !== 0 && dRow !== 0) {
        dCol *= 0.707;
        dRow *= 0.707;
      }

      let moved = false;

      if (dCol !== 0 || dRow !== 0) {
        pathRef.current = [];
        const spd = SPEED;

        // Resolve direction label
        if (dRow < 0 && dCol > 0) setDirection("ne");
        else if (dRow < 0 && dCol < 0) setDirection("nw");
        else if (dRow > 0 && dCol > 0) setDirection("se");
        else if (dRow > 0 && dCol < 0) setDirection("sw");

        const newCol = isWalkable(Math.floor(row), Math.floor(col + dCol * spd))
          ? col + dCol * spd
          : col;
        const newRow = isWalkable(Math.floor(row + dRow * spd), Math.floor(col))
          ? row + dRow * spd
          : row;

        col = Math.max(1, Math.min(COLS - 2, newCol));
        row = Math.max(1, Math.min(ROWS - 2, newRow));
        moved = true;
      } else if (pathRef.current.length > 0) {
        const target = pathRef.current[0];
        const dc = target.col - col;
        const dr = target.row - row;
        const dist = Math.sqrt(dc * dc + dr * dr);

        if (dist < SPEED + 0.05) {
          col = target.col;
          row = target.row;
          pathRef.current = pathRef.current.slice(1);
        } else {
          col += (dc / dist) * SPEED;
          row += (dr / dist) * SPEED;
          if (dr < 0 && dc > 0) setDirection("ne");
          else if (dr < 0 && dc < 0) setDirection("nw");
          else if (dr > 0 && dc > 0) setDirection("se");
          else setDirection("sw");
        }
        moved = true;
      }

      if (moved) {
        setPlayerPos({ col, row });
        setMoving(true);
        checkNear(row, col);
      } else {
        setMoving(false);
      }

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [checkNear]);

  // Click handler receives grid coords from the canvas component
  const onCanvasClick = useCallback(
    (gridCol: number, gridRow: number, objId?: string) => {
      const { col: sc, row: sr } = posRef.current;
      const startR = Math.round(sr),
        startC = Math.round(sc);

      if (objId) {
        const obj = INTERACTABLES.find((o) => o.id === objId);
        if (!obj) return;
        // Find a walkable neighbor of the object
        const candidates: { row: number; col: number }[] = [];
        for (const t of obj.tiles) {
          for (const [dr, dc] of [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
          ]) {
            if (isWalkable(t.r + dr, t.c + dc))
              candidates.push({ row: t.r + dr, col: t.c + dc });
          }
        }
        if (candidates.length === 0) return;
        // Pick closest candidate
        candidates.sort(
          (a, b) =>
            Math.abs(a.row - sr) +
            Math.abs(a.col - sc) -
            (Math.abs(b.row - sr) + Math.abs(b.col - sc)),
        );
        pathRef.current = findPath(
          startR,
          startC,
          candidates[0].row,
          candidates[0].col,
        );
        return;
      }

      if (!isWalkable(gridRow, gridCol)) return;
      pathRef.current = findPath(startR, startC, gridRow, gridCol);
    },
    [],
  );

  return { playerPos, direction, moving, frame, nearObj, onCanvasClick };
}
