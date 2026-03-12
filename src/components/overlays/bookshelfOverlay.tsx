import "../../styles/room/bookshelf.css";
import "../../styles/index.css";
import { useState } from "react";
import Skills from "./bookComponents/skills";
import About from "./bookComponents/about";
import Experience from "./bookComponents/experience";
import BookIndex from "./bookComponents/bookIndex";

export default function BookshelfOverlay() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState("next");

  const getPageClass = (index) => {
    if (direction === "next" && page > index) return "next";
    if (direction === "back" && page <= index) return "back";
    return "";
  };

  return (
    <>
      <p className="exitPC">
        <span>ESC</span> para cerrar
      </p>

      <button
        className={`pageBtn ${page > 0 ? "" : "disabled"}`}
        onClick={() => {
          if (page > 0) {
            setDirection("back");
            setPage(page - 1);
          }
        }}
      >
        Volver Página
      </button>

      <button
        className={`pageBtn nextPage ${page < 4 ? "" : "disabled"}`}
        onClick={() => {
          if (page < 4) {
            setDirection("next");
            setPage(page + 1);
          }
        }}
      >
        Pasar Página
      </button>

      <section className="bookContainer">
        <div className="book">
          {/* Portada */}
          <div className={`page ${getPageClass(0)}`}>
            <div className="front front-cover"></div>
            <div className="back back-contra-portrait"></div>
          </div>

          {/* Página 1 */}
          <div className={`page ${getPageClass(1)}`}>
            <div className="front front-2">
              <BookIndex />
            </div>
            <div className="back back-2">
              <About />
            </div>
          </div>

          {/* Página 2 */}
          <div className={`page ${getPageClass(2)}`}>
            <div className="front front-3">
              <Skills />
            </div>
            <div className="back back-3">
              <Experience />
            </div>
          </div>

          {/* Página 3 */}
          <div className={`page ${getPageClass(3)}`}>
            <div className="front front-4">
              <Skills />
            </div>
            <div className="back back-4"></div>
          </div>
        </div>
      </section>
    </>
  );
}
