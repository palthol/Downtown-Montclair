import { useState, useEffect } from "react";
import { supabase } from "~/supabase/supabaseClient";
import RestaurantCard from "./RestuarantCard";

// Type definition for restaurant data
type Restaurant = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  cuisine: string;
  address: string;
};

type RestaurantListProps = {
  pageSize?: number;
};

export default function RestaurantList({ pageSize = 6 }: RestaurantListProps) {
  // State for pagination, filters and search
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("all");
  const [cuisineOptions, setCuisineOptions] = useState<string[]>([]);
  
  // Replace React Query with standard hooks
  const [data, setData] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Fetch restaurant data when page or page size changes
  useEffect(() => {
    const fetchRestaurants = async () => {
      setIsLoading(true);
      try {
        const from = (currentPage - 1) * pageSize;
        const to = from + pageSize - 1;
        
        const { data: restaurantData, error: supabaseError } = await supabase
          .from('restaurants')
          .select('*')
          .range(from, to);
        
        if (supabaseError) throw supabaseError;
        setData(restaurantData as Restaurant[]);
        setIsError(false);
      } catch (err) {
        setIsError(true);
        setError(err instanceof Error ? err : new Error("Failed to load restaurants"));
        console.error("Error fetching restaurants:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, [currentPage, pageSize]);

  // Fetch all unique cuisines for filters
  useEffect(() => {
    const fetchCuisineOptions = async () => {
      try {
        const { data: cuisineData, error } = await supabase
          .from('restaurants')
          .select('cuisine')
          .order('cuisine');
        
        if (error) throw error;
        
        if (cuisineData) {
          // Create a set of unique cuisines and convert to array
          const uniqueCuisines = new Set<string>();
          
          cuisineData.forEach(item => {
            if (item.cuisine && typeof item.cuisine === 'string') {
              const cuisineList = item.cuisine.split(',').map((c: string) => c.trim());
              cuisineList.forEach((c: string) => uniqueCuisines.add(c));
            }
          });
          
          setCuisineOptions(Array.from(uniqueCuisines));
        }
      } catch (err) {
        console.error("Error fetching cuisine options:", err);
      }
    };
    
    fetchCuisineOptions();
  }, []);

  // Filter and search restaurants
  const filteredRestaurants = data?.filter(restaurant => {
    // Apply search filter
    const matchesSearch = searchTerm === "" ||
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.description.toLowerCase().includes(searchTerm.toLowerCase());
    
   // Apply cuisine filter
const matchesCuisine = selectedCuisine === "all" ||
(typeof restaurant.cuisine === 'string' && 
 restaurant.cuisine.toLowerCase().includes(selectedCuisine.toLowerCase()));
    
    return matchesSearch && matchesCuisine;
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error ? error.message : "Failed to load restaurants."}</span>
      </div>
    );
  }

  return (
    <div className="bg-gray-300 outline-2 outline-black p-4 rounded">
      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        {/* Search box */}
        <div>
          <input
            type="text"
            placeholder="Search restaurants..."
            className="w-full p-2 rounded border border-black"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        {/* Cuisine Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCuisine("all")}
            className={`px-4 py-2 rounded border border-black transition ${
              selectedCuisine === "all"
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            All Cuisines
          </button>
          {cuisineOptions.map((cuisine) => (
            <button
              key={cuisine}
              onClick={() => setSelectedCuisine(cuisine)}
              className={`px-4 py-2 rounded border border-black transition ${
                selectedCuisine === cuisine
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive grid layout for restaurant cards */}
      {filteredRestaurants.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              imageUrl={restaurant.image_url}
              title={restaurant.name}
              description={restaurant.description}
              cuisine={restaurant.cuisine}
              address={restaurant.address}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-xl text-gray-600">No restaurants found matching your criteria.</p>
        </div>
      )}
      
      {/* Pagination Controls */}
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded border border-black ${
            currentPage === 1 
              ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
              : "bg-white text-black hover:bg-black hover:text-white"
          }`}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={goToNextPage}
          disabled={!hasMore}
          className={`px-4 py-2 rounded border border-black ${
            !hasMore
              ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
              : "bg-white text-black hover:bg-black hover:text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}