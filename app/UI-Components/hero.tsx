export default function Hero() {
  return (
    <section className="relative h-[80vh] overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/draftVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional overlay to darken the video for better text readability */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Text content on top */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col justify-center h-full text-center md:text-left">
        <h1
          className="text-white text-4xl md:text-5xl font-extrabold mb-4"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Welcome to Downtown Montclair!
        </h1>
        <p className="text-white text-lg md:text-xl mb-8">
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
    </section>
  );
}