function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-cream"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-12 md:px-8 md:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">

        {/* Left Content */}
        <div className="max-w-xl">

          {/* Small Label */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-cream-dark px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-moss" />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-moss">
              Your Local Grocery
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-5xl font-bold leading-[1.05] text-bark sm:text-6xl lg:text-7xl">
            Good food,
            <br />

            <span className="text-moss">
              right around
            </span>

            <br />

            the corner.
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-lg text-base leading-7 text-bark-light sm:text-lg">
            Fresh produce, everyday essentials, and local favorites
            brought together for your neighborhood. Quality food,
            friendly service, and a little more goodness in every basket.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            <a
              href="#products"
              className="inline-flex items-center justify-center rounded-full bg-moss px-7 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-bark"
            >
              Shop Products

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
            </a>

            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-full border border-border bg-white px-7 py-3.5 text-sm font-semibold text-bark transition-all hover:border-moss hover:text-moss"
            >
              Our Story
            </a>

          </div>

          {/* Store Information */}
          <div className="mt-10 grid grid-cols-1 gap-5 border-t border-border pt-6 sm:grid-cols-2">

            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-moss">
                Find Us
              </p>

              <p className="text-sm leading-6 text-bark-light">
                42 Maple Street,
                <br />
                Old Town
              </p>
            </div>

            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-moss">
                Opening Hours
              </p>

              <p className="text-sm leading-6 text-bark-light">
                Mon–Sat · 8am–8pm
                <br />
                Sun · 9am–6pm
              </p>
            </div>

          </div>
        </div>

        {/* Right Image */}
        <div className="relative">

          {/* Decorative background */}
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-moss-light opacity-70 blur-2xl" />

          <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-cream-dark" />

          {/* Main image */}
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-cream-dark shadow-xl">

            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1000&h=1000&fit=crop&auto=format"
              alt="Fresh vegetables at Green Basket Grocery"
              className="h-[420px] w-full object-cover sm:h-[520px]"
            />

            {/* Image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-bark/50 via-transparent to-transparent" />

            {/* Floating card */}
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/30 bg-white/90 p-4 shadow-lg backdrop-blur-md sm:left-auto sm:w-64">

              <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-moss-light">
                  <svg
                    className="h-5 w-5 text-moss"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M12 3v18m0-18c-4 0-7 2-7 5 0 3 3 4 7 4m0-9c4 0 7 2 7 5 0 3-3 4-7 4"
                    />
                  </svg>
                </div>

                <div>
                  <p className="font-display text-base font-semibold text-bark">
                    Fresh every day
                  </p>

                  <p className="mt-0.5 text-xs leading-5 text-bark-light">
                    Carefully selected produce from trusted local suppliers.
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero