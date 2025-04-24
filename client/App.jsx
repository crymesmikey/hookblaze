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
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1c] via-[#101828] to-[#0a0f1c] text-white font-sans">
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">

        {/* Hero */}
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight">Hookblaze</h1>
          <p className="text-lg text-gray-400">
            Generate viral hooks & download high-performing video intros
          </p>
        </header>

        {/* Hook Generator */}
        <section className="bg-[#151c2c] p-8 rounded-2xl shadow-md space-y-4">
          <h2 className="text-2xl font-semibold">✍️ Hook Script Generator</h2>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your content..."
            className="w-full h-28 p-4 rounded-md bg-[#0f1624] border border-gray-700 focus:outline-none text-white"
          />
          <button
            onClick={generateScript}
            className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold px-6 py-3 rounded-lg"
          >
            Generate Script
          </button>
          {script && (
            <div className="mt-6 bg-gray-900 border border-gray-700 p-4 rounded-md">
              <h3 className="text-lg font-bold mb-2">Generated Hook:</h3>
              <p className="text-gray-300 whitespace-pre-line">{script}</p>
            </div>
          )}
        </section>

        {/* Video Library */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">🎬 Hook Video Library</h2>
          <div className="grid gap-4">
            {videos.map((v, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-[#151c2c] p-4 rounded-lg border border-gray-700"
              >
                <span className="text-gray-200 truncate">{v.name}</span>
                <a
                  href={v.url}
                  className="bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded"
                  download
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
