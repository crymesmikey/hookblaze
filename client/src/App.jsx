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
    <div className="min-h-screen bg-black text-white font-sans">
      <section className="bg-black text-center py-24 px-6">
        <h1 className="text-5xl font-extrabold tracking-tight leading-tight mb-4">
          This is Hookblaze
        </h1>
        <p className="text-lg text-gray-400">
          Generate viral hooks and download high-performing video intros
        </p>
      </section>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-20">
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Hook Script Generator</h2>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your content..."
            className="w-full h-28 p-4 rounded-md bg-zinc-900 border border-gray-700 focus:outline-none text-white"
          />
          <button
            onClick={generateScript}
            className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold px-6 py-3 rounded-lg"
          >
            Generate Script
          </button>
          {script && (
            <div className="bg-zinc-800 p-4 rounded-lg border border-gray-700 mt-4">
              <h3 className="font-bold mb-2 text-lg">Generated Hook</h3>
              <p className="text-gray-300 whitespace-pre-line">{script}</p>
            </div>
          )}
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Hook Video Library</h2>
          <div className="grid gap-4">
            {videos.map((v, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-zinc-900 p-4 rounded-lg border border-gray-700"
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
      </main>
    </div>
  );
}