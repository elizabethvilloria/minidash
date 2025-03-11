import React from 'react'

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">CaféDash</h1>
        <div className="flex space-x-4">
          <button>Operations</button>
          <button>Inventory</button>
          <button>Staff</button>
          <button>Menu</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar