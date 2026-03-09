import "../../styles/room/pc.css";
import "../../styles/index.css";
import { useState } from "react";
import OpenProject from "../Projects/openProject";

export default function DeskOverlay() {
  const projects = [
    {
      id: 1,
      name: "Pokemon Duels!",
      image: "/assets/icos/pok.png",
      url: "https://pokemon-duels.vercel.app/",
    },
    {
      id: 2,
      name: "Los Archivos de Hoid",
      image: "/assets/icos/hoid.png",
      url: "https://losarchivosdehoid.vercel.app/",
    },
    {
      id: 3,
      name: "Virtual Life",
      image: "/assets/icos/virtual.webp",
      url: "https://virtual-life.vercel.app/",
    },
    {
      id: 4,
      name: "24 Apex Lab",
      image: "/assets/icos/24apex.png",
      url: "https://24apexlab.vercel.app/",
    },
    {
      id: 5,
      name: "Warhammer Campaign",
      image: "/assets/icos/warh.jfif",
      url: "https://warhammer-campaign.vercel.app/",
    },
  ];

  const [activeUrl, setActiveUrl] = useState<string | null>(null);

  return (
    <>
      <p className="exitPC">
        <span>ESC</span> para cerrar
      </p>

      <section className="mockup">
        <img src="/assets/room/monitor.jpg" alt="monitor" />

        <img className="project" src="/assets/dev.png" alt="web development" />

        <div className="desk-projects">
          {projects.map((p) => (
            <div
              key={p.id}
              className="project-item"
              onClick={() => setActiveUrl(p.url)}
            >
              <img src={p.image} alt={p.name} />
              <p>{p.name}</p>
            </div>
          ))}
        </div>

        <div className="var">
          <img src="/assets/icos/windowVar.png" alt="window var" />
        </div>

        {activeUrl && (
          <OpenProject url={activeUrl} onClose={() => setActiveUrl(null)} />
        )}
      </section>
    </>
  );
}
