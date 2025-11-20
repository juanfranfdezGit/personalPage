import "./hero.css";

export default function Hero() {
  return (
    <>
      <section id="Hero" className="hero flex">
        <div className="heroInfo flex">
          <h2>Hola, soy Juanfran</h2>
          <span>Full Stack Developer</span>
          <p>
            Full Stack Developer: React, Angular y Node.js, creando experiencias
            web modernas.
          </p>

          <div className="socials flex">
            <button className="flex">
              Descargar CV <img src="/assets/download.png" alt="download" />
            </button>
            <img src="/assets/github.png" alt="github" />
            <img src="/assets/linkedin.webp" alt="linkedin" className="linkedin" />
          </div>
        </div>

        <div className="heroPhoto">
          <img className="principalPhoto" src="/assets/photo.png" alt="principal photo" />
          <img className="techIco angular" src="/assets/angular.png" alt="angular" />
          <img className="techIco react" src="/assets/react.png" alt="react" />
          <img className="techIco node" src="/assets/node.webp" alt="node" />
        </div>

        <img src="/assets/waves.png" alt="waves" className="backWaves" />
      </section>
    </>
  );
}
