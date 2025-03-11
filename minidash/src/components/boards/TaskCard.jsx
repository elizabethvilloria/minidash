import React from 'react'
import { Draggable } from '@hello-pangea/dnd'

function TaskCard({ task, index }) {
  const id = String(task.id)
  console.log('Rendering TaskCard:', { id, index })
  
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => {
        console.log('Draggable render:', { id, isDragging: snapshot.isDragging })
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`bg-white p-3 rounded shadow mb-2 cursor-move ${
              snapshot.isDragging ? 'opacity-50' : ''
            }`}
          >
            <h4 className="font-medium">{task.title}</h4>
            {task.description && (
              <p className="text-sm text-gray-600 mt-1">{task.description}</p>
            )}
          </div>
        )
      }}
    </Draggable>
  )
}

export default TaskCard 