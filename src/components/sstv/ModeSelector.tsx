interface Props {
  onSelect: (mode: "transmit" | "receive") => void;
}

const ModeSelector = ({ onSelect }: Props) => {
  return (
    <div className="space-x-4">
      <button
        onClick={() => onSelect("transmit")}
        className="inline-block px-8 py-3 bg-[#00ffcc] text-black font-semibold rounded-lg shadow-lg hover:scale-105 transition transform duration-300"
      >
        Transmit 📤
      </button>
      <button
        onClick={() => onSelect("receive")}
        className="inline-block px-8 py-3 bg-[#00ffcc] text-black font-semibold rounded-lg shadow-lg hover:scale-105 transition transform duration-300"
      >
        Receive 📥
      </button>
    </div>
  );
};

export default ModeSelector;
