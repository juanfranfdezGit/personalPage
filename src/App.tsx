import { useState } from "react";
import Room from "./components/Room";

export type InteractionType =
  | null
  | "technologies"
  | "projects"
  | "about"
  | "contact";

function App() {
  const [activeInteraction, setActiveInteraction] =
    useState<InteractionType>(null);

  const [debug, setDebug] = useState(false);

  return (
    <div className="roomContainer flex">
      <Room onInteract={(type) => setActiveInteraction(type)} debug={debug} />

      {/* UI Overlay */}
      {activeInteraction && (
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#2c2c2c",
            padding: "20px 30px",
            borderRadius: 12,
            color: "white",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <h2>{activeInteraction}</h2>
          <button onClick={() => setActiveInteraction(null)}>Cerrar</button>
        </div>
      )}

      {/* Debug toggle */}
      <button
        onClick={() => setDebug((d) => !d)}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          padding: "8px 12px",
          zIndex: 20,
        }}
      >
        Debug: {debug ? "ON" : "OFF"}
      </button>
    </div>
  );
}

export default App;
