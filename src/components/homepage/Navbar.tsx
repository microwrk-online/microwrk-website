import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/microwrk-logo.svg";
import { useNavigate, useLocation } from "react-router-dom"; // 👈 Add this at the top

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const internalNavLinks = [
    { name: "Home", href: "hero" },
    { name: "Tools", href: "tools" },
    { name: "Why Microwrk", href: "why" },
  ]; //contents in this

  const externalNavLinks = [
    {
      name: "Join Telegram",
      href: "https://t.me/microwrk_online",
      external: true,
    },
    { name: "Water Wash", href: "waterwash", external: false },
    { name: "Events", href: "events", external: false },
    { name: "Zen Stream", href: "zenstream", external: false },
  ];

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false); // Close mobile menu on click
    }
  };
  const navigate = useNavigate();
  const location = useLocation();
  const isHomepage = location.pathname === "/";

  return (
    <header className="bg-neutral-950 text-white sticky top-0 z-50 shadow-md">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Button - Scroll to the top of the page */}
        <button
          onClick={() => {
            if (location.pathname !== "/") {
              navigate("/", { replace: false });
              // After short delay, scroll to top (once landing on /)
              setTimeout(() => {
                const heroSection = document.getElementById("hero");
                if (heroSection) {
                  heroSection.scrollIntoView({ behavior: "smooth" });
                }
              }, 300); // Adjust delay as needed for smoother UX
            } else {
              const heroSection = document.getElementById("hero");
              if (heroSection) {
                heroSection.scrollIntoView({ behavior: "smooth" });
              }
            }
          }}
          className="text-2xl font-bold text-[#00ffcc] tracking-tight flex items-center"
        >
          <img
            src={logo}
            alt="microwrk"
            className="w-10 h-10 mr-2 self-center"
          />
          microwrk
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          {isHomepage &&
            internalNavLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(link.href)}
                className="px-4 py-2 font-medium rounded-md transition duration-300 hover:bg-[#00ffcc] hover:text-black"
              >
                {link.name}
              </button>
            ))}

          {externalNavLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 font-medium rounded-md transition duration-300 hover:bg-[#00ffcc] hover:text-black"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-neutral-950 px-6 pb-4 space-y-3">
          {isHomepage &&
            internalNavLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(link.href)}
                className="block w-full text-left px-4 py-2 font-medium rounded-md bg-neutral-800 hover:bg-[#00ffcc] hover:text-black transition"
              >
                {link.name}
              </button>
            ))}

          {externalNavLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 font-medium rounded-md bg-neutral-800 hover:bg-[#00ffcc] hover:text-black transition"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
