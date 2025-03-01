import type { Route } from "./+types/home";
import NavBar from "~/components/UI-Components/navbar";
import Footer from "~/components/UI-Components/footer";
import Hero from "~/components/UI-Components/hero";
import EventList from "~/components/UI-Components/eventList";
import PostList from "~/components/UI-Components/postList";
import { AuthProvider } from "~/context/AuthContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Downtown Montclair" },
    { name: "description", content: "Discover the best events, dining, and attractions in Downtown Montclair for a personalized experience!" },
  ];
}

export default function Home() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow">
          <Hero />
          <EventList />
          <PostList />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}