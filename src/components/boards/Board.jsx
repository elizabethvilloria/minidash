import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import TaskList from './TaskList'
import BoardControls from './BoardControls'

function Board({ title }) {
  const [lists, setLists] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [newListTitle, setNewListTitle] = React.useState('')
  const [filter, setFilter] = React.useState('all')
  const [sortBy, setSortBy] = React.useState('priority')
  const [sortOrder, setSortOrder] = React.useState('asc')

  React.useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      try {
        setIsLoading(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setLists([
          { 
            id: 'todo', 
            title: 'To Do', 
            tasks: [
              { id: 'task-1', title: 'Check inventory', description: 'Count coffee beans and supplies', priority: 'high' },
              { id: 'task-2', title: 'Staff meeting', description: 'Weekly team sync at 9am', priority: 'medium' }
            ] 
          },
          { 
            id: 'inProgress', 
            title: 'In Progress', 
            tasks: [
              { id: 'task-3', title: 'Train new barista', description: 'Show coffee making techniques', priority: 'low' }
            ] 
          },
          { 
            id: 'done', 
            title: 'Done', 
            tasks: [
              { id: 'task-4', title: 'Order supplies', description: 'Ordered new coffee cups', priority: 'medium' }
            ] 
          }
        ])
      } catch (err) {
        setError('Failed to load board data')
        console.error('Error loading board:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

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

  const handleAddList = (e) => {
    e.preventDefault()
    if (!newListTitle.trim()) return

    const newList = {
      id: `list-${Date.now()}`,
      title: newListTitle.trim(),
      tasks: []
    }

    setLists([...lists, newList])
    setNewListTitle('')
  }

  const handleFilterChange = (value) => {
    setFilter(value)
  }

  const handleSortChange = (value) => {
    setSortBy(value)
  }

  const handleOrderChange = (value) => {
    setSortOrder(value)
  }

  const sortTasks = (tasks) => {
    return [...tasks].sort((a, b) => {
      let comparison = 0
      
      if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        comparison = priorityOrder[a.priority || 'low'] - priorityOrder[b.priority || 'low']
      } else if (sortBy === 'title') {
        comparison = a.title.localeCompare(b.title)
      } else if (sortBy === 'dueDate') {
        comparison = new Date(a.dueDate || 0) - new Date(b.dueDate || 0)
      }

      return sortOrder === 'asc' ? comparison : -comparison
    })
  }

  const filterTasks = (tasks) => {
    if (filter === 'all') return tasks
    return tasks.filter(task => task.priority === filter)
  }

  const processedLists = lists.map(list => ({
    ...list,
    tasks: sortTasks(filterTasks(list.tasks))
  }))

  if (error) {
    return (
      <div className="p-4 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 text-sm underline"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-80 flex-shrink-0 bg-gray-100 rounded-lg p-4 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="space-y-3">
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      
      <BoardControls
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        onOrderChange={handleOrderChange}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {processedLists.map(list => (
            <TaskList key={list.id} list={list} />
          ))}
          <div className="w-80 flex-shrink-0">
            <form onSubmit={handleAddList} className="bg-gray-100 rounded-lg p-4">
              <input
                type="text"
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
                placeholder="Add new list..."
                className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              >
                Add List
              </button>
            </form>
          </div>
        </div>
      </DragDropContext>
    </div>
  )
}

export default Board