import "./projects.css";

export default function Projects() {
  return (
    <>
      <section id="Projects" className="projects flex">
        <h2>Proyectos</h2>

        <div className="projectsContainer">
          <div className="project hoid flex">
            <div className="flex projectInfo">
              <h3>Los Archivos de Hoid</h3>
              <p>
                Página dedicada al Cosmere desarrollada en Angular y SCSS, donde
                exploro su lore, mundos y personajes a través de una interfaz
                dinámica y moderna. El proyecto combina estructura sólida,
                diseño personalizado y una experiencia visual pensada para los
                fans del universo de Brandon Sanderson.
              </p>
            </div>
          </div>
          <div className="project flex">
            <p>hola</p>
          </div>
          <div className="project flex">
            <p>hola</p>
          </div>
        </div>
      </section>
    </>
  );
}
