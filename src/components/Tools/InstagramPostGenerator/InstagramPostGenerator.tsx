import { useState, useRef, useEffect } from 'react';

type TextBox = {
  text: string;
  positionPercent: number;
  showBackground: boolean;
  backgroundColor: string;
  backgroundOpacity: number;
};

const memeTemplates = [
  {
    name: 'Classic Drake',
    url: 'https://i.imgflip.com/30b1gx.jpg',
    defaultCaption: 'Hot or Not?',
    positions: [20]
  },
  {
    name: 'Distracted Boyfriend',
    url: 'https://i.imgflip.com/1ur9b0.jpg',
    defaultCaption: 'Me coding / Bugs / Deadlines',
    positions: [80]
  },
  {
    name: 'Two Buttons',
    url: 'https://i.imgflip.com/1g8my4.jpg',
    defaultCaption: 'Choosing between sleep and productivity',
    positions: [45]
  },
  {
    name: 'Change My Mind',
    url: 'https://i.imgflip.com/24y43o.jpg',
    defaultCaption: 'Dark theme is superior',
    positions: [85]
  },
  {
    name: 'Mocking Spongebob',
    url: 'https://i.imgflip.com/1otk96.jpg',
    defaultCaption: 'wHeN yOu ShOuT iN mEmEs',
    positions: [60]
  }
];

const hexToRgba = (hex: string, opacity: number) => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const defaultTextBox: TextBox = {
  text: 'Your caption here',
  positionPercent: 80,
  showBackground: false,
  backgroundColor: '#000000',
  backgroundOpacity: 0.5
};

const InstagramPostGenerator = () => {
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [bgColor, setBgColor] = useState('#000000');
  const [textColor, setTextColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState(52);
  const [fontWeight, setFontWeight] = useState(600);
  const [textBoxes, setTextBoxes] = useState<TextBox[]>([defaultTextBox]);
  const [downloadURL, setDownloadURL] = useState('');

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
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1080;
    const height = 1080;
    canvas.width = width;
    canvas.height = height;

    if (bgImage) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
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

  const drawTextBoxes = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.font = `${fontWeight} ${fontSize}px Inter`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    textBoxes.forEach(({ text, positionPercent, showBackground, backgroundColor, backgroundOpacity }) => {
      const y = (positionPercent / 100) * height;

      if (showBackground) {
        ctx.fillStyle = hexToRgba(backgroundColor, backgroundOpacity);
        const textHeight = fontSize + 20;
        ctx.fillRect(0, y - textHeight / 2, width, textHeight);
      }

      ctx.fillStyle = textColor;
      ctx.fillText(text, width / 2, y);
    });
  };

  useEffect(() => {
    drawCanvas();
  }, [bgImage, bgColor, textColor, fontSize, fontWeight, textBoxes]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      setDownloadURL(url);
    }
  };

  const handleAddTextBox = () => {
    setTextBoxes([...textBoxes, { ...defaultTextBox }]);
  };

  const updateBox = <K extends keyof TextBox>(index: number, key: K, value: TextBox[K]) => {
    const updated = [...textBoxes];
    updated[index][key] = value;
    setTextBoxes(updated);
  };

  const handleTemplateSelect = (index: number) => {
    const template = memeTemplates[index];
    setBgImage(template.url);
    setTextBoxes(
      template.positions.map((p, i) => ({
        ...defaultTextBox,
        text: i === 0 ? template.defaultCaption : `Text ${i + 1}`,
        positionPercent: p
      }))
    );
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-[#0f0f0f] min-h-screen text-white">
      <h1 className="text-[#00ffcc] text-3xl font-bold mb-4">📸 Meme Generator with Custom Text Backgrounds</h1>

      {/* Meme template selector */}
      <div className="mb-2">
        <label className="text-[#00ffcc]">Choose Meme Template:</label>
        <select
          onChange={(e) => handleTemplateSelect(parseInt(e.target.value))}
          className="ml-2 bg-[#1a1a1a] text-white border border-[#00ffcc]/50 p-2 rounded"
        >
          <option value="">-- Select a template --</option>
          {memeTemplates.map((template, index) => (
            <option key={index} value={index}>
              {template.name}
            </option>
          ))}
        </select>
      </div>

      {/* Upload image */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="text-white bg-[#1a1a1a] p-2 rounded mb-4"
      />

      {/* Text boxes editor */}
      {textBoxes.map((box, index) => (
        <div key={index} className="bg-[#1a1a1a] p-3 rounded border border-[#00ffcc]/30 w-full max-w-xl">
          <label className="text-sm text-[#00ffcc]">Text #{index + 1}</label>
          <input
            type="text"
            value={box.text}
            onChange={(e) => updateBox(index, 'text', e.target.value)}
            className="w-full p-2 mt-1 mb-2 bg-[#0f0f0f] text-white border border-[#00ffcc]/20 rounded"
          />
          <label className="text-sm text-[#00ffcc]">Position (% from top):</label>
          <input
            type="range"
            min={0}
            max={100}
            value={box.positionPercent}
            onChange={(e) => updateBox(index, 'positionPercent', Number(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-gray-400 mb-2">{box.positionPercent}%</p>

          <div className="mt-2 flex flex-col gap-2 text-sm">
            <label>
              <input
                type="checkbox"
                checked={box.showBackground}
                onChange={(e) => updateBox(index, 'showBackground', e.target.checked)}
              />{' '}
              Show background
            </label>

            {box.showBackground && (
              <div className="flex gap-4 items-center flex-wrap">
                <label>BG Color:</label>
                <input
                  type="color"
                  value={box.backgroundColor}
                  onChange={(e) => updateBox(index, 'backgroundColor', e.target.value)}
                />

                <label>Opacity:</label>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={box.backgroundOpacity}
                  onChange={(e) => updateBox(index, 'backgroundOpacity', parseFloat(e.target.value))}
                />
                <span>{Math.round(box.backgroundOpacity * 100)}%</span>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Add new text box */}
      <button
        onClick={handleAddTextBox}
        className="bg-[#222] border border-[#00ffcc] text-[#00ffcc] px-4 py-2 rounded mt-2"
      >
        ➕ Add Text Box
      </button>

      {/* Text and style settings */}
      <div className="flex flex-wrap justify-center gap-6 mt-4">
        <div>
          <label className="text-[#00ffcc]">Font Size:</label>
          <input
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            min={20}
            max={100}
            className="ml-2 text-black p-1"
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
            className="ml-2 text-black p-1"
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

      {/* Canvas */}
      <canvas ref={canvasRef} style={{ border: '2px solid #00ffcc', maxWidth: '100%' }} />

      {/* Download button */}
      <button
        onClick={handleDownload}
        className="mt-4 bg-[#00ffcc] text-black font-semibold px-4 py-2 rounded hover:bg-[#00e6b8]"
      >
        ⬇️ Download Image
      </button>

      {downloadURL && (
        <a
          href={downloadURL}
          download="instagram-post.png"
          className="mt-4 text-[#00ffcc] text-sm"
        >
          Click here to download the image
        </a>
      )}
    </div>
  );
};

export default InstagramPostGenerator;
