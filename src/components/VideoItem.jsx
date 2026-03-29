function VideoItem({ video, onDelete }) {
  function getEmbedUrl(url) {
    try {
      const u = new URL(url);

      if (u.hostname === "youtu.be") {
        return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
      }

      if (u.pathname === "/watch") {
        return `https://www.youtube.com/embed/${u.searchParams.get("v")}`;
      }

      if (u.pathname.startsWith("/shorts/")) {
        return `https://www.youtube.com/embed/${u.pathname.split("/shorts/")[1]}`;
      }

      return "";
    } catch {
      return "";
    }
  }

  const embedUrl = getEmbedUrl(video.url);

  return (
    <li style={{ marginBottom: "20px" }}>
      <h3>{video.title}</h3>

      {embedUrl && (
        <iframe
          width="500"
          height="300"
          src={embedUrl}
          title="video"
          allowFullScreen
        ></iframe>
      )}

      <p>{video.memo}</p>

      <button
        onClick={() => onDelete(video.id)}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "6px",
          border: "none",
          backgroundColor: "#e53935",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        削除
      </button>
    </li>
  );
}

export default VideoItem;
