interface OpenProjectProps {
  url: string;
  onClose: () => void;
}

export default function OpenProject({ url, onClose }: OpenProjectProps) {
  return (
    <div className="browser">
      <div className="browser-bar">
        <input value={url} readOnly />

        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
      </div>

      <iframe
        src={url}
        title="Project"
        width="100%"
        height="100%"
        style={{ border: "none" }}
      />
    </div>
  );
}
