import React, { useState } from "react";

const ImageInput = () => {
  const [image, setImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSend = () => {
    if (!image) return;
    console.log("Sending image via SSTV:", image.name);
    // Encode and transmit logic here
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="mb-2"
      />
      <button
        onClick={handleSend}
        className="inline-block px-8 py-3 bg-[#00ffcc] text-black font-semibold rounded-lg shadow-lg hover:scale-105 transition transform duration-300"
      >
        Transmit Image
      </button>
    </div>
  );
};

export default ImageInput;
