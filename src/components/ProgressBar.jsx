import React, { useEffect, useState } from "react";
import "../index.css";

const ProgressBar = () => {
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8000/api/progress");

    eventSource.onmessage = (event) => {
      const log = event.data;

      // Update logs
      setLogs((prevLogs) => [...prevLogs, log]);

      // Simulate progress (increase by 25% per step)
      setProgress((prev) => Math.min(prev + 25, 100));
    };

    eventSource.onerror = () => {
      console.error("EventSource failed.");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="w-full p-6 bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-white text-2xl font-semibold mb-4">Processing...</h2>

      {/* Progress Bar */}
      <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
        <div
          className="bg-blue-500 h-4 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Display Real-Time Logs */}
      <div className="bg-gray-800 p-4 rounded-md h-60 overflow-y-auto">
        {logs.map((log, index) => (
          <div key={index} className="text-green-400 mb-2">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
