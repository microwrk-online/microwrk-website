"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Why Microwrk");

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Tools", href: "#tools" },
    { name: "Why Microwrk", href: "#why" },
    { name: "Join Telegram", href: "#telegram" },
    // { name: "Water Wash", href: "#water-wash" },
    // { name: "Events", href: "#events" },
    // { name: "Zen Stream", href: "#zen-stream" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Zap className="w-6 h-6 text-[#00f2a9] group-hover:scale-110 transition-transform duration-300" />
            <span className="text-2xl font-bold text-[#00f2a9] group-hover:opacity-80 transition-opacity duration-300">
              microwrk
            </span>
          </Link>

          {/* Desktop Navigation */}
          {/* <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ease-in-out hover:bg-[#00f2a9] hover:text-black hover:scale-105 ${
                    activeLink === link.name
                      ? "bg-[#00f2a9] text-black"
                      : "text-white hover:text-[#00f2a9]"
                  }`}
                  onClick={() => setActiveLink(link.name)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div> */}

          {/* Section Navigation Buttons */}
          <div className="hidden md:flex justify-center">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center justify-center w-[100px] h-[38px] text-white text-sm font-medium rounded-md transition-all duration-300 ease-in-out hover:bg-[#00f2a9] hover:text-black hover:scale-105"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-[#00f2a9] p-2 transition-all duration-300 ease-in-out hover:scale-105"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-2 bg-[#0a0a0a] border-t border-gray-800">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block px-4 py-3 text-base font-medium rounded-md transition-all duration-300 ease-in-out hover:bg-[#00f2a9] hover:text-black hover:scale-105 ${
                    activeLink === link.name
                      ? "bg-[#00f2a9] text-black"
                      : "text-white"
                  }`}
                  onClick={() => {
                    setActiveLink(link.name);
                    setIsMenuOpen(false);
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
