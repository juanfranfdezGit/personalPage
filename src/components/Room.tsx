import { useEffect, useRef } from "react";
import { Avatar } from "./Avatar";
import { useKeyboard } from "../hooks/keyboard";
import { useMouse } from "../hooks/mouse";
import { renderScene } from "../render/SceneRender";

interface Props {
  debug?: boolean;
  onInteract?: (type: any) => void;
}

export default function Room({ debug }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const avatarRef = useRef<Avatar | null>(null);
  const keys = useKeyboard();
  const roomImage = useRef<HTMLImageElement | null>(null);
  const wallRef = useRef<HTMLImageElement | null>(null);
  const floorRef = useRef<HTMLImageElement | null>(null);
  const cityFarRef = useRef<HTMLImageElement | null>(null);
  const cityMidRef = useRef<HTMLImageElement | null>(null);
  const cityNearRef = useRef<HTMLImageElement | null>(null);

  const mouseRef = useRef({ x: 0, y: 0 });
  const parallaxRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    roomImage.current = new Image();
    roomImage.current.src = "/assets/room/room.png";

    wallRef.current = new Image();
    wallRef.current.src = "/assets/room/wall.png";

    floorRef.current = new Image();
    floorRef.current.src = "/assets/room/floor.png";

    cityFarRef.current = new Image();
    cityFarRef.current.src = "/assets/room/city_far.png";

    cityMidRef.current = new Image();
    cityMidRef.current.src = "/assets/room/city_mid.png";

    cityNearRef.current = new Image();
    cityNearRef.current.src = "/assets/room/city_near.png";

    avatarRef.current = new Avatar(
      canvas.width / 2,
      canvas.height / 2,
      "/assets/character.png",
    );

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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
          cityFar: cityFarRef.current,
          cityMid: cityMidRef.current,
          cityNear: cityNearRef.current,
        },
        parallaxRef.current,
      );

      // Avatar siempre encima
      avatarRef.current?.update(keys);
      avatarRef.current?.draw(ctx);
    };

    gameLoop();
  }, [keys, debug]);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
}
