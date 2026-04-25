import VideoItem from "./VideoItem";

function VideoList({ videos, onDelete, onToggleFavorite }) {
  if (videos.length === 0) {
    return <p>動画がありません。</p>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
      }}
    >
      {videos.map((video) => (
        <VideoItem
          key={video.id}
          video={video}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default VideoList;
