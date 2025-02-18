// src/app/components/Hero.tsx


export default function Hero() {
  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Connect, Inspire, Transform
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Your hub for local events and community engagement.
        </p>
        <a
          href="/signup"
          className="bg-white text-blue-600 font-semibold px-8 py-4 rounded shadow-lg hover:shadow-xl transition duration-300"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}
