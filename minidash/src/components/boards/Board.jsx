import React from 'react'
import TaskList from './TaskList'

function Board({ title, lists, onMoveTask }) {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex space-x-4">
        {lists.map(list => (
          <TaskList 
            key={list.id} 
            list={list} 
            onMoveTask={onMoveTask}
          />
        ))}
      </div>
    </div>
  )
}

export default Board 