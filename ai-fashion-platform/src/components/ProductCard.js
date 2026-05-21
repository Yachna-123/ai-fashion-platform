import React from 'react'

function ProductCard({ name, price, aesthetic, emoji, wishlist, onWishlist, onClick }) {
  const isWishlisted = wishlist.includes(name)

  return (
    <div
      onClick={onClick}
      className="bg-gray-900 rounded-2xl p-4 hover:scale-105 transition-transform cursor-pointer border border-gray-800 hover:border-pink-500"
    >
      <div className="bg-gradient-to-br from-gray-800 to-gray-700 h-48 rounded-xl flex items-center justify-center text-6xl mb-4">
        {emoji}
      </div>
      <h3 className="text-white font-semibold text-lg">{name}</h3>
      <p className="text-pink-400 text-sm mb-2">{aesthetic}</p>
      <div className="flex justify-between items-center">
        <span className="text-white font-bold">₹{price}</span>
        <button
          onClick={(e) => { e.stopPropagation(); onWishlist(name) }}
          className={`px-3 py-1 rounded-full text-sm transition ${
            isWishlisted
              ? "bg-pink-500 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-pink-500 hover:text-white"
          }`}
        >
          {isWishlisted ? "❤️ Wishlisted" : "🤍 Wishlist"}
        </button>
      </div>
    </div>
  )
}

export default ProductCard