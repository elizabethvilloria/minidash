import React from 'react'
import Navbar from './components/layout/Navbar'
import Board from './components/boards/Board'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto py-8">
        <Board title="Daily Operations" />
      </main>
    </div>
  )
}

export default App 