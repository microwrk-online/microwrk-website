"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subTextRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Intro animation
    tl.from(containerRef.current, { opacity: 0, duration: 1 })
      .from(headingRef.current, { y: 80, opacity: 0, duration: 1 }, "-=0.5")
      .from(subTextRef.current, { y: 40, opacity: 0, duration: 0.8 }, "-=0.4")
      .from(
        buttonRef.current,
        { scale: 0.8, opacity: 0, duration: 0.6 },
        "-=0.3"
      );

    // Floating background text
    gsap.to(bgTextRef.current, {
      y: "+=30",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-black overflow-hidden text-center"
    >
      {/* Large Floating 404 in Background */}
      <div
        ref={bgTextRef}
        className="absolute text-[20rem] font-extrabold text-white/5 select-none pointer-events-none"
      >
        404
      </div>

      {/* Animated Glow Orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full blur-[120px] opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500 rounded-full blur-[120px] opacity-30 animate-pulse"></div>

      {/* Glass Card */}
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-10 shadow-2xl z-10">
        <h1
          ref={headingRef}
          className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-lg"
        >
          Oops!
        </h1>
        <p ref={subTextRef} className="text-lg mt-4 text-gray-300 max-w-md">
          Looks like this page got lost in cyberspace.
        </p>
        <a
          ref={buttonRef}
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Take Me Home
        </a>
      </div>
    </div>
  );
}
