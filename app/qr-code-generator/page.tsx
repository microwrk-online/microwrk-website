// QRGenerator.tsx
"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import {
  Globe,
  Type,
  Smartphone,
  ImageIcon,
  Download,
  Copy,
  Share2,
  Sun,
  Moon,
  Settings,
  X,
  Palette,
  UploadCloud,
} from "lucide-react";
import Image from "next/image";

type Mode = "url" | "text" | "image" | "phone";
type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";
type Format = "png" | "jpeg";

const modes: { key: Mode; label: string; icon: React.ElementType }[] = [
  { key: "url", label: "Website", icon: Globe },
  { key: "text", label: "Plain Text", icon: Type },
  { key: "image", label: "Image URL", icon: ImageIcon },
  { key: "phone", label: "Phone", icon: Smartphone },
];

export default function QRGenerator() {
  const [mode, setMode] = useState<Mode>("url");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [logo, setLogo] = useState<string | null>(null);
  const [size, setSize] = useState(256);
  const [fg, setFg] = useState("#000000");
  const [bg, setBg] = useState("#ffffff");
  const [gradientFg, setGradientFg] = useState(false);
  const [gradientBg, setGradientBg] = useState(false);
  const [errorCorrection, setErrorCorrection] =
    useState<ErrorCorrectionLevel>("Q");
  const [format, setFormat] = useState<Format>("png");
  const [dark, setDark] = useState(false);
  const [copied, setCopied] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  const qrValue = useMemo(() => {
    switch (mode) {
      case "url":
        return url;
      case "text":
        return text;
      case "image":
        return image;
      case "phone":
        return phone;
      default:
        return "";
    }
  }, [mode, url, text, image, phone]);

  const handleDownload = useCallback(() => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL(`image/${format}`);
    const a = document.createElement("a");
    a.href = url;
    a.download = `qr-${Date.now()}.${format}`;
    a.click();
  }, [format]);

  const copyToClipboard = useCallback(() => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob((blob) => {
      if (!blob) return;
      navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, []);

  const share = useCallback(async () => {
    if (!canvasRef.current || !navigator.share) return;
    const blob = await new Promise<Blob | null>((res) =>
      canvasRef.current?.toBlob(res)
    );
    if (!blob) return;
    const file = new File([blob], "qr.png", { type: blob.type });
    await navigator.share({ files: [file], title: "My QR Code" });
  }, []);

  const setters: Record<Mode, React.Dispatch<React.SetStateAction<string>>> = {
    url: setUrl,
    text: setText,
    image: setImage,
    phone: setPhone,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            QR Generator
          </h1>
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar */}
          <motion.aside
            layout
            className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Content
            </h2>

            {/* Mode selector */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {modes.map((m) => (
                <button
                  key={m.key}
                  onClick={() => setMode(m.key)}
                  className={`flex items-center gap-2 p-3 rounded-lg transition ${
                    mode === m.key
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  <m.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{m.label}</span>
                </button>
              ))}
            </div>

            {/* Dynamic input */}
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-sm font-medium mb-1">
                  {modes.find((m) => m.key === mode)?.label}
                </label>
                <input
                  type="text"
                  value={
                    mode === "url"
                      ? url
                      : mode === "text"
                      ? text
                      : mode === "image"
                      ? image
                      : phone
                  }
                  onChange={(e) => setters[mode](e.target.value)}
                  placeholder={`Enter ${
                    modes.find((m) => m.key === mode)?.label
                  }`}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </motion.div>
            </AnimatePresence>

            {/* Logo upload */}
            <div className="mt-6">
              <label className="block text-sm font-medium mb-1">Logo</label>
              <label className="flex items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                {logo ? (
                  <Image
                    src={logo}
                    alt="logo"
                    width={64} // equivalent to w-16
                    height={64} // equivalent to h-16
                    className="object-contain rounded-md"
                  />
                ) : (
                  <UploadCloud className="w-8 h-8 text-gray-400" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setLogo(URL.createObjectURL(file));
                  }}
                />
              </label>
            </div>

            {/* Size */}
            <div className="mt-6">
              <div className="flex justify-between text-sm font-medium">
                <span>Size</span>
                <span>{size}px</span>
              </div>
              <input
                type="range"
                min="100"
                max="600"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>

            {/* Error correction */}
            <div className="mt-6">
              <span className="text-sm font-medium">Error Correction</span>
              <div className="grid grid-cols-4 gap-1 mt-1">
                {["L", "M", "Q", "H"].map((level) => (
                  <button
                    key={level}
                    onClick={() =>
                      setErrorCorrection(level as ErrorCorrectionLevel)
                    }
                    className={`py-1 text-xs rounded ${
                      errorCorrection === level
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 dark:bg-gray-700"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Format */}
            <div className="mt-6">
              <span className="text-sm font-medium">Format</span>
              <div className="flex gap-2 mt-1">
                {(["png", "jpeg"] as Format[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFormat(f)}
                    className={`flex-1 py-1 text-xs rounded ${
                      format === f
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 dark:bg-gray-700"
                    }`}
                  >
                    {f.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </motion.aside>

          {/* Right preview */}
          <main className="lg:col-span-2 flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="relative">
              <QRCodeCanvas
                ref={canvasRef}
                value={qrValue || " "}
                size={size}
                fgColor={qrValue ? fg : "#ffffff00"}
                bgColor={bg}
                level={errorCorrection}
                includeMargin
                imageSettings={
                  logo
                    ? {
                        src: logo,
                        excavate: true,
                        height: size * 0.2,
                        width: size * 0.2,
                      }
                    : undefined
                }
              />
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 font-medium px-4 py-2 rounded-lg"
              >
                <Copy className="w-4 h-4" />
                {copied ? "Copied!" : "Copy"}
              </button>
              {"share" in navigator && (
                <button
                  onClick={share}
                  className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 font-medium px-4 py-2 rounded-lg"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              )}
            </div>

            {/* Color controls */}
            <div className="mt-6 w-full max-w-sm">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                <span className="text-sm font-medium">Colors</span>
              </div>
              <div className="flex gap-4 mt-2">
                <div className="flex-1">
                  <label className="text-xs">Foreground</label>
                  <input
                    type="color"
                    value={fg}
                    onChange={(e) => setFg(e.target.value)}
                    className="w-full h-8 rounded cursor-pointer"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs">Background</label>
                  <input
                    type="color"
                    value={bg}
                    onChange={(e) => setBg(e.target.value)}
                    className="w-full h-8 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
