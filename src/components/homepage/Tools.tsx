// components/homepage/Tools.tsx

const tools = [
  {
    title: "💻 Telegram Bot Panel",
    description:
      "Control your PC remotely using Telegram: take screenshots, upload files, and more.",
    status: "Coming Soon",
    link: "", //we can use "/tools/telegram-panel" after making more tools in future
  },
  {
    title: "📸 Instagram Post Generator",
    description:
      "Create eye-catching memes and stylish Instagram posts with editable text, backgrounds, colors, and more. Perfect for content creators and social media managers.",
    status: "Live",
    link: "/instagram-post-generator",
  },
  {
    title: "⏰ Daily Reminder Bot",
    description:
      "Set one-time or recurring reminders, get pinged daily via web or Telegram.",
    status: "Coming Soon",
    link: "",
  },
  {
    title: "🔒 Password Generator",
    description: "Securely generate strong passwords.",
    status: "Coming Soon",
  },
  {
    title: "🎥 YouTube Chapter Downloader",
    description: "Download YouTube videos chapter-wise or full.",
    status: "Live",
    link: "/youtube-chapter-downloader",
  },
  {
    title: "🎥 Instagram Reels and Thumbnail Downloader",
    description: ".",
    status: "Coming Soon",
    link: "",
  },
  {
    title: "🎥 Trending Music and Memes",
    description: ".",
    status: "Coming Soon",
    link: "",
  },
];

const Tools = () => {
  return (
    <section id="tools" className="bg-neutral-950 text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-[#00ffcc]">
          Featured Tools
        </h2>
        <p className="text-gray-400 mb-12">
          A growing collection of utilities to boost your daily productivity.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-neutral-800 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.01] transition"
            >
              <h3 className="text-2xl font-semibold mb-2 text-white">
                {tool.title}
              </h3>
              <p className="text-gray-400 mb-4">{tool.description}</p>
              {tool.status === "Live" ? (
                <a
                  href={tool.link}
                  className="inline-block px-5 py-2 bg-[#00ffcc] text-black font-semibold rounded hover:scale-105 transition"
                >
                  Try Tool
                </a>
              ) : (
                <span className="inline-block px-5 py-2 bg-zinc-600 text-white font-semibold rounded cursor-not-allowed">
                  Coming Soon
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;
