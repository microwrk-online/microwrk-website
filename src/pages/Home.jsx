import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { Helmet } from "react-helmet"; // Import react-helmet for SEO
import "../index.css";
import { Analytics } from "@vercel/analytics/react";
import debounce from "lodash.debounce"; // To debounce API calls

// Lazy loading components
const GoogleAd = React.lazy(() => import("../components/GoogleAd"));

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

  // Debounced function to handle input change without triggering API calls too often
  const handleFetchChapters = debounce(async () => {
    if (!url) {
      setError("Please enter a YouTube URL.");
      return;
    }

    setLoading(true);
    setError("");
    setLoadingProgress(0);
    setLoadingText("Preparing conversion...");

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
  }, 500); // Delay 500ms after user stops typing

  const downloadThumbnail = () => {
    const link = document.createElement("a");
    link.href = videoThumbnail;
    link.download = "thumbnail.jpg";
    link.click();
  };

  // Stream progress updates (eventsource for backend communication)
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

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <Analytics />

      {/* SEO Meta Tags */}
      <Helmet>
        <title>{videoTitle ? `${videoTitle} - YouTube Chapter Downloader` : "YouTube Chapter Downloader"}</title>
        <meta name="description" content={videoTitle ? `Download chapters for the video "${videoTitle}"` : "Download YouTube chapters for free"} />
        <meta property="og:title" content={videoTitle || "YouTube Chapter Downloader"} />
        <meta property="og:description" content={videoTitle ? `Download chapters for the video "${videoTitle}"` : "Download YouTube chapters for free"} />
        <meta property="og:image" content={videoThumbnail || "/default-thumbnail.jpg"} />
        <meta property="og:url" content={window.location.href} />
        <meta name="keywords" content="YouTube chapter downloader, download YouTube chapters, YouTube thumbnail downloader, YT downloader, download MP4, download MP3" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <h1 className="text-4xl font-mono mb-8 text-center text-blue-600">
        YouTube Chapter Downloader
        <Suspense fallback={<div>Loading Google Ad...</div>}>
          <GoogleAd />
        </Suspense>
      </h1>
      {/* Input Box First, Followed by Content */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
        <div className="flex flex-col gap-4 mb-4">
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="Enter YouTube Video URL"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              handleFetchChapters();
            }}
          />
          <button
            onClick={handleFetchChapters}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
            disabled={loading}
          >
            {loading ? "Loading..." : "Fetch Chapters"}
          </button>
        </div>

        {/* Display Loading Bar */}
        {loading && <LoadingBar progress={loadingProgress} />}

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Display Video Title and Thumbnail */}
        {videoTitle && (
          <div className="mb-4 text-center">
            <h2 className="text-xl font-semibold text-gray-900">{videoTitle}</h2>
            {videoThumbnail && (
              <div>
                <img
                  src={videoThumbnail}
                  alt={videoTitle ? `Thumbnail of ${videoTitle}` : 'Video Thumbnail'}
                  className="mt-2 max-w-full h-auto rounded-md shadow-md"
                  loading="lazy" // Lazy loading for better performance
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
        </div>
      {/* Display Chapters */}
      {chapters.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Chapters:</h2>
            <ul className="space-y-4">
              {chapters.map((chapter, index) => (
                <li
                  key={index}
                  className="flex flex-col sm:flex-row justify-between items-center p-3 border rounded-md bg-gray-50"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="text-lg font-bold">{chapter.title}</span>
                    <span className="text-sm text-gray-600 sm:ml-4">
                      {chapter.duration} | {chapter.size}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-2 sm:mt-0">
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

      {/* Added SEO Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-28 mb-16 text-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="order-2 sm:order-1">
            <h2 className="text-3xl font-semibold mb-6">Welcome to the YouTube Chapter Downloader</h2>
            <p className="text-lg mb-6">
              Our YouTube Chapter Downloader tool helps you easily download chapters, MP4s, and MP3s from any YouTube video. Whether you're looking to extract individual sections or just download YouTube video chapters for easier access, we've got you covered. Our easy-to-use tool is completely free, and we ensure fast and reliable downloads for your convenience.
            </p>
            <h3 className="text-2xl font-semibold mb-4">How to Use Our YouTube Chapter Downloader</h3>
            <p className="mb-6">
              Simply paste the URL of the YouTube video you want to download chapters from. Our tool will automatically fetch the chapters and provide you with the option to download them in MP4 or MP3 formats. We also offer the ability to download the video thumbnail with a single click. This makes it the perfect tool for anyone creating content or wanting to get a quick summary of a YouTube video.
            </p>
          </div>
          <div className="order-1 sm:order-2">
            <img src="https://cdn.pixabay.com/photo/2018/01/30/00/27/3d-modeling-3117626_1280.jpg" alt="YouTube Chapter Downloader" className="w-full h-full rounded-md shadow-md"/>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Why Choose Our Tool?</h3>
            <p className="mb-6">
              With our YouTube Chapter Downloader, you can save time by downloading only the sections you need from a video. Whether you're working on content creation, research, or just organizing your favorite videos, our tool is designed for speed and convenience. Plus, you can download the video thumbnail to make your content stand out.
            </p>
            <p className="mb-6">
              We offer a fast and easy-to-use solution that works across all devices. Simply enter the URL, click on the download button, and enjoy the content without any hassle. Say goodbye to long videos and start downloading YouTube chapters and thumbnails today!
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Key Features:</h3>
            <ul className="list-disc pl-6 mb-6">
              <li>Download individual YouTube chapters</li>
              <li>Extract and download YouTube thumbnails</li>
              <li>Supports MP4 and MP3 formats</li>
              <li>Fast and reliable processing</li>
              <li>Completely free to use</li>
            </ul>
            <p className="text-lg">
              Whether you're a content creator, a researcher, or simply someone who loves YouTube, our YouTube Chapter Downloader is the perfect tool for you. Start using it today and experience a better way to download YouTube chapters and thumbnails.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
