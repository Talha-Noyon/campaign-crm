import {Link} from 'react-router-dom'

export function Error404() {
  return (
    <div className="tw-grid tw-min-h-dvh">
      <div className="tw-m-auto tw-flex tw-max-w-lg tw-flex-col tw-items-center tw-p-6">
        <h1 className="tw-text-4xl tw-font-bold">Oops!</h1>
        <div className="tw-text-lg tw-text-secondary-400">We can't find that page.</div>
        <img
          src="/media/auth/404-error.png"
          className="tw-mx-auto tw-block tw-max-w-sm"
          alt="404 - Page not found"
        />
        <Link to="/dashboard" className="btn btn-sm btn-primary">
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}
