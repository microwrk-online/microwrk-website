'use client';

const FeaturedTools = () => {
  const tools = [
    {
      title: '🤖 Telegram Bot Panel',
      description: 'Control your PC remotely through Telegram bot commands with advanced automation features.',
      status: 'coming-soon',
      buttonText: 'Coming Soon'
    },
    {
      title: '📸 Instagram Post Generator',
      description: 'Create stunning Instagram posts with AI-powered design templates and automatic text generation.',
      status: 'available',
      buttonText: 'Try Tool'
    },
    {
      title: '⏰ Daily Reminder Bot',
      description: 'Never forget important tasks with smart reminders sent directly to your preferred channels.',
      status: 'coming-soon',
      buttonText: 'Coming Soon'
    },
    {
      title: '📊 Data Analysis Bot',
      description: 'Analyze your data effortlessly with our Telegram bot that provides insights and visualizations.',
      status: 'available',
      buttonText: 'Try Tool'
    },
    {
      title: '🌐 URL Shortener Bot',
      description: 'Shorten and manage your URLs directly from Telegram with advanced tracking features.',
      status: 'available',
      buttonText: 'Try Tool'
    },
    {
      title: '🎥 YouTube Chapter Downloader',
      description: 'Download YouTube videos by chapters or extract specific timestamps with ease.',
      status: 'available',
      buttonText: 'Try Tool'
    },
  ];

  return (
    <section id="tools" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#00f2a9] mb-6">
            Featured Tools
          </h2>
          <p className="text-lg md:text-xl text-[#aaaaaa] max-w-2xl mx-auto">
            Discover our collection of powerful automation tools designed to simplify your daily workflow and boost productivity.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800 hover:border-[#00f2a9] transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl"
            >
              {/* Tool Title */}
              <h3 className="text-xl font-semibold text-white mb-4">
                {tool.title}
              </h3>
              
              {/* Tool Description */}
              <p className="text-[#aaaaaa] mb-6 leading-relaxed">
                {tool.description}
              </p>
              
              {/* Action Button */}
              <button
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  tool.status === 'available'
                    ? 'bg-[#00f2a9] font-semibold text-black hover:bg-[#00d694] hover:shadow-lg'
                    : 'bg-gray-700 text-gray-300 cursor-not-allowed'
                }`}
                disabled={tool.status === 'coming-soon'}
              >
                {tool.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTools;