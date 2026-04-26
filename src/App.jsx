import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import VideoForm from "./components/VideoForm";
import VideoList from "./components/VideoList";

function App() {
  const [videos, setVideos] = useState(() => {
    const savedVideos = localStorage.getItem("videos");

    try {
      return savedVideos ? JSON.parse(savedVideos) : [];
    } catch {
      return [];
    }
  });

  const [editingVideo, setEditingVideo] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

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

  function handleUpdate(updatedVideo) {
    setVideos(
      videos.map((video) =>
        video.id === updatedVideo.id ? updatedVideo : video
      )
    );

    setEditingVideo(null);
  }

  function handleDelete(id) {
    setVideos(videos.filter((video) => video.id !== id));
  }

  function handleEdit(video) {
    setEditingVideo(video);
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

  const filteredVideos = videos.filter((video) => {
    const keyword = searchKeyword.toLowerCase();

    return (
      video.title.toLowerCase().includes(keyword) ||
      (video.memo || "").toLowerCase().includes(keyword)
    );
  });

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px" }}>
      <h1>YouTube動画まとめアプリ</h1>

      <VideoForm
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        editingVideo={editingVideo}
        onCancelEdit={() => setEditingVideo(null)}
      />

      <input
        type="text"
        placeholder="タイトル・メモで検索"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "24px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />

      <VideoList
        videos={filteredVideos}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onDragEnd={handleDragEnd}
      />
    </div>
  );
}

export default App;
