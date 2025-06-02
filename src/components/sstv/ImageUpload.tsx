import { useState } from "react";

const ImageUpload = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:4000/api/transmit-image", {
      method: "POST",
      body: formData,
    });
    if (res.ok) alert("Image transmission started!");
  };

  return (
    <div className="p-4 border border-gray-600 rounded-md bg-[#1a1a1a] w-full">
      <h3 className="mb-2 font-semibold text-center">Image Transmission</h3>
      <input
        type="file"
        accept="image/*"
        className="mb-2"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <div className="flex items-center justify-center">
        <button
          className="inline-block px-8 py-3 bg-[#00ffcc] text-black font-semibold rounded-lg hover:scale-105 transition"
          onClick={handleSubmit}
        >
          Transmit Image
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;
