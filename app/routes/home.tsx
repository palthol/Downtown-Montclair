import type { Route } from "./+types/home";
import NavBar from "../components/UI-Components/navbar";
import Footer from "../components/UI-Components/footer";
import Hero from "~/components/UI-Components/hero";
import EventList from "~/components/UI-Components/eventList";
import PostList from "~/components/UI-Components/postList";
import TestProfiles from "~/components/profiles";



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
     
        <Hero />
        <EventList />
        <PostList/>
       {/* test */}
       <TestProfiles/>
      </main>
      <Footer />
    </div>
  );
}
