import moment from 'moment'

import {useToggle} from '@/hooks/useToggle'

import {FULL_DATE_TIME} from '@/utils/date'

export function RelativeTime({time}: {time: number | string | Date}) {
  useToggle(30_000, true)
  //           ^ 30 seconds

  const date = new Date(time)

  return (
    <time dateTime={date.toISOString()} title={moment(date).format(FULL_DATE_TIME)}>
      {moment(date).fromNow()}
    </time>
  )
}
