import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowLeft,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'

function Wishlist() {
  const { addToCart } = useCart()

  const {
    wishlistItems,
    removeFromWishlist,
  } = useWishlist()

  return (
    <main className="min-h-screen bg-cream">

      {/* Header */}
      <section className="border-b border-border bg-cream-dark">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">

          <Link
            to="/products"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-bark-light transition hover:text-moss"
          >
            <ArrowLeft size={17} />
            Continue Shopping
          </Link>

          <div className="flex items-center gap-3">
            <Heart
              size={30}
              className="fill-rust text-rust"
            />

            <h1 className="font-display text-4xl font-semibold text-bark md:text-5xl">
              My Wishlist
            </h1>
          </div>

          <p className="mt-4 text-bark-light">
            {wishlistItems.length}{' '}
            {wishlistItems.length === 1
              ? 'item'
              : 'items'}{' '}
            saved for later.
          </p>

        </div>
      </section>

      {/* Wishlist Content */}
      <section className="mx-auto max-w-7xl px-6 py-12">

        {wishlistItems.length === 0 ? (

          /* Empty Wishlist */
          <div className="rounded-3xl border border-border bg-white px-6 py-20 text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rust-light">
              <Heart
                size={34}
                className="text-rust"
              />
            </div>

            <h2 className="mt-6 font-display text-3xl font-semibold text-bark">
              Your wishlist is empty
            </h2>

            <p className="mx-auto mt-3 max-w-md text-bark-light">
              Save products you love and come back to them
              whenever you are ready.
            </p>

            <Link
              to="/products"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-moss px-6 py-3 font-semibold text-white transition hover:bg-bark"
            >
              <ShoppingCart size={18} />
              Start Shopping
            </Link>

          </div>

        ) : (

          /* Wishlist Products */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {wishlistItems.map((product) => (

              <article
                key={product.id}
                className="overflow-hidden rounded-2xl border border-border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* Image */}
                <Link
                  to={`/products/${product.id}`}
                  className="block"
                >
                  <div className="aspect-square overflow-hidden bg-cream-dark">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />

                  </div>
                </Link>

                {/* Details */}
                <div className="p-5">

                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-moss">
                    {product.category}
                  </p>

                  <Link
                    to={`/products/${product.id}`}
                    className="block"
                  >
                    <h2 className="mt-2 font-display text-xl font-semibold text-bark transition hover:text-moss">
                      {product.name}
                    </h2>
                  </Link>

                  <p className="mt-1 text-sm text-bark-light">
                    {product.quantity}
                  </p>

                  <p className="mt-4 font-semibold text-bark">
                    {product.price}
                  </p>

                  {/* Actions */}
                  <div className="mt-5 flex gap-2">

                    <button
                      type="button"
                      disabled={!product.inStock}
                      onClick={() => addToCart(product)}
                      className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                        product.inStock
                          ? 'cursor-pointer bg-moss text-white hover:bg-bark'
                          : 'cursor-not-allowed bg-cream-dark text-bark-light'
                      }`}
                    >
                      {product.inStock && (
                        <ShoppingCart size={16} />
                      )}

                      {product.inStock
                        ? 'Add to Cart'
                        : 'Unavailable'}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        removeFromWishlist(product.id)
                      }
                      className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-border text-bark-light transition hover:border-rust hover:text-rust"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>

    </main>
  )
}

export default Wishlist