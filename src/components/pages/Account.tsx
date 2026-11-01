import {
  Heart,
  LogOut,
  Mail,
  Package,
  Phone,
  User,
} from 'lucide-react'

import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'

function Account() {
  const { user, isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-cream px-6 py-20">
        <div className="mx-auto max-w-xl rounded-3xl border border-border bg-white p-10 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cream-dark">
            <User
              size={36}
              className="text-bark-light"
            />
          </div>

          <h1 className="mt-6 font-display text-3xl font-semibold text-bark">
            Please login
          </h1>

          <p className="mt-3 text-bark-light">
            Login to view your Green Basket account.
          </p>

          <Link
            to="/login"
            className="mt-7 inline-flex rounded-xl bg-moss px-6 py-3 font-semibold text-white transition hover:bg-bark"
          >
            Login to Account
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-cream">
      <section className="border-b border-border bg-cream-dark">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-moss">
            Green Basket
          </p>

          <h1 className="mt-3 font-display text-4xl font-semibold text-bark md:text-5xl">
            My Account
          </h1>

          <p className="mt-4 text-bark-light">
            Manage your profile, orders and wishlist.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">

          {/* Profile */}

          <div className="rounded-3xl border border-border bg-white p-7">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-moss-light">
              <User
                size={36}
                className="text-moss"
              />
            </div>

            <h2 className="mt-5 font-display text-2xl font-semibold text-bark">
              {user?.name}
            </h2>

            <p className="mt-1 text-sm text-bark-light">
              Green Basket Customer
            </p>

            <div className="mt-7 space-y-5 border-t border-border pt-6">

              <div className="flex items-center gap-3">
                <Mail
                  size={18}
                  className="text-moss"
                />

                <div>
                  <p className="text-xs text-bark-light">
                    Email
                  </p>

                  <p className="text-sm font-medium text-bark">
                    {user?.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone
                  size={18}
                  className="text-moss"
                />

                <div>
                  <p className="text-xs text-bark-light">
                    Phone
                  </p>

                  <p className="text-sm font-medium text-bark">
                    {user?.phone || 'Not added'}
                  </p>
                </div>
              </div>

            </div>

            <button
              type="button"
              className="mt-7 w-full rounded-xl border border-border py-3 font-semibold text-bark transition hover:border-moss hover:text-moss"
            >
              Edit Profile
            </button>
          </div>

          {/* Account Options */}

          <div>
            <h2 className="font-display text-2xl font-semibold text-bark">
              Account Overview
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">

              {/* Orders */}

              <Link
                to="/orders"
                className="group rounded-2xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-moss-light">
                  <Package
                    size={23}
                    className="text-moss"
                  />
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold text-bark transition group-hover:text-moss">
                  My Orders
                </h3>

                <p className="mt-2 text-sm leading-6 text-bark-light">
                  View and track your recent grocery orders.
                </p>
              </Link>

              {/* Wishlist */}

              <Link
                to="/wishlist"
                className="group rounded-2xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rust-light">
                  <Heart
                    size={23}
                    className="text-rust"
                  />
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold text-bark transition group-hover:text-moss">
                  Wishlist
                </h3>

                <p className="mt-2 text-sm leading-6 text-bark-light">
                  View all the products you've saved.
                </p>
              </Link>

            </div>

            {/* Logout */}

            <div className="mt-6 rounded-2xl border border-border bg-white p-6">
              <h3 className="font-display text-xl font-semibold text-bark">
                Account Settings
              </h3>

              <p className="mt-2 text-sm text-bark-light">
                You can securely logout from your account here.
              </p>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-rust/30 px-5 py-3 font-semibold text-rust transition hover:bg-rust hover:text-white"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}

export default Account