import { useState, useRef, useEffect } from "react";
import Navbar from "../../homepage/Navbar";
import Footer from "../../homepage/Footer";

type TextBox = {
  text: string;
  positionPercent: number;
  showBackground: boolean;
  backgroundColor: string;
  backgroundOpacity: number;
};

const memeTemplates = [
  {
    name: "Classic Drake",
    url: "https://i.imgflip.com/30b1gx.jpg",
    defaultCaption: "Hot or Not?",
    positions: [20],
  },
  {
    name: "Distracted Boyfriend",
    url: "https://i.imgflip.com/1ur9b0.jpg",
    defaultCaption: "Me coding / Bugs / Deadlines",
    positions: [80],
  },
  {
    name: "Two Buttons",
    url: "https://i.imgflip.com/1g8my4.jpg",
    defaultCaption: "Choosing between sleep and productivity",
    positions: [45],
  },
  {
    name: "Change My Mind",
    url: "https://i.imgflip.com/24y43o.jpg",
    defaultCaption: "Dark theme is superior",
    positions: [85],
  },
  {
    name: "Mocking Spongebob",
    url: "https://i.imgflip.com/1otk96.jpg",
    defaultCaption: "wHeN yOu ShOuT iN mEmEs",
    positions: [60],
  },
];

const hexToRgba = (hex: string, opacity: number) => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const defaultTextBox: TextBox = {
  text: "Caption here",
  positionPercent: 80,
  showBackground: false,
  backgroundColor: "#000000",
  backgroundOpacity: 0.5,
};

