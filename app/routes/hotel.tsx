import type { Route } from "./+types/hotel";
import NavBar from "~/components/1general/navbar";
import Footer from "~/components/1general/footer";
import HotelCardList from "~/components/hotels/hotelCardList";
import { AuthProvider } from "~/context/AuthContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Hotel() {
  return (
<AuthProvider>
<div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow container mx-auto px-6 py-12">
        <HotelCardList />
      </main>
      <Footer />
    </div>
    </AuthProvider>
  );
}