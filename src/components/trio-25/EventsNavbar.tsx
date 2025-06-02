import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const EventsNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-neutral-900 text-white px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#00ffcc]">
          TRIO`25
        </Link>

        {/* Desktop Menu */}

        <div className="hidden md:flex space-x-6 font-medium">
          <Link to="/events" className="hover:text-[#00ffcc] transition">
            Home
          </Link>
          <Link to="/events/memory-verse" className="hover:text-[#00ffcc] transition">
            Memory Verse
          </Link>
          <Link to="/events/singing" className="hover:text-[#00ffcc] transition">
            Singing
          </Link>
          <Link to="/events/bible-quiz" className="hover:text-[#00ffcc] transition">
            Bible Quiz
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl text-[#00ffcc] focus:outline-none"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-4 text-center font-medium">
          <Link
            onClick={closeMenu}
            to="/memory-verse"
            className="block hover:text-[#00ffcc] transition"
          >
            Memory Verse
          </Link>
          <Link
            onClick={closeMenu}
            to="/singing"
            className="block hover:text-[#00ffcc] transition"
          >
            Singing
          </Link>
          <Link
            onClick={closeMenu}
            to="/bible-quiz"
            className="block hover:text-[#00ffcc] transition"
          >
            Bible Quiz
          </Link>
          <Link
            onClick={closeMenu}
            to="/home"
            className="block hover:text-[#00ffcc] transition"
          >
            Home
          </Link>
        </div>
      )}
    </nav>
  );
};

export default EventsNavbar;
