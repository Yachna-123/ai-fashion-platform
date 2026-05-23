import React, { useState } from 'react'

function Hero({ onSearch }) {
  const [value, setValue] = useState('')

  const handleChange = (e) => {
    setValue(e.target.value)
    onSearch(e.target.value)
  }

  const handleTagClick = (tag) => {
    setValue(tag)
    onSearch(tag)
  }

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-pink-950 min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-extrabold text-white mb-4">
        Discover Your <span className="text-pink-400">Perfect Style</span>
      </h1>
      <p className="text-gray-400 text-lg mb-8 max-w-xl">
        AI-powered fashion discovery. Find outfits by mood, aesthetic, and budget.
      </p>

      <div className="flex gap-4 mb-10">
        <input
          type="text"
          value={value}
          placeholder='Try "Old money" or "Party look"...'
          onChange={handleChange}
          className="w-80 px-4 py-3 rounded-full bg-gray-800 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-pink-400"
        />
        <button className="bg-pink-500 px-6 py-3 rounded-full text-white font-semibold hover:bg-pink-600">
          Search
        </button>
      </div>

      <div className="flex gap-3 flex-wrap justify-center">
        {["Old Money", "Y2K Vibes", "Street Style", "Summer Casual", "Party Look"].map(tag => (
          <span
            key={tag}
            onClick={() => handleTagClick(tag)}
            className="bg-gray-800 text-pink-300 px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-pink-500 hover:text-white transition">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Hero