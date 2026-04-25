import { useEffect, useState } from "react";
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

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("new");

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

  function handleDelete(id) {
    setVideos(videos.filter((video) => video.id !== id));
  }

  function toggleFavorite(id) {
    setVideos(
      videos.map((video) =>
        video.id === id
          ? { ...video, favorite: !video.favorite }
          : video
      )
    );
  }

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(search.toLowerCase())
  );

  const sortedVideos = [...filteredVideos].sort((a, b) => {
    if (sortOrder === "favorite") {
      return (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0);
    }

    if (sortOrder === "old") {
      return String(a.id).localeCompare(String(b.id));
    }

    return String(b.id).localeCompare(String(a.id));
  });

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px" }}>
      <h1>YouTube動画まとめアプリ</h1>

      <VideoForm onAdd={handleAdd} />

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        <input
          type="text"
          placeholder="タイトルで検索"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        >
          <option value="new">新しい順</option>
          <option value="old">古い順</option>
          <option value="favorite">お気に入り優先</option>
        </select>
      </div>

      <VideoList
        videos={sortedVideos}
        onDelete={handleDelete}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}

export default App;
