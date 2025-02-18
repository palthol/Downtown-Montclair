// src/app/components/EventList.tsx
import EventCard from "./eventCard";

type Event = {
  id: number;
  title: string;
  description: string;
  location: string;
};

export default function EventList() {
  // Dummy data for events
  const events: Event[] = [
    { id: 1, title: "Community Meetup", description: "Join us for a fun community gathering.", location: "Downtown" },
    { id: 2, title: "Art Exhibition", description: "Explore local art and creativity.", location: "Gallery 1" },
    { id: 3, title: "Music Concert", description: "Live performances by local bands.", location: "Central Park" },
  ];

  return (
    <section className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Upcoming Events</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
