import { Routes, Route } from "react-router-dom";
import Navbar from "./components/homepage/Navbar";
import Hero from "./components/homepage/Hero";
import FeaturedTools from "./components/homepage/FeaturedTools";
import Footer from "./components/homepage/Footer";
import WhyMicrowrk from "./components/homepage/WhyMicrowrk";
import PrivacyPolicy from "./components/footercontents/Privacy";
import TermsOfService from "./components/footercontents/Terms";
import { Analytics } from "@vercel/analytics/react";
import YouTubeChapterDownloader from "./components/Tools/yt-downloader/YouTubeChapterDownloader";
import InstagramMain from "./components/Tools/InstagramPostGenerator/instagramMain";

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
              <Hero />
              <FeaturedTools />
              <WhyMicrowrk />
              <Footer />
            </>
          }
        />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="tools/YouTubeChapterDownloader" element={<YouTubeChapterDownloader />} />
        <Route path="tools/InstagramPostGenerator" element={<InstagramMain />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
