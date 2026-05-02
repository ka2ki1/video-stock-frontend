import { useEffect, useState } from "react";

function VideoForm({ onAdd, onUpdate, editingVideo, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [memo, setMemo] = useState("");
  const [tag, setTag] = useState("勉強");

  useEffect(() => {
    if (editingVideo) {
      setTitle(editingVideo.title);
      setUrl(editingVideo.url);
      setMemo(editingVideo.memo || "");
      setTag(editingVideo.tag || "勉強");
    }
  }, [editingVideo]);

  function resetForm() {
    setTitle("");
    setUrl("");
    setMemo("");
    setTag("勉強");
  }

  function handleSubmit() {
    if (title.trim() === "") return;

    if (editingVideo) {
      onUpdate({
        ...editingVideo,
        title,
        url,
        memo,
        tag,
      });
    } else {
      onAdd({
        title,
        url,
        memo,
        tag,
      });
    }

    resetForm();
  }

  function handleCancel() {
    onCancelEdit();
    resetForm();
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
        gridTemplateColumns: editingVideo
          ? "1fr 1fr 1fr 120px auto auto"
          : "1fr 1fr 1fr 120px auto",
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

      <select
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        style={inputStyle}
      >
        <option value="勉強">勉強</option>
        <option value="音楽">音楽</option>
        <option value="料理">料理</option>
        <option value="筋トレ">筋トレ</option>
        <option value="その他">その他</option>
      </select>

      <button
        onClick={handleSubmit}
        style={{
          padding: "0 24px",
          borderRadius: "8px",
          border: "none",
          background: editingVideo ? "#1976d2" : "#000",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        {editingVideo ? "更新" : "登録"}
      </button>

      {editingVideo && (
        <button
          onClick={handleCancel}
          style={{
            padding: "0 18px",
            borderRadius: "8px",
            border: "1px solid #999",
            background: "#fff",
            color: "#333",
            cursor: "pointer",
          }}
        >
          取消
        </button>
      )}
    </div>
  );
}

export default VideoForm;
