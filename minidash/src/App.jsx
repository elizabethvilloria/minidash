import React from 'react'
import Navbar from './components/layout/Navbar'
import Board from './components/boards/Board'

function App() {
  const [lists, setLists] = React.useState([
    { 
      id: 'todo', 
      title: 'To Do', 
      tasks: []
    },
    { 
      id: 'inProgress', 
      title: 'In Progress', 
      tasks: []
    },
    { 
      id: 'done', 
      title: 'Done', 
      tasks: []
    }
  ])

  const handleMoveTask = (taskId, newListId) => {
    setLists(currentLists => {
      // Find the task in any list
      let task
      let sourceListId
      
      currentLists.forEach(list => {
        const foundTask = list.tasks.find(t => t.id === taskId)
        if (foundTask) {
          task = foundTask
          sourceListId = list.id
        }
      })

      if (!task) return currentLists

      return currentLists.map(list => {
        // Remove from old list
        if (list.id === sourceListId) {
          return {
            ...list,
            tasks: list.tasks.filter(t => t.id !== taskId)
          }
        }
        // Add to new list
        if (list.id === newListId) {
          return {
            ...list,
            tasks: [...list.tasks, task]
          }
        }
        return list
      })
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto py-8">
        <Board 
          title="Daily Operations" 
          lists={lists} 
          onMoveTask={handleMoveTask}
        />
      </main>
    </div>
  )
}

export default App