const InstagramPostGenerator = () => {
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [bgColor, setBgColor] = useState("#000000");
  const [textColor, setTextColor] = useState("#ffffff");
  const [fontSize, setFontSize] = useState(52);
  const [fontWeight, setFontWeight] = useState(600);
  const [textBoxes, setTextBoxes] = useState<TextBox[]>([defaultTextBox]);
  const [downloadURL, setDownloadURL] = useState("");

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBgImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 1080;
    const height = 1080;
    canvas.width = width;
    canvas.height = height;

    if (bgImage) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = bgImage;
      img.onload = () => {
        const imgWidth = img.width;
        const imgHeight = img.height;
        const scale = Math.max(width / imgWidth, height / imgHeight);
        const scaledWidth = imgWidth * scale;
        const scaledHeight = imgHeight * scale;
        const offsetX = (width - scaledWidth) / 2;
        const offsetY = (height - scaledHeight) / 2;
        ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);
        drawTextBoxes(ctx, width, height);
      };
    } else {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);
      drawTextBoxes(ctx, width, height);
    }
  };

  const drawTextBoxes = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    ctx.font = `${fontWeight} ${fontSize}px Inter`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    textBoxes.forEach(
      ({
        text,
        positionPercent,
        showBackground,
        backgroundColor,
        backgroundOpacity,
      }) => {
        const y = (positionPercent / 100) * height;

        if (showBackground) {
          ctx.fillStyle = hexToRgba(backgroundColor, backgroundOpacity);
          const textHeight = fontSize + 20;
          ctx.fillRect(0, y - textHeight / 2, width, textHeight);
        }

        ctx.fillStyle = textColor;
        ctx.fillText(text, width / 2, y);
      }
    );
  };

  useEffect(() => {
    drawCanvas();
  }, [bgImage, bgColor, textColor, fontSize, fontWeight, textBoxes]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      setDownloadURL(url);
    }
  };

  const handleAddTextBox = () => {
    setTextBoxes([...textBoxes, { ...defaultTextBox }]);
  };

  const handleRemoveTextBox = (index: number) => {
    if (textBoxes.length > 1) {
      setTextBoxes((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const updateBox = <K extends keyof TextBox>(
    index: number,
    key: K,
    value: TextBox[K]
  ) => {
    const updated = [...textBoxes];
    updated[index][key] = value;
    setTextBoxes(updated);
  };

  const handleTemplateSelect = (index: number) => {
    const template = memeTemplates[index];
    setBgImage(template.url);
    setTextBoxes(
      template.positions.map((p, _i) => ({
        ...defaultTextBox,
        // text: i === 0 ? template.defaultCaption : `Text ${i + 1}`,
        positionPercent: p,
      }))
    );
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#0b0b0c] text-white font-inter min-h-[86.5vh] px-4 pt-8">
        <div className="max-w-screen-xl mx-auto">
          <header className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#00ffcc] to-[#0077ff] drop-shadow-sm mb-3">
              Create Stunning Instagram & Meme Posts
            </h2>
            <p className="text-sm md:text-base text-gray-400">
              Customize memes with editable text, stylish overlays, and vivid
              backgrounds. Designed for creators who want speed and style.
            </p>
          </header>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Panel */}
            <div className="lg:w-1/2 space-y-6 overflow-y-auto max-h-[90vh] pr-2 scrollbar-thin scrollbar-thumb-[#00ffcc66]">
              <div className="bg-[#141414] border border-[#00ffcc33] p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-[#00ffcc] mb-4">
                  🖼️ Select Meme Template
                </h3>

                <div className="flex flex-wrap gap-8 items-center">
                  <select
                    onChange={(e) =>
                      handleTemplateSelect(parseInt(e.target.value))
                    }
                    className="w-48 bg-[#1a1a1a] text-white border border-[#00ffcc55] p-2 rounded outline-none focus:ring-2 focus:ring-[#00ffcc]"
                  >
                    <option value="">-- Choose template --</option>
                    {memeTemplates.map((template, index) => (
                      <option key={index} value={index}>
                        {template.name}
                      </option>
                    ))}
                  </select>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file:bg-[#00ffcc] file:text-black file:font-bold file:px-4 file:py-2 file:rounded file:cursor-pointer hover:file:bg-[#00e6b8] transition"
                  />
                </div>
              </div>

              {textBoxes.map((box, index) => (
                <div
                  key={index}
                  className="bg-[#161616] p-4 rounded-lg border border-[#00ffcc22] w-full shadow animate-fade-in relative"
                >
                  {textBoxes.length > 1 && (
                    <button
                      className="absolute top-2 right-2 text-red-500 hover:text-red-400"
                      onClick={() => handleRemoveTextBox(index)}
                    >
                      ❌
                    </button>
                  )}
                  <label className="block text-[#00ffcc] text-sm font-semibold mb-1">
                    Text #{index + 1}
                  </label>
                  <input
                    type="text"
                    value={box.text}
                    onChange={(e) => updateBox(index, "text", e.target.value)}
                    className="w-full p-2 bg-[#0f0f0f] text-white border border-[#00ffcc33] rounded mb-2"
                  />
                  <label className="text-[#00ffcc] text-sm">
                    Vertical Position
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={box.positionPercent}
                    onChange={(e) =>
                      updateBox(
                        index,
                        "positionPercent",
                        Number(e.target.value)
                      )
                    }
                    className="w-full mb-1"
                  />
                  <p className="text-xs text-gray-500">
                    {box.positionPercent}%
                  </p>
                  <div className="mt-2 space-y-2">
                    <label className="text-sm">
                      <input
                        type="checkbox"
                        checked={box.showBackground}
                        onChange={(e) =>
                          updateBox(index, "showBackground", e.target.checked)
                        }
                      />{" "}
                      Show background box
                    </label>
                    {box.showBackground && (
                      <div className="flex flex-wrap gap-4 items-center text-sm">
                        <label>BG Color:</label>
                        <input
                          type="color"
                          value={box.backgroundColor}
                          onChange={(e) =>
                            updateBox(index, "backgroundColor", e.target.value)
                          }
                        />
                        <label>Opacity:</label>
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step={0.05}
                          value={box.backgroundOpacity}
                          onChange={(e) =>
                            updateBox(
                              index,
                              "backgroundOpacity",
                              parseFloat(e.target.value)
                            )
                          }
                        />
                        <span>{Math.round(box.backgroundOpacity * 100)}%</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <button
                onClick={handleAddTextBox}
                className="px-4 py-2 mt-2 rounded border border-[#00ffcc] text-[#00ffcc] hover:bg-[#00ffcc22] transition"
              >
                ➕ Add Text Box
              </button>

              <div className="flex flex-wrap gap-4 mt-4">
                <div>
                  <label className="text-[#00ffcc]">Font Size:</label>
                  <input
                    type="number"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    min={20}
                    max={100}
                    className="ml-2 p-1 rounded text-black"
                  />
                </div>
                <div>
                  <label className="text-[#00ffcc]">Font Weight:</label>
                  <input
                    type="number"
                    value={fontWeight}
                    onChange={(e) => setFontWeight(Number(e.target.value))}
                    min={100}
                    max={900}
                    step={100}
                    className="ml-2 p-1 rounded text-black"
                  />
                </div>
                <div>
                  <label className="text-[#00ffcc]">Text Color:</label>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="ml-2"
                  />
                </div>
                <div>
                  <label className="text-[#00ffcc]">Background Color:</label>
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="ml-2"
                  />
                </div>
              </div>
            </div>

            {/* Right Panel (Canvas) */}
            <div className="lg:w-1/2 flex flex-col items-center">
              <canvas
                ref={canvasRef}
                className="mx-auto border-2 border-[#00ffcc] shadow-xl w-full max-w-[480px] aspect-square"
              />
              <button
                onClick={handleDownload}
                className="mt-6 bg-gradient-to-r from-[#00ffcc] to-[#0077ff] text-black px-6 py-2 rounded font-bold shadow hover:brightness-110 transition"
              >
                ⬇️ Download Image
              </button>
              {downloadURL && (
                <a
                  href={downloadURL}
                  download="instagram-post.png"
                  className="mt-2 text-sm text-[#00ffcc] hover:underline"
                >
                  Click to download
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InstagramPostGenerator;
