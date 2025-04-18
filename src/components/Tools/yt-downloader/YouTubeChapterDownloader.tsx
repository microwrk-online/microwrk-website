// import type React from "react";
// import { useState } from "react";
// import Navbar from "../../homepage/Navbar";
// import { Download, Loader2 } from "lucide-react";

// interface Chapter {
//   title: string;
//   start_time: number;
//   end_time?: number;
//   duration: string;
//   size: string;
//   mp4_download_url: string;
//   mp3_download_url: string;
// }

// const YouTubeChapterDownloader: React.FC = () => {
//   const [url, setUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [chapters, setChapters] = useState<Chapter[]>([]);

//   const fetchChapters = async (videoUrl: string) => {
//     setLoading(true);
//       const response = await fetch("http://15.235.186.120:8000/api/extract", {    //http://15.235.186.120:8000/api/extract //http://127.0.0.1:8000/api/extract
//     try {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ url: videoUrl }),
//       });

//       if (!response.ok) throw new Error("Failed to extract video");

//       const data = await response.json();
//       setChapters(data.chapters);
//     } catch (err) {
//       console.error("Error fetching chapters:", err);
//       alert("Could not extract video chapters.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (url.trim()) {
//       fetchChapters(url);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center p-4 md:p-8">
//         <div className="w-full max-w-md">
//           <h1 className="text-4xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
//             YouTube Chapter Downloader
//           </h1>
//           <p className="text-gray-400 text-center mb-8">
//             Extract and download chapter timestamps from any YouTube video.
//             Perfect for YouTube content creators, video editors, and podcasters.
//           </p>

//           <form onSubmit={handleSubmit} className="mb-6">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Paste YouTube URL here..."
//                 value={url}
//                 onChange={(e) => setUrl(e.target.value)}
//                 className="bg-[#1e1e1e] border-[#333] text-gray-200 px-4 py-2 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 shadow-lg w-full"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading || !url.trim()}
//               className="w-full mt-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white rounded-lg font-medium shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all duration-200 hover:shadow-[0_0_25px_rgba(16,185,129,0.6)]"
//             >
//               <div className="flex items-center justify-center">
//                 {loading ? (
//                   <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                 ) : (
//                   <Download className="h-5 w-5" />
//                 )}
//                 <span className="ml-2">
//                   {loading ? "Processing..." : "Download Chapters"}
//                 </span>
//               </div>
//             </button>
//           </form>

//           {chapters.length > 0 && (
//             <div className="bg-[#1e1e1e]/80 backdrop-blur-sm border border-[#333] rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.3)] max-w-md w-full md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
//               <div className="p-4 border-b border-[#333]">
//                 <h2 className="text-lg font-medium text-gray-200">Chapters</h2>
//               </div>

//               <div className="max-h-[300px] overflow-y-auto p-2 scrollbar-none">
//                 {chapters.map((chapter, index) => (
//                   <div
//                     key={index}
//                     className="p-3 hover:bg-[#252525] rounded-lg transition-colors duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
//                   >
//                     <div className="flex flex-col sm:flex-row sm:items-center gap-3">
//                       <div className="text-emerald-400 font-mono">
//                         {chapter.duration}
//                       </div>
//                       <div className="text-gray-300">{chapter.title}</div>
//                     </div>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() =>
//                           window.open(chapter.mp4_download_url, "_blank")
//                         }
//                         className="border border-[#333] text-gray-300 hover:bg-[#252525] hover:text-emerald-400 rounded-lg py-1 px-3 text-sm flex items-center"
//                       >
//                         <Download className="mr-1 h-4 w-4" />
//                         MP4
//                       </button>
//                       <button
//                         onClick={() =>
//                           window.open(chapter.mp3_download_url, "_blank")
//                         }
//                         className="border border-[#333] text-gray-300 hover:bg-[#252525] hover:text-cyan-400 rounded-lg py-1 px-3 text-sm flex items-center"
//                       >
//                         <Download className="mr-1 h-4 w-4" />
//                         MP3
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         <footer className="mt-8 text-gray-500 text-sm text-center">
//           A modern utility tool for YouTube content creators. Open source and free.
//         </footer>
//       </div>
//     </>
//   );
// };

// export default YouTubeChapterDownloader;
