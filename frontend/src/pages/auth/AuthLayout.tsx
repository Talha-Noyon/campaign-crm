import {Outlet} from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="md:tw-grid md:tw-min-h-screen md:tw-grid-cols-2">
      {/* Background Section */}
      <div
        style={{
          backgroundImage:
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%), url(/media/auth/bg-pattern.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        className="tw-relative md:tw-order-2"
      >
        <div className="tw-flex tw-h-full tw-flex-col tw-items-center tw-justify-center tw-p-6 tw-text-center">
          <h1 className="tw-text-4xl tw-font-extrabold tw-leading-tight tw-text-white lg:tw-text-5xl">
            Welcome to Example
          </h1>
          <p className="tw-mb-2 tw-mt-2 tw-text-lg tw-text-white tw-opacity-90 lg:tw-text-xl">
            Transforming the way you manage your business.
          </p>
          <img
            src="/media/auth/marketing-amico.svg"
            alt="Auth Illustration"
            className="tw-mt-8 tw-w-3/4 lg:tw-w-2/3"
          />
        </div>
      </div>
      {/* Form Section */}
      <div className="tw-flex tw-items-center tw-justify-center tw-bg-white tw-p-6 md:tw-p-12">
        <div className="tw-w-full tw-max-w-md">
          <div className="tw-text-center">
            <h2 className="tw-text-3xl tw-font-semibold tw-text-gray-800">Login to Example</h2>
            <p className="tw-mt-2 tw-font-medium tw-text-gray-500">
              Streamline your business in just a few clicks.
            </p>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
