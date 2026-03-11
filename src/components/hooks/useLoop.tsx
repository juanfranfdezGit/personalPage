import { useEffect } from "react";

export function useRoomLoop(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  avatarRef: React.RefObject<any>,
  keys: Record<string, boolean>,
  debug: boolean,
  skyRef: React.RefObject<HTMLImageElement | null>,
  windowRef: React.RefObject<HTMLImageElement | null>,
  wallRef: React.RefObject<HTMLImageElement | null>,
  floorRef: React.RefObject<HTMLImageElement | null>,
  topDeskRef: React.RefObject<HTMLImageElement | null>,
  pokePixel: React.RefObject<HTMLImageElement | null>,
  bookShelf: React.RefObject<HTMLImageElement | null>,
  carpet: React.RefObject<HTMLImageElement | null>,
  board: React.RefObject<HTMLImageElement | null>,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationFrameId: number;

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Avatar
      avatarRef.current?.update(keys);
      avatarRef.current?.draw(ctx);

      if (debug && avatarRef.current) {
        ctx.strokeStyle = "red";
        ctx.strokeRect(
          avatarRef.current.x,
          avatarRef.current.y,
          avatarRef.current.width,
          avatarRef.current.height,
        );
      }

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    canvasRef,
    avatarRef,
    keys,
    debug,
    skyRef,
    windowRef,
    wallRef,
    floorRef,
    topDeskRef,
    pokePixel,
    bookShelf,
    carpet,
    board,
  ]);
}
