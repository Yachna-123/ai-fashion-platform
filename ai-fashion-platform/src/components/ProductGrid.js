import React from 'react'
import Fuse from 'fuse.js'
import ProductCard from './ProductCard'

const outfits = [
  { id: 1, name: "Beige Linen Set", price: "2199", aesthetic: "Old Money", emoji: "👔", tags: "linen beige formal classy elegant" },
  { id: 2, name: "Y2K Crop Top", price: "999", aesthetic: "Y2K Vibes", emoji: "👚", tags: "y2k crop top trendy cute" },
  { id: 3, name: "Oversized Hoodie", price: "1499", aesthetic: "Street Style", emoji: "🧥", tags: "hoodie hudy hodi hodie hoddie sweater pullover oversized casual cozy" },
  { id: 4, name: "Floral Sundress", price: "1799", aesthetic: "Summer Casual", emoji: "👗", tags: "dress sundres floral summer sundress frock" },
  { id: 5, name: "Sequin Mini Dress", price: "2499", aesthetic: "Party Look", emoji: "✨", tags: "sequin party dress mini night out glam shimmer" },
  { id: 6, name: "Blazer + Trousers", price: "3199", aesthetic: "Old Money", emoji: "🎩", tags: "blazer trouser formal suit office smart" },
  { id: 7, name: "Denim Jacket", price: "1299", aesthetic: "Street Style", emoji: "🧤", tags: "denim jacket jeans casual street cool" },
  { id: 8, name: "Floral Co-ord Set", price: "2099", aesthetic: "Summer Casual", emoji: "🌸", tags: "coord set floral summer matching set co-ord" },
]

const fuse = new Fuse(outfits, {
  keys: ['name', 'aesthetic', 'tags'],
  threshold: 0.4,
  distance: 200,
  minMatchCharLength: 2,
  ignoreLocation: true,
  shouldSort: true,
})

function ProductGrid({ filter, search, wishlist, onWishlist, sort, onCardClick, aiResults }) {
  let displayOutfits

  if (aiResults !== null && aiResults !== undefined) {
    displayOutfits = aiResults
  } else if (search && search.trim() !== '') {
    const fuseResults = fuse.search(search)
    displayOutfits = fuseResults.length > 0
      ? fuseResults.map(r => r.item)
      : outfits.filter(o =>
          o.name.toLowerCase().includes(search.toLowerCase()) ||
          o.aesthetic.toLowerCase().includes(search.toLowerCase()) ||
          o.tags.toLowerCase().includes(search.toLowerCase())
        )
    if (filter !== "All") {
      displayOutfits = displayOutfits.filter(o => o.aesthetic === filter)
    }
  } else {
    displayOutfits = outfits.filter(o => filter === "All" || o.aesthetic === filter)
  }

  displayOutfits = [...displayOutfits].sort((a, b) => {
    if (sort === "low") return Number(a.price) - Number(b.price)
    if (sort === "high") return Number(b.price) - Number(a.price)
    return 0
  })

  return (
    <div className="bg-black px-8 py-12">
      {aiResults !== null && aiResults !== undefined && (
        <p className="text-center text-pink-400 text-sm mb-6">
          ✨ AI found {aiResults.length} outfit{aiResults.length !== 1 ? 's' : ''} for you
        </p>
      )}
      <h2 className="text-white text-3xl font-bold text-center mb-8">
        {aiResults !== null && aiResults !== undefined ? 'AI Recommended' : 'Trending'}{' '}
        <span className="text-pink-400">Styles</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {displayOutfits.length > 0 ? displayOutfits.map(outfit => (
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