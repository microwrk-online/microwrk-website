'use client';

const Hero = () => {
  const scrollToTools = () => {
    const toolsSection = document.getElementById('featured-tools');
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="text-center max-w-4xl mx-auto">
        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-[#00f2a9] mb-6">
          microwrk.online
        </h1>
        
        {/* Subheading with emoji */}
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 flex items-center justify-center gap-3 flex-wrap">
          Automate daily tasks
          <span className="text-4xl md:text-6xl">⏳</span>
        </h2>
        
        {/* Description */}
        <p className="text-lg md:text-xl text-[#aaaaaa] mb-12 max-w-2xl mx-auto leading-relaxed">
          Explore our free utilities — from Telegram PC control to YouTube chapter downloads.
        </p>
        
        {/* CTA Button */}
        <button
          onClick={scrollToTools}
          className="bg-[#00f2a9] text-black font-semibold text-lg px-8 py-4 rounded-lg hover:bg-[#00d694] transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Browse Tools
        </button>
      </div>
    </section>
  );
};

export default Hero;