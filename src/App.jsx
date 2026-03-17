import { useState } from "react";

function App() {

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [memo, setMemo] = useState("");

  return (
    <div>

      <h1>動画まとめアプリ</h1>

      <div>

        <input
          type="text"
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <textarea
          placeholder="メモ"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />

        <button>登録</button>

      </div>

      <hr />

      <h3>登録前の確認</h3>

      <p>タイトル: {title}</p>
      <p>URL: {url}</p>
      <p>メモ: {memo}</p>

    </div>
  );
}

export default App;
