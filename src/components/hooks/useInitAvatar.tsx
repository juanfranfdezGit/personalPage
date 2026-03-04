import { useEffect, useRef } from "react";
import { Avatar } from "../Avatar";

export function useInitAvatar(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
) {
  const avatarRef = useRef<Avatar | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    avatarRef.current = new Avatar(
      canvas.width / 2,
      canvas.height / 2,
      "/assets/character.png",
    );
  }, [canvasRef]);

  return avatarRef;
}
