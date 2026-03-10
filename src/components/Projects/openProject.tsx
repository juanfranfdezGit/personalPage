interface OpenProjectProps {
  url: string;
  device?: "desktop" | "mobile";
  onClose: () => void;
}

export default function OpenProject({
  url,
  onClose,
  device,
}: OpenProjectProps) {
  const isMobile = device === "mobile";

  return (
    <div className="browser">
      <div className="browser-bar">
        <input value={url} readOnly />

        <img src="/assets/icos/user.png" alt="user" />
        <img src="/assets/icos/download.png" alt="user" />

        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className={isMobile ? "mobile-mockup" : "desktop-view"}>
        <iframe
          src={url}
          title="Project"
          style={{
            border: "none",
            width: "100%",
            height: "100%",
            ...(isMobile ? { borderRadius: "20px" } : {}),
          }}
        />
      </div>
    </div>
  );
}
