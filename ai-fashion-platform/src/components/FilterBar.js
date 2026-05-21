import React, { useState } from 'react'

const filters = ["All", "Old Money", "Y2K Vibes", "Street Style", "Summer Casual", "Party Look"]

function FilterBar({ onFilter, onSort }) {
  const [active, setActive] = useState("All")

  const handleClick = (filter) => {
    setActive(filter)
    onFilter(filter)
  }

  return (
    <div className="bg-black px-8 py-4 flex flex-wrap gap-3 justify-center items-center border-b border-gray-800">
      {filters.map(filter => (
        <button
          key={filter}
          onClick={() => handleClick(filter)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            active === filter
              ? "bg-pink-500 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-pink-500 hover:text-white"
          }`}
        >
          {filter}
        </button>
      ))}

      <select
        onChange={(e) => onSort(e.target.value)}
        className="bg-gray-800 text-gray-300 px-4 py-2 rounded-full text-sm outline-none cursor-pointer hover:bg-gray-700 ml-4"
      >
        <option value="default">Sort By</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
      </select>
    </div>
  )
}

export default FilterBar