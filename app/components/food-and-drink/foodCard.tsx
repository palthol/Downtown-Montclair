type FoodCardProps = {
    imageUrl: string;
    title: string;
    description: string;
    foodType: string;
    cuisine?: string;
  };
  
  export default function FoodCard({
    imageUrl,
    title,
    description,
    foodType,
    cuisine,
  }: FoodCardProps) {
    return (
      <div className="bg-white rounded-lg shadow transform transition-transform duration-300 hover:scale-105 hover:shadow-xl overflow-hidden">
        {/* Card image */}
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          {/* Card title */}
          <h3
            className="text-xl font-bold text-[#1F3B73]"
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
          {/* Display food type and, if provided, cuisine */}
          <p
            className="mt-2 text-sm text-gray-600"
            style={{ fontFamily: "Open Sans, sans-serif" }}
          >
            {foodType} {cuisine ? `- ${cuisine}` : ""}
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