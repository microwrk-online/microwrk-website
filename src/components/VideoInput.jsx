import React, { useState } from "react";
import axios from "axios";
import "./index.css"; // Import the index.css where Tailwind CSS is set up

const VideoInput = ({ onChaptersFetched }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetchChapters = async () => {
    if (!url) {
      setError("Please enter a YouTube URL.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/api/extract", {
        url,
      });
      onChaptersFetched(response.data);
    } catch (err) {
      setError("Failed to fetch chapters.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-3">YouTube Chapter Downloader</h2>
      <input
        type="text"
        className="w-full p-2 border rounded-md"
        placeholder="Enter YouTube Video URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        onClick={handleFetchChapters}
        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Loading..." : "Fetch Chapters"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default VideoInput;
