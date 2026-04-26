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
    borderRadius: "8px",
    border: "1px solid #ccc",
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr auto",
        gap: "16px",
        marginBottom: "24px",
      }}
    >
      <input
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={inputStyle}
      />

      <input
        placeholder="YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={inputStyle}
      />

      <input
        placeholder="メモ"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        style={inputStyle}
      />

      <button onClick={handleSubmit}>登録</button>
    </div>
  );
}

export default VideoForm;
