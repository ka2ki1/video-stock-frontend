import { useState } from "react";
import VideoForm from "./components/VideoForm";
import VideoList from "./components/VideoList";

function App() {
  const [videos, setVideos] = useState([]);

  function handleAdd(video) {
    setVideos([...videos, video]);
  }

  function handleDelete(id) {
    setVideos(videos.filter((v) => v.id !== id));
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",   // ← これが中央寄せ
        padding: "20px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>動画まとめアプリ</h1>

      <VideoForm onAdd={handleAdd} />

      <VideoList videos={videos} onDelete={handleDelete} />
    </div>
  );
}

export default App;
