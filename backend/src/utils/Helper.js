import moment from 'moment-timezone'

export function getTimestamp() {
  return Number(moment().tz('Asia/Dhaka'))
}

export function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}
