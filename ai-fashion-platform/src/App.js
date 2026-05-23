import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FilterBar from './components/FilterBar'
import ProductGrid from './components/ProductGrid'
import Footer from './components/Footer'
import AuthModal from './components/AuthModal'
import ProductModal from './components/ProductModal'
import AISearch from './components/AISearch'

function App() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAuth, setShowAuth] = useState(false)
  const [user, setUser] = useState(null)
  const [wishlist, setWishlist] = useState([])
  const [showWishlist, setShowWishlist] = useState(false)
  const [sort, setSort] = useState("default")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [aiResults, setAiResults] = useState(null)

  // Load wishlist from MongoDB when user logs in
  useEffect(() => {
    if (user) fetchWishlist()
  }, [user])

  const fetchWishlist = async () => {
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      const res = await fetch('http://localhost:5000/api/wishlist', {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      setWishlist(data.wishlist || [])
    } catch (err) {
      console.error(err)
    }
  }

  const handleWishlist = async (name) => {
    if (!user) { setShowAuth(true); return }
    const token = localStorage.getItem('token')
    const isWishlisted = wishlist.includes(name)
    const url = isWishlisted
      ? 'http://localhost:5000/api/wishlist/remove'
      : 'http://localhost:5000/api/wishlist/add'
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ item: name })
      })
      const data = await res.json()
      setWishlist(data.wishlist || [])
    } catch (err) {
      console.error(err)
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    setAiResults(null)
  }

  const handleLogin = (u) => {
    setUser(u)
  }

  return (
    <div>
      <Navbar
        onLoginClick={() => setShowAuth(true)}
        user={user}
        wishlistCount={wishlist.length}
        onWishlistClick={() => setShowWishlist(!showWishlist)}
      />
      <Hero onSearch={handleSearch} />
      <AISearch
        onResults={(results) => {
          setAiResults(results)
          setSearchQuery("")
        }}
        onClear={() => setAiResults(null)}
      />
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
        aiResults={aiResults}
      />
      <Footer />

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onLogin={handleLogin}
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