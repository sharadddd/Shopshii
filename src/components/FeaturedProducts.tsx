import { Heart, ShoppingCart, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { products as fallbackProducts, type Product } from '../data/products'
import { productService } from '../services/productService'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

function FeaturedProducts() {
  const { addToCart } = useCart()

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist()

  const [productsList, setProductsList] = useState<Product[]>(fallbackProducts)
  const [addedProductId, setAddedProductId] = useState<number | null>(null)

  useEffect(() => {
    productService
      .getProducts()
      .then((res) => {
        if (res.products && res.products.length > 0) {
          setProductsList(res.products)
        }
      })
      .catch(() => {})
  }, [])

  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleAddToCart = async (product: Product) => {
    setAddedProductId(product.id)
    await addToCart(product)
    setTimeout(() => {
      setAddedProductId((current) => (current === product.id ? null : current))
    }, 1500)
  }

  // Display top 8 featured products
  const featured = productsList.slice(0, 8)

  return (
    <section
      id="products"
      className="bg-cream py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">

        {/* Heading */}

        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-moss">
              Fresh From Our Shelves
            </p>

            <h2 className="font-display text-3xl font-semibold text-bark sm:text-4xl">
              Featured products
            </h2>
          </div>

          <Link
            to="/products"
            className="hidden items-center text-sm font-semibold text-moss transition hover:text-bark sm:flex"
          >
            View all products

            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h14m-6-6 6 6-6 6"
              />
            </svg>
          </Link>
        </div>

        {/* Product Grid */}

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((product) => {
            const isAdded = addedProductId === product.id

            return (
              <article
                key={product.id}
                className="group relative overflow-hidden rounded-2xl border border-border bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >

                {/* Wishlist */}

                <button
                  type="button"
                  onClick={() =>
                    handleWishlistToggle(product)
                  }
                  className="absolute right-3 top-3 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/95 shadow-md transition hover:scale-105"
                  aria-label={
                    isInWishlist(product.id)
                      ? 'Remove from wishlist'
                      : 'Add to wishlist'
                  }
                >
                  <Heart
                    size={17}
                    strokeWidth={2}
                    className={
                      isInWishlist(product.id)
                        ? 'fill-rust text-rust'
                        : 'text-bark-light'
                    }
                  />
                </button>

                {/* Product Image */}

                <Link
                  to={`/products/${product.id}`}
                  className="block"
                >
                  <div className="relative aspect-square overflow-hidden bg-cream-dark">

                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${
                        !product.inStock
                          ? 'grayscale-[60%] opacity-75'
                          : ''
                      }`}
                    />

                    {/* Stock Badge */}

                    <span
                      className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        product.inStock
                          ? 'bg-moss-light text-moss'
                          : 'bg-rust-light text-rust'
                      }`}
                    >
                      {product.inStock
                        ? product.quantity
                        : 'Out of stock'}
                    </span>
                  </div>
                </Link>

                {/* Product Info */}

                <div className="p-4">

                  <p className="text-xs font-medium text-bark-light/60">
                    {product.category}
                  </p>

                  {/* Product Name */}

                  <Link
                    to={`/products/${product.id}`}
                    className="block"
                  >
                    <h3 className="mt-1 font-display text-lg font-semibold text-bark transition hover:text-moss">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Price */}

                  <p
                    className={`mt-2 text-sm font-semibold ${
                      product.inStock
                        ? 'text-amber'
                        : 'text-bark-light/50'
                    }`}
                  >
                    {product.price}
                  </p>

                  {/* Add To Cart */}

                  <button
                    type="button"
                    disabled={!product.inStock}
                    onClick={() => handleAddToCart(product)}
                    className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition ${
                      product.inStock
                        ? isAdded
                          ? 'border-emerald-600 bg-emerald-600 text-white'
                          : 'cursor-pointer border-moss text-moss hover:bg-moss hover:text-white'
                        : 'cursor-not-allowed border-border bg-cream-dark text-bark-light/50'
                    }`}
                  >
                    {product.inStock && (
                      isAdded ? (
                        <Check size={15} strokeWidth={2.5} />
                      ) : (
                        <ShoppingCart
                          size={15}
                          strokeWidth={2}
                        />
                      )
                    )}

                    {product.inStock
                      ? isAdded
                        ? 'Added!'
                        : 'Add to Cart'
                      : 'Out of Stock'}
                  </button>
                </div>
              </article>
            )
          })}
        </div>

        {/* Mobile View All */}

        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/products"
            className="inline-flex items-center text-sm font-semibold text-moss transition hover:text-bark"
          >
            View all products

            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h14m-6-6 6 6-6 6"
              />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  )
}

export default FeaturedProducts
