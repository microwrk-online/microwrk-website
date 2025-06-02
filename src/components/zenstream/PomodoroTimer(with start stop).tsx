import { useEffect, useState } from "react";

const WORK_DURATION = 25 * 60;
const BREAK_DURATION = 5 * 60;

const PomodoroTimer = () => {
  const [secondsLeft, setSecondsLeft] = useState(WORK_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsBreak((prevBreak) => !prevBreak);
          return isBreak ? WORK_DURATION : BREAK_DURATION;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, isBreak]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl text-center">
      <h1 className="text-4xl font-bold mb-4">
        {isBreak ? "Break Time" : "Focus Mode"}
      </h1>
      <div className="text-6xl font-mono mb-6">{formatTime(secondsLeft)}</div>
      <button
        onClick={() => setIsRunning((r) => !r)}
        className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-full text-white font-semibold text-lg transition"
      >
        {isRunning ? "Pause" : "Start"}
      </button>
    </div>
  );
};

export default PomodoroTimer;
