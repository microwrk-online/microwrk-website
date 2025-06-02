import React from "react";
import { Link } from "react-router-dom";
import {
  FaBible,
  FaMusic,
  FaPuzzlePiece,
  FaUserSecret,
  FaFeatherAlt,
  FaMapMarkedAlt,
  FaPenFancy,
  FaPaintBrush,
  FaUtensils,
} from "react-icons/fa";
const competitions = [
  {
    title: "Memory Verse",
    description: "Tamil & English · Multiple Age Categories",
    link: "/events/memory-verse",
    icon: <FaBible />,
  },
  {
    title: "Singing",
    description: "Tamil & English · Multiple Age Categories",
    link: "/events/singing",
    icon: <FaMusic />,
  },
  {
    title: "Bible Quiz",
    description: "Offline · Portions Provided · All Ages",
    link: "/events/bible-quiz",
    icon: <FaPuzzlePiece />,
  },
  {
    title: "Fancy Dress",
    description: "Ages 3–8 · Offline Event",
    link: "/events/fancy-dress",
    icon: <FaUserSecret />,
  },
  {
    title: "Essay Writing",
    description: "English or Tamil · No Age Restriction",
    link: "/events/essay-writing",
    icon: <FaPenFancy />,
  },
  {
    title: "Poetry Competition",
    description: "English or Tamil · No Age Restriction",
    link: "/events/poetry",
    icon: <FaFeatherAlt />,
  },
  {
    title: "Treasure Hunt",
    description: "Offline · Name & Contact Only",
    link: "/events/treasure-hunt",
    icon: <FaMapMarkedAlt />,
  },
  {
    title: "Fabric Design",
    description: "Offline · Name & Contact Only",
    link: "/events/fabric-design",
    icon: <FaPaintBrush />,
  },
  {
    title: "Traditional Cooking",
    description: "Offline · Name & Contact Only",
    link: "/events/traditional-cooking",
    icon: <FaUtensils />,
  },
];

const ChurchEventsHome: React.FC = () => {
  return (
    <section className="min-h-screen bg-neutral-900 text-white py-12 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#00ffcc] mb-4">
            TRIO`25
          </h1>
        </header>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {competitions.map((event, index) => (
            <Link
              key={index}
              to={event.link}
              className="bg-white/10 border border-white/10 rounded-xl p-6 hover:bg-white/20 hover:scale-[1.02] transition-all duration-300 shadow-md"
            >
              <div className="text-4xl text-[#00ffcc] mb-3">{event.icon}</div>
              <h2 className="text-xl font-semibold mb-1">{event.title}</h2>
              <p className="text-gray-400 text-sm">{event.description}</p>
            </Link>
          ))}
        </div>

        <footer className="mt-16 text-center text-sm text-gray-500">
          * All events are conducted <strong>offline</strong>. Dates will be
          announced soon.
        </footer>
      </div>
    </section>
  );
};

export default ChurchEventsHome;
