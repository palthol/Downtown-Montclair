import { useEffect, useState } from "react";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <header className="sticky top-0 z-50 bg-white/90 shadow border-b border-gray-300 transition-all duration-500">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-1">
          <a href="/" className="text-2xl font-bold text-[#1F3B73]">
            Downtown Montclair
          </a>
        </div>

        {/* Center: Primary Links (only visible on md and up) */}
        <div
          className={`hidden md:flex flex-1 transition-all duration-500 space-x-6 ${
            scrolled ? "justify-center" : "justify-end"
          }`}
        >
          <a href="/food-drink" className="text-gray-700 hover:text-[#1F3B73]">
            Food &amp; Drink
          </a>
          <a href="/things-to-do" className="text-gray-700 hover:text-[#1F3B73]">
            Things To Do
          </a>
          <a href="/where-to-stay" className="text-gray-700 hover:text-[#1F3B73]">
            Where To Stay
          </a>
          <a href="/maps" className="text-gray-700 hover:text-[#1F3B73]">
            Maps
          </a>
        </div>

        {/* Right: Utility Buttons */}
        <div className="flex-1 flex justify-end items-center space-x-4">
          <button className="text-gray-600 hover:text-[#1F3B73]" aria-label="Toggle Language">
            EN
          </button>
          <button className="text-gray-600 hover:text-[#1F3B73]" aria-label="Search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          {/* Hamburger Icon for Mobile (visible on small screens only) */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-[#1F3B73]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                // X/Close Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu: Visible only when mobileMenuOpen is true */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow">
          <div className="container mx-auto px-6 py-2 flex flex-col space-y-2">
            <a href="/food-drink" className="text-gray-700 hover:text-[#1F3B73]">
              Food &amp; Drink
            </a>
            <a href="/things-to-do" className="text-gray-700 hover:text-[#1F3B73]">
              Things To Do
            </a>
            <a href="/where-to-stay" className="text-gray-700 hover:text-[#1F3B73]">
              Where To Stay
            </a>
            <a href="/maps" className="text-gray-700 hover:text-[#1F3B73]">
              Maps
            </a>
          </div>
        </div>
      )}
    </header>
  );
}