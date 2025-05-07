import { useState, useEffect } from "react";
import ReactPlayer from "react-player";

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
    {id: 12,  src: '/assets/astro.png', nombre: 'astro'},
]

const proyectos = [
    {
        id: 1,
        nombre: "Eventazzo",
        descripcion: `Este proyecto de marketing web en desarrollo esta siendo diseñado y desarrollado en colaboración directa con el cliente, utilizando React para crear una plataforma moderna y funcional. La web está pensada para ser escalable, con planes de implementar un sistema de reservas con calendario y un dashboard para la gestión interna del hotel en el futuro.`,
        videoUrl: "/assets/eventazzo.mp4"
    },
    {
        id: 2,
        nombre: "Hotel Miranda",
        descripcion: `Proyecto web para Hotel, desarrollado durante el training en Oxygen Academy, aplicando una metodología de trabajo por sprints. Se trabajó a partir de un diseño en Figma y una documentación técnica detallada, simulando un entorno profesional de desarrollo. Este ejercicio de maquetación se realizó utilizando HTML y Sass, aplicando la metodología BEM para una estructura de código clara, escalable y mantenible.`,
        videoUrl: "/assets/miranda.mp4"
    },
    {
        id: 3,
        nombre: "Virtual Life",
        descripcion: `Este proyecto es una tienda online de videojuegos desarrollada con React, Node.js y SQL, que incluye un sistema completo de gestión de usuarios mediante JWT para autenticación segura. La plataforma permite a los usuarios registrarse, iniciar sesión y realizar compras, y está preparada para escalar con funcionalidades como panel de administración, control de stock y análisis de ventas.`,
        videoUrl: "/assets/virtual.mp4"
    },
    {
        id: 4,
        nombre: "Pokemon Duels!",
        descripcion: `Esta aplicación de Pokémon permite a los usuarios abrir sobres de cartas generadas a partir de una API de Pokémon en formato JSON, simulando la experiencia de una tienda de cartas coleccionables. Desarrollada con React, incluye un sistema local de gestión de usuarios utilizando una base de datos interna en JSON, lo que permite a cada usuario guardar y cargar su colección personal de cartas abiertas desde los sobres, manteniendo su progreso de forma persistente en el navegador.`,
        videoUrl: "/assets/pokeapp.mp4"
    },
    {
        id: 5,
        nombre: "Pixel Flow",
        descripcion: `Esta aplicación, inspirada en Pinterest, está desarrollada con React y consume imágenes desde la API de Unsplash, permitiendo a los usuarios explorar y buscar fotografías de alta calidad. Utiliza Redux para manejar un sistema de CRUD local de imágenes favoritas, lo que permite guardar, eliminar y gestionar colecciones personalizadas de forma fluida, todo almacenado en el estado local del navegador sin necesidad de backend.`,
        videoUrl: "/assets/pixel.mp4"
    },
    {
        id: 6,
        nombre: "New World Travels",
        descripcion: `Mi primera aplicación web fue desarrollada únicamente con HTML, CSS y JavaScript, e incluye un efecto parallax para dar dinamismo visual a la interfaz. Simula un sistema de reservas de viajes, donde los destinos disponibles se generan dinámicamente con JavaScript, permitiendo al usuario interactuar con la oferta y realizar una reserva ficticia en un entorno visual atractivo.`,
        videoUrl: "/assets/newworld.mp4"
    },
];

function Home() {

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
          <p>Desarrollador Full Stack enfocado en crear experiencias web modernas, rápidas y escalables.
          Especializado en React, con experiencia complementaria en Angular y Astro. En el backend, trabajo con Node.js, SQL y MongoDB, 
          lo que me permite desarrollar productos completos, desde la idea hasta el despliegue.
          <br/><br/>
          Me adapto rápidamente a nuevas tecnologías y disfruto construir soluciones que no solo funcionen, sino que sorprendan 
          por su rendimiento y usabilidad.</p>

          <h2>Redes Sociales</h2>
          <ul>
            <li><a href="https://github.com/juanfranfdezGit" target="_blank"><img src="/assets/github.svg"></img></a></li>
            <li><a href="https://www.linkedin.com/in/juan-francisco-romero-fernandez-928526225/" target="_blank"><img src="/assets/linkedin.png"></img></a></li>
          </ul>
        </div>

        <div className="projects flex">
          <h2>Descrubre mi Trabajo</h2>

          {proyectos.map((proyecto) => (
                <div className="project" key={proyecto.id}>
                <div className="projectInfo">
                    <h3>{proyecto.nombre}</h3>
                    <p>{proyecto.descripcion}</p>
                    <button onClick={() => window.location.href = `/proyecto/${proyecto.nombre}`}>
                    Ir al Proyecto
                    </button>
                </div>
                <div className="videoWrapper">
                    <ReactPlayer
                        url={proyecto.videoUrl}
                        playing
                        loop
                        muted
                        controls={false}
                        width="100%"
                        height="100%"
                        style={{ position: 'absolute', top: 0, left: 0 }}
                    />
                </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}

export default Home;
