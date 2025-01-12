import {useEffect, useState} from 'react'

type Props = {
  show: boolean
  onClick?: () => void
}

export function FullScreenSpinner({show, onClick}: Props) {
  const [visible, setVisible] = useState(show)

  // Handle fade-in and fade-out
  useEffect(() => {
    if (show) {
      setVisible(true)
    } else {
      const timer = setTimeout(() => setVisible(false), 300) // Matches transition duration
      return () => clearTimeout(timer)
    }
  }, [show])

  if (!visible) return null

  return (
    <div
      onClick={onClick}
      className={`tw-fixed tw-inset-0 tw-z-[150] tw-grid tw-place-items-center tw-bg-secondary-900/25 tw-transition-opacity tw-duration-300 ${
        show ? 'tw-opacity-100' : 'tw-opacity-0'
      }`}
    >
      <div className="tw-flex tw-items-center tw-justify-center">
        <div className="tw-h-12 tw-w-12 tw-animate-spin tw-rounded-full tw-border-4 tw-border-solid tw-border-blue-500 tw-border-t-transparent"></div>
      </div>
    </div>
  )
}
