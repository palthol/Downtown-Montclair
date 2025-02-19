export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-[#1F3B73] via-[#FF6F61] to-[#00C2A0] text-white py-[10vh]">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
        {/* Left side: Text content */}
        <div className="flex-1 text-center md:text-left">
          <h1
            className="text-4xl md:text-5xl font-extrabold mb-4"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            Welcome to Downtown Montclair!
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Discover the best local spots for food, culture, and entertainment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="/signup"
              className="bg-white text-[#1F3B73] font-semibold px-8 py-4 rounded shadow-lg hover:shadow-xl transition duration-300"
            >
              Get Started
            </a>
            <a
              href="/create-event"
              className="bg-white text-[#1F3B73] font-semibold px-8 py-4 rounded shadow-lg hover:shadow-xl transition duration-300"
            >
              Create an Event
            </a>
          </div>
        </div>
        {/* Right side: Image */}
        <div className="flex-1 mt-10 md:mt-0 flex justify-center">
          <img
            src="https://philcantor.com/images/05-Church-St-Sat-Nite-5-30-15_web-1024x680.jpg"
            alt="Community engagement"
            className="max-w-full h-auto rounded filter drop-shadow-[0_4px_4px_white] border-4 border-[#F5F5F5]"
          />
        </div>
      </div>
    </section>
  );
}