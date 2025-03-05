import { useState, useEffect } from "react";
import { supabase } from "~/supabase/supabaseClient";
import EntertainmentCard from "./entertainmentCard";

// Type definition for venue data
type EntertainmentVenue = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  venue_type: string;
  address: string;
};

type EntertainmentVenueListProps = {
  pageSize?: number;
};

export default function EntertainmentVenueList({ pageSize = 6 }: EntertainmentVenueListProps) {
  // State for pagination, filters and search
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVenueType, setSelectedVenueType] = useState("all");
  const [venueTypeOptions, setVenueTypeOptions] = useState<string[]>([]);
  
  // Data loading and error states
  const [data, setData] = useState<EntertainmentVenue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Fetch venue data when page or page size changes
  useEffect(() => {
    const fetchVenues = async () => {
      setIsLoading(true);
      try {
        const from = (currentPage - 1) * pageSize;
        const to = from + pageSize - 1;
        
        const { data: venueData, error: supabaseError } = await supabase
          .from('entertainment_venues')
          .select('*')
          .range(from, to);
        
        if (supabaseError) throw supabaseError;
        setData(venueData as EntertainmentVenue[]);
        setIsError(false);
      } catch (err) {
        setIsError(true);
        setError(err instanceof Error ? err : new Error("Failed to load entertainment venues"));
        console.error("Error fetching entertainment venues:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenues();
  }, [currentPage, pageSize]);

  // Fetch all unique venue types for filters
  useEffect(() => {
    const fetchVenueTypeOptions = async () => {
      try {
        const { data: venueTypeData, error } = await supabase
          .from('entertainment_venues')
          .select('venue_type')
          .order('venue_type');
        
        if (error) throw error;
        
        if (venueTypeData) {
          // Create a set of unique venue types and convert to array
          const uniqueVenueTypes = new Set<string>();
          
          venueTypeData.forEach(item => {
            if (item.venue_type && typeof item.venue_type === 'string') {
              const venueTypeList = item.venue_type.split(',').map((type: string) => type.trim());
              venueTypeList.forEach((type: string) => uniqueVenueTypes.add(type));
            }
          });
          
          setVenueTypeOptions(Array.from(uniqueVenueTypes));
        }
      } catch (err) {
        console.error("Error fetching venue type options:", err);
      }
    };
    
    fetchVenueTypeOptions();
  }, []);

  // Filter and search venues
  const filteredVenues = data?.filter(venue => {
    // Apply search filter
    const matchesSearch = searchTerm === "" ||
      venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply venue type filter
    const matchesVenueType = selectedVenueType === "all" ||
      (typeof venue.venue_type === 'string' && 
       venue.venue_type.toLowerCase().includes(selectedVenueType.toLowerCase()));
    
    return matchesSearch && matchesVenueType;
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
        <span className="block sm:inline"> {error ? error.message : "Failed to load entertainment venues."}</span>
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
            placeholder="Search venues..."
            className="w-full p-2 rounded border border-[#1F3B73]"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        {/* Venue Type Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedVenueType("all")}
            className={`px-4 py-2 rounded border border-[#1F3B73] transition ${
              selectedVenueType === "all"
                ? "bg-[#1F3B73] text-white"
                : "bg-white text-[#1F3B73]"
            }`}
          >
            All Venues
          </button>
          {venueTypeOptions.map((venueType) => (
            <button
              key={venueType}
              onClick={() => setSelectedVenueType(venueType)}
              className={`px-4 py-2 rounded border border-[#1F3B73] transition ${
                selectedVenueType === venueType
                  ? "bg-[#1F3B73] text-white"
                  : "bg-white text-[#1F3B73]"
              }`}
            >
              {venueType.charAt(0).toUpperCase() + venueType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive grid layout for venue cards */}
      {filteredVenues.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredVenues.map((venue) => (
            <div key={venue.id} className="flex flex-col h-full">
              <EntertainmentCard
                imageUrl={venue.image_url || "https://via.placeholder.com/400x300?text=No+Image"}
                title={venue.name}
                description={venue.description}
                location={venue.address}
              />
              {/* Add Google Maps button */}
             
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-xl text-gray-600">No entertainment venues found matching your criteria.</p>
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