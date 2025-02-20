type Event = {
  id: number;
  title: string;
  description: string;
  location: string;
  address: string;
  imageUrl?: string;
};

type FeaturedEventCardProps = {
  event: Event;
};

export default function FeaturedEventCard({ event }: FeaturedEventCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
      <img
        src={event.imageUrl ?? "https://via.placeholder.com/600x400"}
        alt={event.title}
        className="w-full h-72 object-cover"
      />
      <div className="p-6">
        <div className="mb-2 text-xs text-gray-500 uppercase">Featured Event</div>
        <h3
          className="text-3xl font-bold text-[#1F3B73] mb-2"
          style={{ fontFamily: 'var(--font-headline)' }}
        >
          {event.title}
        </h3>
        <p className="text-gray-600 mb-4">{event.description}</p>
        <a
          href={`/events/${event.id}`}
          className="inline-block bg-[#00C2A0] text-white font-semibold py-2 px-4 rounded hover:bg-[#00a38d] transition"
        >
          Learn More
        </a>
      </div>
    </div>
  );
}