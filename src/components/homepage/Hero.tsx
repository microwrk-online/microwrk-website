import { FaLock, FaRobot, FaRocket } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Hero = () => {
  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 bg-neutral-900 text-white overflow-hidden">
      {/* Particle Background */}
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
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "#111827" } },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: { repulse: { distance: 100, duration: 0.4 } },
          },
          particles: {
            color: { value: "#00ffcc" },
            links: {
              enable: true,
              color: "#00ffcc",
              distance: 150,
              opacity: 0.5,
            },
            move: { enable: true, speed: 1.5 },
            number: { value: 60 },
            size: { value: 2 },
          },
        }}
        className="absolute inset-0 -z-10"
      />

      {/* Floating images */}

      {/* Main content */}
      <div className="text-center max-w-3xl z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
          <span className="text-[#00ffcc]">microwrk.online</span>
          <br />
          <span>
            <Typewriter
              words={[
                "Modern Tools for Modern Hackers 🧠",
                "Automate daily tasks ⏳",
                "Free developer utilities 🛠️",
                "No sign-ups, just tools 📦",
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

        {/* Command Input */}
        <div className="relative max-w-md mx-auto mb-6">
          <input
            type="text"
            placeholder='Try typing "Reminder Bot"...'
            className="w-full px-5 py-3 text-black rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#00ffcc] placeholder:text-gray-600 font-mono shadow-lg"
          />
        </div>

        {/* CTA */}
        <a
          href="#tools"
          className="inline-block px-8 py-3 bg-[#00ffcc] text-black font-semibold rounded-lg shadow-lg hover:scale-105 transition transform duration-300"
        >
          Browse Tools
        </a>
      </div>
    </section>
  );
};

export default Hero;
