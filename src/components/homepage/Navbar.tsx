import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/microwrk-logo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "hero" },
    { name: "Tools", href: "tools" },
    { name: "Why Microwrk", href: "why" },
    {
      name: "Join Telegram",
      href: "https://t.me/microwrk_online",
      external: true,
    },
  ];

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false); // Close mobile menu on click
    }
  };

  return (
    <header className="bg-neutral-950 text-white sticky top-0 z-50 shadow-md">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Button - Scroll to the top of the page */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-2xl font-bold text-[#00ffcc] tracking-tight flex items-center"
        >
          <img src={logo} alt="microwrk" className="w-10 h-10 mr-2 self-center" />
          microwrk
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link, index) =>
            link.external ? (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 font-medium rounded-md transition duration-300 hover:bg-[#00ffcc] hover:text-black"
              >
                {link.name}
              </a>
            ) : (
              <button
                key={index}
                onClick={() => scrollToSection(link.href)}
                className="px-4 py-2 font-medium rounded-md transition duration-300 hover:bg-[#00ffcc] hover:text-black"
              >
                {link.name}
              </button>
            )
          )}
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
          {navLinks.map((link, index) =>
            link.external ? (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 font-medium rounded-md bg-neutral-800 hover:bg-[#00ffcc] hover:text-black transition"
              >
                {link.name}
              </a>
            ) : (
              <button
                key={index}
                onClick={() => scrollToSection(link.href)}
                className="block w-full text-left px-4 py-2 font-medium rounded-md bg-neutral-800 hover:bg-[#00ffcc] hover:text-black transition"
              >
                {link.name}
              </button>
            )
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
