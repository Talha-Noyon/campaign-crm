import {type ForwardedRef, forwardRef} from 'react'

import {CounterBadge} from '@/components/CounterBadge'

type Props = {
  active?: boolean
  disabled?: boolean
  count?: number
  icon: React.ReactNode
  size?: 'sm' | 'md'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

function IconButtonRef(
  {icon, active = false, disabled = false, count, size = 'md', ...rest}: Props,
  ref?: ForwardedRef<HTMLButtonElement>
) {
  return (
    <div className="tw-relative tw-inline-flex">
      <button
        ref={ref}
        disabled={disabled}
        className={`${
          active
            ? 'tw-border-primary-500 tw-bg-primary-50 tw-text-primary-500'
            : `tw-border-secondary-200 tw-bg-white tw-text-secondary-500 ${
                disabled ? 'tw-cursor-not-allowed' : 'hover:tw-border-secondary-400'
              }`
        } ${
          {
            sm: 'tw-size-8',
            md: 'tw-size-10'
          }[size]
        } tw-pointer-events-auto tw-inline-flex tw-items-center tw-justify-center tw-rounded-full tw-border tw-border-solid`}
        {...rest}
      >
        {icon}
      </button>
      {typeof count === 'number' && (
        <div className="tw-absolute tw-bottom-full tw-left-full tw-z-10 -tw-m-3">
          <CounterBadge value={count} />
        </div>
      )}
    </div>
  )
}

export const IconButton = forwardRef<HTMLButtonElement, Props>(IconButtonRef)
