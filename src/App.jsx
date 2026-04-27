import { useEffect, useState } from "react";

import VideoForm from "./components/VideoForm";
import VideoList from "./components/VideoList";

function App() {
  const [videos, setVideos] = useState(() => {
    const savedVideos = localStorage.getItem("videos");

  }

  const filteredVideos = videos.filter((video) => {
    const keyword = searchKeyword.toLowerCase();

    const matchesKeyword =
      video.title.toLowerCase().includes(keyword) ||
      (video.memo || "").toLowerCase().includes(keyword);

    const matchesFavorite = showOnlyFavorite ? video.favorite : true;

    return matchesKeyword && matchesFavorite;
  });

  return (

    </div>
  );
}

export default App;