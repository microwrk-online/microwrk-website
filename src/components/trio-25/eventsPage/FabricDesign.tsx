import { useState } from "react";
import EventsNavbar from "../EventsNavbar";

const FabricDesign = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  return (
    <>
      <EventsNavbar />
      <section className="min-h-screen bg-neutral-900 text-white px-4 py-10">
        <div className="max-w-xl mx-auto bg-neutral-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-[#00ffcc] mb-4 text-center">
            Fabric Design Competition
          </h2>
          <p className="text-gray-400 text-center mb-6">
            Offline Event | Registration only
          </p>

          <form
            action="https://docs.google.com/forms/d/e/your-google-form-link/formResponse"
            method="POST"
            target="_blank"
            onSubmit={() => {
              if (!name || !contact) {
                alert("Please fill in all required fields.");
                return false;
              }
              return true;
            }}
          >
            <div className="mb-4">
              <label className="block mb-2">Full Name</label>
              <input
                type="text"
                name="entry.1234567890" // replace with actual field ID
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 rounded bg-gray-200 text-black"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Contact Number</label>
              <input
                type="tel"
                name="entry.0987654321" // replace with actual field ID
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                className="w-full px-4 py-2 rounded bg-gray-200 text-black"
              />
            </div>

            {/* Temporary rules */}
            <div className="mb-4 text-sm text-gray-400 italic">
              Fabric Design competition rules and guidelines will be announced
              soon.
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-[#00ffcc] text-black font-semibold py-2 rounded hover:scale-105 transition"
            >
              Submit Registration
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default FabricDesign;
