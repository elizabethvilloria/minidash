import React from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'

function TaskCard({ task, index }) {
  const priorityColors = {
    high: 'bg-red-100 border-red-500',
    medium: 'bg-yellow-100 border-yellow-500',
    low: 'bg-green-100 border-green-500'
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
            <span 
              className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600"
              aria-label={`Priority: ${task.priority || 'low'}`}
            >
              {task.priority || 'low'}
            </span>
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