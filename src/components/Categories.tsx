import { Link } from 'react-router-dom'

const categories = [
  {
    name: 'Fruits & Veg',
    description: 'Fresh produce',
    emoji: '🥬',
  },
  {
    name: 'Dairy',
    description: 'Milk, yogurt & cheese',
    emoji: '🥛',
  },
  {
    name: 'Bakery',
    description: 'Freshly baked',
    emoji: '🥖',
  },
  {
    name: 'Pantry',
    description: 'Everyday essentials',
    emoji: '🫒',
  },
  {
    name: 'Beverages',
    description: 'Drinks & juices',
    emoji: '🥤',
  },
  {
    name: 'Snacks',
    description: 'Little treats',
    emoji: '🍫',
  },
]

function Categories() {
  return (
    <section id="categories" className="bg-cream py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">

        {/* Heading */}
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-moss">
              Browse Our Selection
            </p>

            <h2 className="font-display text-3xl font-semibold text-bark sm:text-4xl">
              Shop by category
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-bark-light">
            From fresh produce to pantry staples, find everything you need
            for your everyday basket.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">

          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="group cursor-pointer rounded-2xl border border-border bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-moss hover:shadow-md"
            >

              {/* Icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cream-dark text-3xl transition-transform duration-200 group-hover:scale-110">
                {category.emoji}
              </div>

              {/* Text */}
              <h3 className="mt-5 font-display text-lg font-semibold text-bark">
                {category.name}
              </h3>

              <p className="mt-1 text-xs leading-5 text-bark-light">
                {category.description}
              </p>

              {/* Arrow */}
              <div className="mt-5 flex items-center text-xs font-semibold text-moss">
                Explore

                <svg
                  className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
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
              </div>

            </Link>
          ))}

        </div>

      </div>
    </section>
  )
}

export default Categories