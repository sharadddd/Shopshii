const features = [
  {
    number: '01',
    title: 'Fresh Every Day',
    description:
      'We carefully select fresh produce and everyday essentials so you always get quality you can trust.',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.7}
          d="M12 3v18m0-18c-4 0-7 2-7 5 0 3 3 4 7 4m0-9c4 0 7 2 7 5 0 3-3 4-7 4"
        />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Local & Trusted',
    description:
      'We work with trusted suppliers and local producers to bring good food closer to your neighborhood.',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.7}
          d="M12 21s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10Z"
        />
        <circle cx="12" cy="11" r="2.2" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Everyday Essentials',
    description:
      'From breakfast basics to pantry staples, find the products you need for everyday life.',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.7}
          d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5"
        />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Made for the Community',
    description:
      'A friendly neighborhood store where quality food and good service come together.',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.7}
          d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m7-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm9 10v-2a4 4 0 0 0-3-3.87m0-8a4 4 0 0 1 0 7.75"
        />
      </svg>
    ),
  },
]

function Features() {
  return (
    <section className="border-y border-border bg-cream-dark">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">

        {/* Section Heading */}
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-moss">
            Why Green Basket
          </p>

          <h2 className="font-display text-3xl font-semibold leading-tight text-bark sm:text-4xl">
            Good food should feel
            <span className="italic text-moss"> simple.</span>
          </h2>

          <p className="mt-4 text-sm leading-6 text-bark-light sm:text-base">
            Everything you need, without the complicated part. We keep our
            shelves thoughtful, our produce fresh, and our neighborhood close.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="group bg-cream p-6 transition-colors hover:bg-white sm:p-7"
            >
              {/* Number */}
              <div className="flex items-center justify-between">
                <span className="font-display text-sm italic text-bark-light/50">
                  {feature.number}
                </span>

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-moss-light text-moss transition-all group-hover:bg-moss group-hover:text-white">
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="mt-8 font-display text-xl font-semibold text-bark">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-bark-light">
                {feature.description}
              </p>

              {/* Bottom line */}
              <div className="mt-6 h-px w-8 bg-moss transition-all duration-300 group-hover:w-16" />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Features