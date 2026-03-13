import "../../styles/room/bookshelf.css";
import "../../styles/index.css";
import { useState } from "react";
import Skills from "./bookComponents/skills";
import About from "./bookComponents/about";
import Experience from "./bookComponents/experience";
import BookIndex from "./bookComponents/bookIndex";
import Hobbies from "./bookComponents/hobbies";
import PersonalProjects from "./bookComponents/personalProjects";
import PersonalProjects2 from "./bookComponents/personalProjects2";
import SoftSkills from "./bookComponents/softSkills";

export default function BookshelfOverlay() {
  const [page, setPage] = useState(0);

  // páginas ya giradas
  const getPageClass = (index) => {
    return page > index ? "next" : "";
  };

  // páginas visibles
  const isFocused = (index) => {
    return index === page || index === page - 1;
  };

  return (
    <>
      <p className="exitPC">
        <span>ESC</span> para cerrar
      </p>

      {/* indicador de página */}
      <p className="pageIndicator">Página actual: {page}</p>

      <button
        className={`pageBtn nextPage ${page < 6 ? "" : "disabled"}`}
        onClick={() => {
          if (page < 6) setPage(page + 1);
        }}
      >
        Pasar Página
      </button>

      <section className="bookContainer">
        <div className="book">
          {/* Portada */}
          <div
            className={`page ${getPageClass(0)} ${isFocused(0) ? "focused" : ""}`}
          >
            <div className="front front-cover"></div>
            <div className="back back-contra-portrait"></div>
          </div>

          {/* Página 1 */}
          <div
            className={`page ${getPageClass(1)} ${isFocused(1) ? "focused" : ""}`}
          >
            <div className="front front-2">
              <BookIndex />
            </div>
            <div className="back back-2">
              <About />
            </div>
          </div>

          {/* Página 2 */}
          <div
            className={`page ${getPageClass(2)} ${isFocused(2) ? "focused" : ""}`}
          >
            <div className="front front-3">
              <Hobbies />
            </div>
            <div className="back back-3">
              <Experience />
            </div>
          </div>

          {/* Página 3 */}
          <div
            className={`page ${getPageClass(3)} ${isFocused(3) ? "focused" : ""}`}
          >
            <div className="front front-4">
              <PersonalProjects />
            </div>
            <div className="back back-4">
              <PersonalProjects2 />
            </div>
          </div>

          {/* Página 4 */}
          <div
            className={`page ${getPageClass(4)} ${isFocused(4) ? "focused" : ""}`}
          >
            <div className="front front-5">
              <Skills />
            </div>
            <div className="back back-5">
              <SoftSkills />
            </div>
          </div>

          {/* Página 5 */}
          <div
            className={`page ${getPageClass(5)} ${isFocused(5) ? "focused" : ""}`}
          >
            <div className="front front-6"></div>
            <div className="back back-6"></div>
          </div>
        </div>
      </section>
    </>
  );
}
