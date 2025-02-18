// src/app/components/Hero.tsx
export default function Hero() {
  return (
    <section className=" bg-gradient-to-br from-blue-600 via-black to-gray-800 text-white py-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
        {/* Left side: Text content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Connect, Inspire, Transform
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Your hub for local events and community engagement in Downtown Montclair!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="/signup"
              className="bg-white text-blue-600 font-semibold px-8 py-4 rounded shadow-lg hover:shadow-xl transition duration-300"
            >
              Get Started
            </a>
            <a
              href="/create-event"
              className="bg-white text-blue-600 font-semibold px-8 py-4 rounded shadow-lg hover:shadow-xl transition duration-300"
            >
              Create an event
            </a>
          </div>
        </div>
        {/* Right side: Image */}
        <div className="flex-1 mt-10 md:mt-0 flex justify-center">
          <img
            src="https://philcantor.com/images/05-Church-St-Sat-Nite-5-30-15_web-1024x680.jpg"
            alt="Community engagement"
            className="max-w-full h-auto rounded filter drop-shadow-[0_2px_2px_white] border-4 border-gray-200"
          />
        </div>
      </div>
    </section>
  );
}
