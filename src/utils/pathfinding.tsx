import { Interactable } from "../data/interactables";

interface Props {
  obj: Interactable | null;
  onClose: () => void;
}

export default function Panel({ obj, onClose }: Props) {
  if (!obj) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        animation: "fadeIn 0.15s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
          border: `2px solid ${obj.color}40`,
          borderRadius: 12,
          padding: "28px 36px",
          minWidth: 300,
          maxWidth: 420,
          boxShadow: `0 0 40px ${obj.color}30, 0 20px 60px rgba(0,0,0,0.8)`,
          fontFamily: "'Courier New', monospace",
          animation: "slideUp 0.2s ease",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <h2
            style={{
              color: "#e2e8f0",
              margin: 0,
              fontSize: 18,
              letterSpacing: 2,
            }}
          >
            {obj.icon} {obj.content.title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#94a3b8",
              cursor: "pointer",
              borderRadius: 6,
              width: 28,
              height: 28,
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {obj.content.items.map((item, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(167,139,250,0.12)",
                borderLeft: `3px solid ${obj.color}`,
                borderRadius: 8,
                padding: "10px 14px",
                color: "#c4b5fd",
                fontSize: 13,
                letterSpacing: 0.5,
              }}
            >
              {item}
            </div>
          ))}
        </div>

        <p
          style={{
            color: "#475569",
            fontSize: 11,
            marginTop: 16,
            marginBottom: 0,
            textAlign: "center",
            letterSpacing: 2,
          }}
        >
          CLICK FUERA PARA CERRAR • ESC
        </p>
      </div>
    </div>
  );
}
