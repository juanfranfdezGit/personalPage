import { useKeyboard } from "../hooks/keyboard";
import { useLoadRoomItems } from "./hooks/useLoadRoomItems";
import { useInitAvatar } from "./hooks/useInitAvatar";
import { useRoomLoop } from "./hooks/useLoop";
import { useDayNightCycle } from "./hooks/useDayNightCycle";
import { useInteraction } from "./hooks/useInteractions";
import { useRef, useState, useEffect } from "react";
import "../styles/room/room.css";
import DeskOverlay from "./overlays/deskOverlay";

export default function Room({ debug }: { debug?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const keys = useKeyboard();
  const { skyRef, windowRef, wallRef, floorRef, deskRef } = useLoadRoomItems();
  const avatarRef = useInitAvatar(canvasRef);

  const ambientRef = useRef<HTMLDivElement | null>(null);
  const [deskOpen, setDeskOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDeskOpen(false);
        // Aquí puedes cerrar otras ventanas en el futuro
        // setInventoryOpen(false)
        // setMapOpen(false)
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useRoomLoop(
    canvasRef,
    avatarRef,
    keys,
    !!debug,
    skyRef,
    windowRef,
    wallRef,
    floorRef,
  );

  useDayNightCycle(ambientRef, 300000);

  const { isNear } = useInteraction({
    elementRef: deskRef,
    avatarRef,
    keys,
    triggerKey: "e",
    onInteract: () => setDeskOpen(true),
    canvasRef,
    debug,
  });

  return (
    <div className="room">
      <img ref={skyRef} className="sky" src="/assets/room/sky.png" />
      <img ref={windowRef} className="window" src="/assets/room/window.png" />
      <img ref={wallRef} className="wall" src="/assets/room/wall.png" />
      <img ref={floorRef} className="floor" src="/assets/room/floor.png" />
      <img ref={deskRef} className={`desk ${isNear ? "near" : ""}`} src="/assets/room/desk.png" />

      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, zIndex: 4 }}
      />

      <div ref={ambientRef} className="ambient-light" />

      {isNear && !deskOpen && <div className="press-e">Press E</div>}

      {deskOpen && <DeskOverlay />}
    </div>
  );
}
