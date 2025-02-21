import type { Route } from "./+types/hotel";
import NavBar from "../UI-Components/navbar";
import Footer from "../UI-Components/footer";
import HotelCardList from "../UI-Components/hotelCardList";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function hotel() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow container mx-auto px-6 py-12">
        <HotelCardList />
      </main>
      <Footer />
    </div>
  );
}