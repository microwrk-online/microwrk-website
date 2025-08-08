// src/pages/TermsOfService.tsx
import React from "react";

const TermsOfService = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-white">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4">Last updated: April 11, 2025</p>

      <p className="mb-4">
        By using <strong>Microwrk.online</strong>, you agree to the following terms:
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Free-to-Use Tools</h2>
      <p className="mb-4">
        All tools are free and ad-supported. Use them only for lawful purposes.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. No Warranties</h2>
      <p className="mb-4">
        We provide tools &quot;as-is&quot; with no guarantees. Use at your own risk.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Intellectual Property</h2>
      <p className="mb-4">
        Content and code on this site belong to Microwrk.online. Do not copy or redistribute.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Usage Restrictions</h2>
      <p className="mb-4">
        Don’t use tools for malicious or illegal purposes (e.g., hacking other users).
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Updates</h2>
      <p className="mb-4">
        Terms may change. Continued use implies agreement to updated terms.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Contact</h2>
      <p>
        Questions? Reach out on{" "}
        <a href="https://t.me/microwrk" className="text-[#00ffcc] underline">
          Telegram
        </a>
        .
      </p>
    </main>
  );
};

export default TermsOfService;
