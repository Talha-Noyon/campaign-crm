import {type ReactNode, useState} from 'react'
import {Scrollbars} from 'react-custom-scrollbars-2'

import {isScrolledToBottom} from '@/utils/Common'

type Props = {
  ref_: React.MutableRefObject<Scrollbars | null>
  children: ReactNode
  scrollDown: () => void
  scrollUp: () => void
}

export default function CustomScroll({ref_, children, scrollDown, scrollUp}: Props) {
  const [accumulatedDelta, setAccumulatedDelta] = useState(0)
  const [onWheel, setOnWheel] = useState(false)

  return (
    <Scrollbars
      onWheel={(event) => {
        setOnWheel(true)
        const delta = event.deltaY
        setAccumulatedDelta(accumulatedDelta + delta)

        const fullScrollThreshold = 150

        if (Math.abs(accumulatedDelta) >= fullScrollThreshold) {
          if (accumulatedDelta > 0) {
            scrollDown()
          } else {
            scrollUp()
          }

          // Reset the accumulated delta
          setAccumulatedDelta(0)
        }
      }}
      onScrollStop={() => {
        if (!onWheel) {
          const container = ref_.current

          if (!container) return

          const scrollHeight = container.getScrollHeight()
          const clientHeight = container.getClientHeight()
          const scrollTop = container.getScrollTop()
          if (isScrolledToBottom(scrollHeight, clientHeight, scrollTop)) {
            scrollDown()
          } else if (scrollTop === 0) {
            scrollUp()
          }
        }
        setOnWheel(false)
      }}
      ref={ref_}
      className="tw-h-[calc(100vh-350px)]"
    >
      {children}
    </Scrollbars>
  )
}
