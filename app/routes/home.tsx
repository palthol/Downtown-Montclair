import type { Route } from "./+types/home";
import NavBar from "~/components/1general/navbar";
import Footer from "~/components/1general/footer";
import Hero from "~/components/home/hero";
import EventList from "~/components/home/eventList";
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
          {/* <PostList /> */}
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}