import {type CalendarDateTime, getLocalTimeZone, isToday} from '@internationalized/date'
import {CalendarIcon, ChevronLeftIcon, ChevronRightIcon} from 'lucide-react'
import {useContext} from 'react'
import {
  Button,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DateRangePicker,
  DateRangePickerStateContext,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Label,
  Popover,
  RangeCalendar,
  TimeField
} from 'react-aria-components'

export type RangeValue<T> = {
  start: T
  end: T
}

export type DateTimeRange = RangeValue<CalendarDateTime>

type Props = {
  value?: DateTimeRange | null
  onChange?: (value: DateTimeRange | null) => void
  showClear?: boolean
}

export function DatePicker({value, onChange, showClear = false}: Props) {
  function handleChnage(date: DateTimeRange) {
    const noPreviousDate = value === null

    onChange?.(
      noPreviousDate && date
        ? {
            start: date.start ?? null,
            end: date.end.subtract({seconds: 1}) ?? null
          }
        : date
    )
  }

  return (
    <DateRangePicker
      aria-label="Select date"
      granularity="minute"
      value={value}
      onChange={handleChnage}
      className="tw-mb-1 tw-w-full"
    >
      <Group className="tw-relative tw-overflow-hidden tw-rounded tw-border tw-border-solid tw-border-secondary-200 tw-bg-white tw-pr-10">
        <div className="tw-flex tw-items-center tw-gap-1 tw-px-2 tw-py-2.5">
          <DateInput slot="start" className="tw-flex">
            {(segment) => <DateSegment segment={segment} className="tw-outline-none" />}
          </DateInput>
          <span aria-hidden="true">–</span>
          <DateInput slot="end" className="tw-flex">
            {(segment) => <DateSegment segment={segment} className="tw-outline-none" />}
          </DateInput>
        </div>
        <Button className="tw-absolute tw-inset-y-0 tw-right-0 tw-ml-auto tw-border-none tw-bg-transparent tw-bg-white tw-px-2 tw-text-secondary-500 tw-outline-none hover:tw-bg-secondary-100">
          <CalendarIcon className="tw-size-6" strokeWidth="1.5" />
        </Button>
      </Group>
      <Popover className="tw-overflow-auto tw-rounded-lg tw-border tw-border-solid tw-border-secondary-200 tw-bg-white tw-p-4 tw-shadow-2xl">
        <Dialog className="tw-outline-none">
          <RangeCalendar>
            <header className="tw-flex tw-items-center tw-justify-between">
              <Button
                slot="previous"
                className="tw-inline-flex tw-size-12 tw-items-center tw-justify-center tw-rounded-full tw-border tw-border-solid tw-border-secondary-300 tw-bg-transparent tw-outline-none hover:tw-bg-secondary-100"
              >
                <ChevronLeftIcon size="20" strokeWidth="1.5" />
              </Button>
              <Heading className="tw-m-0 tw-text-lg tw-font-medium" />
              <Button
                slot="next"
                className="tw-inline-flex tw-size-12 tw-items-center tw-justify-center tw-rounded-full tw-border tw-border-solid tw-border-secondary-300 tw-bg-transparent tw-outline-none hover:tw-bg-secondary-100"
              >
                <ChevronRightIcon size="20" strokeWidth="1.5" />
              </Button>
            </header>
            <CalendarGrid className="tw-mt-4">
              <CalendarGridHeader>
                {(day) => (
                  <CalendarHeaderCell className="tw-text-center tw-font-medium tw-text-secondary-400">
                    {day}
                  </CalendarHeaderCell>
                )}
              </CalendarGridHeader>
              <CalendarGridBody>
                {(date) => (
                  <CalendarCell
                    date={date}
                    className={({isHovered, isSelected, isOutsideMonth}) =>
                      `${
                        isSelected
                          ? 'tw-bg-primary-500 tw-text-primary-50'
                          : isHovered
                            ? 'tw-bg-secondary-100'
                            : isOutsideMonth
                              ? 'tw-cursor-default tw-border-transparent tw-text-secondary-300'
                              : ''
                      }
                      ${
                        isToday(date, getLocalTimeZone())
                          ? 'tw-border-secondary-300'
                          : 'tw-border-transparent'
                      }
                    tw-inline-flex tw-size-12 tw-items-center tw-justify-center tw-rounded-full tw-border tw-border-solid tw-outline-none`
                    }
                  />
                )}
              </CalendarGridBody>
            </CalendarGrid>
          </RangeCalendar>
          <DateRangePickerControls showClear={showClear} />
        </Dialog>
      </Popover>
    </DateRangePicker>
  )
}

function DateRangePickerControls({showClear}: {showClear: boolean}) {
  const state = useContext(DateRangePickerStateContext)!

  return state.dateRange ? (
    <>
      <section className="tw-mt-2 tw-flex tw-justify-between tw-gap-4">
        <TimeField
          value={state.timeRange?.start}
          onChange={(start) => state.setTime('start', start)}
          granularity="minute"
          hideTimeZone
        >
          <Label className="tw-text-sm tw-text-secondary-500">Start time</Label>
          <DateInput className="tw-flex tw-border tw-border-solid tw-border-secondary-200 tw-px-2 tw-py-1">
            {(segment) => <DateSegment segment={segment} className="tw-outline-none" />}
          </DateInput>
        </TimeField>
        <TimeField
          value={state.timeRange?.end}
          onChange={(end) => state.setTime('end', end)}
          granularity="minute"
          hideTimeZone
        >
          <Label className="tw-text-sm tw-text-secondary-500">End time</Label>
          <DateInput className="tw-flex tw-border tw-border-solid tw-border-secondary-200 tw-px-2 tw-py-1">
            {(segment) => <DateSegment segment={segment} className="tw-outline-none" />}
          </DateInput>
        </TimeField>
      </section>
      {showClear && (
        <footer className="tw-mt-2 tw-flex tw-justify-end tw-gap-2 tw-border-0 tw-border-t tw-border-solid tw-border-secondary-200 tw-pt-2">
          <Button
            slot={null}
            className="tw-bg-text-white tw-rounded tw-border-none tw-bg-red-500 tw-px-6 tw-py-3 tw-text-sm tw-font-medium tw-text-red-50 tw-outline-none hover:tw-bg-red-600"
            aria-label="Clear"
            onPress={() => {
              state.setValue(null)
              state.setOpen(false)
            }}
          >
            Clear
          </Button>
        </footer>
      )}
    </>
  ) : null
}
