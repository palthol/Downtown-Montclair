export default function NavBar() {
  return (
    <header className="bg-white/90 shadow border-b border-gray-300">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="text-2xl font-bold text-[#1F3B73]">
          Downtown Montclair.
        </a>
        <div className="flex items-center space-x-6">
          <a href="/food-drink" className="text-gray-700 hover:text-[#1F3B73]">
            Food &amp; Drink
          </a>
          <a href="/things-to-do" className="text-gray-700 hover:text-[#1F3B73]">
            Things To Do
          </a>
          <a
            href="/where-to-stay"
            className="text-gray-700 hover:text-[#1F3B73]"
          >
            Where To Stay
          </a>
          <a href="/maps" className="text-gray-700 hover:text-[#1F3B73]">
            Maps
          </a>
          {/* Utility buttons */}
          <button
            className="text-gray-600 hover:text-[#1F3B73]"
            aria-label="Toggle Language"
          >
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
        </div>
      </nav>
    </header>
  );
}