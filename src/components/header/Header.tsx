import { useEffect, useState } from "react";
import "./header.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header className={`navbar flex ${scrolled ? "scrolled" : ""}`}>
        <h1>Juan Francisco Romero Fdez</h1>
        <nav>
          <ul className="flex navbarList">
            <li>
              <a href="#Hero">Hero</a>
            </li>
            <li>
              <a href="#About">Sobre Mi</a>
            </li>
            <li>
              <a href="#Projects">Proyectos</a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
