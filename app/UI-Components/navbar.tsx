// src/app/components/NavBar.tsx

// ! lets make this navbar kind of opaque, i want the blue gradient to be slightly visble on the navbar.
export default function NavBar() {
    return (
      <header className="bg-white shadow border-b border-gray-600">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">Project Montclair.</div>
          <div className="flex items-center space-x-4">
            <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
            <a href="/events" className="text-gray-600 hover:text-blue-600">Hosting</a>
            <a href="/about" className="text-gray-600 hover:text-blue-600">About</a>
            <a href="/contact" className="text-gray-600 hover:text-blue-600">Contact</a>
            {/* Profile Icon */}
            <a href="/profile" className="text-gray-600 hover:text-blue-600">
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
                  d="M5.121 17.804A9 9 0 1118.87 6.196 9 9 0 015.12 17.804z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </a>
          </div>
        </nav>
      </header>
    );
  }
  