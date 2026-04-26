import { useEffect, useState } from "react";
import VideoForm from "./components/VideoForm";
import VideoList from "./components/VideoList";
import { arrayMove } from "@dnd-kit/sortable";

function App() {
  const [videos, setVideos] = useState(() => {
    const savedVideos = localStorage.getItem("videos");

    try {
      return savedVideos ? JSON.parse(savedVideos) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("videos", JSON.stringify(videos));
  }, [videos]);

  function handleAdd(video) {
    setVideos([
      ...videos,
      {
        ...video,
        id: crypto.randomUUID(),
      },
    ]);
  }

  function handleDelete(id) {
    setVideos(videos.filter((video) => video.id !== id));
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setVideos((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      return arrayMove(items, oldIndex, newIndex);
    });
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px" }}>
      <h1>YouTube動画まとめアプリ</h1>

      <VideoForm onAdd={handleAdd} />

      <VideoList
        videos={videos}
        onDelete={handleDelete}
        onDragEnd={handleDragEnd}
      />
    </div>
  );
}

export default App;
