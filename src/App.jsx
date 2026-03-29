import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [memo, setMemo] = useState("");
  const [videos, setVideos] = useState([]);

  function extractYouTubeVideoId(url) {
    if (!url) return "";

    try {
      const parsedUrl = new URL(url);

      if (
        parsedUrl.hostname === "www.youtube.com" ||
        parsedUrl.hostname === "youtube.com"
      ) {
        if (parsedUrl.pathname === "/watch") {
          return parsedUrl.searchParams.get("v") || "";
        }

        if (parsedUrl.pathname.startsWith("/embed/")) {
          return parsedUrl.pathname.split("/embed/")[1];
        }

        if (parsedUrl.pathname.startsWith("/shorts/")) {
          return parsedUrl.pathname.split("/shorts/")[1];
        }
      }

      if (parsedUrl.hostname === "youtu.be") {
        return parsedUrl.pathname.slice(1);
      }

      return "";
    } catch {
      return "";
    }
  }

  function convertToEmbedUrl(url) {
    const videoId = extractYouTubeVideoId(url);

    if (!videoId) return "";

    return `https://www.youtube.com/embed/${videoId}`;
  }

  function handleAddVideo() {
    if (title.trim() === "") return;

    const newVideo = {
      id: crypto.randomUUID(),
      title,
      url,
      memo,
    };

    setVideos([...videos, newVideo]);

    setTitle("");
    setUrl("");
    setMemo("");
  }

  function handleDeleteVideo(id) {
    setVideos(videos.filter((video) => video.id !== id));
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
      <h1>動画まとめアプリ</h1>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "16px",
          borderRadius: "8px",
          marginBottom: "24px",
        }}
      >
        <div style={{ marginBottom: "12px" }}>
          <label>タイトル</label>
          <br />
          <input
            type="text"
            placeholder="動画タイトルを入力"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>URL</label>
          <br />
          <input
            type="text"
            placeholder="YouTubeのURLを入力"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>メモ</label>
          <br />
          <textarea
            placeholder="メモを入力"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            rows="4"
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>

        <button onClick={handleAddVideo} style={{ padding: "8px 16px" }}>
          登録
        </button>
      </div>

      <h2>動画一覧</h2>

      {videos.length === 0 ? (
        <p>まだ動画が登録されていません。</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {videos.map((video) => {
            const embedUrl = convertToEmbedUrl(video.url);

            return (
              <li
                key={video.id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "16px",
                }}
              >
                <h3>{video.title}</h3>

                {embedUrl ? (
                  <iframe
                    width="100%"
                    height="315"
                    src={embedUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ marginBottom: "12px", border: "none" }}
                  ></iframe>
                ) : (
                  <p style={{ color: "red" }}>
                    YouTubeのURLとして認識できませんでした。
                  </p>
                )}

                <p>
                  <strong>URL:</strong> {video.url}
                </p>

                <p>
                  <strong>メモ:</strong> {video.memo}
                </p>

                <button
                  onClick={() => handleDeleteVideo(video.id)}
                  style={{ marginTop: "8px", padding: "8px 16px" }}
                >
                  削除
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
