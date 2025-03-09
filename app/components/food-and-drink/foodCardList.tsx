import { useState } from "react";
import FoodCard from "./foodCard";

// Define a type for each food place, including an optional cuisine if the foodType is "ethnic".
type FoodPlace = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  foodType: string;
  cuisine?: string;
};

export default function FoodCardList() {
  // State for the selected overall food type and, when applicable, the selected cuisine.
  const [selectedFoodType, setSelectedFoodType] = useState("all");
  const [selectedCuisine, setSelectedCuisine] = useState("all");

  // Dummy data with various food types.
  const foodPlaces: FoodPlace[] = [
    {
      id: 1,
      imageUrl: "https://via.placeholder.com/400x300",
      title: "Burger Joint",
      description: "Delicious burgers with crispy fries.",
      foodType: "fast",
    },
    {
      id: 2,
      imageUrl: "https://via.placeholder.com/400x300",
      title: "Green Salad Corner",
      description: "Fresh and healthy salads to boost your energy.",
      foodType: "vegan",
    },
    {
      id: 3,
      imageUrl: "https://via.placeholder.com/400x300",
      title: "Sushi Palace",
      description: "Authentic Japanese sushi with fresh ingredients.",
      foodType: "ethnic",
      cuisine: "japanese",
    },
    {
      id: 4,
      imageUrl: "https://via.placeholder.com/400x300",
      title: "Russian Deli",
      description: "Traditional Russian dishes served with a modern twist.",
      foodType: "ethnic",
      cuisine: "russian",
    },
    {
      id: 5,
      imageUrl: "https://via.placeholder.com/400x300",
      title: "Tapas Bar",
      description: "Enjoy a variety of Spanish tapas in a lively setting.",
      foodType: "ethnic",
      cuisine: "spanish",
    },
    {
      id: 6,
      imageUrl: "https://via.placeholder.com/400x300",
      title: "Vegan Delight",
      description: "Innovative vegan dishes that don't compromise on taste.",
      foodType: "vegan",
    },
  ];

  // Extract unique food types from the data.
  const foodTypes = Array.from(new Set(foodPlaces.map((place) => place.foodType)));

  // For ethnic foods, get unique cuisine values.
  const ethnicCuisines = Array.from(
    new Set(
      foodPlaces
        .filter((place) => place.foodType === "ethnic" && place.cuisine)
        .map((place) => place.cuisine!)
    )
  );

  // Filter foodPlaces based on the selected food type.
  let filteredFood = foodPlaces;
  if (selectedFoodType !== "all") {
    filteredFood = foodPlaces.filter((place) => place.foodType === selectedFoodType);
  }
  // When "ethnic" is selected, further filter by the selected cuisine.
  if (selectedFoodType === "ethnic" && selectedCuisine !== "all") {
    filteredFood = filteredFood.filter((place) => place.cuisine === selectedCuisine);
  }

  return (
    <div className="bg-gray-300 outline-2 outline-[#1F3B73] p-4 rounded">
      {/* Food Type Filter Buttons */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => {
            setSelectedFoodType("all");
            setSelectedCuisine("all");
          }}
          className={`px-4 py-2 rounded border border-[#1F3B73] transition ${
            selectedFoodType === "all"
              ? "bg-[#1F3B73] text-white"
              : "bg-white text-[#1F3B73]"
          }`}
        >
          All
        </button>
        {foodTypes.map((type) => (
          <button
            key={type}
            onClick={() => {
              setSelectedFoodType(type);
              setSelectedCuisine("all");
            }}
            className={`px-4 py-2 rounded border border-[#1F3B73] transition ${
              selectedFoodType === type
                ? "bg-[#1F3B73] text-white"
                : "bg-white text-[#1F3B73]"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Additional Ethnic Cuisine Filter (shown only when "ethnic" is selected) */}
      {selectedFoodType === "ethnic" && (
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCuisine("all")}
            className={`px-4 py-2 rounded border border-[#1F3B73] transition ${
              selectedCuisine === "all"
                ? "bg-[#1F3B73] text-white"
                : "bg-white text-[#1F3B73]"
            }`}
          >
            All Cuisines
          </button>
          {ethnicCuisines.map((cuisine) => (
            <button
              key={cuisine}
              onClick={() => setSelectedCuisine(cuisine)}
              className={`px-4 py-2 rounded border border-[#1F3B73] transition ${
                selectedCuisine === cuisine
                  ? "bg-[#1F3B73] text-white"
                  : "bg-white text-[#1F3B73]"
              }`}
            >
              {cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Responsive grid layout for the food cards */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredFood.map((place) => (
          <FoodCard
            key={place.id}
            imageUrl={place.imageUrl}
            title={place.title}
            description={place.description}
            foodType={place.foodType}
            cuisine={place.cuisine}
          />
        ))}
      </div>
    </div>
  );
}