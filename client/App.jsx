import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [videos, setVideos] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [script, setScript] = useState("");

  useEffect(() => {
    axios
      .get("https://hookblaze.onrender.com/videos")
      .then((res) => setVideos(res.data))
      .catch((err) => console.error("Failed to fetch videos:", err));
  }, []);

  const generateScript = async () => {
    try {
      const res = await axios.post(
        "https://hookblaze.onrender.com/generate-script",
        { prompt }
      );
      setScript(res.data.script);
    } catch (err) {
      console.error("Script generation failed:", err);
    }
  };

  return (
    <div className="p-8 font-sans space-y-12">
      <h1 className="text-3xl font-bold text-center">Hookblaze</h1>

      <section>
        <h2 className="text-xl font-semibold mb-4">🎬 Hook Video Library</h2>
        <div className="space-y-2">
          {videos.map((v, i) => (
            <div key={i} className="flex justify-between border p-2 rounded">
              <span>{v.name}</span>
              <a
                href={v.url}
                className="bg-blue-500 text-white px-3 py-1 rounded"
                download
              >
                Download
              </a>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">✍️ Hook Script Generator</h2>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your content..."
          className="w-full h-24 p-2 border rounded mb-4"
        />
        <button
          onClick={generateScript}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Generate Script
        </button>
        {script && (
          <div className="mt-4 p-4 bg-gray-100 rounded border">
            <h3 className="font-bold mb-2">Generated Hook:</h3>
            <p>{script}</p>
          </div>
        )}
      </section>
    </div>
  );
}
