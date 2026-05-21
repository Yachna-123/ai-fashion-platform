import React from 'react'

const recommendations = {
  "Old Money": ["Beige Linen Set", "Blazer + Trousers"],
  "Y2K Vibes": ["Y2K Crop Top"],
  "Street Style": ["Oversized Hoodie", "Denim Jacket"],
  "Summer Casual": ["Floral Sundress", "Floral Co-ord Set"],
  "Party Look": ["Sequin Mini Dress"],
}

function ProductModal({ product, onClose, wishlist, onWishlist }) {
  const isWishlisted = wishlist.includes(product.name)
  const related = recommendations[product.aesthetic]?.filter(r => r !== product.name) || []

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-4">
      <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-lg border border-gray-700 relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
        >✕</button>

        <div className="bg-gradient-to-br from-gray-800 to-gray-700 h-48 rounded-xl flex items-center justify-center text-8xl mb-6">
          {product.emoji}
        </div>

        <h2 className="text-white text-2xl font-bold mb-1">{product.name}</h2>
        <p className="text-pink-400 mb-2">{product.aesthetic}</p>
        <p className="text-gray-400 text-sm mb-4">
          Perfect for any {product.aesthetic} occasion. Comfortable, stylish and trendy!
        </p>

        <div className="flex justify-between items-center mb-6">
          <span className="text-white text-2xl font-bold">₹{product.price}</span>
          <button
            onClick={() => onWishlist(product.name)}
            className={`px-5 py-2 rounded-full font-semibold transition ${
              isWishlisted
                ? "bg-pink-500 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-pink-500 hover:text-white"
            }`}
          >
            {isWishlisted ? "❤️ Wishlisted" : "🤍 Add to Wishlist"}
          </button>
        </div>

        {related.length > 0 && (
          <div>
            <h3 className="text-white font-semibold mb-3">✨ You may also like</h3>
            <div className="flex gap-2 flex-wrap">
              {related.map(item => (
                <span key={item} className="bg-gray-800 text-pink-300 px-3 py-1 rounded-full text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductModal