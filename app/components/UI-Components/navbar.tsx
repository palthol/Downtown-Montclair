import { useEffect, useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '~/context/AuthContext';
import {  Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { supabase } from '~/supabase/supabaseClient';

export default function NavBar(): React.ReactElement {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSignInHint, setShowSignInHint] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

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
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt="Profile"
              className="h-8 w-8 rounded-full border-2 border-blue-500"
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
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm-4 2a5 5 0 0110 0v1H8v-1zm-2 4a1 1 0 011-1h12a1 1 0 011 1v1H6v-1z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-white/90 shadow border-b border-gray-300 transition-all duration-500">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-1">
          <Link to="/" className="text-2xl font-bold text-[#1F3B73]">
            Downtown Montclair
          </Link>
        </div>
        {/* Center: Primary Links (visible on md and up) */}
        <div className={`hidden md:flex flex-1 transition-all duration-500 space-x-6 ${scrolled ? 'justify-center' : 'justify-end'}`}>
          <Link to="/food-drink" className="text-gray-700 hover:text-[#1F3B73]">Food &amp; Drink</Link>
          <Link to="/things-to-do" className="text-gray-700 hover:text-[#1F3B73]">Things To Do</Link>
          <Link to="/where-to-stay" className="text-gray-700 hover:text-[#1F3B73]">Where To Stay</Link>
          <Link to="/maps" className="text-gray-700 hover:text-[#1F3B73]">Maps</Link>
        </div>
        {/* Right: Utility Buttons */}
        <div className="flex-1 flex justify-end items-center space-x-4">
          <button className="text-gray-600 hover:text-[#1F3B73]" aria-label="Toggle Language">EN</button>
          <button className="text-gray-600 hover:text-[#1F3B73]" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          {/* Profile Icon & Hint */}
          {user ? (
            <ProfileMenu />
          ) : (
            <div className="relative flex items-center">
              <button onClick={handleProfileClick} className="text-gray-600 hover:text-[#1F3B73] focus:outline-none" aria-label="Sign In">
                <DefaultProfileIcon />
              </button>
              {showSignInHint && (
                <span className="absolute top-0 left-8 text-xs text-gray-500 animate-fadeOut">
                  Sign in for a personalized experience
                </span>
              )}
            </div>
          )}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700 hover:text-[#1F3B73]" aria-label="Toggle Menu">
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
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow">
          <div className="container mx-auto px-6 py-2 flex flex-col space-y-2">
            <Link to="/food-drink" className="text-gray-700 hover:text-[#1F3B73]">Food &amp; Drink</Link>
            <Link to="/things-to-do" className="text-gray-700 hover:text-[#1F3B73]">Things To Do</Link>
            <Link to="/where-to-stay" className="text-gray-700 hover:text-[#1F3B73]">Where To Stay</Link>
            <Link to="/maps" className="text-gray-700 hover:text-[#1F3B73]">Maps</Link>
          </div>
        </div>
      )}
    </header>
  );
}