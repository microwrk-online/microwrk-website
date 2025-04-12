// src/pages/PrivacyPolicy.tsx

const PrivacyPolicy = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-white">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">Last updated: April 11, 2025</p>

      <p className="mb-4">
        At <strong>Microwrk.online</strong>, we respect your privacy. We do not
        collect any personal data unless explicitly provided by you. All tools
        are designed to work without requiring an account.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What We Collect</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Anonymous usage analytics (e.g., page views or interactions)</li>
        <li>
          Ads may use cookies or identifiers to show relevant ads (Google
          AdSense, HilltopAds)
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Your Choices</h2>
      <p className="mb-4">
        You can disable cookies in your browser settings. We do not sell or
        share your personal data.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
      <p>
        Questions? Reach out on{" "}
        <a href="https://t.me/microwrk_online" className="text-[#00ffcc] underline">
          Telegram
        </a>
        .
      </p>
    </main>
  );
};

export default PrivacyPolicy;
