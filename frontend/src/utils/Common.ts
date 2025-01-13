import xss from 'xss'
import {type Socket} from 'socket.io-client'

export function diffArray<T>(
  oldItems: T[],
  newItems: T[],
  by: (item: T) => unknown = (item) => item
) {
  const oldKeys = new Set(oldItems.map((item) => by(item)))
  const newKeys = new Set(newItems.map((item) => by(item)))

  const removedItems: T[] = []
  const commonItems: T[] = []

  for (const item of oldItems) {
    if (newKeys.has(by(item))) {
      commonItems.push(item)
    } else {
      removedItems.push(item)
    }
  }

  const addedItems = newItems.filter((item) => !oldKeys.has(by(item)))
  const isAdded = addedItems.length > 0
  const isRemoved = removedItems.length > 0
  const isOrderChanged = isDiff(oldItems, newItems, by)

  return {
    isAdded,
    isRemoved,
    isOrderChanged,
    hasChanged: isAdded || isRemoved || isOrderChanged,
    removedItems,
    commonItems,
    addedItems
  }
}

export function isDiff<T>(
  oldItems: readonly T[],
  newItems: readonly T[],
  by: (item: T) => unknown = (item) => item
) {
  if (oldItems.length !== newItems.length) {
    return true
  }

  return oldItems.some((item, index) => by(item) !== by(newItems[index]))
}

import {CalendarDateTime, getLocalTimeZone, now} from '@internationalized/date'
import moment from 'moment'
import ms from 'ms'

import {type DateTimeRange} from '@/components/DatePicker'

export const FULL_DATE_TIME = 'dddd, MMMM D, YYYY h:mm:ss A'
export const MEDIUM_DATE_TIME = 'MMM D, YYYY h:mm A'

export function getTodayRangeValue() {
  const d = now(getLocalTimeZone())
  const start = new CalendarDateTime(d.year, d.month, d.day, 0, 0, 0)
  const end = start.add({days: 1}).subtract({seconds: 1})

  return {start, end}
}

export function isUnder({start, end}: DateTimeRange, range: string) {
  const startTimestamp = Date.parse(start.toString())
  const endTimestamp = Date.parse(end.toString())

  return endTimestamp - startTimestamp < ms(range)
}

export function toQueryFormat(date: string | number | Date) {
  return moment(new Date(date)).format('DD/MM/YYYY h:mm A')
}

export function toRangeDateVariants(range: DateTimeRange) {
  const {format: startDate, iso: startDateIso, unix: startDateUnix} = toDateVariants(range.start)
  const {format: endDate, iso: endDateIso, unix: endDateUnix} = toDateVariants(range.end)

  return {
    startDate,
    endDate,
    startDateIso,
    endDateIso,
    startDateUnix,
    endDateUnix
  }
}

/** A legacy helper */
export function toDateVariants(date: CalendarDateTime | Date) {
  const momentDate = moment(date instanceof Date ? date : date.toDate(getLocalTimeZone()))
  const utc = momentDate.utc().format()

  return {
    format: momentDate.format('DD-MM-YYYY h:mm:ss A'),
    iso: utc,
    unix: Date.parse(utc)
  }
}

export const removeSocketListeners = (socket: Socket, eventNames: string[]) => {
  for (const eventName of eventNames) {
    socket.removeAllListeners(eventName)
  }
}

export const toAbsoluteUrl = (pathname: string) =>
  removeEndSlash(import.meta.env.BASE_URL) + pathname

export const removeEndSlash = (url: string) => url.replace(/\/$/, '')

export function concatWords(...items: (string | null | undefined)[]) {
  return items
    .map((item) => (typeof item === 'string' ? item.trim() : false))
    .filter((item): item is string => Boolean(item))
    .join(' ')
}

export function removeHtmlTags(str: string) {
  return str.replace(/(<([^>]+)>)/gi, '')
}

export function sliceWord(str: string, start?: number, end?: number) {
  return str.split(' ').slice(start, end).join(' ')
}

export function notEmpty<T>(items?: T[]): items is T[] {
  return items ? items.length > 0 : false
}

export function isSubmission(e: KeyboardEvent | React.KeyboardEvent) {
  return e.key === 'Enter' && !e.shiftKey && !e.ctrlKey
}

const whiteList = {}

export function sanitize(content: string) {
  return xss(content, {whiteList})
}

export function isElementScrolledToBottom(element: HTMLElement, gap = 5) {
  return isScrolledToBottom(element.scrollHeight, element.clientHeight, element.scrollTop, gap)
}

export function isScrolledToBottom(
  scrollHeight: number,
  clientHeight: number,
  scrollTop: number,
  gap = 5 // px
) {
  const difference = scrollHeight - (clientHeight + scrollTop)

  return Math.floor(Math.abs(difference)) <= gap
}

export function sleep(duration: number) {
  return new Promise((resolve) => window.setTimeout(resolve, duration))
}

export function capitalize(str: string) {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function timePad(value: number) {
  return String(Math.floor(value)).padStart(2, '0')
}

export function secondsToTime(seconds: number) {
  const m = timePad(seconds / 60)
  const s = timePad(seconds % 60)

  return `${m}:${s}`
}

export function timeSince(date: Date | number) {
  const currentTimestamp = new Date().getDate()
  const timestamp = date instanceof Date ? date.getDate() : date
  const seconds = Math.floor((currentTimestamp - timestamp) / 1000)

  const interval = seconds / 60

  if (interval > 1) {
    return Math.floor(interval)
  } else {
    return 1
  }
}

export const API_URL = `${window.location.protocol}//${window.location.hostname}`
