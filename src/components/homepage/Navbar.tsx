import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Tools", href: "#tools" },
    { name: "About", href: "#about" },
    {
      name: "Join Telegram",
      href: "https://t.me/microwrk_online",
      external: true,
    },
  ];

  return (
    <header className="bg-neutral-950 text-white sticky top-0 z-50 shadow-md">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a
          href="/#"
          className="text-2xl font-bold text-[#00ffcc] tracking-tight"
        >
          microwrk.online
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target={link.external ? "_blank" : "_self"}
              rel={link.external ? "noopener noreferrer" : ""}
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
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target={link.external ? "_blank" : "_self"}
              rel={link.external ? "noopener noreferrer" : ""}
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
