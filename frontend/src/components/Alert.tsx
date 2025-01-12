import {AlertCircleIcon} from 'lucide-react'
import {type ReactNode} from 'react'

type Color = 'primary' | 'red' | 'blue' | 'orange'
type Alignment = 'left' | 'center' | 'right'

type Props = {
  color?: Color
  alignment?: Alignment
  children: ReactNode
}

export function Alert({color = 'blue', alignment = 'left', children}: Props) {
  const colors: Record<Color, string> = {
    primary: 'tw-bg-primary-50 tw-text-primary-600',
    red: 'tw-bg-red-50 tw-text-red-600',
    blue: 'tw-bg-blue-50 tw-text-blue-600',
    orange: 'tw-bg-orange-50 tw-text-orange-600'
  }

  const alignments: Record<Alignment, string> = {
    left: '',
    center: 'tw-justify-center tw-text-center',
    right: 'tw-justify-end tw-text-right'
  }

  return (
    <div
      className={`${colors[color]} ${alignments[alignment]} tw-flex tw-items-center tw-rounded-lg tw-px-3 tw-py-2`}
    >
      {alignment !== 'right' && <AlertCircleIcon className="tw-mr-2 tw-size-5 tw-shrink-0" />}
      <div>{children}</div>
      {alignment === 'right' && <AlertCircleIcon className="tw-ml-2 tw-size-5 tw-shrink-0" />}
    </div>
  )
}
