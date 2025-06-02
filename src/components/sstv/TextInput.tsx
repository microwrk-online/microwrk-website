import { useState } from "react";

const TextInput = () => {
  const [text, setText] = useState("");

  const handleTransmit = async () => {
    const res = await fetch("http://localhost:4000/api/transmit-text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (res.ok) alert("Text transmission started!");
  };

  return (
    <div className="p-4 border border-gray-600 rounded-md bg-[#1a1a1a] w-full">
      <h3 className="mb-2 font-semibold text-center">
        Custom Text Transmission
      </h3>
      <textarea
        placeholder="Type your message..."
        className="w-full p-2 rounded bg-dark text-white border border-gray-500"
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex items-center justify-center mt-2">
        <button
          className="inline-block px-8 py-3 bg-[#00ffcc] text-black font-semibold rounded-lg hover:scale-105 transition"
          onClick={handleTransmit}
        >
          Transmit Text
        </button>
      </div>
    </div>
  );
};

export default TextInput;
