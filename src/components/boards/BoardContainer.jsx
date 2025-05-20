import React, { useState } from 'react'
import Board from './Board'

function BoardContainer() {
  const [boards, setBoards] = useState([
    { id: 'operations', title: 'Daily Operations' },
    { id: 'inventory', title: 'Inventory Management' },
    { id: 'staff', title: 'Staff Schedule' }
  ])

  const [activeBoard, setActiveBoard] = useState('operations')

  const handleBoardChange = (boardId) => {
    setActiveBoard(boardId)
  }

  return (
    <div className="space-y-6">
      {/* Board Navigation */}
      <div className="flex space-x-4 border-b pb-4">
        {boards.map(board => (
          <button
            key={board.id}
            onClick={() => handleBoardChange(board.id)}
            className={`
              px-4 py-2 rounded-lg transition-colors
              ${activeBoard === board.id 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
            `}
          >
            {board.title}
          </button>
        ))}
      </div>

      {/* Active Board */}
      <Board 
        title={boards.find(b => b.id === activeBoard)?.title || 'Board'} 
      />
    </div>
  )
}

export default BoardContainer
