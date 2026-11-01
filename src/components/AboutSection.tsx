function AboutSection() {
  return (
    <section
      id="about"
      className="bg-cream-dark py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Image */}
          <div className="relative">

            {/* Decorative shape */}
            <div className="absolute -bottom-5 -left-5 h-32 w-32 rounded-full bg-moss-light" />

            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1000&h=800&fit=crop&auto=format"
                alt="Fresh produce inside a grocery store"
                className="h-[420px] w-full object-cover sm:h-[500px]"
              />

              {/* Image badge */}
              <div className="absolute bottom-5 left-5 rounded-2xl bg-white/95 px-5 py-4 shadow-lg backdrop-blur">
                <p className="font-display text-lg font-semibold text-bark">
                  Fresh. Local. Always.
                </p>

                <p className="mt-1 text-xs text-bark-light">
                  Serving our neighborhood with care.
                </p>
              </div>
            </div>

          </div>

          {/* Content */}
          <div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-moss">
              Our Story
            </p>

            <h2 className="font-display text-4xl font-semibold leading-tight text-bark sm:text-5xl">
              Good food,
              <br />
              <span className="italic text-moss">
                brighter days.
              </span>
            </h2>

            <p className="mt-6 text-base leading-7 text-bark-light">
              At Green Basket Grocery, we believe grocery shopping should
              be simple, welcoming, and close to home. We bring together
              fresh produce, quality essentials, and everyday favorites
              for our local community.
            </p>

            <p className="mt-4 text-base leading-7 text-bark-light">
              From the farmers and suppliers we trust to the people who
              walk through our doors every day, we're proud to be part of
              a neighborhood that values good food and good people.
            </p>

            {/* Values */}
            <div className="mt-8 space-y-4">

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-moss-light text-moss">
                  <svg
                    className="h-5 w-5"
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
                </div>

                <div>
                  <h3 className="font-display text-base font-semibold text-bark">
                    Freshness First
                  </h3>

                  <p className="mt-1 text-sm text-bark-light">
                    Carefully selected products, refreshed every day.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-moss-light text-moss">
                  <svg
                    className="h-5 w-5"
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
                </div>

                <div>
                  <h3 className="font-display text-base font-semibold text-bark">
                    Close to Home
                  </h3>

                  <p className="mt-1 text-sm text-bark-light">
                    A neighborhood store built around our community.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-moss-light text-moss">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.7}
                      d="M12 3 4 6v5c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V6l-8-3Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.7}
                      d="m9 12 2 2 4-4"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="font-display text-base font-semibold text-bark">
                    Quality You Can Trust
                  </h3>

                  <p className="mt-1 text-sm text-bark-light">
                    Only products we'd be happy to put in our own basket.
                  </p>
                </div>
              </div>

            </div>

            {/* Button */}
            <a
              href="#contact"
              className="mt-9 inline-flex items-center rounded-full bg-moss px-7 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-bark"
            >
              Get to Know Us

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

          </div>

        </div>
      </div>
    </section>
  )
}

export default AboutSection