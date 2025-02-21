type HotelCardProps = {
    imageUrl: string;
    title: string;
    description: string;
    starRating: number;
    price: number;
  };
  
  export default function HotelCard({
    imageUrl,
    title,
    description,
    starRating,
    price,
  }: HotelCardProps) {
    return (
      <div className="bg-white rounded-lg shadow transition-transform duration-300 hover:scale-105 hover:shadow-xl overflow-hidden">
        {/* Hotel image */}
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
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
          {/* Call-to-action button */}
          <button
            type="button"
            className="mt-4 inline-block border border-[#1F3B73] text-[#1F3B73] py-2 px-4 rounded hover:bg-[#1F3B73] hover:text-white transition-colors duration-300"
          >
            Learn More
          </button>
        </div>
      </div>
    );
  }