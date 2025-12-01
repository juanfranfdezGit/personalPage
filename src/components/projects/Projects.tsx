import "./projects.css";

const projects = [
  {
    title: "Los Archivos de Hoid",
    description:
      "Página dedicada al Cosmere desarrollada en Angular y SCSS, donde exploro su lore, mundos y personajes a través de una interfaz dinámica y moderna. El proyecto combina estructura sólida, diseño personalizado y una experiencia visual pensada para los fans del universo de Brandon Sanderson.",
    link: "https://losarchivosdehoid.vercel.app/",
    img: "/assets/hoid.png",
  },
  {
    title: "Pokemon Duels",
    description:
      "Esta aplicación de Pokémon permite a los usuarios abrir sobres de cartas simulando la experiencia de una tienda de cartas coleccionables. Desarrollada con React, incluye un sistema local de gestión de usuarios utilizando una base de datos interna en JSON, lo que permite a cada usuario guardar y cargar su colección personal de cartas, manteniendo su progreso de forma persistente de forma local.",
    link: "https://pokemon-duels.vercel.app/",
    img: "/assets/pokemon.png",
  },
  {
    title: "Hotel Miranda",
    description:
      "Proyecto web para Hotel, desarrollado durante el training en Oxygen Academy, aplicando una metodología de trabajo por sprints. Se trabajó a partir de un diseño en Figma y una documentación técnica detallada, simulando un entorno profesional de desarrollo. Este ejercicio de maquetación se realizó utilizando HTML y Sass, aplicando la metodología BEM para una estructura de código clara, escalable y mantenible.",
    link: "https://hotel-miranda-ruddy.vercel.app/",
    img: "/assets/miranda.png",
  },
  {
    title: "Pixel Flow",
    description:
      "Esta aplicación, inspirada en Pinterest, está desarrollada con React y consume imágenes desde la API de Unsplash, permitiendo a los usuarios explorar y buscar fotografías de alta calidad. Utiliza Redux para manejar un sistema de CRUD local de imágenes favoritas, lo que permite guardar, eliminar y gestionar colecciones personalizadas de forma fluida, todo almacenado en el estado local del navegador sin necesidad de backend.",
    link: "https://pixel-flow-self.vercel.app/",
    img: "/assets/pixel.png",
  },
];

export default function Projects() {
  const goTo = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <>
      <section id="Projects" className="projects flex">
        <h2>Proyectos</h2>

        <div className="projectsContainer">
          {projects.map((project, index) => (
            <div
              className={`project flex ${project.img}`}
              key={index}
              onClick={() => goTo(project.link)}
            >
              <div className="flex projectInfo">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <img src={project.img} alt={project.title} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
