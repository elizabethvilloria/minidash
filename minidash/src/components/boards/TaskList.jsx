import React from 'react'
import TaskCard from './TaskCard'

function TaskList({ list, onMoveTask }) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg w-72">
      <h3 className="text-lg font-semibold mb-4">{list.title}</h3>
      <div className="min-h-[200px]">
        {list.tasks.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            currentList={list.id}
            onMoveTask={onMoveTask}
          />
        ))}
      </div>
    </div>
  )
}

export default TaskList 