import {FloatingArrow} from '@floating-ui/react'
import {ChevronRightIcon} from 'lucide-react'
import {enqueueSnackbar} from 'notistack'
import {type ReactNode, useEffect} from 'react'
import {Link} from 'react-router-dom'

import {Avatar} from '@/components/Avatar'
import {BellIcon} from '@/components/Icons'

import {usePopover} from '@/hooks/usePopover'
import {useSocketNotification} from '@/hooks/useSocketNotification'
import {useStore} from '@/store'
import {useAuth} from '@/store/Auth'
import {useLayout} from '@/store/Layout'

import {toAbsoluteUrl} from '@/utils/Common'
import {socket} from '@/utils/Socket'

export function Navbar() {
  const isDesktopSidebarExpand = useLayout((state) => state.isDesktopSidebarExpand)
  const isDesktopSidebarHovered = useLayout((state) => state.isDesktopSidebarHovered)
  useSocketNotification()
  return (
    <div
      className={`${
        isDesktopSidebarHovered || isDesktopSidebarExpand ? 'md:tw-pl-80' : 'md:tw-pl-16'
      } tw-border-reset tw-fixed tw-left-0 tw-top-0 tw-z-10 tw-flex tw-h-16 tw-w-full tw-border-b tw-bg-white tw-transition-all tw-duration-150`}
    >
      {/* desktop */}
      <div className="tw-hidden tw-grow tw-justify-between md:tw-flex">
        <div className="px-3 tw-flex tw-gap-3 tw-py-1"></div>
        <div className="tw-flex tw-items-center tw-gap-2 tw-p-2">
          <UserDetailsPopover />
          <AuthBreakPopover />
        </div>
      </div>
    </div>
  )
}

function AuthBreakPopover({onClick}: {icon?: ReactNode; onClick?: () => void}) {
  const {auth} = useAuth()
  const {context, open, refs, floatingStyles, getReferenceProps, getFloatingProps} = usePopover({
    placement: 'bottom-end'
  })

  return (
    <>
      <button
        ref={refs.setReference}
        {...getReferenceProps({onClick})}
        className={`${
          open ? 'tw-bg-secondary-100' : 'tw-bg-secondary-50'
        } tw-flex tw-items-center tw-rounded-full tw-border-none tw-p-0 tw-pl-4`}
      >
        <span className="tw-whitespace-nowrap">{auth?.username}</span>
        <Avatar src="/media/users/defaultProfile.jpg" alt="Avatar" size="md" />
      </button>
      {open && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="tw-absolute tw-z-30 tw-max-w-md tw-divide-y tw-rounded-lg tw-bg-white tw-shadow-around"
        >
          <FloatingArrow
            ref={refs.setArrow}
            context={context}
            height={6}
            width={12}
            className="tw-fill-white"
          />
          <div className="tw-p-2">
            <AuthBreakPopoverContent />
          </div>
        </div>
      )}
    </>
  )
}

function UserDetailsPopover({onClick}: {icon?: ReactNode; onClick?: () => void}) {
  const bellNotifications = useStore((state) => state.bellNotifications)
  const {context, open, refs, floatingStyles, getReferenceProps, getFloatingProps} = usePopover({
    placement: 'bottom-end'
  })

  return (
    <>
      <button
        ref={refs.setReference}
        {...getReferenceProps({onClick})}
        className={`${
          open ? 'tw-bg-secondary-100' : 'tw-bg-secondary-50'
        } tw-inline-flex tw-size-12 tw-items-center tw-justify-center tw-rounded-full tw-border-none tw-p-0`}
      >
        <BellIcon className="tw-block tw-size-8" counter={String(bellNotifications.length)} />
      </button>
      {open && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="tw-absolute tw-z-30 tw-max-w-md tw-divide-y tw-rounded-lg tw-bg-white tw-shadow-around"
        >
          <FloatingArrow
            ref={refs.setArrow}
            context={context}
            height={6}
            width={12}
            className="tw-fill-white"
          />
          <div className="tw-p-2">
            <UserDetailsPopoverContent />
          </div>
        </div>
      )}
    </>
  )
}

function ListItem({left, right}: {left: string; right: ReactNode}) {
  return (
    <div className="tw-border-reset tw-flex tw-justify-between tw-space-x-3 tw-p-3">
      <span className="tw-text-secondary-500">{left}</span>
      <span className="tw-font-medium">{right}</span>
    </div>
  )
}

function UserDetailsPopoverContent() {
  const bellNotifications = useStore((state) => state.bellNotifications)
  return (
    <div className="tw-divide-y">
      {bellNotifications.map((item, index) => (
        <ListItem key={index} left={item.email} right={`sent ${item.sendingStatus}`} />
      ))}
    </div>
  )
}

function AuthBreakPopoverContent() {
  const {auth, logout} = useAuth()
  const resetAllState = useStore((state) => state.resetAllState)

  async function sessionLogout(e: React.MouseEvent<HTMLButtonElement>) {
    const btnEl = e.currentTarget
    if (!btnEl.disabled) {
      btnEl.disabled = true
      try {
        const response = await logout()
        if (response?.status === 'FAILED') {
          enqueueSnackbar(response.data.message, {variant: 'info'})
        } else {
          resetAllState()
          socket.disconnect()
        }
      } catch {
        btnEl.disabled = false
      }
      setTimeout(() => {
        btnEl.disabled = false
      }, 7000) // 7 seconds
    }
  }

  return (
    <div className="tw-p-3">
      <Link
        to="/dashboard"
        className="tw-flex tw-items-center tw-gap-3 tw-rounded-lg tw-bg-secondary-50 tw-p-3 hover:tw-bg-secondary-100"
      >
        <div>
          <Avatar src={toAbsoluteUrl(`/media/users/defaultProfile.jpg`)} alt="Avatar" size="sm" />
        </div>
        <div className="tw-grow">
          <h3 className="tw-m-0 tw-text-lg">{auth?.username}</h3>
          <p className="tw-m-0 tw-text-secondary-500">{auth?.email}</p>
        </div>
        <ChevronRightIcon className="tw-size-5 tw-text-secondary-400" />
      </Link>
      <div className="tw-mt-6 tw-grid">
        <div className="tw-grid tw-grid-cols-2 tw-gap-2">
          <button className="tw-btn tw-btn-danger" onClick={sessionLogout}>
            Sign out
          </button>
        </div>
      </div>
    </div>
  )
}

export function IconButton({icon, onClick}: {icon?: ReactNode; onClick?: () => void}) {
  return (
    <button
      onClick={onClick}
      className="tw-inline-flex tw-size-12 tw-items-center tw-justify-center tw-rounded-full tw-border-none tw-bg-secondary-50 tw-text-secondary-700 hover:tw-bg-secondary-100"
    >
      {icon}
    </button>
  )
}
