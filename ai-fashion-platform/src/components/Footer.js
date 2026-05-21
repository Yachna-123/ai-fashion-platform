import React from 'react'

function Footer() {
  return (
    <div className="bg-black border-t border-gray-800 text-center py-8 px-4">
      <h2 className="text-pink-400 text-2xl font-bold mb-2">👗 StyleAI</h2>
      <p className="text-gray-500 text-sm mb-4">AI-powered fashion discovery platform</p>
      <div className="flex justify-center gap-6 text-gray-400 text-sm mb-4">
        <span className="hover:text-pink-400 cursor-pointer">Home</span>
        <span className="hover:text-pink-400 cursor-pointer">Discover</span>
        <span className="hover:text-pink-400 cursor-pointer">Wishlist</span>
        <span className="hover:text-pink-400 cursor-pointer">About</span>
      </div>
      <p className="text-gray-600 text-xs">© 2026 StyleAI. Built with React & Tailwind CSS</p>
    </div>
  )
}

export default Footer