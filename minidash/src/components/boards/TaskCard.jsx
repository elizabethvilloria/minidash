import React from 'react'

function TaskCard({ task, onMoveTask, currentList }) {
  const [showMenu, setShowMenu] = React.useState(false)
  
  const lists = [
    { id: 'todo', title: 'To Do' },
    { id: 'inProgress', title: 'In Progress' },
    { id: 'done', title: 'Done' }
  ]

  return (
    <div className="bg-white p-3 rounded shadow mb-2 relative">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{task.title}</h4>
          {task.description && (
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
          )}
        </div>
        <button 
          onClick={() => setShowMenu(!showMenu)}
          className="text-gray-500 hover:text-gray-700 p-1"
        >
          ⋮
        </button>
      </div>
      
      {showMenu && (
        <div className="absolute right-0 top-8 bg-white shadow-lg rounded-md py-1 z-10">
          {lists.map(list => (
            list.id !== currentList && (
              <button
                key={list.id}
                onClick={() => {
                  onMoveTask(task.id, list.id)
                  setShowMenu(false)
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Move to {list.title}
              </button>
            )
          ))}
        </div>
      )}
    </div>
  )
}

export default TaskCard 