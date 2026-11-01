import { useState, type FormEvent } from 'react'
import { Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Signup() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setError('')

    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError('Please fill in all fields.')
      return
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }

    if (phone.length < 10) {
      setError('Please enter a valid phone number.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      setIsLoading(true)
      const res = await register({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
      })

      navigate('/login', {
        state: {
          message:
            res.message ||
            'Account created successfully! Please sign in with your credentials.',
        },
      })
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Signup failed. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-cream px-6 py-12 md:py-16">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-white shadow-sm md:grid-cols-2">

          {/* Left Side */}
          <div className="hidden bg-moss p-10 text-white md:flex md:flex-col md:justify-between lg:p-14">
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition hover:text-white"
              >
                <ArrowLeft size={17} />
                Back to Home
              </Link>
            </div>

            <div>
              <img
                src="/logo.svg"
                alt="Green Basket Grocery"
                className="mb-6 h-14 w-14 rounded-2xl shadow-lg ring-2 ring-white/20"
              />

              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-moss-light">
                Green Basket Grocery
              </p>

              <h1 className="font-display text-4xl font-semibold leading-tight lg:text-5xl">
                Fresh food,
                <br />
                close to home.
              </h1>

              <p className="mt-6 max-w-md leading-7 text-white/75">
                Create your account and make grocery shopping simple,
                fresh, and convenient.
              </p>
            </div>

            <p className="text-sm text-white/60">
              Fresh. Local. Always.
            </p>
          </div>

          {/* Right Side */}
          <div className="p-7 sm:p-10 lg:p-14">
            <div className="mb-8 md:hidden">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-bark-light transition hover:text-moss"
              >
                <ArrowLeft size={17} />
                Back to Home
              </Link>
            </div>

            <div className="mb-8">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-moss">
                Join Green Basket
              </p>

              <h2 className="font-display text-4xl font-semibold text-bark">
                Create account
              </h2>

              <p className="mt-3 text-sm leading-6 text-bark-light">
                Create your account to start shopping fresh groceries.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-bark"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  disabled={isLoading}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-border bg-cream px-4 py-3 text-sm text-bark outline-none transition placeholder:text-bark-light/50 focus:border-moss focus:ring-2 focus:ring-moss/10 disabled:opacity-60"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="signup-email"
                  className="mb-2 block text-sm font-semibold text-bark"
                >
                  Email Address
                </label>

                <input
                  id="signup-email"
                  type="email"
                  disabled={isLoading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-border bg-cream px-4 py-3 text-sm text-bark outline-none transition placeholder:text-bark-light/50 focus:border-moss focus:ring-2 focus:ring-moss/10 disabled:opacity-60"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-bark"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  disabled={isLoading}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border border-border bg-cream px-4 py-3 text-sm text-bark outline-none transition placeholder:text-bark-light/50 focus:border-moss focus:ring-2 focus:ring-moss/10 disabled:opacity-60"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="signup-password"
                  className="mb-2 block text-sm font-semibold text-bark"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    disabled={isLoading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full rounded-xl border border-border bg-cream px-4 py-3 pr-12 text-sm text-bark outline-none transition placeholder:text-bark-light/50 focus:border-moss focus:ring-2 focus:ring-moss/10 disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((current) => !current)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-bark-light transition hover:text-moss"
                    aria-label={
                      showPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="mb-2 block text-sm font-semibold text-bark"
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    id="confirm-password"
                    type={
                      showConfirmPassword ? 'text' : 'password'
                    }
                    disabled={isLoading}
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="Re-enter your password"
                    className="w-full rounded-xl border border-border bg-cream px-4 py-3 pr-12 text-sm text-bark outline-none transition placeholder:text-bark-light/50 focus:border-moss focus:ring-2 focus:ring-moss/10 disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (current) => !current,
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-bark-light transition hover:text-moss"
                    aria-label={
                      showConfirmPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-rust/20 bg-rust-light px-4 py-3 text-sm font-medium text-rust">
                  {error}
                </div>
              )}

              {/* Signup */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-moss px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-bark disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            {/* Login */}
            <p className="mt-6 text-center text-sm text-bark-light">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-moss transition hover:text-bark"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Signup
