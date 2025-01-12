import {FloatingArrow, type Placement} from '@floating-ui/react'
import {type ReactNode} from 'react'

import {IconButton} from '@/components/IconButton'

import {usePopover} from '@/hooks/usePopover'

type Props = {
  title: string
  size?: 'sm' | 'md'
  icon: ReactNode
  children: ReactNode
  placement?: Placement
  type?: 'click' | 'hover'
  onOpenChange?: (isOpen: boolean) => void
}

export function IconPopover({title, size, type, placement, icon, children, onOpenChange}: Props) {
  const {context, open, refs, floatingStyles, getReferenceProps, getFloatingProps} = usePopover({
    placement,
    type,
    onOpenChange
  })

  return (
    <>
      <IconButton
        size={size}
        title={title}
        icon={icon}
        ref={refs.setReference}
        active={open}
        {...getReferenceProps()}
      />
      {open && (
        <div
          ref={refs.setFloating}
          className="tw-absolute tw-z-10 tw-whitespace-nowrap tw-rounded tw-bg-white tw-shadow-around"
          style={floatingStyles}
          {...getFloatingProps()}
        >
          <FloatingArrow
            ref={refs.setArrow}
            context={context}
            height={6}
            width={12}
            className="tw-fill-white"
          />
          {children}
        </div>
      )}
    </>
  )
}
