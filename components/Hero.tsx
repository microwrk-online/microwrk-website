"use client"; // Required for interactivity and hooks

import { useCallback } from "react";
import { FaLock, FaRobot, FaRocket } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import { useRouter } from "next/navigation";
import Animated3DBox from "./animation";

const Hero = () => {
  const router = useRouter();

  const particlesInit = useCallback(async () => {
    // Particles init removed for production safety
  }, []);

  const scrollToTools = () => {
    const toolsSection = document.getElementById("tools");
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/#tools");
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-neutral-900 text-white overflow-hidden"
    >
      {/* Floating Icons */}
      <div className="absolute top-10 left-5 text-[#00ffcc] opacity-10 text-5xl animate-bounce-slow">
        <FaRocket />
      </div>
      <div className="absolute bottom-10 right-10 text-[#00ffcc] opacity-10 text-5xl animate-pulse-slow">
        <FaLock />
      </div>
      <div className="absolute top-1/3 right-1/4 text-[#00ffcc] opacity-10 text-5xl animate-float">
        <FaRobot />
      </div>

      {/* Main Hero Content */}
      <div className="text-center max-w-3xl z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
          <span className="text-[#00ffcc]">
            microwrk.online <p className="sm:inline-block text-xl">Beta</p>
          </span>
          <br />
          <span className="h-24 inline-block whitespace-nowrap">
            <Typewriter
              words={[
                "Tools for Hackers",
                "Automate Tasks",
                "Free Utilities",
                "No Sign-ups Needed",
              ]}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={50}
              deleteSpeed={30}
              delaySpeed={2000}
            />
          </span>
        </h1>
        <p className="text-lg text-gray-400 mb-6 mt-2">
          Explore our free utilities — from Telegram PC control to YouTube
          chapter downloads.
        </p>

        {/* CTA Button */}
        <button
          onClick={scrollToTools}
          className="inline-block px-8 py-3 bg-[#00ffcc] text-black font-semibold rounded-lg shadow-lg hover:scale-105 transition transform duration-300"
        >
          Browse Tools
        </button>
      </div>

      {/* Extra Filler Content */}
      <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto text-gray-300 z-10">
        <div className="bg-neutral-800 p-6 rounded-xl shadow hover:shadow-xl transition">
          <FaRocket className="text-[#00ffcc] text-3xl mb-3" />
          <h3 className="text-xl font-semibold mb-2">Blazing Fast</h3>
          <p>
            Our tools are optimized for speed — no unnecessary loading screens
            or ads.
          </p>
        </div>

        <div className="bg-neutral-800 p-6 rounded-xl shadow hover:shadow-xl transition">
          <FaLock className="text-[#00ffcc] text-3xl mb-3" />
          <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
          <p>
            We value your privacy — no tracking, no sign-up, and no shady
            scripts.
          </p>
        </div>

        <div className="bg-neutral-800 p-6 rounded-xl shadow hover:shadow-xl transition">
          <FaRobot className="text-[#00ffcc] text-3xl mb-3" />
          <h3 className="text-xl font-semibold mb-2">Automation-Ready</h3>
          <p>
            Integrate our tools into your daily workflow and save hours every
            week.
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="mt-24 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Why Choose microwrk.online?
          </h2>
          <p className="text-gray-400 mb-6">
            We build tools with one goal in mind: making your life easier. From
            automating repetitive tasks to helping you focus on the important
            stuff, our utilities are designed for developers, creators, and
            tech-savvy users who value their time.
          </p>
          <ul className="space-y-3 text-gray-300">
            <li>✅ No logins or paywalls</li>
            <li>✅ Works on any device</li>
            <li>✅ Constantly growing tool library</li>
          </ul>
        </div>
        <div className="bg-neutral-800 h-64 rounded-xl flex items-center justify-center text-gray-500">
          <Animated3DBox />
        </div>
      </div>

      {/* Testimonial */}
      <div className="mt-24 bg-neutral-800 py-10 text-center rounded-xl shadow max-w-5xl mx-auto z-10">
        <p className="text-xl text-gray-300 italic">
          &quot;Finally, a site that gives me the tools I need without drowning
          me in popups.&quot;
        </p>
        <span className="text-gray-">— Jane Doe, Developer</span>
      </div>
    </section>
  );
};

export default Hero;
