import { useState } from "react";
import EventCard from "./eventCard";
import FeaturedEventCard from "./FeaturedEventCard";

type Event = {
  id: number;
  title: string;
  description: string;
  location: string;
  address: string;
  imageUrl?: string;
};

export default function EventList() {
  const [eventType, setEventType] = useState("upcoming");

  const events: Event[] = [
    {
      id: 1,
      title: "Community Cafe Meetup",
      description: "Join us for a fun community gathering.",
      location: "Montclair Center",
      address: "10 Park Street, Montclair, NJ 07042",
      imageUrl:
        "https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g",
    },
    {
      id: 2,
      title: "Art Exhibition",
      description: "Explore local art and creativity.",
      location: "Montclair Art Museum",
      address: "3 S Mountain Ave, Montclair, NJ 07042",
      imageUrl:
        "https://fastly.picsum.photos/id/36/4179/2790.jpg?hmac=OCuYYm0PkDCMwxWhrtoSefG5UDir4O0XCcR2x-aSPjs",
    },
    {
      id: 3,
      title: "Library Reading",
      description: "Join a reading session at the library.",
      location: "Montclair Public Library",
      address: "185 Bloomfield Ave, Montclair, NJ 07042",
      imageUrl:
        "https://fastly.picsum.photos/id/24/4855/1803.jpg?hmac=ICVhP1pUXDLXaTkgwDJinSUS59UWalMxf4SOIWb9Ui4",
    },
    {
      id: 4,
      title: "Montclair Porchfest",
      description:
        "Experience an unforgettable night of family-friendly, FREE Music Festival in Montclair NJ",
      location: "Jazz Lounge",
      address: "123 Harmony Avenue, Montclair, NJ 07042",
      imageUrl:
        "https://img1.wsimg.com/isteam/ip/3459abab-864c-4a20-801d-45e33e14dd6f/Montclair%20Porchfest%20Logo.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1160,h:1547",
    },
  ];

  // Find the featured event (with id 4)
  const featuredEvent = events.find((event) => event.id === 4);
  // Filter out the featured event for the grid
  const regularEvents = events.filter((event) => event.id !== 4);

  return (
    <section className="pt-12 pb-12">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Events</h2>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="p-2 bg-white text-[#1F3B73] rounded"
          >
            <option value="upcoming">Upcoming Events</option>
            <option value="trending">Trending Events</option>
            <option value="closest">Closest to You</option>
          </select>
        </div>

        {/* Render the featured event above the grid */}
        {featuredEvent && (
          <div className="mb-12">
            <FeaturedEventCard event={featuredEvent} />
          </div>
        )}

        {/* Render the remaining events in a grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {regularEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}