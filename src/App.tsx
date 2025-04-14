import { Routes, Route } from "react-router-dom";
import Navbar from "./components/homepage/Navbar";
import Hero from "./components/homepage/Hero";
import Tools from "./components/homepage/Tools";
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
              <Tools />
              <WhyMicrowrk />
              <Footer />
            </>
          }
        />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
<<<<<<< HEAD
        <Route path="/youtube-chapter-downloader" element={<YouTubeChapterDownloader />} />
=======
        <Route path="tools/YouTubeChapterDownloader" element={<YouTubeChapterDownloader />} />
        <Route path="tools/InstagramPostGenerator" element={<InstagramMain />} />
>>>>>>> b024619db86a41c8824f8aa6df69795c28ec0256
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
