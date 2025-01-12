type Props = {
  title?: string
  icon: React.ReactNode
  value?: string | number
}

export function Badge({title, icon, value}: Props) {
  return (
    <div
      title={title}
      className="tw-border-reset tw-flex tw-flex-1 tw-items-center tw-justify-center tw-gap-1 tw-rounded tw-border tw-bg-white tw-p-1 tw-text-center tw-text-secondary-500"
    >
      {icon}
      {value}
    </div>
  )
}
