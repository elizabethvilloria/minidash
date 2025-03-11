import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import TaskList from './TaskList'

function Board({ title }) {
  const [lists, setLists] = React.useState([
    { 
      id: 'todo', 
      title: 'To Do', 
      tasks: [
        { id: 'task-1', title: 'Check inventory', description: 'Count coffee beans and supplies' },
        { id: 'task-2', title: 'Staff meeting', description: 'Weekly team sync at 9am' }
      ] 
    },
    { 
      id: 'inProgress', 
      title: 'In Progress', 
      tasks: [
        { id: 'task-3', title: 'Train new barista', description: 'Show coffee making techniques' }
      ] 
    },
    { 
      id: 'done', 
      title: 'Done', 
      tasks: [
        { id: 'task-4', title: 'Order supplies', description: 'Ordered new coffee cups' }
      ] 
    }
  ])

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const sourceList = lists.find(list => list.id === source.droppableId)
    const destList = lists.find(list => list.id === destination.droppableId)
    const draggedTask = sourceList.tasks[source.index]

    const newLists = lists.map(list => {
      if (list.id === sourceList.id) {
        list.tasks.splice(source.index, 1)
        return { ...list, tasks: [...list.tasks] }
      }
      if (list.id === destList.id) {
        list.tasks.splice(destination.index, 0, draggedTask)
        return { ...list, tasks: [...list.tasks] }
      }
      return list
    })

    setLists(newLists)
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