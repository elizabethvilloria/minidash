import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import TaskCard from './TaskCard'

function TaskList({ list }) {
  const [newTaskTitle, setNewTaskTitle] = React.useState('')
  const [isAddingTask, setIsAddingTask] = React.useState(false)

  const handleAddTask = (e) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return

    const newTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      description: ''
    }

    list.tasks.push(newTask)
    setNewTaskTitle('')
    setIsAddingTask(false)
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg w-80 flex-shrink-0">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{list.title}</h3>
        <span className="text-sm text-gray-500">{list.tasks.length} tasks</span>
      </div>
      <Droppable droppableId={list.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[200px] space-y-2"
          >
            {list.tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      
      {isAddingTask ? (
        <form onSubmit={handleAddTask} className="mt-4">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Enter task title..."
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <div className="flex space-x-2 mt-2">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setIsAddingTask(false)}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsAddingTask(true)}
          className="w-full mt-4 text-gray-600 hover:text-gray-900 text-sm flex items-center justify-center py-2 rounded hover:bg-gray-200 transition-colors"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Task
        </button>
      )}
    </div>
  )
}

export default TaskList