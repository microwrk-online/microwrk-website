import { Routes, Route } from "react-router-dom";
import Navbar from "./components/homepage/Navbar";
import Hero from "./components/homepage/Hero";
import Tools from "./components/homepage/Tools";
import Footer from "./components/homepage/Footer";
import WhyMicrowrk from "./components/homepage/WhyMicrowrk";
import PrivacyPolicy from "./components/footercontents/Privacy";
import TermsOfService from "./components/footercontents/Terms";
import { Analytics } from "@vercel/analytics/react";
// import YouTubeChapterDownloader from "./components/Tools/yt-downloader/YouTubeChapterDownloader";
import InstagramPostGenerator from "./components/Tools/instagram-post-generator/InstagramPostGenerator";
import WaterWash from "./components/waterwash/WaterWash";

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
        <Route path="/waterwash" element={<WaterWash />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
