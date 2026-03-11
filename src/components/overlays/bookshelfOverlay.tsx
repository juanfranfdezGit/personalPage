import "../../styles/room/bookshelf.css";
import "../../styles/index.css";
import { useState } from "react";

export default function BookshelfOverlay() {
  const techs = [
    {
      id: 1,
      name: "React",
      level: 5,
      description:
        "Biblioteca de JavaScript para construir interfaces de usuario.",
      projects: "Proyecto de portafolio, proyecto de e-commerce",
      image: "/assets/icos/react.png",
    },
  ];

  const [page, setPage] = useState(1);

  const antPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (page < techs.length) {
      setPage(page + 1);
    }
  };

  return (
    <>
      <p className="exitPC">
        <span>ESC</span> para cerrar
      </p>

      <section className="bookshelf-mockup">
        <img src="/assets/book/openBook.png" alt="open book" />

        <span className="leftNum">{page}</span>
        <span className="rightNum">{page + 1}</span>

        <button className="postBTN" onClick={nextPage}>
          Pasar Página →
        </button>

        <div className="bookshelf-index">
          <h2>Indice</h2>
          <ul>
            <li>Sobre Mi</li>
            <li>Experiencia</li>
            <li>Skills Tecnicas</li>
            <li>Soft Skills</li>
          </ul>
        </div>

        <div className="bookshelf-about">
          <h2>Sobre Mi</h2>
          <p>
            Soy desarrollador web full-stack, con experiencia en HTML, CSS,
            JavaScript, React, Angular, Astro, NodeJS, SQL. Además, cuento con
            formación en diseño gráfico, UX/UI y SEO técnico, lo que me permite
            ofrecer soluciones web completas, optimizadas para rendimiento y
            usabilidad.
          </p>
          <p>
            He trabajado en proyectos de desarrollo y diseño tanto como
            desarrollador web en Impacto SEO como full stack freelance, donde he
            creado y optimizado sitios web adaptables y centrados en la
            experiencia del usuario. Me apasiona aprender nuevas tecnologías y
            contribuir a proyectos desafiantes.
          </p>
        </div>

        <div className="bookshelf-exp">
          <h2>Experiencia</h2>
          <ul>
            <li>
              <h3>Impacto SEO</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
                nostrum, quo, similique ad ipsam obcaecati dignissimos corrupti
                eaque molestias nemo saepe officia. Soluta vero sed nam dolorem?
                Doloribus, earum aut?
              </p>
            </li>
            <li>
              <h3>Freelance</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
                nostrum, quo, similique ad ipsam obcaecati dignissimos corrupti
                eaque molestias nemo saepe officia. Soluta vero sed nam dolorem?
                Doloribus, earum aut?
              </p>
            </li>
          </ul>
        </div>

        <button className="antBTN" onClick={antPage}>
          ← Página Anterior
        </button>
      </section>
    </>
  );
}
