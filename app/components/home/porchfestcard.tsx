import { useState, useRef, useEffect } from "react";

export default function PorchfestCard() {
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to track current carousel item
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  // Reference to detect clicks outside the modal
  const modalRef = useRef<HTMLDivElement>(null);

  // Media carousel items (images and video)
  const carouselMedia = [
    {
      id: "porchfest-image",
      type: "image",
      src: "/MontclairPorchfest.jpg",
      alt: "Montclair PorchFest",
    },
  ];

  // Function to handle slide changes and pause videos
  const handleSlideChange = (newIndex: number) => {
    // Find all videos in the carousel
    const videos = document.querySelectorAll("video");
    // Pause any playing videos
    videos.forEach((video) => video.pause());
    // Set the new index
    setCurrentMediaIndex(newIndex);
  };

  // Functions for navigation
  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex =
      currentMediaIndex === 0
        ? carouselMedia.length - 1
        : currentMediaIndex - 1;

    handleSlideChange(newIndex);
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex =
      currentMediaIndex === carouselMedia.length - 1
        ? 0
        : currentMediaIndex + 1;

    handleSlideChange(newIndex);
  };

  // Reset carousel when modal closes
  useEffect(() => {
    if (!isModalOpen) {
      setCurrentMediaIndex(0);

      // Also pause any videos when closing the modal
      setTimeout(() => {
        const videos = document.querySelectorAll("video");
        videos.forEach((video) => video.pause());
      }, 100);
    }
  }, [isModalOpen]);

  // Function to open external website while preventing modal from opening
  const visitWebsite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents triggering the card's click handler
    window.open("https://www.montclairporchfest.org", "_blank");
  };

  // Function to open shop website while preventing modal from opening
  const visitShop = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents triggering the card's click handler
    window.open("https://2bwb1n-k0.myshopify.com/", "_blank");
  };

  // Handle clicks outside modal to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    }

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  // Handle ESC key to close the modal
  useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    }

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isModalOpen]);

  return (
    <>
      {/* Event Card */}
      <button
        className="bg-white rounded-lg shadow hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Card Image - always show the first image on the card */}
        <img
          src="/MontclairPorchfest.jpg"
          alt="Montclair PorchFest"
          className="w-full h-80 object-cover"
        />

        {/* Card Content */}
        <div className="p-6">
          {/* Event Title */}
          <h3
            className="text-2xl font-bold text-black mb-2"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Montclair PorchFest
          </h3>

          {/* Event Date */}
          <div className="text-sm text-gray-600 mb-2">May 17th, 2025</div>

          {/* Event Description */}
          <p className="text-gray-600 mb-4">
            Experience an unforgettable day of free, family-friendly music
            performed on porches throughout Montclair. Over 100 bands, multiple
            locations, one amazing community event.
          </p>

          {/* Buttons - now in a flex container */}
          <div className="flex flex-wrap gap-2">
            {/* Visit Website Button */}
            <button
              onClick={visitWebsite}
              className="inline-block bg-black text-white font-semibold py-2 px-4 rounded hover:bg-[#00a38d] transition"
            >
              Visit Website
            </button>

            {/* Shop PorchFest Button */}
            <button
              onClick={visitShop}
              className="inline-block bg-black text-white font-semibold py-2 px-4 rounded hover:bg-[#152a54] transition"
            >
              Shop PorchFest
            </button>
          </div>
        </div>
      </button>

      {/* Modal Overlay - only visible when modal is open */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center transition-opacity duration-300">
          {/* Modal Container */}
          <div
            ref={modalRef}
            className="bg-white w-full md:w-3/4 lg:w-1/2 h-full md:h-auto md:max-h-[90vh] md:rounded-lg shadow-xl 
                       overflow-y-auto relative animate-fadeInUp"
          >
            {/* Mobile Close Button - only visible on small screens */}
            <button
              className="absolute top-4 right-4 md:hidden text-gray-500 hover:text-gray-700 z-20"
              onClick={() => setIsModalOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Media Carousel */}
            <div className="relative">
              {/* Media Items */}
              {carouselMedia.map((media, index) => (
                <div
                  key={media.id}
                  className={`${
                    index === currentMediaIndex ? "block" : "hidden"
                  }`}
                >
                  {media.type === "image" ? (
  <div className="w-full max-h-[70vh] flex items-center justify-center bg-black">
    <img
      src={media.src}
      alt={media.alt}
      className="max-h-[70vh] max-w-full object-contain"
    />
  </div>
) : (
  <div className="w-full max-h-[70vh] flex items-center justify-center bg-black">
    <video
      src={media.src}
      className="max-h-[70vh] max-w-full object-contain z-10"
      controls
      playsInline
      preload="metadata"
      onClick={(e) => e.stopPropagation()}
      onPlay={(e) => e.stopPropagation()}
      onPause={(e) => e.stopPropagation()}
    >
      Your browser does not support the video tag.
    </video>
  </div>
)}
                </div>
              ))}

              {/* Carousel Navigation */}
              <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
                {/* Previous Button */}
                <button
                  onClick={goToPrevious}
                  className="bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-2 transition"
                  aria-label="Previous media"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {/* Next Button */}
                <button
                  onClick={goToNext}
                  className="bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-2 transition"
                  aria-label="Next media"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* Carousel Indicators - Added */}
              <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
                {carouselMedia.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSlideChange(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentMediaIndex
                        ? "bg-white w-4"
                        : "bg-white bg-opacity-50"
                    }`}
                    aria-label={`Go to item ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8">
              {/* Event Title */}
              <h3
                className="text-2xl md:text-3xl font-bold text-black mb-2"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Montclair PorchFest
              </h3>

              {/* Event Date */}
              <div className="text-sm md:text-base text-gray-600 mb-3">
                May 17th, 2025
              </div>

              {/* Event Description */}
              <p className="text-gray-600 mb-6">
                Experience an unforgettable day of free, family-friendly music
                performed on porches throughout Montclair. Over 100 bands,
                multiple locations, one amazing community event.
              </p>

              {/* Footer with buttons */}
              <div className="flex flex-wrap justify-between items-center">
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 mb-2 md:mb-0">
                  {/* Visit Website Button */}
                  <button
                    onClick={visitWebsite}
                    className="inline-block bg-black text-white font-semibold py-2 px-6 rounded hover:bg-[#00a38d] transition"
                  >
                    Visit Website
                  </button>

                  {/* Shop PorchFest Button */}
                  <button
                    onClick={visitShop}
                    className="inline-block bg-black text-white font-semibold py-2 px-6 rounded hover:bg-[#152a54] transition"
                  >
                    Shop PorchFest
                  </button>
                </div>

                {/* Desktop Close Button - only visible on larger screens */}
                <button
                  className="hidden md:block text-gray-500 hover:text-gray-700"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
