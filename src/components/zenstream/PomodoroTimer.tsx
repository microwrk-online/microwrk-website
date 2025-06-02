import { useEffect, useState } from "react";

const WORK_DURATION = 25 * 60; // 25 min
const SHORT_BREAK = 5 * 60; // 5 min
const LONG_BREAK = 15 * 60; // 15 min
const TOTAL_SESSIONS = 5;

const PomodoroTimer = () => {
  const [secondsLeft, setSecondsLeft] = useState(WORK_DURATION);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionCount, setSessionCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Handle end of phase
          if (!isBreak) {
            // Just finished focus -> start break
            setIsBreak(true);
            return sessionCount === 3 ? LONG_BREAK : SHORT_BREAK;
          } else {
            // Finished break -> next session
            if (sessionCount < TOTAL_SESSIONS) {
              setSessionCount((prev) => prev + 1);
              setIsBreak(false);
              return WORK_DURATION;
            } else {
              clearInterval(interval);
              return 0;
            }
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isBreak, sessionCount]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl text-center w-64">
      <h1 className="text-2xl font-bold mb-2">
        Session {sessionCount}/{TOTAL_SESSIONS}
      </h1>
      <h2 className="text-lg mb-3">{isBreak ? "Break Time" : "Focus Mode"}</h2>
      <div className="text-5xl font-mono">{formatTime(secondsLeft)}</div>
    </div>
  );
};

export default PomodoroTimer;
