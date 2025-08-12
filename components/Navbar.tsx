"use client";

"use client"; // Mark as Client Component since we use hooks and interactivity

import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../public/microwrk-logo.svg";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  const internalNavLinks = [
    { name: "Home", href: "hero" },
    { name: "Tools", href: "tools" },
    { name: "Why Microwrk", href: "why" },
  ];

  const externalNavLinks = [
    {
      name: "Join Telegram",
      href: "https://t.me/microwrk_online",
      external: true,
    },
  ];

  const scrollToSection = (id: string) => {
    if (isHomepage) {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/#${id}`);
    }
    setIsOpen(false);
  };

  const handleLogoClick = () => {
    if (pathname !== "/") {
      router.push("/");
    } else {
      const heroSection = document.getElementById("hero");
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="bg-neutral-950 text-white sticky top-0 z-50 shadow-md">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Button */}
        <button
          onClick={handleLogoClick}
          className="text-2xl font-bold text-[#00ffcc] tracking-tight flex items-center"
        >
          <Image
            src={logo}
            alt="microwrk"
            width={40} // matches your w-10 class (10 * 4 = 40px)
            // height={40} // if you add this then there will be a console error
            className="mr-2 self-center"
            priority // optional for above-the-fold images
          />
          microwrk <p className="ml-2 inline-block text-sm">Beta</p>
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
            <Link
              key={index}
              href={link.href}
              target={link.external ? "_blank" : "_self"}
              rel={link.external ? "noopener noreferrer" : ""}
              className="px-4 py-2 font-medium rounded-md transition duration-300 hover:bg-[#00ffcc] hover:text-black"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
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
            <Link
              key={index}
              href={link.href}
              target={link.external ? "_blank" : "_self"}
              rel={link.external ? "noopener noreferrer" : ""}
              className="block px-4 py-2 font-medium rounded-md bg-neutral-800 hover:bg-[#00ffcc] hover:text-black transition"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
