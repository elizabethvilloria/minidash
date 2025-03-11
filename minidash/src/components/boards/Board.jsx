import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import TaskList from './TaskList'

function Board({ title }) {
  const [lists, setLists] = React.useState([
    { id: 'todo', title: 'To Do', tasks: [] },
    { id: 'inProgress', title: 'In Progress', tasks: [] },
    { id: 'done', title: 'Done', tasks: [] }
  ])

  const onDragEnd = (result) => {
    // Handle drag and drop logic here
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4">
          {lists.map(list => (
            <TaskList key={list.id} list={list} />
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}

export default Board 