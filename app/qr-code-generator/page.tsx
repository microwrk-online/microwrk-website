// QRGenerator.tsx
"use client";

import { useState, useMemo, useCallback, useRef } from "react";
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
  Palette,
  UploadCloud,
} from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Mode = "url" | "text" | "image" | "phone";
type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";
type Format = "png" | "jpeg";

const modes: { key: Mode; label: string; icon: React.ElementType }[] = [
  { key: "url", label: "Website", icon: Globe },
  { key: "text", label: "Plain Text", icon: Type },
  { key: "image", label: "Image URL", icon: ImageIcon },
  { key: "phone", label: "Phone", icon: Smartphone },
];

//export const metadata = {
//  title: "YouTube Chapter Downloader - Microwrk",
//  description: "Download YouTube chapters as separate videos instantly.",
//};

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
  const [errorCorrection, setErrorCorrection] =
    useState<ErrorCorrectionLevel>("Q");
  const [format, setFormat] = useState<Format>("png");
  const [copied, setCopied] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  function isValidUrl(url: string) {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }

  return (
    <>
      <Navbar />
      <div className="max-h-screen min-h-[calc(89vh-4rem)] bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 py-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">QR Generator</h1>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left sidebar */}
            <motion.aside
              layout
              className="lg:col-span-1 bg-neutral-800 rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold mb-4 text-white">Content</h2>

              {/* Mode selector */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {modes.map((m) => (
                  <button
                    key={m.key}
                    onClick={() => setMode(m.key)}
                    className={`flex items-center gap-2 p-3 rounded-lg transition ${
                      mode === m.key
                        ? "bg-[#00ffcc] text-black"
                        : "bg-neutral-700 text-white hover:bg-neutral-600"
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
                  <label className="block text-sm font-medium mb-1 text-neutral-300">
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
                    className="w-full px-3 py-2 border border-neutral-600 rounded-md bg-neutral-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  {mode === "url" && url && !isValidUrl(url) && (
                    <div className="mt-2 text-sm font-medium text-yellow-500">
                      Warning: Not a valid URL
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Logo upload */}
              <div className="mt-6">
                <label className="block text-sm font-medium mb-1 text-neutral-300">
                  Logo
                </label>
                <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-neutral-600 rounded-lg cursor-pointer hover:bg-neutral-700">
                  {logo ? (
                    <Image
                      src={logo}
                      alt="logo"
                      width={64}
                      height={64}
                      className="object-contain rounded-md"
                    />
                  ) : (
                    <UploadCloud className="w-8 h-8 text-neutral-400" />
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
              {/* <div className="mt-6">
                <div className="flex justify-between text-sm font-medium text-neutral-300">
                  <span>Size</span>
                  <span>{size}px</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="600"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full accent-[#00ffcc]"
                />
              </div> */}

              {/* Error correction */}
              <div className="mt-6">
                <span className="text-sm font-medium text-neutral-300">
                  Error Correction
                </span>
                <div className="grid grid-cols-4 gap-1 mt-1">
                  {["L", "M", "Q", "H"].map((level) => (
                    <button
                      key={level}
                      onClick={() =>
                        setErrorCorrection(level as ErrorCorrectionLevel)
                      }
                      className={`py-1 text-xs rounded ${
                        errorCorrection === level
                          ? "bg-[#00ffcc] text-black"
                          : "bg-neutral-700"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Format */}
              <div className="mt-6">
                <span className="text-sm font-medium text-neutral-300">
                  Format
                </span>
                <div className="flex gap-2 mt-1">
                  {(["png", "jpeg"] as Format[]).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFormat(f)}
                      className={`flex-1 py-1 text-xs rounded ${
                        format === f
                          ? "bg-[#00ffcc] text-black"
                          : "bg-neutral-700"
                      }`}
                    >
                      {f.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </motion.aside>

            {/* Right preview */}
            <main className="lg:col-span-2 flex flex-col items-center justify-center bg-neutral-800 rounded-2xl shadow-lg p-6">
              <div className="relative rounded-xl">
                <QRCodeCanvas
                  className="rounded-xl"
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
                  className="flex items-center gap-2 bg-[#00ffcc] hover:bg-[#00ffccc4] text-black font-medium px-4 py-2 rounded-lg"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 font-medium px-4 py-2 rounded-lg text-white"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? "Copied!" : "Copy"}
                </button>
                {share && (
                  <button
                    onClick={share}
                    className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 font-medium px-4 py-2 rounded-lg text-white"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                )}
              </div>

              {/* Color controls */}
              <div className="mt-6 w-full max-w-sm">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-neutral-300" />
                  <span className="text-sm font-medium text-neutral-300">
                    Colors
                  </span>
                </div>
                <div className="flex gap-4 mt-2">
                  <div className="flex-1">
                    <label className="text-xs text-neutral-400">
                      Foreground
                    </label>
                    <input
                      type="color"
                      value={fg}
                      onChange={(e) => setFg(e.target.value)}
                      className="w-full h-8 rounded-lg appearance-none cursor-pointer border-none"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-neutral-400">
                      Background
                    </label>
                    <input
                      type="color"
                      value={bg}
                      onChange={(e) => setBg(e.target.value)}
                      className="w-full h-8 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
