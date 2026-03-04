import { useEffect, useRef } from "react";

export function useDayNightCycle(
  ref: React.RefObject<HTMLDivElement | null>,
  cycleDuration: number = 300000, // 5 minutos por día completo
) {
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    let animationFrameId: number;

    const updateLight = () => {
      if (ref.current) {
        const elapsed = (Date.now() - startTimeRef.current) % cycleDuration;
        const t = elapsed / cycleDuration;

        // Intensidad de luz muy ligera (0.1 = casi transparente, 0.3 = noche leve)
        const intensity = 0.1 + (0.2 * (1 - Math.cos(t * 2 * Math.PI))) / 2;

        ref.current.style.backgroundColor = `rgba(0, 0, 50, ${intensity})`;
      }
      animationFrameId = requestAnimationFrame(updateLight);
    };

    updateLight();

    return () => cancelAnimationFrame(animationFrameId);
  }, [ref, cycleDuration]);
}
