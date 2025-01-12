import {useEffect} from 'react'
import {useLocation} from 'react-router-dom'

import {Content} from '@/components/layout/Content'
import {Navbar} from '@/components/layout/Navbar'
import {Sidebar} from '@/components/layout/Sidebar'

import {useLayout} from '@/store/Layout'

export default function Layout() {
  const setIsMobileLeftSidebarExpand = useLayout((state) => state.setIsMobileLeftSidebarExpand)
  const setIsMobileRightSidebarExpand = useLayout((state) => state.setIsMobileRightSidebarExpand)
  const {pathname} = useLocation()

  useEffect(() => {
    setIsMobileLeftSidebarExpand(false)
    setIsMobileRightSidebarExpand(false)
  }, [pathname, setIsMobileLeftSidebarExpand, setIsMobileRightSidebarExpand])

  return (
    <div className="tw-min-h-dvh tw-bg-white">
      <Navbar />
      <Sidebar />
      <Content />
    </div>
  )
}
