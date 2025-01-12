import {ChevronDownIcon, ChevronUpIcon, MenuIcon} from 'lucide-react'
import {type ReactNode} from 'react'
import {Link} from 'react-router-dom'

import {Accordion, AccordionContent, useAccordion} from '@/components/Accordion'
import {useMenu} from '@/components/layout/Menus'

import {useLayout} from '@/store/Layout'

function IconButton({icon, onClick}: {icon?: ReactNode; onClick?: () => void}) {
  return (
    <button
      onClick={onClick}
      className="tw-inline-flex tw-size-12 tw-items-center tw-justify-center tw-rounded-full tw-border-none tw-bg-secondary-50 tw-text-secondary-700 hover:tw-bg-secondary-100"
    >
      {icon}
    </button>
  )
}
export function Sidebar() {
  const toggleIsDesktopSidebarExpand = useLayout((state) => state.toggleIsDesktopSidebarExpand)
  const isDesktopSidebarExpand = useLayout((state) => state.isDesktopSidebarExpand)
  const isDesktopSidebarHovered = useLayout((state) => state.isDesktopSidebarHovered)
  const setIsDesktopSidebarHovered = useLayout((state) => state.setIsDesktopSidebarHovered)

  return (
    <div
      onMouseEnter={() => setIsDesktopSidebarHovered(true)}
      onMouseLeave={() => setIsDesktopSidebarHovered(false)}
      className={`${
        isDesktopSidebarHovered || isDesktopSidebarExpand ? 'tw-w-80' : 'tw-w-16'
      } tw-border-reset tw-fixed tw-z-20 tw-hidden tw-h-full tw-overflow-auto tw-whitespace-nowrap tw-border-r tw-bg-white tw-transition-all tw-duration-150 md:tw-flex md:tw-flex-col`}
    >
      <div className="tw-border-reset tw-hidden tw-h-16 tw-gap-2 tw-border-b tw-p-2 md:tw-flex">
        <div className="tw-inline-block tw-shrink-0 tw-text-secondary-700">
          <IconButton
            icon={<MenuIcon className="tw-size-5" />}
            onClick={toggleIsDesktopSidebarExpand}
          />
        </div>
        <div
          className={`${
            isDesktopSidebarExpand || isDesktopSidebarHovered ? 'tw-flex' : 'tw-hidden'
          } tw-grow tw-items-center tw-rounded-full`}
        ></div>
      </div>
      <div className="tw-overflow-auto">
        <SidebarContent />
      </div>
    </div>
  )
}

export function SidebarContent() {
  const {sidebarMenu: sidebarMenus} = useMenu()

  return (
    <div className="tw-grid tw-gap-2 tw-p-2">
      {sidebarMenus.map(({link, icon, title, submenu}) => {
        return submenu ? (
          submenu.length > 0 ? (
            <Accordion key={link}>
              <SidebarItemAccordionButton icon={icon} title={title} />
              <SidebarItemAccordionContent>
                <div className="tw-space-y-2 tw-pl-8">
                  {submenu.map(({title, link}) => (
                    <SidebarSubLinkItem key={title} link={link} title={title} />
                  ))}
                </div>
              </SidebarItemAccordionContent>
            </Accordion>
          ) : null
        ) : (
          <SidebarLinkItem key={link} title={title} link={link} icon={icon} />
        )
      })}
    </div>
  )
}

function SidebarLinkItem({link, icon, title}: {icon?: ReactNode; link: string; title: string}) {
  const isDesktopSidebarExpand = useLayout((state) => state.isDesktopSidebarExpand)
  const isDesktopSidebarHovered = useLayout((state) => state.isDesktopSidebarHovered)

  return (
    <Link
      to={link}
      className="tw-flex tw-w-full tw-items-center tw-justify-between tw-rounded-full tw-border-none tw-bg-secondary-50 tw-p-2 tw-text-secondary-700 hover:tw-bg-secondary-100"
    >
      <div className="tw-inline-flex tw-size-8 tw-items-center tw-justify-center tw-rounded-full tw-bg-secondary-100">
        {icon}
      </div>
      <div
        className={`${
          isDesktopSidebarHovered || isDesktopSidebarExpand ? '' : 'md:tw-hidden'
        } tw-flex tw-grow tw-items-center`}
      >
        <div className="tw-grow tw-px-2 tw-text-left">{title}</div>
      </div>
    </Link>
  )
}

function SidebarSubLinkItem({link, title}: {icon?: ReactNode; link: string; title: string}) {
  return (
    <Link
      to={link}
      className="tw-flex tw-w-full tw-items-center tw-justify-between tw-rounded-full tw-border-none tw-bg-secondary-50 tw-p-2 tw-text-secondary-700 hover:tw-bg-secondary-100"
    >
      <div className="tw-size-2 tw-shrink-0 tw-rounded-full tw-bg-secondary-200" />
      <div className="tw-grow tw-px-2 tw-text-left">{title}</div>
    </Link>
  )
}

function SidebarItemAccordionButton({icon, title}: {icon: ReactNode; title: string}) {
  const [open, setOpen] = useAccordion()
  const isDesktopSidebarExpand = useLayout((state) => state.isDesktopSidebarExpand)
  const isDesktopSidebarHovered = useLayout((state) => state.isDesktopSidebarHovered)

  return (
    <button
      onClick={() => setOpen((state) => !state)}
      className="tw-flex tw-w-full tw-items-center tw-justify-between tw-rounded-full tw-border-none tw-bg-secondary-50 tw-p-2 tw-text-secondary-700 hover:tw-bg-secondary-100"
    >
      <div className="tw-inline-flex tw-size-8 tw-items-center tw-justify-center tw-rounded-full tw-bg-secondary-100">
        {icon}
      </div>
      <div
        className={`${
          isDesktopSidebarHovered || isDesktopSidebarExpand ? '' : 'md:tw-hidden'
        } tw-flex tw-grow tw-items-center`}
      >
        <div className="tw-grow tw-px-2 tw-text-left">{title}</div>
        <div className="tw-pr-2">
          {open ? (
            <ChevronUpIcon className="tw-size-5" />
          ) : (
            <ChevronDownIcon className="tw-size-5" />
          )}
        </div>
      </div>
    </button>
  )
}

function SidebarItemAccordionContent({children}: {children: ReactNode}) {
  const isDesktopSidebarExpand = useLayout((state) => state.isDesktopSidebarExpand)
  const isDesktopSidebarHovered = useLayout((state) => state.isDesktopSidebarHovered)

  return (
    <div className={isDesktopSidebarHovered || isDesktopSidebarExpand ? '' : 'md:tw-hidden'}>
      <AccordionContent>{children}</AccordionContent>
    </div>
  )
}
