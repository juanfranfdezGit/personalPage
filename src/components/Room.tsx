import { useEffect, useRef } from "react";
import { Avatar } from "./Avatar";
import { useKeyboard } from "../hooks/keyboard";
import "../styles/room/room.css";

interface Props {
  debug?: boolean;
  onInteract?: (type: any) => void;
}

export default function Room({ debug }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const avatarRef = useRef<Avatar | null>(null);

  const skyRef = useRef<HTMLImageElement | null>(null);
  const windowRef = useRef<HTMLImageElement | null>(null);
  const wallRef = useRef<HTMLImageElement | null>(null);
  const floorRef = useRef<HTMLImageElement | null>(null);

  const mouseRef = useRef({ x: 0, y: 0 });
  const parallaxRef = useRef({ x: 0, y: 0 });

  const keys = useKeyboard();

  // Carga de imágenes
  useEffect(() => {
    const loadImage = (src: string) =>
      new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
      });

    Promise.all([
      loadImage("/assets/room/sky.png"),
      loadImage("/assets/room/window.png"),
      loadImage("/assets/room/wall.png"),
      loadImage("/assets/room/floor.png"),
    ]).then(([sky, window, wall, floor]) => {
      skyRef.current = sky;
      windowRef.current = window;
      wallRef.current = wall;
      floorRef.current = floor;
    });
  }, []);

  // Inicializar avatar
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    avatarRef.current = new Avatar(
      canvas.width / 2,
      canvas.height / 2,
      "/assets/character.png",
    );
  }, []);

  // Loop del avatar
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
      // Limpiar solo canvas del avatar
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Parallax para el DOM (solo efecto, no dibuja nada en canvas)
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      const targetX = (mouseRef.current.x - centerX) * 0.03;
      const targetY = (mouseRef.current.y - centerY) * 0.03;

      parallaxRef.current.x += (targetX - parallaxRef.current.x) * 0.08;
      parallaxRef.current.y += (targetY - parallaxRef.current.y) * 0.08;

      // Aplicar transform a DOM layers
      if (skyRef.current)
        skyRef.current.style.transform = `translate(${-parallaxRef.current.x * 0.2}px, ${-parallaxRef.current.y * 0.2}px)`;
      if (windowRef.current)
        windowRef.current.style.transform = `translate(${-parallaxRef.current.x}px, ${-parallaxRef.current.y}px)`;
      if (wallRef.current)
        wallRef.current.style.transform = `translate(${-parallaxRef.current.x + 30}px, ${-parallaxRef.current.y - 160}px)`;
      if (floorRef.current)
        floorRef.current.style.transform = `translate(${-parallaxRef.current.x}px, ${-parallaxRef.current.y}px)`;

      // Actualizar avatar
      avatarRef.current?.update(keys);
      avatarRef.current?.draw(ctx);

      // Debug
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
    <div className="room">
      {/* Capas DOM */}
      <img ref={skyRef} className="sky" src="/assets/room/sky.png" />
      <img ref={windowRef} className="window" src="/assets/room/window.png" />
      <img ref={wallRef} className="wall" src="/assets/room/wall.png" />
      <img ref={floorRef} className="floor" src="/assets/room/floor.png" />

      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, zIndex: 4 }}
      />
    </div>
  );
}
