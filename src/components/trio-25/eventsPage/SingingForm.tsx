import React from "react";
import EventsNavbar from "../EventsNavbar";

const Singing: React.FC = () => {
  return (
    <>
      <EventsNavbar />
      <section className="min-h-screen bg-neutral-900 text-white py-12 px-4 font-sans">
        <div className="max-w-3xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#00ffcc] mb-2">
              Singing Competition Registration
            </h1>
            <p className="text-gray-400 text-sm">
              Choose age group and preferred languagre.
            </p>
          </header>

          <form
            action="https://docs.google.com/forms/d/e/your-form-id/formResponse"
            method="POST"
            className="bg-white/10 border border-white/10 p-6 rounded-xl space-y-4"
          >
            <input
              type="text"
              name="entry.1"
              placeholder="Full Name"
              required
              className="w-full p-3 rounded-lg text-black"
            />

            <input
              type="text"
              name="entry.2"
              placeholder="Contact Number"
              required
              className="w-full p-3 rounded-lg text-black"
            />

            <select
              name="entry.3"
              required
              className="w-full p-3 rounded-lg text-black"
            >
              <option value="">Select Age Group</option>
              <option>Below 3</option>
              <option>3 to 5</option>
              <option>6 to 8</option>
              <option>9 to 11</option>
              <option>12 to 14</option>
              <option>15 to 17</option>
              <option>18 to 25</option>
              <option>26 to 35</option>
              <option>36 to 45</option>
              <option>46 to 59</option>
              <option>60 and above</option>
            </select>

            <select
              name="entry.4"
              required
              className="w-full p-3 rounded-lg text-black"
            >
              <option value="">Select Language</option>
              <option>English</option>
              <option>Tamil</option>
            </select>

            <button
              type="submit"
              className="w-full bg-[#00ffcc] text-black font-semibold py-3 rounded-lg hover:scale-105 transition"
            >
              Submit Registration
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Singing;
