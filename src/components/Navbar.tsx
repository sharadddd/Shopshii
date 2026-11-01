import { Link, useNavigate } from 'react-router-dom'
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  Heart,
} from 'lucide-react'
import {
  useMemo,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from 'react'

import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useWishlist } from '../context/WishlistContext'

function Navbar() {
  const { cartCount } = useCart()
  const { user, isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()
const { wishlistCount } = useWishlist()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchText, setSearchText] = useState('')

  /*
   * Live search suggestions
   */
  const searchSuggestions = useMemo(() => {
    const query = searchText.trim().toLowerCase()

    if (!query) {
      return []
    }

    return products
      .filter((product) => {
        return (
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
        )
      })
      .slice(0, 5)
  }, [searchText])

  const scrollToSection = (sectionId: string) => {
    navigate('/')

    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: 'smooth',
      })
    }, 100)

    setIsMenuOpen(false)
  }

  /*
   * Full search
   */
  const handleSearch = (e: FormEvent) => {
    e.preventDefault()

    const query = searchText.trim()

    if (!query) {
      navigate('/products')
      setIsSearchOpen(false)
      return
    }

    navigate(`/products?search=${encodeURIComponent(query)}`)

    setIsSearchOpen(false)
    setSearchText('')
    setIsMenuOpen(false)
  }

  /*
   * Product suggestion click
   */
  const handleSuggestionClick = (productId: number) => {
    navigate(`/products/${productId}`)

    setIsSearchOpen(false)
    setSearchText('')
    setIsMenuOpen(false)
  }

  /*
   * Keyboard handling
   */
  const handleSearchKeyDown = (
  e: KeyboardEvent<HTMLInputElement>,
) => {
    if (e.key === 'Escape') {
      setIsSearchOpen(false)
      setSearchText('')
    }
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-cream/95 backdrop-blur">

      {/* Main Navbar */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          to="/"
          className="group"
          onClick={() => {
            setIsMenuOpen(false)
            setIsSearchOpen(false)
          }}
        >
          <h1 className="font-display text-2xl font-bold text-bark">
            Green Basket
          </h1>

          <p className="text-xs font-medium uppercase tracking-[0.2em] text-moss">
            Grocery
          </p>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          <Link
            to="/"
            className="cursor-pointer text-sm font-medium text-bark-light transition hover:text-moss"
          >
            Home
          </Link>

          <button
            type="button"
            onClick={() => scrollToSection('categories')}
            className="cursor-pointer text-sm font-medium text-bark-light transition hover:text-moss"
          >
            Categories
          </button>

          <Link
            to="/products"
            className="cursor-pointer text-sm font-medium text-bark-light transition hover:text-moss"
          >
            Products
          </Link>

          <button
            type="button"
            onClick={() => scrollToSection('about')}
            className="cursor-pointer text-sm font-medium text-bark-light transition hover:text-moss"
          >
            About
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="cursor-pointer text-sm font-medium text-bark-light transition hover:text-moss"
          >
            Contact
          </button>

          {isLoggedIn ? (
         <div className="flex items-center gap-3">

    <Link
  to="/account"
  className="text-sm font-semibold text-bark transition hover:text-moss"
>
  Hi, {user?.name}
</Link>
 
     <Link
  to="/orders"
  className="text-sm font-medium text-bark-light transition hover:text-moss"
>
  My Orders
</Link>
    <button
      type="button"
      onClick={logout}
      className="cursor-pointer rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-bark-light transition hover:border-rust hover:text-rust"
    >
      Logout
    </button>
  </div>
) : (
  <Link
    to="/login"
    className="cursor-pointer rounded-xl bg-moss px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-bark"
  >
    Login
  </Link>
  
)}

        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">

          {/* Search */}
          <button
            type="button"
            onClick={() => {
              setIsSearchOpen((current) => !current)
              setIsMenuOpen(false)
            }}
            className="cursor-pointer text-bark-light transition hover:text-moss"
            aria-label="Search"
          >
            <Search size={20} strokeWidth={1.8} />
          </button>

            <Link
  to="/wishlist"
  className="relative cursor-pointer text-bark-light transition hover:text-moss"
  aria-label="Wishlist"
>
  <Heart
    size={21}
    strokeWidth={1.8}
  />

  {wishlistCount > 0 && (
    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-rust text-[10px] font-bold text-white">
      {wishlistCount}
    </span>
  )}
</Link>
          {/* Cart */}
          <Link
            to="/cart"
            className="relative cursor-pointer text-bark-light transition hover:text-moss"
            aria-label="Shopping cart"
          >
            <ShoppingCart
              size={21}
              strokeWidth={1.8}
            />

            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-rust text-[10px] font-bold text-white">
              {cartCount}
            </span>
          </Link>

          {/* Mobile Menu */}
          <button
            type="button"
            className="cursor-pointer text-bark md:hidden"
            aria-label={
              isMenuOpen
                ? 'Close menu'
                : 'Open menu'
            }
            onClick={() =>
              setIsMenuOpen((current) => !current)
            }
          >
            {isMenuOpen ? (
              <X
                size={24}
                strokeWidth={1.8}
              />
            ) : (
              <Menu
                size={24}
                strokeWidth={1.8}
              />
            )}
          </button>

        </div>
      </div>

      {/* Search Area */}
      {isSearchOpen && (
        <div className="border-t border-border bg-cream px-6 py-4">

          <div className="relative mx-auto max-w-7xl">

            <form
              onSubmit={handleSearch}
              className="flex gap-3"
            >

              {/* Input */}
              <div className="relative flex-1">

                <Search
                  size={19}
                  strokeWidth={1.8}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-bark-light"
                />

                <input
                  type="text"
                  value={searchText}
                  onChange={(e) =>
                    setSearchText(e.target.value)
                  }
                  onKeyDown={handleSearchKeyDown}
                  autoFocus
                  placeholder="Search groceries..."
                  className="w-full rounded-xl border border-border bg-white py-3 pl-11 pr-4 text-sm text-bark outline-none transition placeholder:text-bark-light/60 focus:border-moss"
                />

              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="cursor-pointer rounded-xl bg-moss px-5 py-3 text-sm font-semibold text-white transition hover:bg-bark"
              >
                Search
              </button>

            </form>

            {/* Suggestions */}
            {searchText.trim() && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-border bg-white shadow-xl">

                {searchSuggestions.length > 0 ? (
                  <div className="py-2">

                    {searchSuggestions.map(
                      (product) => (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() =>
                            handleSuggestionClick(
                              product.id,
                            )
                          }
                          className="flex w-full cursor-pointer items-center gap-4 px-4 py-3 text-left transition hover:bg-cream"
                        >

                          {/* Product Image */}
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-12 w-12 rounded-xl object-cover"
                          />

                          {/* Product Info */}
                          <div className="min-w-0 flex-1">

                            <p className="truncate font-semibold text-bark">
                              {product.name}
                            </p>

                            <p className="mt-0.5 text-xs text-bark-light">
                              {product.category}
                            </p>

                          </div>

                          {/* Price */}
                          <span className="text-sm font-semibold text-rust">
                            {product.price}
                          </span>

                        </button>
                      ),
                    )}

                    {/* View all */}
                    <button
                      type="button"
                      onClick={handleSearch}
                      className="w-full cursor-pointer border-t border-border px-4 py-3 text-sm font-semibold text-moss transition hover:bg-cream"
                    >
                      View all search results →
                    </button>

                  </div>
                ) : (
                  <div className="px-5 py-6 text-center">

                    <p className="font-semibold text-bark">
                      No products found
                    </p>

                    <p className="mt-1 text-sm text-bark-light">
                      Try another product or category.
                    </p>

                  </div>
                )}

              </div>
            )}

          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-cream px-6 py-5 md:hidden">

          <div className="flex flex-col gap-4">

            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="cursor-pointer text-sm font-medium text-bark-light transition hover:text-moss"
            >
              Home
            </Link>

            <button
              type="button"
              onClick={() =>
                scrollToSection('categories')
              }
              className="cursor-pointer text-left text-sm font-medium text-bark-light transition hover:text-moss"
            >
              Categories
            </button>

            <Link
              to="/products"
              onClick={() => setIsMenuOpen(false)}
              className="cursor-pointer text-left text-sm font-medium text-bark-light transition hover:text-moss"
            >
              Products
            </Link>

            <button
              type="button"
              onClick={() =>
                scrollToSection('about')
              }
              className="cursor-pointer text-left text-sm font-medium text-bark-light transition hover:text-moss"
            >
              About
            </button>

            <button
              type="button"
              onClick={() =>
                scrollToSection('contact')
              }
              className="cursor-pointer text-left text-sm font-medium text-bark-light transition hover:text-moss"
            >
              Contact
            </button>
  
              <Link
                to="/login"
                 onClick={() => setIsMenuOpen(false)}
               className="cursor-pointer rounded-xl bg-moss px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-bark"
>
                Login
</Link>

          </div>
        </div>
      )}

    </nav>
  )
}

export default Navbar