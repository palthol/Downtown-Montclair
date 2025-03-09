import type { Route } from "./+types/dashboard";
import NavBar from "~/components/1general/navbar";
import Footer from "~/components/1general/footer";
import { AuthProvider } from "~/context/AuthContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Downtown Montclair" },
    { name: "description", content: "Discover the best events, dining, and attractions in Downtown Montclair for a personalized experience!" },
  ];
}

export default function UserSettings() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow">
          <div className="flex items-center justify-center h-full">
            <h1 className="text-3xl font-bold">Page Coming Soon</h1>
          </div>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}