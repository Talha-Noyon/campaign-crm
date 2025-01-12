type Props = {
  title?: string
  icon: React.ReactNode
  value?: string | number
  onClick?: () => void
}

export function BadgeButton({title, icon, value, onClick}: Props) {
  return (
    <button
      title={title}
      onClick={onClick}
      className="tw-border-reset tw-flex tw-w-full tw-flex-1 tw-items-center tw-justify-center tw-gap-1 tw-rounded tw-border tw-bg-white tw-p-1 tw-text-center tw-text-primary-500 hover:tw-border-primary-200 hover:tw-bg-primary-50"
    >
      {icon}
      {value}
    </button>
  )
}
