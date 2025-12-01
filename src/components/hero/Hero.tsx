import "./hero.css";
import CV from "/assets/cv.pdf";

export default function Hero() {
  const goTo = () => {
    window.open("https://www.linkedin.com/in/juan-francisco-romero-fernandez-928526225/", "_blank");
  }

  const goToGit = () => {
    window.open("https://github.com/juanfranfdezGit", "_blank");
  }

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
            <button className="flex" onClick={() => window.open(CV, "_blank")}>
              Descargar CV <img src="/assets/download.png" alt="download" />
            </button>
            <img src="/assets/github.png" alt="github" onClick={goToGit} />
            <img src="/assets/linkedin.webp" alt="linkedin" className="linkedin" onClick={goTo} />
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
