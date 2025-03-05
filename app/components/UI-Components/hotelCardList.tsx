import { useState, useEffect } from "react";
import { supabase } from "~/supabase/supabaseClient";
import HotelCard from "./hotelCard";

// Type definition for hotel data from Supabase
type Hotel = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  address: string;
  star_rating: number;
  price_per_night: number;
};

type HotelListProps = {
  pageSize?: number;
};

export default function HotelList({ pageSize = 6 }: HotelListProps) {
  // State for pagination, filters and search
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  
  // State for data loading and errors
  const [data, setData] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Fetch hotel data when page or page size changes
  useEffect(() => {
    const fetchHotels = async () => {
      setIsLoading(true);
      try {
        const from = (currentPage - 1) * pageSize;
        const to = from + pageSize - 1;
        
        let query = supabase
          .from('hotels')
          .select('*')
          .range(from, to);

        // Apply rating filter if selected
        if (selectedRating !== "all") {
          query = query.eq('star_rating', parseInt(selectedRating));
        }
        
        // Apply price filter if selected
        if (selectedPrice !== "all") {
          if (selectedPrice === "budget") {
            query = query.lt('price_per_night', 100);
          } else if (selectedPrice === "midrange") {
            query = query.gte('price_per_night', 100).lte('price_per_night', 200);
          } else if (selectedPrice === "premium") {
            query = query.gt('price_per_night', 200);
          }
        }
        
        const { data: hotelData, error: supabaseError } = await query;
        
        if (supabaseError) throw supabaseError;
        setData(hotelData as Hotel[]);
        setIsError(false);
      } catch (err) {
        setIsError(true);
        setError(err instanceof Error ? err : new Error("Failed to load hotels"));
        console.error("Error fetching hotels:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotels();
  }, [currentPage, pageSize, selectedRating, selectedPrice]);

  // Get unique star ratings for filter buttons
  const [ratings, setRatings] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const { data: ratingData, error } = await supabase
          .from('hotels')
          .select('star_rating')
          .order('star_rating');
        
        if (error) throw error;
        
        if (ratingData) {
          // Create a set of unique ratings and convert to array
          const uniqueRatings = new Set<string>();
          ratingData.forEach(item => {
            if (item.star_rating) {
              uniqueRatings.add(item.star_rating.toString());
            }
          });
          
          setRatings(Array.from(uniqueRatings).sort());
        }
      } catch (err) {
        console.error("Error fetching star ratings:", err);
      }
    };
    
    fetchRatings();
  }, []);

  // Filter hotels based on search term
  const filteredHotels = data?.filter(hotel => {
    const matchesSearch = searchTerm === "" ||
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  }) || [];

  // Calculate pagination info
  const hasMore = data?.length === pageSize;

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle page navigation
  const goToNextPage = () => {
    if (hasMore) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // Create Google Maps URL helper function
  const createGoogleMapsUrl = (name: string, address: string) => {
    const query = encodeURIComponent(`${name}, ${address}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1F3B73]"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error ? error.message : "Failed to load hotels."}</span>
      </div>
    );
  }

  return (
    <div className="bg-gray-300 outline-2 outline-[#1F3B73] p-4 rounded">
      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        {/* Search box */}
        <div>
          <input
            type="text"
            placeholder="Search hotels..."
            className="w-full p-2 rounded border border-[#1F3B73]"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
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

      {/* Responsive grid layout for hotel cards */}
      {filteredHotels.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
         {filteredHotels.map((hotel) => (
  <div key={hotel.id}>
    <HotelCard
      imageUrl={hotel.image_url || "https://via.placeholder.com/400x300?text=No+Image"}
      title={hotel.name}
      description={hotel.description}
      starRating={hotel.star_rating}
      price={hotel.price_per_night}
      address={hotel.address}
    />
  </div>
))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-xl text-gray-600">No hotels found matching your criteria.</p>
        </div>
      )}
      
      {/* Pagination Controls */}
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded border border-[#1F3B73] ${
            currentPage === 1 
              ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
              : "bg-white text-[#1F3B73] hover:bg-[#1F3B73] hover:text-white"
          }`}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={goToNextPage}
          disabled={!hasMore}
          className={`px-4 py-2 rounded border border-[#1F3B73] ${
            !hasMore
              ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
              : "bg-white text-[#1F3B73] hover:bg-[#1F3B73] hover:text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}