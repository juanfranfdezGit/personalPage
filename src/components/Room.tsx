import { useEffect, useRef } from "react";
import { Avatar } from "./Avatar";
import { useKeyboard } from "../hooks/keyboard";
import { renderScene } from "../render/SceneRender";

interface Props {
  debug?: boolean;
  onInteract?: (type: any) => void;
}

export default function Room({ debug }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const avatarRef = useRef<Avatar | null>(null);
  const wallRef = useRef<HTMLImageElement | null>(null);
  const floorRef = useRef<HTMLImageElement | null>(null);
  const windowRef = useRef<HTMLImageElement | null>(null);
  const skyRef = useRef<HTMLImageElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const parallaxRef = useRef({ x: 0, y: 0 });

  const keys = useKeyboard();

  useEffect(() => {
    const loadImage = (src: string) => {
      return new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
      });
    };

    Promise.all([
      loadImage("/assets/room/wall.png"),
      loadImage("/assets/room/floor.png"),
      loadImage("/assets/room/sky.png"),
      loadImage("/assets/room/window.png"),
    ]).then(([wall, floor, sky, window]) => {
      wallRef.current = wall;
      floorRef.current = floor;
      skyRef.current = sky;
      windowRef.current = window;
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    avatarRef.current = new Avatar(
      canvas.width / 2,
      canvas.height / 2,
      "/assets/character.png",
    );

    // Mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Game loop
    let animationFrameId: number;
    const gameLoop = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      const targetX = (mouseRef.current.x - centerX) * 0.03;
      const targetY = (mouseRef.current.y - centerY) * 0.03;

      parallaxRef.current.x += (targetX - parallaxRef.current.x) * 0.08;
      parallaxRef.current.y += (targetY - parallaxRef.current.y) * 0.08;

      renderScene(
        ctx,
        canvas,
        {
          wall: wallRef.current,
          floor: floorRef.current,
          sky: skyRef.current,
          window: windowRef.current,
        },
        parallaxRef.current,
      );

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
  }, [keys, debug]);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", width: "100vw", height: "100vh" }}
    />
  );
}
