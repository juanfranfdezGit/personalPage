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
    src: '/assets/work01.mp4', 
    nombre: 'Virtual Life', 
    description: 'Tienda de videojuegos online donde podemos crear nuestro usuario donde guardar nuestros videojuegos favoritos para futuras compras, las compras son simuladas ya que se trata solamente de un proyecto para la escuela.',
    description2: 'El proyecto esta construido con React para la parte visual, Node para el back y SQL para la base de datos.',
  },

  {
    id:2, 
    src: '/assets/work02.mp4', 
    nombre: 'Blog Videojuegos', 
    description: 'Blog de videojuegos desarrollado solo con HTML y CSS con un resultado muy atractivo',
    description2: 'Esta página es una practica de maquetación y estilos con un gran resultado.',
  },

  {
    id:3, 
    src: '/assets/work03.mp4', 
    nombre: 'New World Travels', 
    description: 'Mi primer proyecto escolar. Se trata de una agencia de viajes donde puedes escoger un viaje y elegir el día que lo quieres realizar en el calendario',
    description2: 'La aplicación está desarrollada en HTML, CSS y Javascript. Es un proyecto simple y con errores, pero al ser el primero al que tengo mucho cariño',
  },

  {
    id:4,
    src: '/assets/work04.mp4', 
    nombre: 'Smash Burguers', 
    description: 'Website de Smash burguers construido unicamente con HTML y CSS.',
    description2: 'Esta web simple es una práctica de maquetación de las muchas que he realizado.'
  },

  {
    id: 5,
    src: '/assets/work05.mp4', 
    nombre: 'Apple Webstore',
    description: 'Clon de la web de apple maquetado con HTML y CSS.',
    description2: 'Para no detener nunca de escribir código y seguir practicando decidí clonar la web de apple.'
  }

]

function App() {

  const [stepClass, setStepClass] = useState("");
  const [worksClass, setWorksClass] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStepClass("step06b");
    }, 13000);

    return () => clearTimeout(timer);
  }, []);

  function works() {
    setWorksClass("step07")
  }

  const moveLeft = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? worksList.length - 1 : prevIndex - 1));
  };

  const moveRight = () => {
    setCurrentIndex((prevIndex) => (prevIndex === worksList.length - 1 ? 0 : prevIndex + 1));
  };

  const goToIndex = (index) => {
    setCurrentIndex(index);
  };

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

        <div class="arrow">
          <img src="/assets/arrow.png" onClick={works} alt="arrow" />
        </div>

        <div class="description flex step05">
          <p>Desarrollador Full Stack especializado en la creación de aplicaciones web dinámicas y responsivas. Mi tecnología favorita es React, 
            pero también tengo experiencia con Angular y Vue, lo que me permite adaptarme a las diferentes necesidades de los proyectos y ofrecer 
            experiencias de usuario de alta calidad a través de diversos marcos de trabajo.</p>
            <br/>

          <p>Me encanta afrontar desafíos y siempre estoy dispuesto a abordar cualquier obstáculo que se me presente, viéndolos como oportunidades para aprender 
            y crecer. Mi objetivo es seguir desarrollando mis habilidades, tanto profesional como personalmente, mientras contribuyo a proyectos innovadores que 
            tengan un impacto significativo.</p>
        </div>

        <div class={`works flex ${worksClass}`}>

          <h2>Proyectos Personales</h2>
          
          <div className="carrousel flex">

            <img src='/assets/left.png' alt="left Arrow" onClick={moveLeft} />

            <div className="work">
              
              <div class="flex">
                <div className="video">
                  <ReactPlayer url={worksList[currentIndex].src} playing muted loop width="100%" height="100%" />
                </div>
                
                <div className="worksDatas">
                  <h3>{worksList[currentIndex].nombre}</h3>
                  <p>{worksList[currentIndex].description}</p>
                  <p>{worksList[currentIndex].description2}</p>
                  <p>{worksList[currentIndex].description3}</p>
                  <p>{worksList[currentIndex].description4}</p>
                </div>
              </div>
              
              <div className="dotsContainer">
                {worksList.map((_, index) => (
                  <span key={index}
                  onClick={() => goToIndex(index)}
                  className={`dot ${currentIndex === index ? 'active' : ''}`}></span>
                ))}
              </div>

            </div>

            <img src='/assets/right.png' alt="right Arrow" onClick={moveRight} />

          </div>

        </div>

      </div>
    </>
  );
}

export default App;
