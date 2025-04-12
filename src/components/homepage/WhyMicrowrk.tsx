// components/homepage/WhyMicrowrk.tsx

const features = [
  { emoji: "✅", text: "No signup required" },
  { emoji: "🚀", text: "Lightweight and fast" },
  { emoji: "🧠", text: "Built for productivity" },
  { emoji: "💸", text: "Totally free, ad-supported" },
];

const WhyMicrowrk = () => {
  return (
    <section className="bg-neutral-950 text-white py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-[#00ffcc]">
          Why Microwrk?
        </h2>
        <p className="text-gray-400 mb-10">Reasons users love our tools:</p>

        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-neutral-800 p-5 rounded-xl text-lg font-medium text-gray-300 hover:bg-neutral-700 transition"
            >
              <span className="text-2xl mr-3">{f.emoji}</span> {f.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyMicrowrk;
