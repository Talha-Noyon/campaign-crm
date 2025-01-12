import {AlertTriangleIcon} from 'lucide-react'
import {Component, type ReactNode, useEffect, useState} from 'react'

import {localAuth} from '@/store/LocalAuth'

type Props = {
  fallback: ((error: Error) => ReactNode) | ReactNode
  children: ReactNode
}

type State = {
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state = {
    error: null
  }

  static getDerivedStateFromError(error: unknown) {
    if (error instanceof Error) {
      return {
        error
      }
    }

    return {
      error: new Error('Something went wrong')
    }
  }

  render() {
    const {error} = this.state
    const {fallback, children} = this.props

    if (error) {
      return typeof fallback === 'function' ? fallback(error) : fallback
    }

    return children
  }
}

export function ErrorFallback({error}: {error: Error | undefined | null}) {
  const errorMisc = useErrorMisc()

  return (
    <div className="tw-grid tw-h-dvh tw-p-4">
      <div className="tw-border-reset tw-w-full tw-rounded-lg tw-border tw-p-4">
        <div className="tw-border-reset tw-flex tw-items-center tw-gap-2 tw-border-b tw-pb-4 tw-text-red-700">
          <div className="tw-inline-flex tw-rounded-full tw-bg-red-50 tw-p-2">
            <AlertTriangleIcon className="tw-size-8" />
          </div>
          <div>
            <h3 className="tw-m-0 tw-text-xl tw-font-bold tw-text-inherit">Error found</h3>
            <span className="tw-text-base">
              Please take a <strong>screenshot</strong> and send to the support team
            </span>
          </div>
        </div>
        <div className="tw-border-reset tw-mt-4 tw-text-lg tw-text-secondary-500">
          <strong>{error?.message}</strong>
          <Pre>{error?.stack}</Pre>
          <Pre>{JSON.stringify(errorMisc, null, 2)}</Pre>
        </div>
      </div>
    </div>
  )
}

function Pre({children}: {children?: string}) {
  return (
    <pre className="tw-m-0 tw-mt-4 tw-rounded-md tw-bg-secondary-100 tw-p-2 tw-font-mono tw-font-medium">
      {children}
    </pre>
  )
}

function useErrorMisc() {
  const [misc, setMisc] = useState<unknown>()

  useEffect(() => {
    setMisc(getErrorMisc())
  }, [])

  return misc
}

function getErrorMisc() {
  const href = window.location.href
  const user = localAuth.get()

  if (!user) {
    return {
      href
    }
  }

  return {
    href,
    user: {
      id: user._id,
      email: user.user_email
    }
  }
}
