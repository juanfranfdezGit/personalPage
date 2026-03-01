import { useState, useEffect } from "react";
import { useGameLoop } from "./hooks/useGameLoop";
import IsoRoom from "./components/IsoRoom";
import Panel from "./components/Panel";
import { INTERACTABLES, Interactable } from "./data/interactables";

const CANVAS_W = 760;
const CANVAS_H = 520;

const GLOBAL_STYLES = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #050510; }
  @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
  @keyframes slideUp { from { transform: translateY(16px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
  @keyframes pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.4 } }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-thumb { background: #4c1d95; border-radius: 3px; }
`;

export default function App() {
  const { playerPos, direction, moving, frame, nearObj, onCanvasClick } = useGameLoop();
  const [activeObj, setActiveObj] = useState<Interactable | null>(null);

  // ESC to close panel
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveObj(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <div
        style={{
          minHeight: "100vh",
          background: "#050510",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Courier New', monospace",
          padding: 24,
          gap: 16,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", animation: "fadeIn 0.6s ease" }}>
          <h1
            style={{
              color: "#e2e8f0",
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              textShadow: "0 0 24px rgba(167,139,250,0.8)",
              marginBottom: 4,
            }}
          >
            ◈ Mi Habitación ◈
          </h1>
          <p style={{ color: "#475569", fontSize: 11, letterSpacing: 3 }}>
            WASD / FLECHAS &nbsp;•&nbsp; CLICK &nbsp;•&nbsp; [E] INTERACTUAR
          </p>
        </div>

        {/* Canvas */}
        <div style={{ animation: "fadeIn 0.6s ease 0.15s both" }}>
          <IsoRoom
            playerPos={playerPos}
            direction={direction}
            moving={moving}
            frame={frame}
            nearObj={nearObj}
            onCanvasClick={onCanvasClick}
            onInteract={setActiveObj}
            width={CANVAS_W}
            height={CANVAS_H}
          />
        </div>

        {/* Legend */}
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
            animation: "fadeIn 0.6s ease 0.3s both",
          }}
        >
          {INTERACTABLES.map((obj) => (
            <button
              key={obj.id}
              onClick={() => setActiveObj(obj)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: "5px 14px",
                color: "#94a3b8",
                fontSize: 11,
                cursor: "pointer",
                letterSpacing: 1,
                transition: "all 0.2s ease",
                fontFamily: "'Courier New', monospace",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = obj.color;
                (e.currentTarget as HTMLButtonElement).style.color = "#e2e8f0";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLButtonElement).style.color = "#94a3b8";
              }}
            >
              {obj.icon} {obj.content.title}
            </button>
          ))}
        </div>

        {/* Info Panel */}
        <Panel obj={activeObj} onClose={() => setActiveObj(null)} />
      </div>
    </>
  );
}
