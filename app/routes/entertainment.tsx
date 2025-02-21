import type { Route } from "./+types/entertainment";
import NavBar from "../UI-Components/navbar";
import Footer from "../UI-Components/footer";
import EntertainmentCardList from "../UI-Components/entertainmentCardList";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Explore Downtown Montclair" },
    { name: "description", content: "Discover fun places to visit in downtown Montclair" },
  ];
}

export default function entertainment() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      {/* Brief intro / hero section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold text-[#1F3B73]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Explore Downtown Montclair
          </h1>
          <p className="mt-4 text-gray-700" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            Find the best places to experience art, culture, nature, and lifestyle in our vibrant downtown.
          </p>
        </div>
      </section>

      {/* Grid of Entertainment / Place Cards */}
      <main className="flex-grow container mx-auto px-6 py-12">
      <EntertainmentCardList />
      </main>

      <Footer />
    </div>
  );
}