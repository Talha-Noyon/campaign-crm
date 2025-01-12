type Props = {
  title?: string
  value: string | number
}

export function CounterBadge({title, value}: Props) {
  const numberValue = typeof value === 'string' ? parseInt(value) : value
  return (
    <span
      title={title}
      className="px-2 tw-inline-flex tw-rounded-full tw-bg-primary-400 tw-py-0.5 tw-text-sm tw-font-medium tw-tabular-nums tw-text-white"
    >
      {numberValue}
    </span>
  )
}
