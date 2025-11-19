import "./header.css";

export default function Header() {
  return (
    <>
        <header className="flex navbar">
            <h1>Juan Francisco Romero Fdez</h1>
            <nav>
                <ul className="flex navbarList">
                    <li><a href="#Home">Inicio</a></li>
                    <li><a href="#About">Sobre Mi</a></li>
                    <li><a href="#Projects">Proyectos</a></li>
                </ul>
            </nav>
        </header>
    </>
  );
}