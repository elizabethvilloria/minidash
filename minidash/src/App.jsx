import React from 'react'
import { DragDropContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@hello-pangea/dnd'
import Navbar from './components/layout/Navbar'
import Board from './components/boards/Board'

function App() {
  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before starting a drag
    activationConstraint: {
      distance: 10,
    },
  })
  
  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  })

  const sensors = useSensors(mouseSensor, touchSensor)

  const [lists, setLists] = React.useState([
    { 
      id: 'todo', 
      title: 'To Do', 
      tasks: [
        { id: '1', title: 'Check inventory', description: 'Count coffee beans and supplies' },
        { id: '2', title: 'Staff meeting', description: 'Weekly team sync at 9am' }
      ] 
    },
    { 
      id: 'inProgress', 
      title: 'In Progress', 
      tasks: [
        { id: '3', title: 'Train new barista', description: 'Show coffee making techniques' }
      ] 
    },
    { 
      id: 'done', 
      title: 'Done', 
      tasks: [
        { id: '4', title: 'Order supplies', description: 'Ordered new coffee cups' }
      ] 
    }
  ])

  const onDragEnd = (result) => {
    console.log('Drag ended:', result) // Add this to debug
    const { destination, source } = result

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
        const newTasks = Array.from(list.tasks)
        newTasks.splice(source.index, 1)
        return { ...list, tasks: newTasks }
      }
      if (list.id === destList.id) {
        const newTasks = Array.from(list.tasks)
        newTasks.splice(destination.index, 0, draggedTask)
        return { ...list, tasks: newTasks }
      }
      return list
    })

    setLists(newLists)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto py-8">
        <DragDropContext sensors={sensors} onDragEnd={onDragEnd}>
          <Board title="Daily Operations" lists={lists} />
        </DragDropContext>
      </main>
    </div>
  )
}

export default App 