import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
  PackageCheck,
  ShoppingBag,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

type Order = {
  id: string
  date: string
  status: string
  paymentMethod: string
  items: number
  total: number
}

const dummyOrders: Order[] = [
  {
    id: 'GB-482913',
    date: '25 Sep 2026',
    status: 'Confirmed',
    paymentMethod: 'Cash on Delivery',
    items: 4,
    total: 18.96,
  },
  {
    id: 'GB-371845',
    date: '20 Sep 2026',
    status: 'Delivered',
    paymentMethod: 'Cash on Delivery',
    items: 3,
    total: 14.47,
  },
  {
    id: 'GB-268421',
    date: '14 Sep 2026',
    status: 'Delivered',
    paymentMethod: 'Cash on Delivery',
    items: 5,
    total: 27.45,
  },
]

function MyOrders() {
  const [openOrder, setOpenOrder] = useState<string | null>(null)

  const toggleOrder = (orderId: string) => {
    setOpenOrder((current) =>
      current === orderId ? null : orderId,
    )
  }

  return (
    <main className="min-h-screen bg-cream">
      <section className="border-b border-border bg-cream-dark">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-moss">
            Your purchases
          </p>

          <h1 className="font-display text-4xl font-semibold text-bark md:text-5xl">
            My Orders
          </h1>

          <p className="mt-4 max-w-2xl text-bark-light">
            View your recent orders and keep track of your
            grocery purchases.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
        {dummyOrders.length === 0 ? (
          <div className="rounded-3xl border border-border bg-white px-6 py-20 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cream-dark">
              <ShoppingBag
                size={36}
                className="text-bark-light"
              />
            </div>

            <h2 className="mt-6 font-display text-3xl font-semibold text-bark">
              No orders yet
            </h2>

            <p className="mt-3 text-bark-light">
              Your completed orders will appear here.
            </p>

            <Link
              to="/products"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-moss px-6 py-3 font-semibold text-white transition hover:bg-bark"
            >
              <ShoppingBag size={18} />
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {dummyOrders.map((order) => {
              const isOpen = openOrder === order.id

              return (
                <article
                  key={order.id}
                  className="overflow-hidden rounded-2xl border border-border bg-white"
                >
                  <div className="p-5 md:p-6">
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-moss-light">
                          <PackageCheck
                            size={23}
                            className="text-moss"
                          />
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-bark-light">
                            Order ID
                          </p>

                          <h2 className="mt-1 font-display text-xl font-semibold text-bark">
                            {order.id}
                          </h2>

                          <div className="mt-2 flex items-center gap-2 text-sm text-bark-light">
                            <CalendarDays size={15} />
                            {order.date}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                            order.status === 'Delivered'
                              ? 'bg-moss-light text-moss'
                              : 'bg-amber/10 text-amber'
                          }`}
                        >
                          {order.status}
                        </span>

                        <span className="font-semibold text-bark">
                          ${order.total.toFixed(2)}
                        </span>

                        <button
                          type="button"
                          onClick={() => toggleOrder(order.id)}
                          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border text-bark-light transition hover:border-moss hover:text-moss"
                          aria-label="Toggle order details"
                        >
                          {isOpen ? (
                            <ChevronUp size={18} />
                          ) : (
                            <ChevronDown size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    {isOpen && (
                      <div className="mt-6 border-t border-border pt-6">
                        <div className="grid gap-4 sm:grid-cols-3">
                          <div className="rounded-xl bg-cream p-4">
                            <p className="text-xs font-semibold uppercase tracking-wider text-bark-light">
                              Items
                            </p>

                            <p className="mt-1 font-semibold text-bark">
                              {order.items}{' '}
                              {order.items === 1
                                ? 'item'
                                : 'items'}
                            </p>
                          </div>

                          <div className="rounded-xl bg-cream p-4">
                            <p className="text-xs font-semibold uppercase tracking-wider text-bark-light">
                              Payment
                            </p>

                            <p className="mt-1 font-semibold text-bark">
                              {order.paymentMethod}
                            </p>
                          </div>

                          <div className="rounded-xl bg-cream p-4">
                            <p className="text-xs font-semibold uppercase tracking-wider text-bark-light">
                              Total
                            </p>

                            <p className="mt-1 font-semibold text-bark">
                              ${order.total.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-6 py-3 font-semibold text-bark-light transition hover:border-moss hover:text-moss"
          >
            <ShoppingBag size={18} />
            Continue Shopping
          </Link>
        </div>
      </section>
    </main>
  )
}

export default MyOrders