import { useState } from "react";
import ModeSelector from "./ModeSelector.tsx";
import TransmitPanel from "./TransmitPanel";
import ReceivePanel from "./ReceivePanel";
import Navbar from "../homepage/Navbar.tsx";

const Sstv = () => {
  const [mode, setMode] = useState<"transmit" | "receive" | null>(null);

  return (
    <>
    <Navbar />
      <div className="flex flex-col items-center justify-center p-6 bg-neutral-950 text-white min-h-screen">
        <h1 className="text-4xl text-center text-[#00ffcc] font-bold text-primary mb-4">
          📡 SSTV Communicator
        </h1>
        {!mode ? (
          <ModeSelector onSelect={setMode} />
        ) : mode === "transmit" ? (
          <TransmitPanel />
        ) : (
          <ReceivePanel />
        )}
      </div>
    </>
  );
};

export default Sstv;
