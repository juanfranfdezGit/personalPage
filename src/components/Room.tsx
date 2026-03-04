import { useKeyboard } from "../hooks/keyboard";
import { useLoadRoomItems } from "./hooks/useLoadRoomItems";
import { useInitAvatar } from "./hooks/useInitAvatar";
import { useRoomLoop } from "./hooks/useLoop";
import { useDayNightCycle } from "./hooks/useDayNightCycle";
import { useRef } from "react";

export default function Room({ debug }: { debug?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const keys = useKeyboard();
  const {
    skyRef,
    windowRef,
    wallRef,
    floorRef,
    deskRef,
    pcRef,
    booksRef,
    books02Ref,
  } = useLoadRoomItems();
  const avatarRef = useInitAvatar(canvasRef);

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
  const ambientRef = useRef<HTMLDivElement | null>(null);
  useDayNightCycle(ambientRef, 300000);

  return (
    <div className="room">
      <img ref={skyRef} className="sky" src="/assets/room/sky.png" />
      <img ref={windowRef} className="window" src="/assets/room/window.png" />
      <img ref={wallRef} className="wall" src="/assets/room/wall.png" />
      <img ref={floorRef} className="floor" src="/assets/room/floor.png" />
      <img ref={deskRef} className="desk" src="/assets/room/desk.png" />
      <img ref={pcRef} className="pc" src="/assets/room/pc.png" />
      <img ref={booksRef} className="books" src="/assets/room/books.png" />
      <img
        ref={books02Ref}
        className="books02"
        src="/assets/room/books02.png"
      />

      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, zIndex: 4 }}
      />
      <div ref={ambientRef} className="ambient-light" />
    </div>
  );
}
