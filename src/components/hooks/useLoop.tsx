import { useEffect, useRef } from "react";

export function useRoomLoop(
  canvasRef: React.RefObject<HTMLCanvasElement | null>, 
  avatarRef: React.RefObject<any>,
  keys: Record<string, boolean>,
  debug: boolean,
  skyRef: React.RefObject<HTMLImageElement | null>,
  windowRef: React.RefObject<HTMLImageElement | null>,
  wallRef: React.RefObject<HTMLImageElement | null>,
  floorRef: React.RefObject<HTMLImageElement | null>,
) {
  const mouseRef = useRef({ x: 0, y: 0 });
  const parallaxRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; 

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Parallax
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      const targetX = (mouseRef.current.x - centerX) * 0.03;
      const targetY = (mouseRef.current.y - centerY) * 0.03;

      parallaxRef.current.x += (targetX - parallaxRef.current.x) * 0.08;
      parallaxRef.current.y += (targetY - parallaxRef.current.y) * 0.08;

      if (skyRef.current)
        skyRef.current.style.transform = `translate(${-parallaxRef.current.x * 0.2}px, ${-parallaxRef.current.y * 0.2}px)`;
      if (windowRef.current)
        windowRef.current.style.transform = `translate(${-parallaxRef.current.x}px, ${-parallaxRef.current.y}px)`;
      if (wallRef.current)
        wallRef.current.style.transform = `translate(${-parallaxRef.current.x + 30}px, ${-parallaxRef.current.y - 160}px)`;
      if (floorRef.current)
        floorRef.current.style.transform = `translate(${-parallaxRef.current.x}px, ${-parallaxRef.current.y}px)`;

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
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [canvasRef, avatarRef, keys, debug, skyRef, windowRef, wallRef, floorRef]);
}
