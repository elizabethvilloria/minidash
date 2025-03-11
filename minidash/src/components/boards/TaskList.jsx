import React from 'react'
import { Droppable } from '@hello-pangea/dnd'
import TaskCard from './TaskCard'

function TaskList({ list }) {
  const id = String(list.id)

  return (
    <div className="bg-gray-100 p-4 rounded-lg w-72">
      <h3 className="text-lg font-semibold mb-4">{list.title}</h3>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[200px]"
          >
            {list.tasks.map((task, index) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default TaskList 