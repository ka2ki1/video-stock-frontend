import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function VideoItem({ video, onDelete, onEdit, onToggleFavorite }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: video.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    background: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  };

  function getEmbedUrl(url) {
    if (!url) return "";

    try {
      const parsedUrl = new URL(url);

      if (
        parsedUrl.hostname === "www.youtube.com" ||
        parsedUrl.hostname === "youtube.com"
      ) {
        if (parsedUrl.pathname === "/watch") {
          const videoId = parsedUrl.searchParams.get("v");
          return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
        }

        if (parsedUrl.pathname.startsWith("/shorts/")) {
          const videoId = parsedUrl.pathname.split("/shorts/")[1];
          return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
        }

        if (parsedUrl.pathname.startsWith("/embed/")) {
          return `https://www.youtube.com${parsedUrl.pathname}`;
        }
      }

      if (parsedUrl.hostname === "youtu.be") {
        const videoId = parsedUrl.pathname.slice(1);
        return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
      }

      return "";
    } catch {
      return "";
    }
  }

  const embedUrl = getEmbedUrl(video.url);

  return (
    <div ref={setNodeRef} style={style}>
      <div
        {...attributes}
        {...listeners}
        style={{
          height: "180px",
          background: "#ddd",
          cursor: "grab",
        }}
      >
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={video.title || "YouTube video"}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              pointerEvents: "none",
            }}
            allowFullScreen
          />
        ) : (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px",
              textAlign: "center",
            }}
          >
            YouTube URLではありません
          </div>
        )}
      </div>

      <div style={{ padding: "12px", textAlign: "center" }}>
        <button
          onClick={() => onToggleFavorite(video.id)}
          style={{
            padding: "6px 10px",
            marginBottom: "8px",
            borderRadius: "6px",
            border: "1px solid #f5b301",
            background: video.favorite ? "#f5b301" : "#fff",
            color: video.favorite ? "#fff" : "#f5b301",
            cursor: "pointer",
          }}
        >
          {video.favorite ? "★" : "☆"}
        </button>

        <h3>{video.title}</h3>

        {video.tag && (
          <p
            style={{
              display: "inline-block",
              padding: "4px 8px",
              borderRadius: "999px",
              background: "#f1f1f1",
              fontSize: "12px",
            }}
          >
            {video.tag}
          </p>
        )}

        {video.memo && <p>{video.memo}</p>}

        <button
          onClick={() => onEdit(video)}
          style={{
            padding: "8px 14px",
            marginRight: "8px",
            borderRadius: "6px",
            border: "1px solid #1976d2",
            background: "#fff",
            color: "#1976d2",
            cursor: "pointer",
          }}
        >
          編集
        </button>

        <button
          onClick={() => onDelete(video.id)}
          style={{
            padding: "8px 14px",
            borderRadius: "6px",
            border: "1px solid red",
            background: "#fff",
            color: "red",
            cursor: "pointer",
          }}
        >
          削除
        </button>
      </div>
    </div>
  );
}

export default VideoItem;
