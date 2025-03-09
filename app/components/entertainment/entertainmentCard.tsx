type EntertainmentCardProps = {
  imageUrl: string;
  title: string;
  description: string;
  location: string; 
};

export default function EntertainmentCard({
  imageUrl,
  title,
  description,
  location,
}: EntertainmentCardProps) {
  // Create Google Maps URL (same approach as in RestaurantCard)
  const createGoogleMapsUrl = () => {
    const query = encodeURIComponent(`${title}, ${location}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  return (
    <div className="bg-white rounded-lg shadow transform transition-transform duration-300 hover:scale-105 hover:shadow-xl overflow-hidden">
      {/* Card image */}
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.currentTarget.src = "https://via.placeholder.com/400x300?text=No+Image";
        }}
      />
      <div className="p-4">
        {/* Card title using Montserrat for headings */}
        <h3
          className="text-xl font-bold text-black"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {title}
        </h3>
        
        {/* Card description using Open Sans for body text */}
        <p
          className="text-gray-700 mt-2"
          style={{ fontFamily: "Open Sans, sans-serif" }}
        >
          {description}
        </p>
        
        {/* Display Location with subtle hover effect */}
        <p
          className="mt-2 text-sm text-gray-600 transition-colors duration-300 hover:text-black"
          style={{ fontFamily: "Open Sans, sans-serif" }}
        >
          <span className="font-semibold">Address:</span> {location}
        </p>
        
        {/* Buttons - same layout as RestaurantCard */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            className="flex-1 border border-black text-black py-2 px-4 rounded hover:bg-black hover:text-white transition-colors duration-300"
          >
            Learn More
          </button>
          <a
            href={createGoogleMapsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-black text-white py-2 px-4 rounded text-center hover:bg-[#152a54] transition-colors duration-300"
          >
            View on Maps
          </a>
        </div>
      </div>
    </div>
  );
}