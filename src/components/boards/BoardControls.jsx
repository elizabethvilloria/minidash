import React from 'react'

function BoardControls({ onFilterChange, onSortChange }) {
  return (
    <div className="mb-6 flex flex-wrap gap-4 items-center">
      <div className="flex items-center space-x-2">
        <label htmlFor="filter" className="text-sm font-medium text-gray-700">
          Filter:
        </label>
        <select
          id="filter"
          onChange={(e) => onFilterChange(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="all">All Tasks</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <label htmlFor="sort" className="text-sm font-medium text-gray-700">
          Sort by:
        </label>
        <select
          id="sort"
          onChange={(e) => onSortChange(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="priority">Priority</option>
          <option value="title">Title</option>
          <option value="dueDate">Due Date</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <label htmlFor="order" className="text-sm font-medium text-gray-700">
          Order:
        </label>
        <select
          id="order"
          onChange={(e) => onSortChange(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  )
}

export default BoardControls 