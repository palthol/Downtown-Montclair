import { useState } from "react";
import HotelCard from "./hotelCard";

// Define a type for each hotel.
type Hotel = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  starRating: number;
  price: number;
};

export default function HotelCardList() {
  // State to store filtering selections.
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");

  // Dummy hotel data.
  const hotels: Hotel[] = [
    {
      id: 1,
      imageUrl: "https://via.placeholder.com/400x300",
      title: "Grand Plaza",
      description: "A luxury hotel with modern amenities.",
      starRating: 5,
      price: 250,
    },
    {
      id: 2,
      imageUrl: "https://via.placeholder.com/400x300",
      title: "Budget Inn",
      description: "Affordable and comfortable lodging.",
      starRating: 3,
      price: 80,
    },
    {
      id: 3,
      imageUrl: "https://via.placeholder.com/400x300",
      title: "City Lodge",
      description: "Cozy rooms in the heart of the city.",
      starRating: 4,
      price: 150,
    },
    {
      id: 4,
      imageUrl: "https://via.placeholder.com/400x300",
      title: "Economy Stay",
      description: "Budget-friendly rooms with essential services.",
      starRating: 2,
      price: 70,
    },
    {
      id: 5,
      imageUrl: "https://via.placeholder.com/400x300",
      title: "Luxury Suites",
      description: "Experience unparalleled luxury and service.",
      starRating: 5,
      price: 300,
    },
    {
      id: 6,
      imageUrl: "https://via.placeholder.com/400x300",
      title: "Comfort Hotel",
      description: "Well-appointed rooms at a great value.",
      starRating: 4,
      price: 120,
    },
  ];

  // Filter hotels based on selected star rating.
  let filteredHotels = hotels;
  if (selectedRating !== "all") {
    filteredHotels = filteredHotels.filter(
      (hotel) => hotel.starRating === parseInt(selectedRating)
    );
  }

  // Filter hotels based on selected price range.
  if (selectedPrice !== "all") {
    if (selectedPrice === "budget") {
      filteredHotels = filteredHotels.filter((hotel) => hotel.price < 100);
    } else if (selectedPrice === "midrange") {
      filteredHotels = filteredHotels.filter(
        (hotel) => hotel.price >= 100 && hotel.price <= 200
      );
    } else if (selectedPrice === "premium") {
      filteredHotels = filteredHotels.filter((hotel) => hotel.price > 200);
    }
  }

  // Get unique star ratings for filter buttons.
  const ratings = Array.from(
    new Set(hotels.map((hotel) => hotel.starRating.toString()))
  ).sort((a, b) => parseInt(a) - parseInt(b));

  return (
    // Outermost container with darkened background and outline.
    <div className="bg-gray-300 outline-2 outline-[#1F3B73] p-4 rounded">
      {/* Filter Controls */}
      <div className="mb-4 flex flex-col gap-4">
        {/* Star Rating Filter */}
        <div className="flex flex-wrap gap-2">
          <span className="font-bold text-[#1F3B73]">
            Filter by Star Rating:
          </span>
          <button
            onClick={() => setSelectedRating("all")}
            className={`px-4 py-2 rounded border border-[#1F3B73] transition ${
              selectedRating === "all"
                ? "bg-[#1F3B73] text-white"
                : "bg-white text-[#1F3B73]"
            }`}
          >
            All
          </button>
          {ratings.map((rating) => (
            <button
              key={rating}
              onClick={() => setSelectedRating(rating)}
              className={`px-4 py-2 rounded border border-[#1F3B73] transition ${
                selectedRating === rating
                  ? "bg-[#1F3B73] text-white"
                  : "bg-white text-[#1F3B73]"
              }`}
            >
              {rating} ★
            </button>
          ))}
        </div>
        {/* Price Filter */}
        <div className="flex flex-wrap gap-2">
          <span className="font-bold text-[#1F3B73]">Filter by Price:</span>
          <button
            onClick={() => setSelectedPrice("all")}
            className={`px-4 py-2 rounded border border-[#1F3B73] transition ${
              selectedPrice === "all"
                ? "bg-[#1F3B73] text-white"
                : "bg-white text-[#1F3B73]"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedPrice("budget")}
            className={`px-4 py-2 rounded border border-[#1F3B73] transition ${
              selectedPrice === "budget"
                ? "bg-[#1F3B73] text-white"
                : "bg-white text-[#1F3B73]"
            }`}
          >
            Budget
          </button>
          <button
            onClick={() => setSelectedPrice("midrange")}
            className={`px-4 py-2 rounded border border-[#1F3B73] transition ${
              selectedPrice === "midrange"
                ? "bg-[#1F3B73] text-white"
                : "bg-white text-[#1F3B73]"
            }`}
          >
            Midrange
          </button>
          <button
            onClick={() => setSelectedPrice("premium")}
            className={`px-4 py-2 rounded border border-[#1F3B73] transition ${
              selectedPrice === "premium"
                ? "bg-[#1F3B73] text-white"
                : "bg-white text-[#1F3B73]"
            }`}
          >
            Premium
          </button>
        </div>
      </div>

      {/* Grid Layout for Hotel Cards */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredHotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
            imageUrl={hotel.imageUrl}
            title={hotel.title}
            description={hotel.description}
            starRating={hotel.starRating}
            price={hotel.price}
          />
        ))}
      </div>
    </div>
  );
}