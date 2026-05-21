import React from 'react'
import ProductCard from './ProductCard'

const outfits = [
  { id: 1, name: "Beige Linen Set", price: "2199", aesthetic: "Old Money", emoji: "👔" },
  { id: 2, name: "Y2K Crop Top", price: "999", aesthetic: "Y2K Vibes", emoji: "👚" },
  { id: 3, name: "Oversized Hoodie", price: "1499", aesthetic: "Street Style", emoji: "🧥" },
  { id: 4, name: "Floral Sundress", price: "1799", aesthetic: "Summer Casual", emoji: "👗" },
  { id: 5, name: "Sequin Mini Dress", price: "2499", aesthetic: "Party Look", emoji: "✨" },
  { id: 6, name: "Blazer + Trousers", price: "3199", aesthetic: "Old Money", emoji: "🎩" },
  { id: 7, name: "Denim Jacket", price: "1299", aesthetic: "Street Style", emoji: "🧤" },
  { id: 8, name: "Floral Co-ord Set", price: "2099", aesthetic: "Summer Casual", emoji: "🌸" },
]

function ProductGrid({ filter, search, wishlist, onWishlist, sort, onCardClick }) {
  const filtered = outfits
    .filter(o => filter === "All" || o.aesthetic === filter)
    .filter(o => o.name.toLowerCase().includes(search.toLowerCase()) ||
                 o.aesthetic.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "low") return Number(a.price) - Number(b.price)
      if (sort === "high") return Number(b.price) - Number(a.price)
      return 0
    })

  return (
    <div className="bg-black px-8 py-12">
      <h2 className="text-white text-3xl font-bold text-center mb-8">
        Trending <span className="text-pink-400">Styles</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {filtered.length > 0 ? filtered.map(outfit => (
          <ProductCard
            key={outfit.id}
            {...outfit}
            wishlist={wishlist}
            onWishlist={onWishlist}
            onClick={() => onCardClick(outfit)}
          />
        )) : (
          <p className="text-gray-400 text-center col-span-3">No outfits found 😢</p>
        )}
      </div>
    </div>
  )
}

export default ProductGrid