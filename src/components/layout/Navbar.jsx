import React, { useState } from 'react'

function Navbar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch?.(searchQuery)
  }

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">CaféDash</h1>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-lg mx-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks..."
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Search tasks"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                aria-label="Submit search"
              >
                🔍
              </button>
            </div>
          </form>

          {/* Navigation Links */}
          <div className="flex space-x-4">
            <button className="px-3 py-2 rounded-md hover:bg-gray-700 transition-colors">
              Operations
            </button>
            <button className="px-3 py-2 rounded-md hover:bg-gray-700 transition-colors">
              Inventory
            </button>
            <button className="px-3 py-2 rounded-md hover:bg-gray-700 transition-colors">
              Staff
            </button>
            <button className="px-3 py-2 rounded-md hover:bg-gray-700 transition-colors">
              Menu
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar