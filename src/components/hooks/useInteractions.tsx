import { useEffect, useRef, useState } from "react";

type UseInteractionProps = {
  elementRef: React.RefObject<HTMLElement | null>;
  avatarRef: React.MutableRefObject<any>;
  keys: Record<string, boolean>;
  triggerKey?: string;
  onInteract: () => void;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  debug?: boolean;
};

type Hitbox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function useInteraction({
  elementRef,
  avatarRef,
  keys,
  triggerKey = "e",
  onInteract,
  canvasRef,
  debug = false,
}: UseInteractionProps) {
  const hitboxRef = useRef<Hitbox | null>(null);
  const keyPressedLastFrame = useRef(false);
  const [isNear, setIsNear] = useState(false);

  // 📐 Calcular hitbox basado en el DOM real y escalado del canvas
  useEffect(() => {
    const updateHitbox = () => {
      const element = elementRef.current;
      const canvas = canvasRef.current;
      if (!element || !canvas) return;

      const elementRect = element.getBoundingClientRect();
      const canvasRect = canvas.getBoundingClientRect();

      // Escala CSS -> canvas
      const scaleX = canvas.width / canvasRect.width;
      const scaleY = canvas.height / canvasRect.height;
      const paddingX = elementRect.width * 0.15; 
      const paddingY = elementRect.height * 0.40;

      hitboxRef.current = {
        x: (elementRect.left - canvasRect.left) * scaleX + paddingX * scaleX,
        y: (elementRect.top - canvasRect.top) * scaleY + paddingY * scaleY,
        width: (elementRect.width - 2 * paddingX) * scaleX,
        height: (elementRect.height - 2 * paddingY) * scaleY,
      };
    };

    updateHitbox();
    window.addEventListener("resize", updateHitbox);

    return () => window.removeEventListener("resize", updateHitbox);
  }, [elementRef, canvasRef]);

  // 🎮 Proximidad + tecla
  useEffect(() => {
    const interval = setInterval(() => {
      const avatar = avatarRef.current;
      const hitbox = hitboxRef.current;

      if (!avatar || !hitbox) return;

      // Colisión avatar <-> hitbox
      const overlap =
        avatar.x + avatar.width > hitbox.x &&
        avatar.x < hitbox.x + hitbox.width &&
        avatar.y + avatar.height > hitbox.y &&
        avatar.y < hitbox.y + hitbox.height;

      setIsNear(overlap);

      if (overlap && keys[triggerKey] && !keyPressedLastFrame.current) {
        onInteract();
      }

      keyPressedLastFrame.current = keys[triggerKey];
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [avatarRef, keys, triggerKey, onInteract]);

  // 🖱️ Click sobre hitbox
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const hitbox = hitboxRef.current;
      const canvas = canvasRef.current;
      if (!hitbox || !canvas) return;

      const canvasRect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / canvasRect.width;
      const scaleY = canvas.height / canvasRect.height;

      const mouseX = (e.clientX - canvasRect.left) * scaleX;
      const mouseY = (e.clientY - canvasRect.top) * scaleY;

      const inside =
        mouseX >= hitbox.x &&
        mouseX <= hitbox.x + hitbox.width &&
        mouseY >= hitbox.y &&
        mouseY <= hitbox.y + hitbox.height;

      if (inside) onInteract();
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [onInteract, canvasRef]);

  // 🧪 Debug overlay opcional
  useEffect(() => {
    if (!debug) return;

    const debugDiv = document.createElement("div");
    debugDiv.style.position = "absolute";
    debugDiv.style.pointerEvents = "none";
    debugDiv.style.background = "rgba(255,0,0,0.3)";
    debugDiv.style.zIndex = "999";

    document.body.appendChild(debugDiv);

    const interval = setInterval(() => {
      const hitbox = hitboxRef.current;
      const canvas = canvasRef.current;
      if (!hitbox || !canvas) return;

      const canvasRect = canvas.getBoundingClientRect();

      // Ajuste visual del debug div
      debugDiv.style.left =
        canvasRect.left + hitbox.x / (canvas.width / canvasRect.width) + "px";
      debugDiv.style.top =
        canvasRect.top + hitbox.y / (canvas.height / canvasRect.height) + "px";
      debugDiv.style.width =
        hitbox.width / (canvas.width / canvasRect.width) + "px";
      debugDiv.style.height =
        hitbox.height / (canvas.height / canvasRect.height) + "px";
    }, 16);

    return () => {
      clearInterval(interval);
      document.body.removeChild(debugDiv);
    };
  }, [debug, canvasRef]);

  return { isNear };
}
