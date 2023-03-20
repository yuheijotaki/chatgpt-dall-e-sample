import React, { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [inputText, setInputText] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",
        {
          prompt: inputText,
          n: 1,
          size: "256x256",
          response_format: "url",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );

      setImageUrl(response.data.data[0].url);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="キーワードを入力してください"
      />
      <button onClick={generateImage} disabled={loading}>
        画像を生成
      </button>
      {loading && <p>生成中...</p>}
      {imageUrl && <img src={imageUrl} alt="生成された画像" />}
    </div>
  );
}

export default App;
