import type { Route } from "./+types/food";
import NavBar from "~/components/1general/navbar";
import Footer from "~/components/1general/footer";
// import FoodCardList from "~/components/UI-Components/foodCardList";
import { AuthProvider } from "~/context/AuthContext";
import RestaurantList from "~/components/food-and-drink/RestuarantList";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Food() {
  return (
    <AuthProvider>
    <div className="flex flex-col min-h-screen">
      <NavBar />

      {/* Main content area with FoodCardList */}
      <main className="flex-grow container mx-auto px-6 py-12">
        {/* <FoodCardList /> */}
        <RestaurantList />
      </main>

      <Footer />
    </div>
    </AuthProvider>
  );
}