import { useState } from "react";

function VideoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [memo, setMemo] = useState("");

  function handleSubmit() {
    if (title.trim() === "") return;

    onAdd({
      id: crypto.randomUUID(),
      title,
      url,
      memo,
    });

    setTitle("");
    setUrl("");
    setMemo("");
  }

  const inputStyle = {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    marginTop: "6px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    marginTop: "12px",
    padding: "12px 20px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#000",
    color: "#fff",
    cursor: "pointer",
  };

  return (
    <div style={{ maxWidth: "600px", marginBottom: "30px" }}>
      <div>
        <label>タイトル</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={{ marginTop: "12px" }}>
        <label>URL</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={{ marginTop: "12px" }}>
        <label>メモ</label>
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          style={{ ...inputStyle, height: "100px" }}
        />
      </div>

      <button onClick={handleSubmit} style={buttonStyle}>
        登録
      </button>
    </div>
  );
}

export default VideoForm;
