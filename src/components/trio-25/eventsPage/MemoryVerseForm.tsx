import React from "react";
import EventsNavbar from "../EventsNavbar";

const MemoryVerse: React.FC = () => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);

    const name = data.get("name") as string;
    const contact = data.get("contact") as string;
    const ageGroup = data.get("ageGroup") as string;
    const language = data.get("language") as string;

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbzp-eStk8DHSJ8Btdh0f8xx74H01ZTG4uMm7HNeXbAp/dev",
        {
          method: "POST",
          body: new URLSearchParams({
            name,
            contact,
            ageGroup,
            language,
          }),
        }
      );

      const result = await res.json();
      alert(result.message || "Submitted successfully!");
      form.reset();
    } catch (err) {
      alert("Failed to submit. Please try again.");
    }
  };

  return (
    <>
      <EventsNavbar />
      <section className="min-h-screen bg-neutral-900 text-white py-12 px-4 font-sans">
        <div className="max-w-3xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#00ffcc] mb-2">
              Memory Verse Registration
            </h1>
            <p className="text-gray-400 text-sm">
              Choose language and age group. Event date will be announced soon.
            </p>
          </header>
          <div className="w-full max-w-md mx-auto">
            <form
              onSubmit={handleSubmit}
              className="bg-white/10 border border-white/10 p-8 rounded-xl space-y-6 min-h-[600px]"
            >
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full h-14 p-4 rounded-lg text-gray-300 bg-neutral-800"
              />

              <input
                type="tel"
                name="contact"
                placeholder="Contact Number"
                pattern="\d{10}"
                maxLength={10}
                required
                className="w-full h-14 p-4 rounded-lg text-gray-300 bg-neutral-800"
              />

              <select
                name="ageGroup"
                required
                className="w-full h-14 p-4 rounded-lg text-gray-300 bg-neutral-800"
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
                name="language"
                required
                className="w-full h-14 p-4 rounded-lg text-gray-300 bg-neutral-800"
              >
                <option value="">Select Language</option>
                <option>English</option>
                <option>Tamil</option>
              </select>

              <button
                type="submit"
                className="w-full h-14 bg-[#00cc99] hover:bg-[#00ffcc] text-black font-semibold rounded-lg hover:scale-105 transition"
              >
                Submit Registration
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default MemoryVerse;
