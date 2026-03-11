import { useEffect, useRef } from "react";

export function useLoadRoomItems() {
  const skyRef = useRef<HTMLImageElement | null>(null);
  const windowRef = useRef<HTMLImageElement | null>(null);
  const wallRef = useRef<HTMLImageElement | null>(null);
  const floorRef = useRef<HTMLImageElement | null>(null);
  const deskRef = useRef<HTMLImageElement | null>(null);
  const topDeskRef = useRef<HTMLImageElement | null>(null);
  const pokePixelRef = useRef<HTMLImageElement | null>(null);
  const bookShelfRef = useRef<HTMLImageElement | null>(null);
  const carpetRef = useRef<HTMLImageElement | null>(null);
  const boardRef = useRef<HTMLImageElement | null>(null);

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
      loadImage("/assets/room/desk.png"),
      loadImage("/assets/room/topDesk.png"),
      loadImage("/assets/room/pokePixel.png"),
      loadImage("/assets/room/bookShelf.png"),
      loadImage("/assets/room/carpet.png"),
      loadImage("/assets/room/board.png"),
    ]).then(
      ([
        sky,
        window,
        wall,
        floor,
        desk,
        topDesk,
        pokePixel,
        bookShelf,
        carpet,
        board,
      ]) => {
        skyRef.current = sky;
        windowRef.current = window;
        wallRef.current = wall;
        floorRef.current = floor;
        deskRef.current = desk;
        topDeskRef.current = topDesk;
        pokePixelRef.current = pokePixel;
        bookShelfRef.current = bookShelf;
        carpetRef.current = carpet;
        boardRef.current = board;
      },
    );
  }, []);

  return {
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
  };
}
