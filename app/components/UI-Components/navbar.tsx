import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '~/context/AuthContext';

export default function NavBar(): React.ReactElement {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          {user ? (
            <Link to="/dashboard" className="text-gray-600 hover:text-[#1F3B73]">
              {/* Authenticated link (e.g., Dashboard or Profile) */}
              Dashboard
            </Link>
          ) : (
            <button
              onClick={() => navigate('/auth')}
              className="text-gray-600 hover:text-[#1F3B73]"
              aria-label="Auth"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </button>
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