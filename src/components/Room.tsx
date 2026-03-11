import { useKeyboard } from "../hooks/keyboard";
import { useLoadRoomItems } from "./hooks/useLoadRoomItems";
import { useInitAvatar } from "./hooks/useInitAvatar";
import { useRoomLoop } from "./hooks/useLoop";
import { useDayNightCycle } from "./hooks/useDayNightCycle";
import { useInteraction } from "./hooks/useInteractions";
import { useRef, useState, useEffect } from "react";
import "../styles/room/room.css";
import DeskOverlay from "./overlays/deskOverlay";
import BookshelfOverlay from "./overlays/bookshelfOverlay";

export default function Room({ debug }: { debug?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const keys = useKeyboard();
  const {
    skyRef,
    windowRef,
    wallRef,
    floorRef,
    deskRef,
    topDeskRef,
    pokePixelRef,
    bookShelfRef,
    carpetRef,
    boardRef,
  } = useLoadRoomItems();
  const avatarRef = useInitAvatar(canvasRef);

  const ambientRef = useRef<HTMLDivElement | null>(null);
  const [deskOpen, setDeskOpen] = useState(false);
  const [bookShelfOpen, setBookShelfOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDeskOpen(false);
        setBookShelfOpen(false);
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
    topDeskRef,
    pokePixelRef,
    bookShelfRef,
    carpetRef,
    boardRef,
  );

  useDayNightCycle(ambientRef, 300000);

  const { isNear: isNearDesk } = useInteraction({
    elementRef: deskRef,
    avatarRef,
    keys,
    triggerKey: "e",
    onInteract: () => setDeskOpen(true),
    canvasRef,
    debug,
  });

  const { isNear: isNearBookshelf } = useInteraction({
    elementRef: bookShelfRef,
    avatarRef,
    keys,
    triggerKey: "e",
    onInteract: () => setBookShelfOpen(true),
    canvasRef,
    debug,
  });

  return (
    <div className="room">
      <img ref={skyRef} className="sky" src="/assets/room/sky.png" />
      <img ref={windowRef} className="window" src="/assets/room/window.png" />
      <img ref={wallRef} className="wall" src="/assets/room/wall.png" />
      <img ref={floorRef} className="floor" src="/assets/room/floor.png" />
      <img
        ref={deskRef}
        className={`desk ${isNearDesk ? "near" : ""}`}
        src="/assets/room/desk.png"
      />
      <img
        ref={topDeskRef}
        className="top-desk"
        src="/assets/room/topDesk.png"
      />
      <img
        ref={pokePixelRef}
        className="poke-pixel"
        src="/assets/room/pokePixel.png"
      />
      <img
        ref={bookShelfRef}
        className={`bookshelf ${isNearBookshelf ? "near" : ""}`}
        src="/assets/room/bookshelf.png"
      />
      <img ref={carpetRef} className="carpet" src="/assets/room/carpet.png" />
      <img ref={boardRef} className="board" src="/assets/room/board.png" />

      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, zIndex: 4 }}
      />

      <div ref={ambientRef} className="ambient-light" />

      {isNearDesk && !deskOpen && <div className="press-e">Press E</div>}

      {isNearBookshelf && !bookShelfOpen && (
        <div className="press-e">Press E</div>
      )}

      {deskOpen && <DeskOverlay />}
      {bookShelfOpen && <BookshelfOverlay />}
    </div>
  );
}
