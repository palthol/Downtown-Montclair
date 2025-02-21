import type { Route } from "./+types/entertainment";
import NavBar from "../UI-Components/navbar";
import Footer from "../UI-Components/footer";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}


export default function entertainment() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <main className="flex-grow">
     
        
       
      </main>
      <Footer />
    </div>
  );
}
