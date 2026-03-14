import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");

  return (
    <div>
      <h1>動画まとめアプリ</h1>
      <p>React学習 Day1</p>

      <input
        type="text"
        placeholder="動画タイトルを入力"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <p>入力中のタイトル: {title}</p>
    </div>
  );
}

export default App;
