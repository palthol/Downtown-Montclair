type Event = {
  id: number;
  title: string;
  description: string;
  location: string;
  address: string;
  imageUrl?: string;
};

type Props = {
  readonly event: Event;
};

export default function EventCard({ event }: Props) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-xl transition duration-300 p-6">
      <img
        src={event.imageUrl ?? "https://via.placeholder.com/300x200"}
        alt={event.title}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <div className="mb-2 text-xs text-gray-500 uppercase">Article</div>
      <h3
        className="text-2xl font-bold text-[#1F3B73] mb-2"
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
  );
}