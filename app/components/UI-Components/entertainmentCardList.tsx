import { useState } from "react";
import EntertainmentCard from "./entertainmentCard";

// Define a type for each place object, including location and genre.
type Place = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  genre: string;
  location: string;
};

export default function EntertainmentCardList() {
  // State to store the selected genre filter.
  const [selectedGenre, setSelectedGenre] = useState("all");
  // Dummy data including 6 entries with added location values.
  const places: Place[] = [
    {
      id: 1,
      imageUrl: "https://via.placeholder.com/400x300",
      title: "Montclair Art Museum",
      description: "Immerse yourself in the vibrant art scene at the Montclair Art Museum.",
      genre: "art",
      location: "Downtown Montclair",
    },
    {
      id: 2,
      imageUrl: "https://via.placeholder.com/400x300",
      title: "Downtown Park",
      description: "Relax and enjoy the outdoors at our scenic downtown park.",
      genre: "nature",
      location: "Central Park Area",
    },
    {
      id: 3,
      imageUrl: "https://via.placeholder.com/400x300",
      title: "Historic Theater",
      description: "Catch a play or classic film at our beautifully restored theater.",
      genre: "culture",
      location: "Main Street",
    },
    {
      id: 4,
      imageUrl: "https://via.placeholder.com/400x300",
      title: "City Gallery",
      description: "Experience local art in a modern setting at this popular gallery.",
      genre: "art",
      location: "Cultural District",
    },
    {
      id: 5,
      imageUrl: "https://via.placeholder.com/400x300",
      title: "Botanical Gardens",
      description: "Explore lush landscapes and seasonal blooms at the botanical gardens.",
      genre: "nature",
      location: "West End",
    },
    {
      id: 6,
      imageUrl: "https://via.placeholder.com/400x300",
      title: "Modern Library",
      description: "Discover stunning architecture and an extensive collection of books.",
      genre: "culture",
      location: "Library Plaza",
    },
  ];

  // Get unique genres from the data.
  const genres = Array.from(new Set(places.map((p) => p.genre)));

  // Filter places based on the selected genre.
  const filteredPlaces =
    selectedGenre === "all"
      ? places
      : places.filter((place) => place.genre === selectedGenre);

  return (
    // Outermost container with a darkened background and outline.
    <div className="bg-gray-300 outline-2 outline-[#1F3B73] p-4 rounded">
      {/* Filter buttons */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedGenre("all")}
          className={`px-4 py-2 rounded border border-[#1F3B73] transition ${
            selectedGenre === "all"
              ? "bg-[#1F3B73] text-white"
              : "bg-white text-[#1F3B73]"
          }`}
        >
          All
        </button>
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-2 rounded border border-[#1F3B73] transition ${
              selectedGenre === genre
                ? "bg-[#1F3B73] text-white"
                : "bg-white text-[#1F3B73]"
            }`}
          >
            {genre.charAt(0).toUpperCase() + genre.slice(1)}
          </button>
        ))}
      </div>

      {/* Responsive grid layout for the cards */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredPlaces.map((place) => (
          <EntertainmentCard
            key={place.id}
            imageUrl={place.imageUrl}
            title={place.title}
            description={place.description}
            location={place.location} // Pass the location prop down
          />
        ))}
      </div>
    </div>
  );
}