const quotes = [
  "Stay focused and never give up.",
  "Discipline is doing it even when you don’t feel like it.",
  "Small steps every day lead to big results.",
  "Push yourself, because no one else will do it for you.",
  "Dream big. Work hard. Stay humble.",
  "It's not about perfect. It's about effort.",
  "Success is built on consistency.",
];

const QuoteBox = () => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-xl text-left text-white max-w-xs">
      <p className="italic text-sm">{randomQuote}</p>
    </div>
  );
};

export default QuoteBox;
