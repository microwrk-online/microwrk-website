import React from "react";
import DownloadButton from "./DownloadButton";
// import "../index.css"; // Import the index.css where Tailwind CSS is set up

const ChapterList = ({ chapters, files }) => {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Chapters</h2>
      <ul className="space-y-4">
        {chapters.map((chapter, index) => (
          <li
            key={index}
            className="bg-white p-4 shadow rounded-md flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{chapter.title}</h3>
              <p className="text-gray-600">
                Start:{" "}
                {new Date(chapter.start_time * 1000)
                  .toISOString()
                  .substr(11, 8)}
                {chapter.end_time && (
                  <>
                    {" "}
                    - End:{" "}
                    {new Date(chapter.end_time * 1000)
                      .toISOString()
                      .substr(11, 8)}
                  </>
                )}
              </p>
            </div>
            <DownloadButton filename={files[index]} label="Download Chapter" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChapterList;
