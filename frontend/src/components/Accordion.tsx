import {type ReactNode} from 'react'

import {createStateContext} from '@/utils/Context'

// eslint-disable-next-line react-refresh/only-export-components
export const [useAccordion, Accordion] = createStateContext(false)

export function AccordionContent({children}: {children: ReactNode}) {
  const [open] = useAccordion()
  return (
    <div
      className={`${open ? 'tw-grid-rows-[1fr]' : 'tw-grid-rows-[0fr]'} tw-grid tw-transition-[grid-template-rows]`}
    >
      <div className="tw-min-w-0 tw-overflow-hidden">{children}</div>
    </div>
  )
}
