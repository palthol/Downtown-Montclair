import { useState, useRef, useEffect } from 'react';

export default function PorchfestCard() {
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to track current carousel item
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  
  // Reference to detect clicks outside the modal
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Media carousel items (images and video)
  const carouselMedia = [
    { type: 'image', src: '/MontclairPorchfest.jpg', alt: 'Montclair PorchFest' },
    { type: 'video', src: '/Jeremy_Final (1).mp4', alt: 'Porchfest Video' }
  ];
  
  // Function to handle slide changes and pause videos
  const handleSlideChange = (newIndex: number) => {
    // Find all videos in the carousel
    const videos = document.querySelectorAll('video');
    // Pause any playing videos
    videos.forEach(video => video.pause());
    // Set the new index
    setCurrentMediaIndex(newIndex);
  };
  
  // Functions for navigation
  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = currentMediaIndex === 0 
      ? carouselMedia.length - 1 
      : currentMediaIndex - 1;
    
    handleSlideChange(newIndex);
  };
  
  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = currentMediaIndex === carouselMedia.length - 1 
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
        const videos = document.querySelectorAll('video');
        videos.forEach(video => video.pause());
      }, 100);
    }
  }, [isModalOpen]);
  
  // Function to open external website while preventing modal from opening
  const visitWebsite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents triggering the card's click handler
    window.open('https://www.montclairporchfest.org', '_blank');
  };

  // Function to open shop website while preventing modal from opening
  const visitShop = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents triggering the card's click handler
    window.open('https://2bwb1n-k0.myshopify.com/', '_blank');
  };
  
  // Rest of your existing code...

  return (
    <>
      {/* Event Card */}
      {/* ... existing card code ... */}

      {/* Modal Overlay - only visible when modal is open */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center transition-opacity duration-300">
          {/* Modal Container */}
          <div 
            ref={modalRef}
            className="bg-white w-full md:w-3/4 lg:w-1/2 h-full md:h-auto md:max-h-[90vh] md:rounded-lg shadow-xl 
                       overflow-y-auto relative animate-fadeInUp"
          >
            {/* Mobile Close Button */}
            {/* ... existing code ... */}
            
            {/* Media Carousel */}
            <div className="relative">
              {/* Media Items */}
              {carouselMedia.map((media, index) => (
                <div 
                  key={media.src}
                  className={`${index === currentMediaIndex ? 'block' : 'hidden'}`}
                >
                  {media.type === 'image' ? (
                    <img
                      src={media.src}
                      alt={media.alt}
                      className="w-full h-64 object-cover"
                    />
                  ) : (
                    <video 
                      src={media.src} 
                      className="w-full h-64 object-cover" 
                      controls 
                      playsInline // Better mobile experience
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              ))}
              
              {/* Carousel Navigation */}
              <div className="absolute inset-0 flex items-center justify-between px-4">
                {/* Previous Button */}
                <button 
                  onClick={goToPrevious}
                  className="bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-2 transition"
                  aria-label="Previous media"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                {/* Next Button */}
                <button 
                  onClick={goToNext}
                  className="bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-2 transition"
                  aria-label="Next media"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Carousel Indicators */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {carouselMedia.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSlideChange(index); // Use the handleSlideChange function
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentMediaIndex 
                        ? 'bg-white w-4' 
                        : 'bg-white bg-opacity-50'
                    }`}
                    aria-label={`Go to item ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Modal Content */}
            {/* ... rest of your existing modal content ... */}
          </div>
        </div>
      )}
    </>
  );
}