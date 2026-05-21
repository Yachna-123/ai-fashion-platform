import React from 'react'

function Navbar({ onLoginClick, user, wishlistCount, onWishlistClick }) {
  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-pink-400">👗 StyleAI</h1>
      <div className="flex gap-6">
        <a href="#" className="hover:text-pink-400">Home</a>
        <a href="#" className="hover:text-pink-400">Discover</a>
        <button
          onClick={onWishlistClick}
          className="hover:text-pink-400 relative"
        >
          Wishlist
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </button>
      </div>
      {user ? (
        <span className="text-pink-400 font-semibold">Hi, {user.name}! 👋</span>
      ) : (
        <button
          onClick={onLoginClick}
          className="bg-pink-500 px-4 py-2 rounded-full text-sm hover:bg-pink-600"
        >
          Login
        </button>
      )}
    </nav>
  )
}

export default Navbar