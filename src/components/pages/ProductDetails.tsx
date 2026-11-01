import {
  ArrowLeft,
  Check,
  Heart,
  Minus,
  Plus,
  Share2,
  ShoppingCart,
  Loader2,
} from 'lucide-react'

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { products as fallbackProducts, type Product } from '../../data/products'
import { productService } from '../../services/productService'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'

function ProductDetails() {
  const { id } = useParams<{ id: string }>()

  const { addToCart } = useCart()

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist()

  // Find product
  const productId = Number(id)

  const [quantity, setQuantity] = useState(1)
  const [shareMessage, setShareMessage] = useState('')
  const [product, setProduct] = useState<Product | null>(() => {
    return fallbackProducts.find((item) => item.id === productId) || null
  })
  const [isLoading, setIsLoading] = useState(() => {
    return !fallbackProducts.some((item) => item.id === productId)
  })
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    let isMounted = true

    productService
      .getProductById(productId)
      .then((res) => {
        if (isMounted && res) {
          setProduct(res)
        }
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [productId])

  // Loading state
  if (isLoading && !product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream px-6 py-20">
        <div className="flex flex-col items-center text-bark-light">
          <Loader2 size={36} className="animate-spin text-moss" />
          <p className="mt-4 text-sm font-medium">Loading product details...</p>
        </div>
      </main>
    )
  }

  // Product not found
  if (!product) {
    return (
      <main className="min-h-screen bg-cream px-6 py-20">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-white p-10 text-center">
          <h1 className="font-display text-3xl font-semibold text-bark">
            Product not found
          </h1>

          <p className="mt-3 text-bark-light">
            The product you are looking for does not exist.
          </p>

          <Link
            to="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-moss px-5 py-3 text-sm font-semibold text-white transition hover:bg-bark"
          >
            <ArrowLeft size={17} />
            Back to Products
          </Link>
        </div>
      </main>
    )
  }

  const isWishlisted = isInWishlist(product.id)

  // Wishlist
  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  // Quantity
  const increaseQuantity = () => {
    setQuantity((current) => current + 1)
  }

  const decreaseQuantity = () => {
    setQuantity((current) =>
      current > 1 ? current - 1 : 1,
    )
  }

  // Add to cart
  const handleAddToCart = async () => {
    setIsAdding(true)
    await addToCart(product, quantity)
    setIsAdding(false)

    setShareMessage(
      `${quantity} ${quantity === 1 ? 'item' : 'items'} added to cart.`,
    )

    setTimeout(() => {
      setShareMessage('')
    }, 2500)
  }

  // Share product
  const handleShare = async () => {
    const shareUrl = window.location.href
    const shareData = {
      title: product.name,
      text: `Check out ${product.name} at Green Basket Grocery.`,
      url: shareUrl,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        setShareMessage('Product shared successfully.')
        setTimeout(() => setShareMessage(''), 2500)
        return
      }

      await navigator.clipboard.writeText(shareUrl)
      setShareMessage('Product link copied!')
      setTimeout(() => setShareMessage(''), 2500)
    } catch {
      try {
        const textToCopy = `${product.name} - ${shareUrl}`
        await navigator.clipboard.writeText(textToCopy)
        setShareMessage('Product link copied!')
      } catch {
        setShareMessage('Unable to share this product.')
      }
      setTimeout(() => setShareMessage(''), 2500)
    }
  }

  return (
    <main className="min-h-screen bg-cream">
      {/* Back Navigation */}
      <div className="mx-auto max-w-7xl px-6 pt-8 md:px-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-bark-light transition hover:text-moss"
        >
          <ArrowLeft size={17} />
          Back to Products
        </Link>
      </div>

      {/* Product Section */}
      <section className="mx-auto max-w-7xl px-6 py-10 md:px-8 md:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Product Image */}
          <div className="relative overflow-hidden rounded-3xl border border-border bg-white">
            <div className="aspect-square overflow-hidden bg-cream-dark">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Stock Badge */}
            <div className="absolute left-5 top-5">
              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  product.inStock
                    ? 'bg-moss-light text-moss'
                    : 'bg-rust-light text-rust'
                }`}
              >
                {product.inStock
                  ? 'In Stock'
                  : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">
            {/* Category */}
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-moss">
              {product.category}
            </p>

            {/* Product Name */}
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-bark sm:text-5xl">
              {product.name}
            </h1>

            {/* Quantity */}
            <p className="mt-4 text-base text-bark-light">
              {product.quantity}
            </p>

            {/* Price */}
            <p className="mt-6 text-3xl font-semibold text-bark">
              {product.price}
            </p>

            {/* Description */}
            <div className="mt-8 border-t border-border pt-8">
              <h2 className="font-display text-xl font-semibold text-bark">
                About this product
              </h2>

              <p className="mt-3 max-w-xl leading-7 text-bark-light">
                Fresh, carefully selected and ready for your
                kitchen. At Green Basket Grocery, we focus on
                bringing quality everyday groceries to your
                doorstep.
              </p>
            </div>

            {/* Quantity Selector */}
            {product.inStock && (
              <div className="mt-8">
                <p className="mb-3 text-sm font-semibold text-bark">
                  Quantity
                </p>

                <div className="inline-flex items-center rounded-xl border border-border bg-white">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    className="flex h-11 w-11 cursor-pointer items-center justify-center text-bark-light transition hover:text-moss"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={18} />
                  </button>

                  <span className="flex h-11 min-w-12 items-center justify-center border-x border-border px-3 font-semibold text-bark">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    className="flex h-11 w-11 cursor-pointer items-center justify-center text-bark-light transition hover:text-moss"
                    aria-label="Increase quantity"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Main Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {product.inStock && (
                <button
                  type="button"
                  disabled={isAdding}
                  onClick={handleAddToCart}
                  className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-moss px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-bark disabled:opacity-75"
                >
                  {isAdding ? (
                    <Loader2 size={19} className="animate-spin" />
                  ) : (
                    <ShoppingCart size={19} />
                  )}
                  {isAdding ? 'Adding...' : 'Add to Cart'}
                </button>
              )}

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={handleWishlist}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-white px-6 py-3.5 text-sm font-semibold text-bark transition hover:border-moss hover:text-moss"
              >
                <Heart
                  size={19}
                  className={
                    isWishlisted
                      ? 'fill-rust text-rust'
                      : 'text-bark-light'
                  }
                />

                {isWishlisted
                  ? 'Wishlisted'
                  : 'Add to Wishlist'}
              </button>

              {/* SHARE BUTTON */}
              <button
                type="button"
                onClick={handleShare}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-white px-6 py-3.5 text-sm font-semibold text-bark transition hover:border-moss hover:bg-moss hover:text-white"
              >
                <Share2 size={19} />
                Share
              </button>
            </div>

            {/* Out of Stock */}
            {!product.inStock && (
              <div className="mt-6 rounded-xl bg-rust-light p-4">
                <p className="text-sm font-semibold text-rust">
                  This product is currently out of stock.
                </p>

                <p className="mt-1 text-sm text-bark-light">
                  Please check back later.
                </p>
              </div>
            )}

            {/* Success / Share Message */}
            {shareMessage && (
              <div className="mt-5 flex items-center gap-2 rounded-xl border border-moss-light bg-moss-light px-4 py-3 text-sm font-semibold text-moss">
                <Check size={18} />
                {shareMessage}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Product Highlights */}
      <section className="border-t border-border bg-cream-dark">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-white p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-moss-light text-moss">
                <Check size={20} />
              </div>

              <h3 className="mt-4 font-display text-xl font-semibold text-bark">
                Quality Checked
              </h3>

              <p className="mt-2 text-sm leading-6 text-bark-light">
                Every product is selected with quality and
                freshness in mind.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-moss-light text-moss">
                <ShoppingCart size={20} />
              </div>

              <h3 className="mt-4 font-display text-xl font-semibold text-bark">
                Easy Shopping
              </h3>

              <p className="mt-2 text-sm leading-6 text-bark-light">
                Add your favourite products to the cart and
                checkout easily.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rust-light text-rust">
                <Heart size={20} />
              </div>

              <h3 className="mt-4 font-display text-xl font-semibold text-bark">
                Save for Later
              </h3>

              <p className="mt-2 text-sm leading-6 text-bark-light">
                Add products to your wishlist and come back
                whenever you need them.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ProductDetails
