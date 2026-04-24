import { useEffect, useState } from "react";
import VideoForm from "./components/VideoForm";
import VideoList from "./components/VideoList";

function App() {
  const [videos, setVideos] = useState(() => {
    const savedVideos = localStorage.getItem("videos");
    return savedVideos ? JSON.parse(savedVideos) : [];
  });

  useEffect(() => {
    localStorage.setItem("videos", JSON.stringify(videos));
  }, [videos]);

  function handleAdd(video) {
    setVideos([...videos, video]);
  }

  function handleDelete(id) {
    setVideos(videos.filter((video) => video.id !== id));
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "32px",
      }}
    >
      <h1>YouTube動画まとめアプリ</h1>

      <VideoForm onAdd={handleAdd} />

      <VideoList videos={videos} onDelete={handleDelete} />
    </div>
  );
}

export default App;
