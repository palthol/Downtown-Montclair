import { useState, useEffect } from 'react';
import { useAuth } from '~/context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Using React Router instead of Remix

export default function Hero() {
  // Get user authentication data
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  
  // Image carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Images for the carousel
  const carouselImages = [
    '/DM-1.jpg',
    '/DM-2.jpeg',
    '/DM-3.jpeg'
  ];

  // Handle navigation without Remix
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Set up automatic image rotation
  // Update the useEffect function with slower transitions
  useEffect(() => {
    // Start rotation timer
    const rotationTimer = setInterval(() => {
      // Start transition animation
      setIsTransitioning(true);
      
      // After fade out completes, change image
      // Increased to 3000ms for much slower fade
      setTimeout(() => {
        setCurrentImageIndex(prevIndex => 
          prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
        );
        
        // Reset transition state for fade-in
        setIsTransitioning(false);
      }, 3000); // Three seconds for fade out
      
    }, 9000); // Increased total time to 9 seconds
    
    // Clean up timer on component unmount
    return () => clearInterval(rotationTimer);
  }, [carouselImages.length]);
  
  // In the return statement:
  return (
    <section className="relative h-[80vh] overflow-hidden">
      {/* Black background behind all images - now completely solid */}
      <div className="absolute inset-0 bg-black z-[-20]"></div>
      
      {/* Background images carousel with 3s transition */}
      {carouselImages.map((image, index) => (
        <div 
          key={image}
          className={`absolute inset-0 w-full h-full ${
            index === currentImageIndex 
              ? 'opacity-100' 
              : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
            transition: 'opacity 3s ease-in-out' // 3 second transition
          }}
        />
      ))}
  
      {/* Overlay for better text readability - now completely black */}
      <div className="absolute inset-0 bg-black opacity-40 z-[1]"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col justify-center h-full text-center md:text-left">
  <h1
    className="text-white text-4xl md:text-5xl font-extrabold mb-4"
    style={{ fontFamily: "var(--font-headline)" }}
  >
    {/* Personalized welcome message based on authentication status */}
    Welcome to Downtown Montclair
    {profile?.display_name && (
      <span>, {profile.display_name}</span>
    )}
  </h1>
  
  <p className="text-white text-lg md:text-xl mb-8" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
    Discover the best local spots for food, culture, and entertainment.
  </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          {/* Only show Sign Up button for unauthenticated users */}
          {!user && (
            <button
              onClick={() => handleNavigation('/auth')}
              className="bg-white text-[#1F3B73] font-semibold px-8 py-4 rounded shadow-lg hover:shadow-xl transition duration-300"
            >
              Sign Up
            </button>
          )}
          
          {/* Always show Create Event button */}
          {/* <button
    onClick={() => handleNavigation('/food-drink')}
    className="bg-white text-[#1F3B73] font-semibold px-8 py-4 rounded shadow-lg hover:shadow-xl transition duration-300"
  >
    Hungry?
  </button>

  <button
    onClick={() => handleNavigation('things-to-do')}
    className="bg-white text-[#1F3B73] font-semibold px-8 py-4 rounded shadow-lg hover:shadow-xl transition duration-300"
  >
    Bored?
  </button>

  <button
    onClick={() => handleNavigation('/where-to-stay')}
    className="bg-white text-[#1F3B73] font-semibold px-8 py-4 rounded shadow-lg hover:shadow-xl transition duration-300"
  >
    Sleepy?
  </button> */}
 
        </div>
      </div>
    </section>
  );
}