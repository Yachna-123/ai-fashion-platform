import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FilterBar from './components/FilterBar'
import ProductGrid from './components/ProductGrid'
import Footer from './components/Footer'
import AuthModal from './components/AuthModal'
import ProductModal from './components/ProductModal'

function App() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAuth, setShowAuth] = useState(false)
  const [user, setUser] = useState(null)
  const [wishlist, setWishlist] = useState([])
  const [showWishlist, setShowWishlist] = useState(false)
  const [sort, setSort] = useState("default")
  const [selectedProduct, setSelectedProduct] = useState(null)

  const handleWishlist = (name) => {
    if (!user) { setShowAuth(true); return }
    setWishlist(prev =>
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    )
  }

  return (
    <div>
      <Navbar
        onLoginClick={() => setShowAuth(true)}
        user={user}
        wishlistCount={wishlist.length}
        onWishlistClick={() => setShowWishlist(!showWishlist)}
      />
      <Hero onSearch={setSearchQuery} />
      <FilterBar onFilter={setActiveFilter} onSort={setSort} />

      {showWishlist && wishlist.length > 0 && (
        <div className="bg-gray-900 px-8 py-6 border-b border-gray-700">
          <h3 className="text-white text-xl font-bold mb-4">❤️ Your Wishlist</h3>
          <div className="flex gap-3 flex-wrap">
            {wishlist.map(item => (
              <span key={item} className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm">
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      <ProductGrid
        filter={activeFilter}
        search={searchQuery}
        wishlist={wishlist}
        onWishlist={handleWishlist}
        sort={sort}
        onCardClick={setSelectedProduct}
      />
      <Footer />

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onLogin={(u) => setUser(u)}
        />
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          wishlist={wishlist}
          onWishlist={handleWishlist}
        />
      )}
    </div>
  )
}

export default App