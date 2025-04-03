import { useState, useEffect } from "react";
import ReactPlayer from 'react-player'

const techs = [
  {id: 1, src: '/assets/react.webp', nombre: 'react'},
  {id: 2, src: '/assets/js.webp', nombre: 'js'},
  {id: 3,  src: '/assets/angular.png' , nombre: 'angular'},
  {id: 4,  src: '/assets/html.png', nombre: 'html'},
  {id: 5,  src: '/assets/css.png', nombre: 'css'},
  {id: 6,  src: '/assets/sass.png', nombre: 'sass'},
  {id: 7,  src: '/assets/adobe.png', nombre: 'adobe'},
  {id: 8,  src: '/assets/node.png', nombre: 'node'},
  {id: 9,  src: '/assets/sql.png', nombre: 'sql'},
  {id: 10,  src: '/assets/figma.png', nombre: 'figma'},
  {id: 11,  src: '/assets/unity.png', nombre: 'unity'},
  {id: 12,  src: '/assets/wordpress.png', nombre: 'wordpress'},
]

const worksList = [
  {
    id:1, 
    src: '/assets/work03.mp4', 
    nombre: 'New World Travels', 
    description: 'New World Travels es mi primer proyecto académico, una agencia de viajes web donde los usuarios pueden explorar destinos y seleccionar la fecha de su viaje a través de un calendario interactivo. La interfaz incluye un efecto parallax que hace que el fondo se desplace, creando una sensación de profundidad y mejorando la experiencia visual del usuario mientras navega por los destinos.',
    description2: 'La aplicación está desarrollada en HTML, CSS y JavaScript, y aunque es un proyecto sencillo con algunos errores, le tengo un gran cariño porque representa mi primer paso en el desarrollo web. Cada línea de código refleja mi aprendizaje y pasión por la programación.',
    link: 'https://newworldtravels.netlify.app/'
  },

  {
    id:2, 
    src: '/assets/work01.mp4', 
    nombre: 'Virtual Life', 
    description: 'Tienda de Videojuegos Online es un proyecto académico que simula una tienda digital donde los usuarios pueden registrarse, guardar sus videojuegos favoritos y preparar futuras compras. Si bien las transacciones no son reales, la plataforma ofrece una experiencia interactiva y funcional.',
    description2: 'El proyecto está desarrollado con React para la interfaz de usuario, Node.js para la lógica del servidor y SQL para la gestión de la base de datos, combinando tecnologías modernas para crear una aplicación web dinámica y bien estructurada. *Al estar alojado en servidores gratuitos puede fallar*',
    link: 'https://virtuallifefrontend.vercel.app/'
  },

  {
    id: 3,
    src: '/assets/work06.mp4',
    nombre: 'Pokemon Duels',
    description: 'Este proyecto es una aplicación web creada con React que permite a los usuarios abrir sobres de cartas Pokémon de manera interactiva. Utiliza React Context para gestionar el estado global del usuario, permitiendo guardar su progreso y preferencias en formato JSON, mientras que IndexedDB almacena de forma persistente su colección de cartas dentro del navegador. Además, React Router facilita la navegación entre diferentes secciones de la aplicación.',
    description2: 'Los datos de los Pokémon provienen de un archivo JSON que funciona como una API local, proporcionando la información necesaria sobre cada carta. El diseño de la interfaz está desarrollado con SASS, logrando un estilo atractivo y bien estructurado. Esta combinación de tecnologías ofrece una experiencia fluida y envolvente, recreando la emoción de abrir sobres de cartas y coleccionarlas digitalmente.',
    link: 'https://pokemon-duels.vercel.app/'
  }
]

const practices = [
  {
    id: 1,
    nombre: 'Apple E-Commerce',
    description: 'Apple Webstore es un clon de la página oficial de Apple, diseñado exclusivamente con HTML y CSS como ejercicio de maquetación y estilizado.', 
    description2: 'Este proyecto nació de mi deseo de seguir practicando y mejorando mis habilidades en desarrollo web, replicando con precisión el diseño limpio y minimalista característico de Apple. Una práctica ideal para perfeccionar la estructura de código y la atención al detalle en el front-end.',
    link: ''
  }
]

function App() {

  const [stepClass, setStepClass] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setStepClass("step06b");
      document.body.style.overflowY = "scroll";
    }, 13000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflowY = "hidden";
    }
  }, []);

  return (
    <>
      <div class="hero flex">

        <div class="myInfo flex">
          <div class="typewriter">
            <h1>Juan Francisco Romero Fdez</h1>
          </div>
          <div class="typewriter2">
            <h2>Full Stack Developer</h2>
          </div>
        </div>
        
        <div class={`illustration ${stepClass}`}>
          <img src="/assets/hero.jpg" alt="illustration"></img>
        </div>

        <div class="techs">
          <h2>Tecnologías</h2>

          {techs.map(tech => (
            <div class="tech flex">
              <img src={tech.src} class={tech.nombre} alt={tech.nombre} />
            </div>
          ))}

        </div>

        <div class="description flex step05">
          <p>Desarrollador Full Stack especializado en la creación de aplicaciones web dinámicas y responsivas. Mi tecnología favorita es React, 
          pero también tengo experiencia con Angular y Vue, lo que me permite adaptarme a las diferentes necesidades de los proyectos y ofrecer 
          experiencias de usuario de alta calidad a través de diversos marcos de trabajo.</p>
          <br/>

          <p>Me encanta afrontar desafíos y siempre estoy dispuesto a abordar cualquier obstáculo que se me presente, viéndolos como oportunidades para aprender 
          y crecer. Mi objetivo es seguir desarrollando mis habilidades, tanto profesional como personalmente, mientras contribuyo a proyectos innovadores que 
          tengan un impacto significativo.</p>

          <h2>Redes Sociales</h2>
          <ul>
            <li><a href="https://github.com/juanfranfdezGit" target="_blank"><img src="/assets/github.svg"></img></a></li>
            <li><a href="https://www.linkedin.com/in/juan-francisco-romero-fernandez-928526225/" target="_blank"><img src="/assets/linkedin.png"></img></a></li>
          </ul>
        </div>

        <div className={`works flex ${stepClass}`}>
          <h2>Proyectos Personales</h2>
          {worksList.map(work => (
            <div className="work flex">
              <div className="workInfo">
                <h2>{work.nombre}</h2>
                <p>{work.description}</p>
                <p>{work.description2}</p>
                <a href={work.link} target="_blank">Ir al proyecto</a>
              </div>
              <div className="workVideo">
                <ReactPlayer url={work.src} controls width='100%' height='100%'></ReactPlayer>
              </div>
            </div>
          ))}
        </div>

        {/* <div className={`practices flex ${stepClass}`}>
          <h2>Practicas</h2>
        </div> */}
      </div>
    </>
  );
}

export default App;
