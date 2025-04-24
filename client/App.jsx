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
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto py-16 px-6 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight text-center text-white">
          Hookblaze
        </h1>
        <p className="text-center text-gray-400 text-lg">
          Instantly generate viral hook scripts and download high-performing video intros.
        </p>

        {/* Hook Generator */}
        <div className="bg-[#161b22] p-6 rounded-2xl shadow-md space-y-4">
          <h2 className="text-2xl font-semibold text-white">✍️ Hook Script Generator</h2>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your content..."
            className="w-full h-28 p-3 rounded-lg bg-[#0d1117] border border-gray-700 text-white focus:outline-none"
          />
          <button
            onClick={generateScript}
            className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 px-6 rounded-lg"
          >
            Generate Script
          </button>
          {script && (
            <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
              <h3 className="text-lg font-bold mb-2">Generated Hook:</h3>
              <p className="text-gray-300">{script}</p>
            </div>
          )}
        </div>

        {/* Video Library */}
        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-semibold text-white">🎬 Hook Video Library</h2>
          <div className="grid gap-4">
            {videos.map((v, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-[#161b22] p-4 rounded-xl border border-gray-800"
              >
                <span className="text-gray-200">{v.name}</span>
                <a
                  href={v.url}
                  className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-md"
                  download
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
