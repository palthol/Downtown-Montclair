// src/app/components/EventCard.tsx

type Event = {
  id: number;
  title: string;
  description: string;
  location: string;
};

type Props = {
 readonly event: Event;
};

export default function EventCard({ event }: Props) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-xl transition duration-300 p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{event.title}</h3>
      <p className="text-gray-600 mb-4">{event.description}</p>
      <p className="text-gray-500 font-semibold">{event.location}</p>
    </div>
  );
}
