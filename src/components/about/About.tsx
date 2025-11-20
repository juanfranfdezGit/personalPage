import "./about.css";

export default function About() {
  return (
    <>
      <section id="About" className="flex about">
        <div className="aboutPhoto">
          <img src="/assets/photo.png" alt="personal photo 02" />
        </div>
        <div className="aboutInfo">
          <h2>Sobre Mi</h2>
          <p className="description">
            <span>Creatividad</span> y Lógica
          </p>
          <p>
            Veo el software como un lienzo en blanco donde las ideas toman forma
            a través del código. Crear aplicaciones es una forma de expresar mi
            creatividad, pero también un desafío lógico que me impulsa a mejorar
            cada día. Mi pasión es construir herramientas que funcionen, que
            aporten valor y que inspiren a otros.
          </p>
          <button>Ver Proyectos</button>
        </div>
      </section>
    </>
  );
}
