import VideoItem from "./VideoItem";

function VideoList({ videos, onDelete }) {
  return (
    <div>
      <h2>動画一覧</h2>

      {videos.length === 0 ? (
        <p>まだありません</p>
      ) : (
        <ul>
          {videos.map((video) => (
            <VideoItem
              key={video.id}
              video={video}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default VideoList;
