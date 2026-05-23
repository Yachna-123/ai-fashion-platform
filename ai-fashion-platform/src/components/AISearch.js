import React, { useState } from 'react'

const BASE_URL = 'https://styleai-backend-z1lz.onrender.com'

function AISearch({ onResults, onClear }) {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleAISearch = async () => {
    if (!query.trim()) return
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/api/ai/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      })
      const data = await res.json()
      onResults(data.results)
      setSearched(true)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const handleClear = () => {
    setQuery('')
    setSearched(false)
    onClear()
  }

  return (
    <div className="bg-gradient-to-r from-gray-900 to-black px-8 py-6 border-b border-gray-800">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-pink-400 text-lg">✨</span>
          <h3 className="text-white font-semibold">AI Style Search</h3>
          <span className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">Powered by Gemini</span>
        </div>
        <p className="text-gray-400 text-sm mb-4">
          Describe what you want in plain words — AI will find it for you
        </p>
        <div className="flex gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAISearch()}
            placeholder='e.g. "casual summer outfit under ₹2000" or "party dress for night out"'
            className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-500 text-sm"
          />
          <button
            onClick={handleAISearch}
            disabled={loading}
            className="bg-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? '🔍 Thinking...' : '✨ Ask AI'}
          </button>
          {searched && (
            <button
              onClick={handleClear}
              className="bg-gray-700 text-white px-4 py-3 rounded-xl hover:bg-gray-600 transition"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default AISearch