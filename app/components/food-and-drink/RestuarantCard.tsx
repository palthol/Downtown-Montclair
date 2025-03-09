type RestaurantCardProps = {
    imageUrl: string;
    title: string;
    description: string;
    cuisine: string;
    address: string;
  };
  
  export default function RestaurantCard({
    imageUrl,
    title,
    description,
    cuisine,
    address,
  }: RestaurantCardProps) {
    // Create Google Maps URL
    const createGoogleMapsUrl = () => {
      const query = encodeURIComponent(`${title}, ${address}`);
      return `https://www.google.com/maps/search/?api=1&query=${query}`;
    };
  
    // Format cuisines (if comma-separated)
    const cuisineList = typeof cuisine === 'string' && cuisine 
    ? cuisine
        .split(',')
        .map(item => item.trim())
        .map(item => item.charAt(0).toUpperCase() + item.slice(1))
        .join(', ')
    : 'Not specified';
  
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
          {/* Restaurant name */}
          <h3
            className="text-xl font-bold text-black"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {title}
          </h3>
          
          {/* Description */}
          <p
            className="text-gray-700 mt-2"
            style={{ fontFamily: "Open Sans, sans-serif" }}
          >
            {description}
          </p>
          
          {/* Cuisine */}
          <p
            className="mt-2 text-sm text-gray-600"
            style={{ fontFamily: "Open Sans, sans-serif" }}
          >
            <span className="font-semibold">Cuisine:</span> {cuisineList}
          </p>
          
          {/* Address */}
          <p
            className="mt-1 text-sm text-gray-600"
            style={{ fontFamily: "Open Sans, sans-serif" }}
          >
            <span className="font-semibold">Address:</span> {address}
          </p>
          
          {/* Buttons */}
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