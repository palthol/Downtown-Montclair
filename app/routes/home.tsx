import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import NavBar from "../UI-Components/navbar";
import Footer from "../UI-Components/footer";
import Hero from "~/UI-Components/hero";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <main className="flex-grow">
        <Hero />;
        <Welcome />
      </main>
      <Footer />
    </div>
  );
}
