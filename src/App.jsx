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
  const [showOnlyFavorite, setShowOnlyFavorite] = useState(false);
  const [selectedTag, setSelectedTag] = useState("all");

  useEffect(() => {
    localStorage.setItem("videos", JSON.stringify(videos));
  }, [videos]);

  function handleAdd(video) {
    setVideos([
      ...videos,
      {
        ...video,
        id: crypto.randomUUID(),
        favorite: false,
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

  function handleToggleFavorite(id) {
    setVideos(
      videos.map((video) =>
        video.id === id
          ? { ...video, favorite: !video.favorite }
          : video
      )
    );
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

    const matchesKeyword =
      video.title.toLowerCase().includes(keyword) ||
      (video.memo || "").toLowerCase().includes(keyword);

    const matchesFavorite = showOnlyFavorite ? video.favorite : true;

    const matchesTag =
      selectedTag === "all" ? true : video.tag === selectedTag;

    return matchesKeyword && matchesFavorite && matchesTag;
  });

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px" }}>
      <h1 style={{ textAlign: "center" }}>YouTube動画まとめアプリ</h1>

      <VideoForm
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        editingVideo={editingVideo}
        onCancelEdit={() => setEditingVideo(null)}
      />

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        <input
          type="text"
          placeholder="タイトル・メモで検索"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        >
          <option value="all">すべて</option>
          <option value="勉強">勉強</option>
          <option value="音楽">音楽</option>
          <option value="料理">料理</option>
          <option value="筋トレ">筋トレ</option>
          <option value="その他">その他</option>
        </select>

        <button
          onClick={() => setShowOnlyFavorite(!showOnlyFavorite)}
          style={{
            padding: "0 18px",
            borderRadius: "8px",
            border: "1px solid #f5b301",
            background: showOnlyFavorite ? "#f5b301" : "#fff",
            color: showOnlyFavorite ? "#fff" : "#f5b301",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {showOnlyFavorite ? "★ お気に入り表示中" : "☆ お気に入りのみ"}
        </button>
      </div>

      <VideoList
        videos={filteredVideos}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onToggleFavorite={handleToggleFavorite}
        onDragEnd={handleDragEnd}
      />
    </div>
  );
}

export default App;
