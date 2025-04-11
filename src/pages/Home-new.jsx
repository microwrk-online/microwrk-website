import React, { useState, Suspense } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import {
  YoutubeIcon,
  Download,
  FileVideo,
  Music,
  Image,
  Clock,
  HardDrive,
} from "lucide-react";

const GoogleAd = React.lazy(() => import("../components/GoogleAd"));
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const LoadingBar = ({ progress }) => {
  return <div></div>; // You can replace with actual animation
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
      setError("Failed to fetch chapters. Please check the URL and try again.");
      setLoadingText("Error occurred.");
    } finally {
      setLoading(false);
    }
  }, 500);

  const downloadThumbnail = () => {
    const link = document.createElement("a");
    link.href = videoThumbnail;
    link.download = "thumbnail.jpg";
    link.click();
  };

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <title>
        {videoTitle
          ? `${videoTitle} - YouTube Chapter Downloader`
          : "YouTube Chapter Downloader"}
      </title>
      <meta
        name="description"
        content={
          videoTitle
            ? `Download chapters for the video "${videoTitle}"`
            : "Download YouTube chapters for free"
        }
      />
      <meta
        property="og:title"
        content={videoTitle || "YouTube Chapter Downloader"}
      />
      <meta
        property="og:description"
        content={
          videoTitle
            ? `Download chapters for the video "${videoTitle}"`
            : "Download YouTube chapters for free"
        }
      />
      <meta
        property="og:image"
        content={videoThumbnail || "/default-thumbnail.jpg"}
      />
      <meta property="og:url" content={currentUrl} />
      <meta
        name="keywords"
        content="YouTube chapter downloader, download YouTube chapters, YouTube thumbnail downloader, YT downloader, download MP4, download MP3"
      />
      <meta name="robots" content="index, follow" />

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="flex items-center gap-3 mb-4">
            <YoutubeIcon className="h-10 w-10 text-red-500" />
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              YouTube Chapter Downloader
            </h1>
          </div>
          <p className="text-sm md:text-lg text-gray-300 max-w-2xl text-center">
            Paste any YouTube link (e.g.,{" "}
            <span className="underline text-blue-400">
              https://youtu.be/v7BNtpw53AA
            </span>{" "}
            ) to extract and download all video chapters, MP3s, and thumbnails!
          </p>
          <Suspense fallback={<div className="h-16" />}>
            <GoogleAd />
          </Suspense>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 mb-8">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <YoutubeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="input-field"
                  autoFocus
                  type="text"
                  className="w-full pl-10 p-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Paste YouTube Video URL here..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <button
                onClick={handleFetchChapters}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium px-6 py-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    <span>Fetch Chapters</span>
                  </>
                )}
              </button>
            </div>

            {loading && (
              <div className="mt-6">
                <p className="text-gray-300 mb-2">{loadingText}</p>
                <LoadingBar progress={loadingProgress} />
              </div>
            )}

            {error && (
              <div className="mt-4 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
                <p>{error}</p>
              </div>
            )}
          </div>

          {videoTitle && (
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">
                {videoTitle}
              </h2>
              {videoThumbnail && (
                <div className="flex flex-col items-center">
                  <div className="relative w-full rounded-lg overflow-hidden shadow-xl mb-4">
                    <img
                      src={videoThumbnail}
                      alt={`Thumbnail of ${videoTitle}`}
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <button
                    onClick={downloadThumbnail}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg"
                  >
                    <Image className="h-5 w-5" />
                    <span>Download Thumbnail</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {chapters.length > 0 && (
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 mb-8">
              <div className="flex items-center gap-2 mb-6">
                <Clock className="h-6 w-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">
                  Available Chapters
                </h2>
              </div>

              <div className="space-y-4">
                {chapters.map((chapter, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-blue-500 transition-all duration-200"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {chapter.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-300">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{chapter.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <HardDrive className="h-4 w-4" />
                            <span>{chapter.size}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <a
                          href={`${BACKEND_URL}${chapter.mp4_download_url}`}
                          download
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <FileVideo className="h-4 w-4" />
                          <span>MP4</span>
                        </a>
                        <a
                          href={`${BACKEND_URL}${chapter.mp3_download_url}`}
                          download
                          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <Music className="h-4 w-4" />
                          <span>MP3</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
