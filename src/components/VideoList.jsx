import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import VideoItem from "./VideoItem";

function VideoList({ videos, onDelete, onEdit, onDragEnd }) {
  if (videos.length === 0) {
    return <p>動画がありません。</p>;
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext
        items={videos.map((video) => video.id)}
        strategy={rectSortingStrategy}
      >
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
              onEdit={onEdit}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default VideoList;
