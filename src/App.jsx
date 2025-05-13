/**
 * Main application component that serves as the root layout
 * Implements a responsive design with a navigation bar and main content area
 */
import React from 'react'
import Navbar from './components/layout/Navbar'
import Board from './components/boards/Board'

function App() {
  return (
    // Main container with full height and light gray background
    <div className="min-h-screen bg-gray-50">
      {/* Navigation bar component */}
      <Navbar />
      
      {/* Main content area with centered container and padding */}
      <main className="container mx-auto py-8">
        {/* Board component for displaying and managing tasks */}
        <Board title="Daily Operations" />
      </main>
    </div>
  )
}

export default App 