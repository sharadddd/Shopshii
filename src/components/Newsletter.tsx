function Newsletter() {
  return (
    <section className="bg-cream py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-bark px-6 py-12 text-center sm:px-12 md:py-16">

          {/* Decorative circles */}
          <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-moss opacity-30" />
          <div className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-rust opacity-20" />

          <div className="relative mx-auto max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-moss-light">
              Stay in the Loop
            </p>

            <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
              Good things, straight to your inbox.
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-cream-dark">
              Get updates about fresh arrivals, seasonal favorites,
              special offers, and what's happening around the store.
            </p>

            {/* Form */}
            <form
              className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email address"
                aria-label="Email address"
                className="min-w-0 flex-1 rounded-full border border-white/20 bg-white px-5 py-3.5 text-sm text-bark outline-none placeholder:text-bark-light/50 focus:border-moss"
              />

              <button
                type="submit"
                className="rounded-full bg-moss px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white hover:text-bark"
              >
                Subscribe
              </button>
            </form>

            <p className="mt-4 text-[11px] text-cream-dark/60">
              No spam. Just good food and useful updates.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter