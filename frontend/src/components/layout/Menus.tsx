import {BarChart4Icon} from 'lucide-react'
import {type ReactNode} from 'react'

import {useAuth} from '@/store/Auth'

export type SidebarItem = {
  title: string
  link: string
  icon?: ReactNode
  type?: 'adminOnly'
  submenu?: SidebarItem[]
}

const sidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    link: '/dashboard',
    icon: <BarChart4Icon className="tw-size-5" />
  }
]

export function useMenu() {
  const {auth} = useAuth()
  const allowedSidebarItems = sidebarItems.filter(filterAllowed).map((menu) => ({
    ...menu,
    submenu: menu.submenu?.filter(filterAllowed)
  }))

  function filterAllowed(menu: SidebarItem) {
    if (menu.type === 'adminOnly') {
      if (auth?.role.toLowerCase() === 'admin') {
        return true
      }
    } else {
      return true
    }
  }

  return {
    sidebarMenu: allowedSidebarItems
  }
}
