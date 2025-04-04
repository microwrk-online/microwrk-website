import React from "react";
import "./index.css"; // Import the index.css where Tailwind CSS is set up

const DownloadButton = ({ filename, label }) => {
  const handleDownload = () => {
    window.open(`http://localhost:8000${filename}`, "_blank");
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
    >
      {label}
    </button>
  );
};

export default DownloadButton;
