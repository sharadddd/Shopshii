import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext'

function Cart() {
  const {
    cartItems,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart()

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-cream">
        <section className="mx-auto flex max-w-7xl items-center justify-center px-6 py-24">
          <div className="max-w-md text-center">

            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-moss-light">
              <ShoppingBag
                size={34}
                strokeWidth={1.7}
                className="text-moss"
              />
            </div>

            <h1 className="font-display text-4xl font-semibold text-bark">
              Your cart is empty
            </h1>

            <p className="mt-3 leading-7 text-bark-light">
              Looks like you haven't added anything to your cart yet.
            </p>

            <Link
              to="/products"
              className="mt-8 inline-flex rounded-xl bg-moss px-6 py-3 font-semibold text-white transition hover:bg-bark"
            >
              Start Shopping
            </Link>

          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-cream">

      {/* Header */}
      <section className="border-b border-border bg-cream-dark">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-moss">
            Green Basket Grocery
          </p>

          <h1 className="font-display text-5xl font-semibold text-bark">
            Your cart
          </h1>

          <p className="mt-3 text-bark-light">
            Review your items before checkout.
          </p>
        </div>
      </section>

      {/* Cart */}
      <section className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* Cart Items */}
          <div className="space-y-4">

            {cartItems.map((item) => {
              const price = Number(
                item.price.replace(/[^0-9.]/g, ''),
              )

              const itemTotal = price * item.cartQuantity

              return (
                <article
                  key={item.id}
                  className="flex gap-5 rounded-2xl border border-border bg-white p-4 sm:p-5"
                >

                  {/* Image */}
                  <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-cream-dark sm:h-32 sm:w-32">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between">

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-moss">
                        {item.category}
                      </p>

                      <h2 className="mt-1 font-display text-xl font-semibold text-bark">
                        {item.name}
                      </h2>

                      <p className="mt-1 text-sm text-bark-light">
                        {item.price}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4">

                      {/* Quantity */}
                      <div className="flex items-center rounded-xl border border-border">

                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          className="flex h-9 w-9 items-center justify-center text-bark-light transition hover:text-moss"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>

                        <span className="w-9 text-center text-sm font-semibold text-bark">
                          {item.cartQuantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          className="flex h-9 w-9 items-center justify-center text-bark-light transition hover:text-moss"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>

                      </div>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-2 text-sm font-medium text-rust transition hover:text-bark"
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>

                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="hidden text-right sm:block">
                    <p className="text-sm text-bark-light">
                      Item total
                    </p>

                    <p className="mt-1 font-semibold text-bark">
                      ${itemTotal.toFixed(2)}
                    </p>
                  </div>

                </article>
              )
            })}

          </div>

          {/* Summary */}
          <aside className="h-fit rounded-2xl border border-border bg-white p-6">

            <h2 className="font-display text-2xl font-semibold text-bark">
              Order summary
            </h2>

            <div className="mt-6 space-y-4">

              <div className="flex justify-between text-sm">
                <span className="text-bark-light">
                  Subtotal
                </span>

                <span className="font-medium text-bark">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-bark-light">
                  Delivery
                </span>

                <span className="font-medium text-moss">
                  Free
                </span>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-bark">
                    Total
                  </span>

                  <span className="font-display text-2xl font-semibold text-bark">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>

            </div>

            <Link
   to="/checkout"
  className="mt-6 block w-full rounded-xl bg-moss px-6 py-3.5 text-center font-semibold text-white transition hover:bg-bark"
>
  Proceed to Checkout
</Link>

            <Link
              to="/products"
              className="mt-3 block text-center text-sm font-medium text-bark-light transition hover:text-moss"
            >
              Continue Shopping
            </Link>

          </aside>

        </div>
      </section>

    </main>
  )
}

export default Cart