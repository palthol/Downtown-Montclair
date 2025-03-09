import { useState, useEffect, useRef } from 'react';

export default function StPatricksCard() {
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Reference to detect clicks outside the modal
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Function to visit Jake's location/website
  const visitJakes = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents triggering the card's click handler
    window.open('https://www.justjakes.com', '_blank');
  };

  // Handle clicks outside the modal to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    }
    
    // Only add the listener when the modal is open
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    // Clean up event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  // Handle ESC key to close the modal
  useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    }
    
    // Only add the listener when the modal is open
    if (isModalOpen) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    // Clean up event listener
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isModalOpen]);

  return (
    <>
      {/* St. Patrick's Day Event Card */}
      <div 
        className="bg-white rounded-lg shadow hover:shadow-xl hover:scale-[1.02] transition duration-300 cursor-pointer overflow-hidden"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Card Image */}
        <img
          src="/stpatricksdayjustjakes.jpg"
          alt="St. Patrick's Day Celebration"
          className="w-full h-48 object-cover"
        />
        
        {/* Card Content */}
        <div className="p-6">
          {/* Event Title */}
          <h3 
            className="text-2xl font-bold text-[#1F3B73] mb-2"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            St. Patrick's Day Celebration
          </h3>
          
          {/* Event Date & Time */}
          <div className="text-sm text-gray-600 mb-2">
            March 16th, 2025 • 12:00 to 5:00 p.m.
          </div>
          
          {/* Event Description */}
          <p className="text-gray-600 mb-4">
            Join us for a festive celebration of Irish culture and community. 
            Featuring traditional music, food, and plenty of good cheer for everyone.
          </p>
          
          {/* Host information line */}
          <div className="text-sm text-gray-500 italic">
            Hosted by Jake's
          </div>
        </div>
      </div>

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
              className="absolute top-4 right-4 md:hidden text-gray-500 hover:text-gray-700 z-10"
              onClick={() => setIsModalOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Modal Image */}
            <img
              src="/stpatricksdayjustjakes.jpg"
              alt="St. Patrick's Day Celebration"
              className="w-full h-64 object-cover"
            />
            
            {/* Modal Content */}
            <div className="p-6 md:p-8">
              {/* Event Title */}
              <h3 
                className="text-2xl md:text-3xl font-bold text-[#1F3B73] mb-2"
                style={{ fontFamily: 'var(--font-headline)' }}
              >
                St. Patrick's Day Celebration
              </h3>
              
              {/* Event Date & Time */}
              <div className="text-sm md:text-base text-gray-600 mb-3">
                March 16th, 2025 • 12:00 to 5:00 p.m.
              </div>
              
              {/* Event Description */}
              <p className="text-gray-600 mb-6">
                Join us for a festive celebration of Irish culture and community. 
                Featuring traditional music, food, and plenty of good cheer for everyone. 
                Come dressed in green and enjoy special Irish-themed menu items, live 
                entertainment, and a friendly atmosphere for the whole family.
              </p>
              
              {/* Host information with icon */}
              <div className="flex items-center mb-6">
                <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-600">Hosted at Jake's (Montclair)</span>
              </div>
              
              {/* Footer with buttons */}
              <div className="flex justify-between items-center">
                {/* Visit Jake's Button */}
                <button
                  onClick={visitJakes}
                  className="inline-flex items-center bg-[#00C2A0] text-white font-semibold py-2 px-6 rounded hover:bg-[#00a38d] transition"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Visit Jake's
                </button>
                
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