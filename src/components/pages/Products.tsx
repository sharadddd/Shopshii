import {
  Search,
  SlidersHorizontal,
  ShoppingCart,
  Heart,
  Loader2,
  RefreshCw,
  Check,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { products as initialProducts, type Product } from '../../data/products'
import { productService } from '../../services/productService'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'

function Products() {
  const { addToCart } = useCart()

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist()

  const [searchParams] = useSearchParams()

  const [productsList, setProductsList] = useState<Product[]>(initialProducts)
  const [isLoading, setIsLoading] = useState(false)
  const [isLiveBackend, setIsLiveBackend] = useState(false)
  const [addedProductId, setAddedProductId] = useState<number | null>(null)

  const [search, setSearch] = useState(
    searchParams.get('search') || '',
  )

  const [category, setCategory] = useState(
    searchParams.get('category') || 'All',
  )

  const [stock, setStock] = useState('All')

  // Load products from backend
  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const result = await productService.getProducts()
      setProductsList(result.products)
      setIsLiveBackend(result.isLive)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let isMounted = true
    productService
      .getProducts()
      .then((result) => {
        if (isMounted) {
          setProductsList(result.products)
          setIsLiveBackend(result.isLive)
        }
      })
      .catch(() => {})

    return () => {
      isMounted = false
    }
  }, [])

  const categories = useMemo(() => {
    return [
      'All',
      ...new Set(productsList.map((product) => product.category)),
    ]
  }, [productsList])

  const filteredProducts = useMemo(() => {
    return productsList.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase())

      const matchesCategory =
        category === 'All' ||
        product.category === category

      const matchesStock =
        stock === 'All' ||
        (stock === 'In Stock' && product.inStock) ||
        (stock === 'Out of Stock' && !product.inStock)

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStock
      )
    })
  }, [productsList, search, category, stock])

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

  return (
    <main className="min-h-screen bg-cream">

      {/* =========================
          Header
      ========================= */}
      <section className="border-b border-border bg-cream-dark">
        <div className="mx-auto max-w-7xl px-6 py-16">

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-moss">
                Fresh from our shelves
              </p>

              <h1 className="font-display text-5xl font-semibold text-bark md:text-6xl">
                Shop our groceries.
              </h1>
            </div>

            {/* Backend connection pill */}
            <div className="flex items-center gap-2 rounded-full border border-border bg-white px-3.5 py-1.5 text-xs font-medium text-bark-light">
              <span
                className={`h-2 w-2 rounded-full ${
                  isLiveBackend ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                }`}
              />
              {isLiveBackend ? 'Backend Connected' : 'Catalog Mode'}
              <button
                type="button"
                onClick={fetchProducts}
                className="ml-1 cursor-pointer text-bark-light hover:text-moss"
                title="Refresh products from API"
              >
                <RefreshCw size={13} className={isLoading ? 'animate-spin' : ''} />
              </button>
            </div>
          </div>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-bark-light">
            From fresh produce to everyday essentials, find everything
            you need for your kitchen and home.
          </p>

        </div>
      </section>

      {/* =========================
          Products Section
      ========================= */}
      <section className="mx-auto max-w-7xl px-6 py-12">

        {/* =========================
            Filter Bar
        ========================= */}
        <div className="mb-10 rounded-2xl border border-border bg-white p-4">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

            {/* Search */}
            <div className="relative flex-1">

              <Search
                size={20}
                strokeWidth={1.8}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-bark-light"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search groceries..."
                className="w-full rounded-xl border border-border bg-cream py-3 pl-11 pr-4 text-sm text-bark outline-none transition placeholder:text-bark-light/60 focus:border-moss"
              />

            </div>

            {/* Category */}
            <div className="flex items-center gap-3">

              <SlidersHorizontal
                size={19}
                strokeWidth={1.8}
                className="text-bark-light"
              />

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="rounded-xl border border-border bg-cream px-4 py-3 text-sm text-bark outline-none focus:border-moss"
              >
                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>

            </div>

            {/* Stock */}
            <select
              value={stock}
              onChange={(e) =>
                setStock(e.target.value)
              }
              className="rounded-xl border border-border bg-cream px-4 py-3 text-sm text-bark outline-none focus:border-moss"
            >
              <option value="All">
                All availability
              </option>

              <option value="In Stock">
                In Stock
              </option>

              <option value="Out of Stock">
                Out of Stock
              </option>
            </select>

          </div>

        </div>

        {/* =========================
            Result Info
        ========================= */}
        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="font-display text-2xl font-semibold text-bark">
              {search
                ? `Search results for "${search}"`
                : category !== 'All'
                  ? category
                  : 'All products'}
            </h2>

            <p className="mt-1 text-sm text-bark-light">
              {filteredProducts.length}{' '}
              {filteredProducts.length === 1
                ? 'product'
                : 'products'}{' '}
              available
            </p>

          </div>

        </div>

        {/* =========================
            Loading State
        ========================= */}
        {isLoading && productsList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-bark-light">
            <Loader2 size={36} className="animate-spin text-moss" />
            <p className="mt-4 text-sm font-medium">Fetching products from backend...</p>
          </div>
        ) : filteredProducts.length > 0 ? (

          /* =========================
              Product Grid
          ========================= */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredProducts.map((product) => {
              const isAdded = addedProductId === product.id

              return (
                <article
                  key={product.id}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* =========================
                      Wishlist Button
                  ========================= */}
                  <button
                    type="button"
                    onClick={() =>
                      handleWishlistToggle(product)
                    }
                    className="absolute right-3 top-3 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/95 shadow-md transition hover:scale-105"
                    aria-label={
                      isInWishlist(product.id)
                        ? 'Remove from wishlist'
                        : 'Add to wishlist'
                    }
                  >
                    <Heart
                      size={19}
                      strokeWidth={2}
                      className={
                        isInWishlist(product.id)
                          ? 'fill-rust text-rust'
                          : 'text-bark-light'
                      }
                    />
                  </button>

                  {/* =========================
                      Product Image
                  ========================= */}
                  <Link
                    to={`/products/${product.id}`}
                    className="block"
                  >
                    <div className="relative aspect-square overflow-hidden bg-cream-dark">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      {/* Stock */}
                      <span
                        className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold ${
                          product.inStock
                            ? 'bg-moss-light text-moss'
                            : 'bg-rust-light text-rust'
                        }`}
                      >
                        {product.inStock
                          ? 'In stock'
                          : 'Out of stock'}
                      </span>

                    </div>
                  </Link>

                  {/* =========================
                      Product Details
                  ========================= */}
                  <div className="p-5">

                    {/* Category */}
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-moss">
                      {product.category}
                    </p>

                    {/* Product Name */}
                    <Link
                      to={`/products/${product.id}`}
                      className="block"
                    >
                      <h3 className="mt-2 font-display text-xl font-semibold text-bark transition hover:text-moss">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Quantity */}
                    <p className="mt-1 text-sm text-bark-light">
                      {product.quantity}
                    </p>

                    {/* Bottom */}
                    <div className="mt-5 flex items-center justify-between gap-3">

                      {/* Price */}
                      <span className="font-semibold text-bark">
                        {product.price}
                      </span>

                      {/* Add To Cart */}
                      <button
                        type="button"
                        disabled={!product.inStock}
                        onClick={() => handleAddToCart(product)}
                        className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                          product.inStock
                            ? isAdded
                              ? 'bg-emerald-600 text-white'
                              : 'cursor-pointer bg-moss text-white hover:bg-bark'
                            : 'cursor-not-allowed bg-cream-dark text-bark-light'
                        }`}
                      >

                        {product.inStock && (
                          isAdded ? (
                            <Check size={16} strokeWidth={2.5} />
                          ) : (
                            <ShoppingCart
                              size={16}
                              strokeWidth={2}
                            />
                          )
                        )}

                        {product.inStock
                          ? isAdded
                            ? 'Added!'
                            : 'Add'
                          : 'Unavailable'}

                      </button>

                    </div>

                  </div>

                </article>
              )
            })}

          </div>

        ) : (

          /* =========================
             No Products
          ========================= */
          <div className="rounded-2xl border border-border bg-white px-6 py-20 text-center">

            <h2 className="font-display text-2xl font-semibold text-bark">
              No products found
            </h2>

            <p className="mt-2 text-bark-light">
              Try another search or change your filters.
            </p>

          </div>

        )}

      </section>

    </main>
  )
}

export default Products
