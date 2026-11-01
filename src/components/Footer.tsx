function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-border bg-cream-dark"
    >
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">

        {/* Main Footer */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="inline-block">
              <div className="font-display text-2xl font-bold text-bark">
                Green Basket
              </div>

              <div className="text-xs font-medium uppercase tracking-[0.25em] text-moss">
                Grocery
              </div>
            </a>

            <p className="mt-5 max-w-sm text-sm leading-6 text-bark-light">
              Fresh produce, everyday essentials, and local favorites
              for our neighborhood. Fresh. Local. Always.
            </p>

            {/* Contact */}
            <div className="mt-6 space-y-2 text-sm text-bark-light">
              <p>42 Lucknow Old Town</p>
              <p>Mon–Sat · 8am–8pm · Sun · 9am–6pm</p>
              <p>+1 (555) 302-1847</p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-bark">
              Explore
            </h3>

            <nav className="mt-5 flex flex-col gap-3">
              <a
                href="#home"
                className="text-sm text-bark-light transition hover:text-moss"
              >
                Home
              </a>

              <a
                href="#categories"
                className="text-sm text-bark-light transition hover:text-moss"
              >
                Categories
              </a>

              <a
                href="#products"
                className="text-sm text-bark-light transition hover:text-moss"
              >
                Products
              </a>

              <a
                href="#about"
                className="text-sm text-bark-light transition hover:text-moss"
              >
                Our Story
              </a>
            </nav>
          </div>

          {/* Contact / Social */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-bark">
              Connect
            </h3>

            <p className="mt-5 text-sm leading-6 text-bark-light">
              Have a question? We'd love to hear from you.
            </p>

            <a
              href="tel:+15553021847"
              className="mt-4 inline-flex items-center text-sm font-semibold text-moss hover:text-bark"
            >
              Call the store
            </a>

            {/* Social */}
            <div className="mt-6 flex gap-2">

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-xs font-semibold text-bark transition hover:border-moss hover:text-moss"
              >
                IG
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-xs font-semibold text-bark transition hover:border-moss hover:text-moss"
              >
                FB
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-xs font-semibold text-bark transition hover:border-moss hover:text-moss"
              >
                X
              </a>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-xs text-bark-light sm:flex-row sm:items-center sm:justify-between">

          <p>
            © 2026 Green Basket Grocery. All rights reserved.
          </p>

          <div className="flex gap-5">
            <a
              href="#"
              className="hover:text-moss"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="hover:text-moss"
            >
              Terms
            </a>
          </div>

        </div>

      </div>
    </footer>
  )
}

export default Footer