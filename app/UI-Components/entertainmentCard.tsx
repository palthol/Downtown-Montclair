type EntertainmentCardProps = {
    imageUrl: string;
    title: string;
    description: string;
    location: string; // new property
  };
  
  export default function EntertainmentCard({
    imageUrl,
    title,
    description,
    location,
  }: EntertainmentCardProps) {
    return (
      <div className="bg-white rounded-lg shadow transform transition-transform duration-300 hover:scale-105 hover:shadow-xl overflow-hidden">
        {/* Card image */}
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          {/* Card title using Montserrat for headings */}
          <h3
            className="text-xl font-bold text-[#1F3B73]"
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
            className="mt-2 text-sm text-gray-600 transition-colors duration-300 hover:text-[#1F3B73]"
            style={{ fontFamily: "Open Sans, sans-serif" }}
          >
            {location}
          </p>
          {/* Call-to-action button */}
          <button
            type="button"
            className="inline-block mt-4 border border-[#1F3B73] text-[#1F3B73] py-2 px-4 rounded hover:bg-[#1F3B73] hover:text-white transition-colors duration-300"
          >
            Learn More
          </button>
        </div>
      </div>
    );
  }