import { useState } from "react";

function VideoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [memo, setMemo] = useState("");

  function handleSubmit() {
    if (title.trim() === "") return;

    onAdd({
      title,
      url,
      memo,
    });

    setTitle("");
    setUrl("");
    setMemo("");
  }

  const inputStyle = {
    padding: "14px",
    fontSize: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1.2fr auto",
        gap: "16px",
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "24px",
      }}
    >
      <input
        type="text"
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={inputStyle}
      />

      <input
        type="text"
        placeholder="YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={inputStyle}
      />

      <input
        type="text"
        placeholder="メモ"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        style={inputStyle}
      />

      <button
        onClick={handleSubmit}
        style={{
          padding: "0 24px",
          borderRadius: "8px",
          border: "none",
          background: "#000",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        登録
      </button>
    </div>
  );
}

export default VideoForm;
