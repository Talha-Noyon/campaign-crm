import {
  type Placement,
  arrow,
  autoUpdate,
  flip,
  offset,
  safePolygon,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions
} from '@floating-ui/react'
import {useRef, useState} from 'react'

type Props = {
  placement?: Placement
  type?: 'click' | 'hover'
  dismissible?: boolean
  openDelay?: number
  onOpenChange?: (isOpen: boolean) => void
}

export function usePopover({
  placement,
  type = 'hover',
  openDelay = 0,
  dismissible = true,
  onOpenChange
}: Props = {}) {
  const [isOpen, setIsOpen] = useState(false)
  const arrowRef = useRef<SVGSVGElement | null>(null)
  const {context, refs, floatingStyles} = useFloating({
    placement,
    middleware: [
      offset(6),
      shift({padding: 6}),
      flip({padding: 6}),
      size(),
      arrow({
        element: arrowRef
      })
    ],
    whileElementsMounted: autoUpdate,
    open: isOpen,
    onOpenChange: (isOpen) => {
      setIsOpen(isOpen)
      onOpenChange?.(isOpen)
    }
  })
  const hover = useHover(context, {
    delay: {
      open: openDelay,
      close: 0
    },
    handleClose: safePolygon(),
    enabled: type === 'hover'
  })
  const click = useClick(context, {enabled: type === 'click'})
  const dismiss = useDismiss(context, {
    enabled: dismissible
  })

  const {getReferenceProps, getFloatingProps} = useInteractions([hover, click, dismiss])

  return {
    context,
    open: isOpen,
    setOpen: setIsOpen,
    refs: {...refs, setArrow: arrowRef},
    floatingStyles,
    getReferenceProps,
    getFloatingProps
  }
}
