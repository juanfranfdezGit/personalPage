import "../../styles/room/bookshelf.css";
import "../../styles/index.css";

export default function BookshelfOverlay() {
  const techs = [
    {
      id: 1,
      name: "React",
      description:
        "Biblioteca de JavaScript para construir interfaces de usuario.",
      image: "/assets/icos/react.png",
    }
  ];

  return (
    <>
      <p className="exitPC">
        <span>ESC</span> para cerrar
      </p>

      <section className="bookshelf-mockup">
        <h1>hola libros</h1>
      </section>
    </>
  );
}
