import VideoItem from "./VideoItem";

function VideoList({ videos, onDelete }) {
  if (videos.length === 0) {
    return <p>まだ動画が登録されていません。</p>;
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
        <VideoItem key={video.id} video={video} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default VideoList;
