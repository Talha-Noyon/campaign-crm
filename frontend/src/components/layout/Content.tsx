import {Outlet} from 'react-router-dom'

import {useLayout} from '@/store/Layout'

export function Content() {
  const isDesktopSidebarExpand = useLayout((state) => state.isDesktopSidebarExpand)

  return (
    <div
      className={`${
        isDesktopSidebarExpand ? 'md:tw-pl-80' : 'md:tw-pl-16'
      } tw-grid tw-min-h-dvh tw-pt-16`}
    >
      <div className="tw-relative tw-min-w-0 tw-p-4">
        <Outlet />
      </div>
    </div>
  )
}
