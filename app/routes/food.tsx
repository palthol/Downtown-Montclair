import type { Route } from "./+types/food";
import NavBar from "../UI-Components/navbar";
import Footer from "../UI-Components/footer";
import FoodCardList from "../UI-Components/foodCardList";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function food() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      {/* Main content area with FoodCardList */}
      <main className="flex-grow container mx-auto px-6 py-12">
        <FoodCardList />
      </main>

      <Footer />
    </div>
  );
}