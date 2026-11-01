import { useState } from 'react'
import {
  CheckCircle2,
  PackageCheck,
  ShoppingBag,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

function OrderSuccess() {
  const location = useLocation()

  const [orderId] = useState<string>(() => {
    return (
      (location.state as { orderId?: string })?.orderId ||
      'GB-' + Math.floor(100000 + Math.random() * 900000).toString()
    )
  })

  const total = (location.state as { total?: number })?.total ?? 0
  const itemCount = (location.state as { itemCount?: number })?.itemCount ?? 0

  return (
    <main className="min-h-screen bg-cream px-6 py-16">
      <div className="mx-auto flex max-w-3xl justify-center">

        <div className="w-full rounded-3xl border border-border bg-white p-8 text-center shadow-sm md:p-12">

          {/* Success Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-moss-light">
            <CheckCircle2
              size={44}
              className="text-moss"
              strokeWidth={1.8}
            />
          </div>

          {/* Heading */}
          <p className="mt-7 text-sm font-semibold uppercase tracking-[0.2em] text-moss">
            Order Confirmed
          </p>

          <h1 className="mt-3 font-display text-4xl font-semibold text-bark md:text-5xl">
            Thank you for your order!
          </h1>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-bark-light">
            Your order has been successfully placed. We’ll prepare your
            groceries and get them ready for delivery.
          </p>

          {/* Summary Box */}
          <div className="mt-8 rounded-2xl border border-border bg-cream p-6 text-left">
            <h2 className="font-display text-xl font-semibold text-bark">
              Order Details
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-bark-light">
                  Order ID
                </p>
                <p className="mt-1 font-semibold text-bark">
                  {orderId}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-bark-light">
                  Total Items
                </p>
                <p className="mt-1 font-semibold text-bark">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-bark-light">
                  Amount Paid
                </p>
                <p className="mt-1 font-semibold text-bark">
                  ${total.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Extra Help Cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 text-left">
            <div className="flex gap-4 rounded-2xl border border-border bg-white p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-moss-light text-moss">
                <PackageCheck size={22} />
              </div>

              <div>
                <h3 className="font-display text-base font-semibold text-bark">
                  Order Tracking
                </h3>
                <p className="mt-1 text-sm leading-6 text-bark-light">
                  Track your delivery status anytime from the orders page.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl border border-border bg-white p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-moss-light text-moss">
                <ShoppingBag size={22} />
              </div>

              <div>
                <h3 className="font-display text-base font-semibold text-bark">
                  Fast Support
                </h3>
                <p className="mt-1 text-sm leading-6 text-bark-light">
                  Have questions about your order? Our team is always ready to help.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/orders"
              className="rounded-xl bg-moss px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-bark"
            >
              View My Orders
            </Link>

            <Link
              to="/products"
              className="rounded-xl border border-border bg-white px-6 py-3.5 text-sm font-semibold text-bark transition hover:border-moss hover:text-moss"
            >
              Continue Shopping
            </Link>
          </div>

        </div>

      </div>
    </main>
  )
}

export default OrderSuccess
