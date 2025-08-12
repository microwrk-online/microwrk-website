"use client";

import { useState } from "react";
import { FaTelegram, FaGithub, FaLinkedin } from "react-icons/fa";
import PrivacyPolicy from "./footerContents/Privacy";
import TermsOfService from "./footerContents/Terms";
import Modal from "./Modal";

const Footer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"privacy" | "terms" | null>(null);

  const openModal = (type: "privacy" | "terms") => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <footer className="bg-neutral-950 text-gray-400 text-sm border-t border-neutral-700 py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left - Navigation Links */}
        <div className="flex gap-6 items-center flex-wrap justify-center md:justify-start">
          <a href="/about" className="hover:text-white transition">
            About
          </a>
          <a href="/contact" className="hover:text-white transition">
            Contact
          </a>
          <button
            onClick={() => openModal("privacy")}
            className="hover:text-white transition"
          >
            Privacy
          </button>
          <button
            onClick={() => openModal("terms")}
            className="hover:text-white transition"
          >
            Terms
          </button>
        </div>

        {/* Social Icons Row */}
        <div className="mt-4 flex justify-center gap-4 text-lg">
          <a
            href="https://github.com/yourrepo"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition"
          >
            <FaLinkedin />
          </a>
        </div>

        {/* Right - Ping Us CTA */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-center md:text-left">
          <span className="text-white font-medium">Got tool ideas?</span>
          <a
            href="https://t.me/microwrk_online"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#00ffcc] text-black font-semibold rounded-full hover:scale-105 transition"
          >
            <FaTelegram /> Ping us on Telegram
          </a>
        </div>
      </div>

      {/* Modal for Terms & Privacy */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalType === "privacy" ? "Privacy Policy" : "Terms of Service"}
      >
        {modalType === "privacy" ? <PrivacyPolicy /> : <TermsOfService />}
      </Modal>

      {/* Contributor */}
      <div className="text-center text-base mt-4">
        <span className="text-gray-500">
          © {new Date().getFullYear()} microwrk.online | Built with ❤️ by{" "}
        </span>
        <a
          href="https://www.linkedin.com/in/joshuadaniel8090"
          target="_blank"
          rel="noreferrer"
          className="hover:underline transition"
        >
          Joshua Daniel,
        </a>
        <span>&nbsp;</span>
        <a
          href="https://example.com/guru-prasath"
          target="_blank"
          rel="noreferrer"
          className="hover:underline transition"
        >
          Guru Prasath
        </a>
      </div>
    </footer>
  );
};

export default Footer;
