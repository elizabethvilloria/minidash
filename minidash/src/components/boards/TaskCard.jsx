import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

function TaskCard({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-3 rounded shadow mb-2"
        >
          <h4 className="font-medium">{task.title}</h4>
          {task.description && (
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
          )}
        </div>
      )}
    </Draggable>
  )
}

export default TaskCard 