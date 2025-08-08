import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedTools from '@/components/FeaturedTools';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#111111]">
      <Navbar />
      <Hero />
      <FeaturedTools />
      <Footer />
    </div>
  );
}