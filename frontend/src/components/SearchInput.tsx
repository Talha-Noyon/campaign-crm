import {SearchIcon} from 'lucide-react'

type Props = {
  value?: string
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function SearchInput({value, placeholder, onChange}: Props) {
  return (
    <label className="tw-relative tw-block tw-w-full">
      <input
        type="text"
        className="tw-w-full tw-rounded tw-border tw-border-solid tw-border-secondary-200 tw-px-2 tw-py-1 tw-pl-8 tw-outline-none"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      <span className="tw-absolute tw-left-2 tw-top-0 tw-flex tw-h-full tw-items-center">
        <SearchIcon className="tw-size-5" />
      </span>
    </label>
  )
}
