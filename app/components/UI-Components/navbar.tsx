import { useEffect, useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '~/context/AuthContext';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { supabase } from '~/supabase/supabaseClient';

export default function NavBar(): React.ReactElement {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSignInHint, setShowSignInHint] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to handle clicking on the profile icon
  const handleProfileClick = () => {
    console.log("Profile button clicked. User:", user);
    // Dismiss the sign-in hint once the user clicks
    setShowSignInHint(false);

    if (!user) {
      console.log("User is not authenticated, navigating to /auth");
      navigate('/auth');
    } else {
      console.log("User is authenticated, not redirecting.");
      // You could add additional functionality here for authenticated users
    }
  };

  // Authenticated drop-down menu (using Headless UI)
  function ProfileMenu() {
    return (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="flex items-center focus:outline-none">
            {/* Use profile.profile_picture_url instead of user.profilePicture */}
            {profile?.profile_picture_url ? (
              <img
                src={profile.profile_picture_url}
                alt="Profile"
                className="h-8 w-8 rounded-full border-2 border-blue-500 object-cover"
              />
            ) : (
              <DefaultProfileIcon />
            )}
          </MenuButton>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-250"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-250"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <MenuItem
                as="button"
                onClick={() => {
                  console.log('Navigating to /dashboard');
                  navigate('/dashboard');
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-[focus]:bg-blue-100 data-[focus]:text-blue-900"
              >
                Dashboard
              </MenuItem>
              <MenuItem
                as="button"
                onClick={() => {
                  console.log('Navigating to /profile/settings');
                  navigate('/profile/settings');
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-[focus]:bg-blue-100 data-[focus]:text-blue-900"
              >
                Profile Settings
              </MenuItem>
              <MenuItem
                as="button"
                onClick={async () => {
                  console.log('Signing out...');
                  await supabase.auth.signOut();
                  console.log('Signed out, navigating to /');
                  navigate('/');
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-[focus]:bg-blue-100 data-[focus]:text-blue-900"
              >
                Sign Out
              </MenuItem>
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    );
  }

  // Default profile icon as an inline SVG with a circular outline.
  function DefaultProfileIcon() {
    return (
      <svg
        className="h-8 w-8 rounded-full border-2 border-blue-500 p-1"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="12" cy="8" r="4" stroke="black" strokeWidth="2" fill="lightgray"/>
        <path 
          d="M4 20C4 16.6863 7.13401 14 11 14H13C16.866 14 20 16.6863 20 20" 
          stroke="black" 
          strokeWidth="2" 
          strokeLinecap="round" 
          fill="none"
        />
      </svg>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-white/90 shadow border-b border-gray-300 transition-all duration-500">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Logo - responsive between mobile PNG and desktop text */}
<div className="flex-1">
  <Link to="/" className="inline-block">
    {/* Mobile: Black background container with PNG logo (< 1025px) */}
    <div className="xl:hidden bg-black rounded-lg p-2 flex items-center justify-center">
      <img 
        src="/dwntwn white.PNG" 
        alt="Downtown Montclair Logo" 
        className="h-8 object-contain"
        onError={(e) => {
          // Fallback in case the image doesn't load
          console.error("Logo image failed to load");
          e.currentTarget.alt = "Downtown Montclair";
          e.currentTarget.style.display = "none";
          if (e.currentTarget.parentElement) {
            e.currentTarget.parentElement.innerHTML += '<span class="text-white text-lg font-bold">DWNTWN</span>';
          }
        }}
      />
    </div>
    
    {/* Desktop: Text logo for larger screens (>= 1025px) */}
    <div className="hidden xl:flex bg-black rounded-lg px-4 py-2 items-center justify-center">
      <span 
        className="text-white text-xl font-bold tracking-widest"
        style={{ 
          fontFamily: "Montserrat, sans-serif",
          letterSpacing: "0.1em" // 10% letter spacing (supplementing Tailwind's tracking-widest)
        }}
      >
        DWNTWN MONTCLAIR
      </span>
    </div>
  </Link>
</div>

        {/* Center: Primary Links (visible only on large screens) */}
        <div className={`hidden xl:flex flex-1 transition-all duration-500 space-x-6 ${scrolled ? 'justify-center' : 'justify-end'}`}>
          <Link to="/food-drink" className="text-gray-700 hover:text-[#1F3B73]">Food &amp; Drink</Link>
          <Link to="/things-to-do" className="text-gray-700 hover:text-[#1F3B73]">Things To Do</Link>
          <Link to="/where-to-stay" className="text-gray-700 hover:text-[#1F3B73]">Where To Stay</Link>
          <Link to="/maps" className="text-gray-700 hover:text-[#1F3B73]">Maps</Link>
        </div>

       {/* Right: Utility Buttons */}
<div className="flex-1 flex justify-end items-center space-x-4">
  {/* Profile Icon & Hint */}
  {user ? (
    <ProfileMenu />
  ) : (
    <div className="relative">
      {/* Profile button with hover detection */}
      <button 
        onClick={handleProfileClick} 
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="text-gray-600 hover:text-[#1F3B73] focus:outline-none relative" 
        aria-label="Sign In"
      >
        <DefaultProfileIcon />
      </button>
      
      {/* Improved sign-in hint with arrow */}
      {showSignInHint && !isHovering && (
        <div className="absolute right-0 mt-2 transform transition-all duration-300 ease-in-out">
          {/* Arrow pointing to profile icon */}
          <div className="absolute -top-2 right-4 w-3 h-3 bg-gray-300 transform rotate-45"></div>
          
          {/* Hint text with better styling */}
          <div className="bg-gray-300 text-gray-700 text-xs p-2 rounded shadow-sm max-w-[150px]">
            Sign in for a personalized experience
          </div>
        </div>
      )}
    </div>
  )}

  {/* Hamburger Menu Button - now visible below 1025px (xl) */}
  <div className="xl:hidden">
    <button 
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
      className="text-gray-700 hover:text-[#1F3B73]" 
      aria-label="Toggle Menu"
    >
      {mobileMenuOpen ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      )}
    </button>
  </div>
</div>
      </nav>

      {/* Mobile Menu - Now shows on all screens below 1025px (xl) */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white shadow">
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-3">
            <Link to="/food-drink" className="text-gray-700 hover:text-[#1F3B73] text-lg">Food &amp; Drink</Link>
            <Link to="/things-to-do" className="text-gray-700 hover:text-[#1F3B73] text-lg">Things To Do</Link>
            <Link to="/where-to-stay" className="text-gray-700 hover:text-[#1F3B73] text-lg">Where To Stay</Link>
            <Link to="/maps" className="text-gray-700 hover:text-[#1F3B73] text-lg">Maps</Link>
          </div>
        </div>
      )}
    </header>
  );
}