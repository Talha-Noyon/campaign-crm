import {useState} from 'react'

import {useOnUpdate} from '@/hooks/useOnUpdate'

type Props = {
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Avatar({src, alt, size = 'lg'}: Props) {
  const [showImg, setShowImg] = useState(src ? true : false)

  const finalAlt = finalizeAlt(alt)

  useOnUpdate(() => {
    setShowImg(src ? true : false)
  }, [src])

  const sizeClassName = {
    sm: 'tw-size-8',
    md: 'tw-size-10',
    lg: 'tw-size-14'
  }[size]

  return (
    <div className={`${sizeClassName} tw-relative`} title={finalAlt}>
      <div
        className={`${sizeClassName} tw-border-reset tw-grid tw-overflow-hidden tw-rounded-full tw-border tw-bg-secondary-300`}
      >
        {showImg ? (
          <img
            src={src}
            alt={finalAlt}
            className={`${sizeClassName} tw-object-fill`}
            onError={() => setShowImg(false)}
          />
        ) : (
          <span
            className={`${
              {
                sm: 'tw-text-base',
                md: 'tw-text-lg',
                lg: 'tw-text-2xl'
              }[size]
            } tw-m-auto tw-inline-flex tw-font-medium tw-text-secondary-500`}
          >
            {finalAlt.at(0)}
          </span>
        )}
      </div>
    </div>
  )
}

function finalizeAlt(alt?: unknown) {
  if (typeof alt === 'string' && alt.trim()) {
    return alt.trim()
  }

  return 'Avatar'
}
