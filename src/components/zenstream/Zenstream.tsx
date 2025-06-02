import { useEffect, useRef } from "react";
import PomodoroTimer from "./PomodoroTimer.tsx";
import QuoteBox from "./QuoteBox.tsx";

function Zenstream() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleInteraction = () => {
      if (audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.warn("Autoplay failed:", err);
        });
      }
    };

    document.addEventListener("click", handleInteraction);
    document.addEventListener("keydown", handleInteraction);

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover"
        src="/zen-stream/bg.mp4"
      />
      <audio ref={audioRef} loop src="/zen-stream/chill-lofi-bg.mp3" />

      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="relative z-20 w-full h-full">
        <div className="absolute top-6 left-6 text-white">
          <PomodoroTimer />
        </div>
        <div className="absolute bottom-10 right-10 text-white">
          <QuoteBox />
        </div>
      </div>
    </div>
  );
}

export default Zenstream;
