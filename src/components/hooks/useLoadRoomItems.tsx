import { useEffect, useRef } from "react";

export function useLoadRoomItems() {
  const skyRef = useRef<HTMLImageElement | null>(null);
  const windowRef = useRef<HTMLImageElement | null>(null);
  const wallRef = useRef<HTMLImageElement | null>(null);
  const floorRef = useRef<HTMLImageElement | null>(null);
  const deskRef = useRef<HTMLImageElement | null>(null);
  const pcRef = useRef<HTMLImageElement | null>(null);
  const booksRef = useRef<HTMLImageElement | null>(null);
  const books02Ref = useRef<HTMLImageElement | null>(null);

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
      loadImage("/assets/room/pc.png"),
      loadImage("/assets/room/books.png"),
      loadImage("/assets/room/books02.png"),
    ]).then(([sky, window, wall, floor, desk, pc, books, books02]) => {
      skyRef.current = sky;
      windowRef.current = window;
      wallRef.current = wall;
      floorRef.current = floor;
      deskRef.current = desk;
      pcRef.current = pc;
      booksRef.current = books;
      books02Ref.current = books02;
    });
  }, []);

  return {
    skyRef,
    windowRef,
    wallRef,
    floorRef,
    deskRef,
    pcRef,
    booksRef,
    books02Ref,
  };
}
