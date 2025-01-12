import {create} from 'zustand'

export const useLayout = create<{
  isDesktopSidebarExpand: boolean
  isDesktopSidebarHovered: boolean
  isMobileLeftSidebarExpand: boolean
  isMobileRightSidebarExpand: boolean
  toggleIsDesktopSidebarExpand: () => void
  setIsDesktopSidebarHovered: (status: boolean) => void
  toggleIsMobileLeftSidebarExpand: () => void
  setIsMobileLeftSidebarExpand: (status: boolean) => void
  toggleIsMobileRightSidebarExpand: () => void
  setIsMobileRightSidebarExpand: (status: boolean) => void
}>((set, get) => ({
  isDesktopSidebarHovered: false,
  isDesktopSidebarExpand: false,
  isMobileLeftSidebarExpand: false,
  isMobileRightSidebarExpand: false,
  toggleIsDesktopSidebarExpand() {
    const {isDesktopSidebarExpand} = get()
    set({isDesktopSidebarExpand: !isDesktopSidebarExpand})
  },
  setIsDesktopSidebarHovered(isDesktopSidebarHovered) {
    set({isDesktopSidebarHovered})
  },
  toggleIsMobileLeftSidebarExpand() {
    const {isMobileLeftSidebarExpand} = get()
    set({isMobileLeftSidebarExpand: !isMobileLeftSidebarExpand})
  },
  toggleIsMobileRightSidebarExpand() {
    const {isMobileRightSidebarExpand} = get()
    set({isMobileRightSidebarExpand: !isMobileRightSidebarExpand})
  },
  setIsMobileLeftSidebarExpand(isMobileLeftSidebarExpand) {
    set({isMobileLeftSidebarExpand})
  },
  setIsMobileRightSidebarExpand(isMobileRightSidebarExpand) {
    set({isMobileRightSidebarExpand})
  }
}))
