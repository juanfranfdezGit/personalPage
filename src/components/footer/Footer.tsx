import "./footer.css";
import CV from "/assets/cv.pdf";

export default function Footer() {
  const goTo = () => {
    window.open(
      "https://www.linkedin.com/in/juan-francisco-romero-fernandez-928526225/",
      "_blank"
    );
  };

  const goToGit = () => {
    window.open("https://github.com/juanfranfdezGit", "_blank");
  };

  return (
    <>
      <footer className="flex">
        <p>© 2025 Juan Francisco Romero Fdez</p>
        <div className="socials flex">
          <button className="flex" onClick={() => window.open(CV, "_blank")}>
            Descargar CV <img src="/assets/download.png" alt="download" />
          </button>
          <img src="/assets/github.png" alt="github" onClick={goToGit} />
          <img
            src="/assets/linkedin.webp"
            alt="linkedin"
            className="linkedin"
            onClick={goTo}
          />
        </div>
      </footer>
    </>
  );
}
