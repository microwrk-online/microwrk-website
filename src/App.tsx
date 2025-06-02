import { Routes, Route } from "react-router-dom";
import Navbar from "./components/homepage/Navbar";
import Hero from "./components/homepage/Hero";
import Tools from "./components/homepage/Tools";
import Footer from "./components/homepage/Footer";
import WhyMicrowrk from "./components/homepage/WhyMicrowrk";
import PrivacyPolicy from "./components/homepage/footercontents/Privacy";
import TermsOfService from "./components/homepage/footercontents/Terms";
import { Analytics } from "@vercel/analytics/react";
// import YouTubeChapterDownloader from "./components/Tools/yt-downloader/YouTubeChapterDownloader";
import InstagramPostGenerator from "./components/Tools/instagram-post-generator/InstagramPostGenerator";
import WaterWash from "./components/waterwash/WaterWash";
import Sstv from "./components/sstv/Sstv";
import Zenstream from "./components/zenstream/zenstream";

// import CompetitionsHome from "./components/trio-25/CompetitionsHome";
// import MemoryVerseForm from "./components/trio-25/eventsPage/MemoryVerseForm";
// import SingingForm from "./components/trio-25/eventsPage/SingingForm";
// import BibleQuizForm from "./components/trio-25/eventsPage/BibleQuizForm";

function App() {
  return (
    <>
      {/* Vercel Analytics */}
      <Analytics />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <section id="hero">
                <Hero />
              </section>
              <section id="tools">
                <Tools />
              </section>
              <section id="why">
                <WhyMicrowrk />
              </section>
              <Footer />
            </>
          }
        />

        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route
          path="/youtube-chapter-downloader"
          // element={<YouTubeChapterDownloader />}
        />
        <Route
          path="/instagram-post-generator"
          element={<InstagramPostGenerator />}
        />

        {/* temporary church events */}
        <Route path="/waterwash" element={<WaterWash />} />

        {/* anniversary events church */}
        {/* <Route path="/events" element={<CompetitionsHome />} />
        <Route path="/events/memory-verse" element={<MemoryVerseForm />} />
        <Route path="/events/singing" element={<SingingForm />} />
        <Route path="/events/bible-quiz" element={<BibleQuizForm />} /> */}
        {/* <Route path="/events" element={<CompetitionsHome />} />
        <Route path="/events" element={<CompetitionsHome />} /> */}

        <Route path="/sstv" element={<Sstv />} />
        <Route path="/zenstream" element={<Zenstream />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
