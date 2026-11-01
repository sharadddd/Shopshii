import { ArrowLeft, Home, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-14rem)] items-center justify-center bg-cream px-6 py-20">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-moss-light text-moss">
          <ShoppingBag size={48} strokeWidth={1.8} />
        </div>

        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-moss">
          404 Error
        </p>

        <h1 className="mt-3 font-display text-4xl font-semibold text-bark sm:text-5xl">
          Page Not Found
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-bark-light">
          Sorry, we couldn't find the page you're looking for. It might have been
          moved or deleted.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-moss px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-bark"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-6 py-3.5 text-sm font-semibold text-bark transition hover:border-moss hover:text-moss"
          >
            <ArrowLeft size={18} />
            Browse Groceries
          </Link>
        </div>
      </div>
    </main>
  )
}
