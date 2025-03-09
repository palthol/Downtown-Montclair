import { useState, useEffect, useRef } from 'react';

export default function FIFAMontclairCard() {
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Reference to detect clicks outside the modal
  const modalRef = useRef<HTMLDivElement>(null);

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
      {/* FIFA Montclair Event Card */}
      <button 
  className="w-full text-left bg-white rounded-lg shadow hover:shadow-xl hover:scale-[1.02] transition duration-300 overflow-hidden"
  onClick={() => setIsModalOpen(true)}
  aria-label="FIFA Montclair event details"
>
        {/* Card Image with overlay for "Coming Soon" */}
        <div className="relative">
          <img
            src="/fifamontclair.jpg"
            alt="FIFA Montclair"
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
           
          </div>
        </div>
        
        {/* Card Content */}
        <div className="p-6">
          {/* Event Title */}
          <h3 
            className="text-2xl font-bold text-black mb-2"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            FIFA Montclair
          </h3>
          
          {/* Event Date & Time */}
          <div className="text-sm text-gray-600 mb-2">
            To Be Announced
          </div>
          
          {/* Event Description */}
          <p className="text-gray-600 mb-4">
            Stay tuned for details on this upcoming event!
          </p>
          
          {/* Notification hint */}
          <div className="text-sm text-[#00C2A0] font-medium">
            More information coming soon
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
              className="absolute top-4 right-4 md:hidden text-gray-500 hover:text-gray-700 z-10"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Modal Image with overlay */}
            <div className="relative">
              <img
                src="/fifamontclair.jpg"
                alt="FIFA Montclair"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center">
                <span className="text-white text-4xl font-bold mb-2">COMING SOON</span>
                <span className="text-white text-lg">Event Details To Be Announced</span>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 md:p-8">
              {/* Event Title */}
              <h3 
                className="text-2xl md:text-3xl font-bold text-black mb-2"
                style={{ fontFamily: 'var(--font-headline)' }}
              >
                FIFA Montclair
              </h3>
              
              {/* Event Date & Time */}
              <div className="text-sm md:text-base text-gray-600 mb-3">
                To Be Announced
              </div>
              
              {/* Event Description */}
              <p className="text-gray-600 mb-6">
                Stay tuned for details on this exciting upcoming event! 
                FIFA Montclair will bring the excitement of football to our community.
                Further information including date, time, and location will be posted here 
                as soon as they are available.
              </p>
              
              {/* Notification signup suggestion */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-bold text-gray-700 mb-2">Be The First To Know</h4>
                <p className="text-gray-600 text-sm">
                  Sign up for notifications and we'll let you know as soon as event details are confirmed.
                </p>
              </div>
              
              {/* Footer with buttons */}
              <div className="flex justify-between items-center">
                {/* Notify Me Button - this could be connected to a notification system */}
                <button
                  className="inline-flex items-center bg-[#00C2A0] text-white font-semibold py-2 px-6 rounded hover:bg-[#00a38d] transition"
                  onClick={() => alert("Notification feature coming soon")}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  Notify Me
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