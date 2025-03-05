// Update the props type to include address
type HotelCardProps = {
  imageUrl: string;
  title: string;
  description: string;
  starRating: number;
  price: number;
  address?: string; // New optional address prop
};
  
export default function HotelCard({
  imageUrl,
  title,
  description,
  starRating,
  price,
  address,
}: HotelCardProps) {
  // Create Google Maps URL
  const createGoogleMapsUrl = () => {
    if (!address) return "#";
    const query = encodeURIComponent(`${title}, ${address}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  return (
    <div className="bg-white rounded-lg shadow transition-transform duration-300 hover:scale-105 hover:shadow-xl overflow-hidden">
      {/* Hotel image */}
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.currentTarget.src = "https://via.placeholder.com/400x300?text=No+Image";
        }}
      />
      <div className="p-4">
        {/* Hotel title */}
        <h3
          className="text-xl font-bold text-[#1F3B73]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {title}
        </h3>
        {/* Hotel description */}
        <p
          className="text-gray-700 mt-2"
          style={{ fontFamily: "Open Sans, sans-serif" }}
        >
          {description}
        </p>
        {/* Display star rating */}
        <p className="mt-2 text-sm text-gray-600">
          Star Rating: {starRating} ⭐
        </p>
        {/* Display price */}
        <p className="mt-2 text-sm text-gray-600">
          Price: ${price}
        </p>
        {/* Display address if available */}
        {address && (
          <p className="mt-2 text-sm text-gray-600">
            <span className="font-semibold">Address:</span> {address}
          </p>
        )}
        {/* Action buttons */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            className="flex-1 border border-[#1F3B73] text-[#1F3B73] py-2 px-4 rounded hover:bg-[#1F3B73] hover:text-white transition-colors duration-300"
          >
            Learn More
          </button>
          {address && (
            <a
              href={createGoogleMapsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#1F3B73] text-white py-2 px-4 rounded text-center hover:bg-[#152a54] transition-colors duration-300"
            >
              View on Maps
            </a>
          )}
        </div>
      </div>
    </div>
  );
}