import React from "react";
import EventsNavbar from "../EventsNavbar";

const BibleQuiz: React.FC = () => {
  return (
    <>
      <EventsNavbar />
      <section className="min-h-screen bg-neutral-900 text-white px-6 py-12 font-sans">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-[#00ffcc] mb-6 text-center">
            Bible Quiz Registration
          </h1>

          <p className="text-gray-400 mb-6 text-center">
            This quiz will be conducted <strong>offline</strong>. Please
            register below. The quiz portion is given below.
          </p>

          <div className="bg-white/10 p-4 rounded-lg text-sm text-gray-300 mb-8">
            <strong>Portion:</strong> Genesis 1–10, Matthew 5–7
          </div>

          <form className="bg-white/10 p-6 rounded-xl shadow-md space-y-6">
            <div>
              <label className="block mb-2 text-sm">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded bg-white/90 text-black"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm">Age</label>
              <input
                type="number"
                className="w-full px-4 py-2 rounded bg-white/90 text-black"
                placeholder="Enter your age"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-[#00ffcc] text-black font-semibold px-6 py-2 rounded hover:scale-105 transition"
            >
              Submit Registration
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default BibleQuiz;
