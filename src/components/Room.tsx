import { useEffect, useRef } from "react";
import { Avatar } from "./Avatar";
import { useKeyboard } from "../hooks/keyboard";

interface Props {
  debug?: boolean;
  onInteract?: (type: any) => void;
}

export default function Room({ debug }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const avatarRef = useRef<Avatar | null>(null);
  const keys = useKeyboard();

  const roomImage = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Cargar imagen del cuarto
    roomImage.current = new Image();
    roomImage.current.src = "/assets/room.png"; 

    // Crear avatar
    avatarRef.current = new Avatar(
      canvas.width / 2,
      canvas.height / 2,
      "/assets/character.png",
    );

    let animationFrameId: number;

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dibujar room
      if (roomImage.current?.complete) {
        ctx.drawImage(roomImage.current, 0, 0, canvas.width, canvas.height);
      }

      // Update avatar
      avatarRef.current?.update(keys);

      // Draw avatar
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

    return () => cancelAnimationFrame(animationFrameId);
  }, [keys, debug]);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
}
