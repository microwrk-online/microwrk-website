import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import GoogleAd from "../components/GoogleAd";
import { Analytics } from "@vercel/analytics/react";

const BACKEND_URL = "https://youtube-chapter-download-backend.onrender.com";

const LoadingBar = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

const Home = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Starting...");
  const [error, setError] = useState("");
  const [chapters, setChapters] = useState([]);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoThumbnail, setVideoThumbnail] = useState("");

  const streamProgress = () => {
    const eventSource = new EventSource(`${BACKEND_URL}/api/progress`);

    eventSource.onmessage = (event) => {
      console.log("SSE Message:", event.data);
      setLoadingText(event.data);
    };

    eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
      eventSource.close();
    };
  };

  const handleFetchChapters = async () => {
    if (!url) {
      setError("Please enter a YouTube URL.");
      return;
    }

    setLoading(true);
    setError("");
    setLoadingProgress(0);
    setLoadingText("Preparing conversion...");
    streamProgress();

    try {
      const response = await axios.post(`${BACKEND_URL}/api/extract`, { url });

      setVideoTitle(response.data.title);
      setVideoThumbnail(response.data.thumbnail);
      setChapters(response.data.chapters);

      setLoadingProgress(100);
      setLoadingText("Conversion complete!");
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to fetch chapters.");
      setLoadingText("Error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const downloadThumbnail = () => {
    const link = document.createElement("a");
    link.href = videoThumbnail;
    link.download = "thumbnail.jpg";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <Analytics />
      <h1 className="text-4xl font-mono mb-8 text-center text-blue-600">
        YouTube Chapter Downloader
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="Enter YouTube Video URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            onClick={handleFetchChapters}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Loading..." : "Fetch Chapters"}
          </button>
        </div>
        <div>
          {" "}
          <GoogleAd />
        </div>
        {loading && <LoadingBar progress={loadingProgress} />}
        {error && <p className="text-red-500">{error}</p>}
        {videoTitle && (
          <div className="mb-4 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {videoTitle}
            </h2>
            {videoThumbnail && (
              <div>
                <img
                  src={videoThumbnail}
                  alt="Video Thumbnail"
                  className="mt-2 max-w-full h-auto rounded-md shadow-md"
                />
                <button
                  onClick={downloadThumbnail}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mt-2"
                >
                  Download Thumbnail
                </button>
              </div>
            )}
          </div>
        )}
        {chapters.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Chapters:
            </h2>
            <ul className="space-y-4">
              {chapters.map((chapter, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-3 border rounded-md bg-gray-50"
                >
                  <div className="flex flex-col">
                    <span className="text-lg font-bold">{chapter.title}</span>
                    <span className="text-sm text-gray-600">
                      {chapter.duration} | {chapter.size}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={`${BACKEND_URL}${chapter.mp4_download_url}`}
                      download
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                    >
                      MP4
                    </a>
                    <a
                      href={`${BACKEND_URL}${chapter.mp3_download_url}`}
                      download
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                    >
                      MP3
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
