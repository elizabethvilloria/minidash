import React from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'

function TaskCard({ task, index }) {
  const [isEditing, setIsEditing] = React.useState(false)
  const [editedTask, setEditedTask] = React.useState(task)

  const priorityColors = {
    high: 'bg-red-100 border-red-500',
    medium: 'bg-yellow-100 border-yellow-500',
    low: 'bg-green-100 border-green-500'
  }

  const handleEdit = (e) => {
    e.preventDefault()
    Object.assign(task, editedTask)
    setIsEditing(false)
  }

  const handlePriorityChange = (priority) => {
    setEditedTask({ ...editedTask, priority })
  }

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm mb-3 border border-blue-500">
        <form onSubmit={handleEdit}>
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            placeholder="Task title"
          />
          <textarea
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            placeholder="Task description"
            rows="2"
          />
          <div className="flex space-x-2 mb-2">
            {['high', 'medium', 'low'].map((priority) => (
              <button
                key={priority}
                type="button"
                onClick={() => handlePriorityChange(priority)}
                className={`flex-1 text-xs px-2 py-1 rounded-full ${
                  editedTask.priority === priority
                    ? priorityColors[priority]
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {priority}
              </button>
            ))}
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            bg-white p-4 rounded-lg shadow-sm mb-3
            border-l-4 ${priorityColors[task.priority || 'low']}
            transition-all duration-200
            ${snapshot.isDragging ? 'shadow-lg scale-105' : ''}
            hover:shadow-md
          `}
          role="article"
          aria-label={`Task: ${task.title}`}
        >
          <div className="flex items-start justify-between">
            <h4 className="font-medium text-gray-800">{task.title}</h4>
            <div className="flex items-center space-x-2">
              <span 
                className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600"
                aria-label={`Priority: ${task.priority || 'low'}`}
              >
                {task.priority || 'low'}
              </span>
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Edit task"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>
          </div>
          {task.description && (
            <p className="text-sm text-gray-600 mt-2">{task.description}</p>
          )}
          {task.dueDate && (
            <div className="mt-2 text-xs text-gray-500">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </div>
          )}
        </div>
      )}
    </Draggable>
  )
}

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    priority: PropTypes.oneOf(['high', 'medium', 'low']),
    dueDate: PropTypes.string
  }).isRequired,
  index: PropTypes.number.isRequired
}

export default TaskCard