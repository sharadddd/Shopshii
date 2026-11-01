import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo)
  }

  private handleReload = () => {
    window.location.reload()
  }

  private handleGoHome = () => {
    window.location.href = '/'
  }

  public render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-cream px-6 py-20">
          <div className="mx-auto max-w-lg rounded-3xl border border-border bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-rust-light text-rust">
              <AlertTriangle size={36} strokeWidth={2} />
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rust">
              Something went wrong
            </p>

            <h1 className="mt-3 font-display text-3xl font-semibold text-bark">
              An unexpected error occurred
            </h1>

            <p className="mt-3 text-sm leading-6 text-bark-light">
              We encountered an issue while loading this page. You can try refreshing
              or return to the home page.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={this.handleReload}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-moss px-5 py-3 text-sm font-semibold text-white transition hover:bg-bark"
              >
                <RotateCcw size={16} />
                Refresh Page
              </button>

              <button
                type="button"
                onClick={this.handleGoHome}
                className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-border bg-cream px-5 py-3 text-sm font-semibold text-bark transition hover:border-moss hover:text-moss"
              >
                Go to Homepage
              </button>
            </div>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}
